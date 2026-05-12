import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const getAccessToken = async (req?: NextRequest) => {
  let requestForToken: any;

  if (req) {
    // Nếu dùng trong Middleware hoặc API Route (đã có sẵn req)
    requestForToken = req;
  } else {
    // Nếu dùng trong Server Component (lấy từ cookies() của Next.js)
    const cookieStore = cookies();
    requestForToken = {
      cookies: Object.fromEntries(
        (await cookieStore).getAll().map((c) => [c.name, c.value])
      ),
    };
  }

  const token = await getToken({
    req: requestForToken,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token?.accessToken as string | undefined;
};