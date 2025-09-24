import NextAuth, { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      token: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  }
}


export interface JWTPayload {
  id?: string;
  sub?: string;
  name?: string;
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
}

