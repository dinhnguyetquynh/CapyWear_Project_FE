import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export interface AccountCreateReq{
    email:string;
    password: string;
}

export interface UserRes{
    id: number;
    email:string;
    created_at:string;
    status:string;
    imgUrl:string;
}
export interface AuthResponse{
    accessToken:string;
    refreshToken:string;
    expiresIn:number;
}
export const registerAccount = async (data: AccountCreateReq): Promise<UserRes> => {
    try {
        const res = await fetch(`https://capywear-project.onrender.com/api/public/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || "Register failed");
        }

        return result;

    } catch (error: any) {
        throw error;
    }
};
export const verifyOtp = async(otp:string,userId:number):Promise<AuthResponse>=>{
   try {
    const res = await fetch(`https://capywear-project.onrender.com/api/public/verify-otp?otp=${otp}&userId=${userId}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
    });
    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.message || 'Xác thực OTP thất bại');
    }

    return await res.json();
  } catch (error) {
    console.error("Lỗi verifyOtp:", error);
    throw error;
  }
}

// export const getAuthSession = async () => {
//   return await getServerSession(authOptions);
// };
// export const getAccessToken = async () => {
//   const session = await getAuthSession();
//   console.log("TOKEN GET FROM SERVER:"+session?.accessToken); 
//   return session?.accessToken; 
// };

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