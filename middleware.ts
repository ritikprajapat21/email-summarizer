import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value || null;
  const destinationUrl = request.nextUrl.searchParams.get("dest") || "/mails";
  console.log("Destination url", destinationUrl);
  console.log(request.nextUrl.pathname);

  const isPublicRoute =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/login");

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL(destinationUrl, request.url));
  }

  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(
      new URL(`/login?dest=${request.nextUrl.pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/mails", "/mails/:id", "/login", "/pay"],
};
