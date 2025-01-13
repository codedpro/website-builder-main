import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/lib/auth/authService";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }

        const { email, password } = credentials;

        try {
          const user = await authenticateUser(email, password);

          if (!user) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "Authentication failed");
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "default_secret",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.phone_number = user.phone_number;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.first_name = token.first_name as string;
        session.user.last_name = token.last_name as string;
        session.user.phone_number = token.phone_number as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
};
