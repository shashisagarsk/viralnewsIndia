import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken, AUTH_COOKIE_NAME } from "@/src/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isAuth = token ? await verifyAdminToken(token) : null;
    const isLoginPage = pathname === "/admin/login";

    // If not authenticated and trying to access any admin page other than login
    if (!isAuth && !isLoginPage) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // If already authenticated and trying to access the login page
    if (isAuth && isLoginPage) {
      const adminUrl = new URL("/admin", req.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
