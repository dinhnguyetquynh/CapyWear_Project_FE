import { authOptions } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };