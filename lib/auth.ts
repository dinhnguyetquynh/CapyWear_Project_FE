import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// Hàm xử lý việc gọi API Refresh Token
interface DecodedToken {
  roles: string[];
  exp: number;
  sub:string;
}
async function refreshAccessToken(token: JWT): Promise<JWT>{
  try {
    const baseUrl = process.env.BACKEND_API_URL;
    if (!baseUrl) {
      throw new Error("BACKEND_API_URL environment variable is not set");
    }
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
  }
    }),
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
  CredentialsProvider({
    id: "otp-verify", 
    name: "OTP Verification",
    credentials: {
      otp: { type: "text" },
      userId: { type: "text" }
    },
    async authorize(credentials) {
      const res = await fetch(`${process.env.BACKEND_API_URL}/api/public/verify-otp?otp=${credentials?.otp}&userId=${credentials?.userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok && data.accessToken) {
        return data; 
      }

      return null; 
  }
})
  ],
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      console.log("--- JWT Callback ---");
      if (account && user) {
        console.log("Dữ liệu từ Backend:", user);
        let backendResponse;

        if (account.provider === "google") {
          const res = await fetch(`${process.env.BACKEND_API_URL}/api/public/social-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: account.id_token }), 
          });
          backendResponse = await res.json();
        } 
       
        else if (account.provider === "credentials"|| account.provider === "otp-verify") {
          backendResponse = user; 
        }

       
        if (backendResponse && backendResponse.accessToken) {
          const decoded = jwtDecode<DecodedToken>(backendResponse.accessToken);
          return {
            ...token,//This property is saved on cookie to use for request afer. 
            accessToken: backendResponse.accessToken,
            refreshToken: backendResponse.refreshToken,
            accessTokenExpires: Date.now() + backendResponse.expiresIn * 1000,
            roles: decoded.roles,
            username: decoded.sub,
          };
        }
      }     
      if (token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      console.log("--- Session Callback ---");
      console.log("Token hiện có:", token); 
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.roles = token.roles as string[];
      session.error = token.error;
      session.username=token.username;
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

