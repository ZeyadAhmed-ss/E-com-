import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWTPayload } from "../app/interface/next-auth"; 

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/signin" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/api/v1/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) return null;

        const payload = await response.json();

        // ✅ استخدم الـ interface بدل any
        const decoded = jwtDecode<JWTPayload>(payload.token);

        return {
          id: decoded.id || decoded.sub || "",
          name: decoded.name || payload.user?.name || "",
          email: decoded.email || payload.user?.email || "",
          role: decoded.role || payload.user?.role || "user",
          token: payload.token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        token: token.token as string,
      };
      return session;
    },
  },

  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
