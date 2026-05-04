import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { getToken, JWT } from "next-auth/jwt";

// 1. Cấu hình i18n
const locales = ['vi', 'en', 'ja'];
const defaultLocale = 'vi';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale
});

interface DecodedToken {
  sub: string;
  roles: string[];
  authorities: string[];
  exp: number;
}

const userProtectedRoutes = ['/cart', '/profile'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. Chạy i18n middleware trước để xử lý chuyển hướng ngôn ngữ
  const response = intlMiddleware(request);

  // 3. Logic lấy Token
  const token = (await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })) as JWT | null;

  // Helper: Kiểm tra đường dẫn mà không quan tâm đến locale
  // Ví dụ: /vi/admin -> /admin | /en/cart -> /cart
  const pathnameWithoutLocale = pathname.replace(new RegExp(`^/(${locales.join('|')})`), '') || '/';

  // --- TÌNH HUỐNG: ADMIN TRUY CẬP TRANG CHỦ ---
  if (pathnameWithoutLocale === '/' && token?.accessToken) {
    try {
      const decoded = jwtDecode<DecodedToken>(token.accessToken as string);
      if (decoded.roles?.includes('ADMIN')) {
        return NextResponse.redirect(new URL(`/${defaultLocale}/admin`, request.url));
      }
    } catch (e) {
      console.error("Lỗi decode tại trang chủ:", e);
    }
  }

  // --- TÌNH HUỐNG 1: XỬ LÝ ADMIN ROUTE ---
  if (pathnameWithoutLocale.startsWith('/admin')) {
    if (!token?.accessToken) {
      const loginUrl = new URL(`/${defaultLocale}/login`, request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token.accessToken);
      const isTokenExpired = Date.now() >= decoded.exp * 1000;

      if (isTokenExpired) {
        const res = NextResponse.redirect(new URL(`/${defaultLocale}/login`, request.url));
        res.cookies.delete('accessToken');
        return res;
      }

      if (!decoded.roles?.includes('ADMIN')) {
        return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
      }
    } catch (error) {
      const res = NextResponse.redirect(new URL(`/${defaultLocale}/login`, request.url));
      res.cookies.delete('accessToken');
      return res;
    }
  }

  // --- TÌNH HUỐNG 2: XỬ LÝ USER PROTECTED ROUTE ---
  const isUserRoute = userProtectedRoutes.some(route => pathnameWithoutLocale.startsWith(route));
  
  if (isUserRoute) {
    if (!token || token.error === "RefreshAccessTokenError") {
      const loginUrl = new URL(`/${defaultLocale}/login`, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Nếu mọi thứ ok, trả về response của i18n (để giữ được locale trong URL)
  return response;
}

// 4. CẬP NHẬT MATCHER (Quan trọng!)
export const config = {
  // Matcher phải bao gồm cả các prefix ngôn ngữ
  matcher: [
    // Khớp với trang chủ
    '/', 
    // Khớp với tất cả các đường dẫn bắt đầu bằng locale
    '/(vi|en|ja)/:path*',
    // Vẫn giữ các route cũ để middleware có thể bắt được trước khi redirect
    '/admin/:path*',
    '/cart/:path*',
    '/profile/:path*'
  ],
};