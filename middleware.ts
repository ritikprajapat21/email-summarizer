import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Url:", request.nextUrl.pathname);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any other custom routes that should not trigger login redirection
     */
    //"/((?!_next/static|_next/image|favicon.ico).*)",
    "/login",
    "/mails",
    "/mails/:id",
  ],
};
