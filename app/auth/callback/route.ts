import { oauthClient } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
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
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.redirect(new URL("/mails", request.url));
  } catch (error) {
    return NextResponse.json({
      error: "Google OAuth failed to exchange code: " + error,
    });
  }
}

//export async function GET(request: Request) {
//  const { searchParams, origin } = new URL(request.url);
//  const code = searchParams.get("code");
//  // if "next" is in param, use it as the redirect URL
//  const next = searchParams.get("next") ?? "/mails";
//
//  if (code) {
//    const supabase = await createClient();
//    const { error } = await supabase.auth.exchangeCodeForSession(code);
//    if (!error) {
//      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
//      const isLocalEnv = process.env.NODE_ENV === "development";
//      if (isLocalEnv) {
//        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
//        return NextResponse.redirect(`${origin}${next}`);
//      } else if (forwardedHost) {
//        return NextResponse.redirect(`https://${forwardedHost}${next}`);
//      } else {
//        return NextResponse.redirect(`${origin}${next}`);
//      }
//    }
//  }
//
//  // return the user to an error page with instructions
//  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
//}
