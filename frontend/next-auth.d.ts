// types/next-auth.d.ts
import { User as NextAuthUser } from "next-auth";
import { Session as NextAuthSession } from "next-auth";

declare module "next-auth" {
  interface User extends NextAuthUser {
    userDetails: any; // You can specify the exact type if you know it, e.g., `UserDetailsType`
  }

  interface Session {
    user: {
      id: string;
      email: string;
      userDetails: any; // Same here, replace `any` with the correct type if known
    };
  }
}
