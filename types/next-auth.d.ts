import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      phone_number: string;
    };
  }

  interface JWT {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  }
}
