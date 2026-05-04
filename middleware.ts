import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { getToken, JWT } from "next-auth/jwt";

interface DecodedToken {
  sub: string;
  roles: string[];
  authorities: string[];
  exp: number;
}
const userProtectedRoutes = ['/cart', '/profile'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = (await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })) as JWT | null;

  // Xử lý Admin tại trang chủ
  if (pathname === '/' && token?.accessToken) {
    try {
      const decoded = jwtDecode<DecodedToken>(token.accessToken as string);
      if (decoded.roles?.includes('ADMIN')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch (e) { console.error("Lỗi decode tại trang chủ:", e); }
  }

  // Xử lý Admin Route
  if (pathname.startsWith('/admin')) {
    if (!token?.accessToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    try {
      const decoded = jwtDecode<DecodedToken>(token.accessToken);
      if (Date.now() >= decoded.exp * 1000 || !decoded.roles?.includes('ADMIN')) {
        const res = NextResponse.redirect(new URL(Date.now() >= decoded.exp * 1000 ? '/login' : '/', request.url));
        if (Date.now() >= decoded.exp * 1000) res.cookies.delete('accessToken');
        return res;
      }
    } catch (error) {
      const res = NextResponse.redirect(new URL('/login', request.url));
      res.cookies.delete('accessToken');
      return res;
    }
  }

  // Xử lý User Route
  if (userProtectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token || token.error === "RefreshAccessTokenError") {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Mấu chốt ở đây: Trả về NextResponse.next() bình thường, không qua next-intl nữa
  return NextResponse.next();
}

export const config = {
  // Trả Matcher về y như cũ của bạn
  matcher: [
    '/',
    '/admin/:path*',
    '/cart/:path*',
    '/profile/:path*',
  ],
};