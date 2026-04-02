import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// Hàm xử lý việc gọi API Refresh Token
async function refreshAccessToken(token: JWT): Promise<JWT>{
  try {
    const baseUrl = process.env.BACKEND_API_URL;
    if (!baseUrl) {
      throw new Error("BACKEND_API_URL environment variable is not set");
    }

    // Sửa lại đường dẫn API cho đúng với endpoint refresh
    const response = await fetch(`${baseUrl}/api/public/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + 3600 * 1000, 
    };
  } catch (error) {
    console.error("RefreshAccessTokenError", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Backend Server",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const baseUrl = process.env.BACKEND_API_URL;
        if (!baseUrl) {
          throw new Error("BACKEND_API_URL environment variable is not set");
        }

        // Sửa lại đường dẫn API cho đúng với endpoint login
        const res = await fetch(`${baseUrl}/api/public/login`, { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        if (res.ok && user) {
          return user; 
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }):Promise<JWT>{
      // 1. Nếu là lần đầu đăng nhập
      if (user && user.accessToken) {
        const decodedToken = jwtDecode<any>(user.accessToken);
        const expiresInMilliseconds = user.expiresIn * 1000;
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + expiresInMilliseconds, 
          permissions: decodedToken.authorities || decodedToken.permissions || [],
        };
      }
      
      // 2. Nếu token chưa hết hạn, trả về token hiện tại
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
      return token;
    }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
    session.accessToken = token.accessToken ||'';
    session.refreshToken = token.refreshToken ||'';
    session.error = token.error; 
    session.permissions = token.permissions as string[];
    return session;
    },
  },
  pages: {
    signIn: "/login", 
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };