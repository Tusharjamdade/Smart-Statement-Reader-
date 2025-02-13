
import NextAuth from "next-auth";
import { NEXT_AUTH_HANDLER } from "../../../../../auth";

const handler = NextAuth(NEXT_AUTH_HANDLER);

export { handler as GET, handler as POST };