import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { getToken, JWT } from "next-auth/jwt";

// 1. Định nghĩa Interface cho JWT thủ công (Admin)
interface DecodedToken {
  sub: string;
  roles: string[];
  authorities: string[];
  exp: number;
}

// 2. Danh sách các route bảo vệ cho User (NextAuth)
const userProtectedRoutes = ['/cart', '/profile'];

export async function proxy(request: NextRequest) {
  console.log("FILE NÀY ĐANG CHẠY");
  const { pathname } = request.nextUrl;

  // --- TÌNH HUỐNG 1: XỬ LÝ ADMIN ROUTE (Dùng AccessToken trong Cookie) ---
  if (pathname.startsWith('/admin')) {
    const token = (await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })) as JWT | null;

    if (!token?.accessToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token.accessToken);
      const isTokenExpired = Date.now() >= decoded.exp * 1000;

      if (isTokenExpired) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('accessToken');
        return response;
      }

      const isAdmin = decoded.roles?.includes('ADMIN');
      if (!isAdmin) {
        console.log("ROLE "+decoded.roles+":SUB IS:"+decoded.sub);
        // Không phải admin thì đá về trang chủ
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('accessToken');
      return response;
    }
  }

  // --- TÌNH HUỐNG 2: XỬ LÝ USER ROUTE (Dùng NextAuth JWT) ---
  const isUserRoute = userProtectedRoutes.some(route => pathname.startsWith(route));
  
  if (isUserRoute) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token || token.error === "RefreshAccessTokenError") {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 3. Gộp tất cả Matcher vào đây
export const config = {
  matcher: [
    '/admin/:path*',
    '/cart/:path*',
    '/profile/:path*',
  ],
};