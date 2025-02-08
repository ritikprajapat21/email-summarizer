import { oauthClient } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")!;
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error: "Google OAuth Error: " + error });
  }

  const oauth = await oauthClient();

  try {
    const { tokens } = await oauth.getToken(code);

    const cookieStore = await cookies();

    cookieStore.set({
      name: "access_token",
      value: tokens.access_token || "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: tokens.expiry_date || 1000 * 60 * 60,
    });

    return NextResponse.redirect(new URL("/mails", request.url));
  } catch (error) {
    return NextResponse.json({
      error: "Google OAuth failed to exchange code: " + error,
    });
  }
}
