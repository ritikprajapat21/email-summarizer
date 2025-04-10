import { oauthClient } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  let destinationUrl = "/mails"; // Default destination

  if (state) {
    try {
      const decodedState = JSON.parse(
        Buffer.from(state, "base64").toString("utf-8"),
      );
      if (decodedState && typeof decodedState.dest === "string") {
        destinationUrl = decodedState.dest;
      }
    } catch (e) {
      console.error("Failed to parse state parameter:", e);
      // Keep default destinationUrl if state is invalid
    }
  }

  if (error) {
    // Redirect to login page with error if OAuth fails
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error)}`, request.url),
    );
  }

  if (!code) {
    // Redirect to login page if code is missing
    return NextResponse.redirect(
      new URL(`/login?error=Missing%20authorization%20code`, request.url),
    );
  }

  const oauth = await oauthClient();

  try {
    const { tokens } = await oauth.getToken(code);

    if (!tokens.access_token) {
      throw new Error("Access token not received from Google.");
    }

    const cookieStore = await cookies(); // Await the promise here

    cookieStore.set({
      name: "access_token",
      value: tokens.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: tokens.expiry_date
        ? Math.floor((tokens.expiry_date - Date.now()) / 1000)
        : 60 * 60, // Use expiry from token or default to 1 hour
    });

    // Redirect to the originally intended destination URL
    return NextResponse.redirect(new URL(destinationUrl, request.url));
  } catch (error: any) {
    console.error("Google OAuth token exchange failed:", error);
    // Redirect to login page with error
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent("OAuth token exchange failed: " + error.message)}`,
        request.url,
      ),
    );
  }
}
