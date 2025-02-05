import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value || null;

  const isPublicRoute =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/login");

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/mails", request.url));
  }

  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/mails", "/mails/:id", "/login"],
};
