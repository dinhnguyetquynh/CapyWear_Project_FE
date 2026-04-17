import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Trả về trong `useSession`, `getSession` và logic trong `session` callback
   */
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    error?: "RefreshAccessTokenError";
    roles?: string[];
    username?: string;
    user: {
      id?: string;
    } & DefaultSession["user"]; 
  }

  /**
   * Cấu trúc User trả về từ hàm authorize()
   */
  interface User {
    accessToken?: string;
    refreshToken?: string;
    expiresIn: number;
  }
}

declare module "next-auth/jwt" {
  /** Trả về trong `jwt` callback */
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number; 
    error?: "RefreshAccessTokenError";
    role?:string;
    username?: string;
  }
}