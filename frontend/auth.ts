// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const NEXT_AUTH_HANDLER: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "Email" },
//         password: { label: "Password", type: "password", placeholder: "Password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) return null;

//         // Find user in the database
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null; // User not found

//         // Compare passwords (⚠️ Insecure if stored in plain text)
//         if (user.password !== credentials.password) {
//           return null; // Incorrect password
//         }

//         // Return user data (excluding sensitive fields)
//         return {
//           id: user.id, // Include the MongoDB ObjectId
//           email: user.email,
//           role: user.role, // User role ('user' or 'admin')
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/signin", // Custom sign-in page
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   jwt: {
//     maxAge: 30 * 24 * 60 * 60, // 30 days expiration
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       if (user) {
//         token.id = user.id; // Include the MongoDB ObjectId
//         token.email = user.email;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: JWT }) {
//       if (session.user) {
//         session.user.id = token.id; // Include the MongoDB ObjectId
//         session.user.email = token.email;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
// };


import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const NEXT_AUTH_HANDLER: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        role: { label: "Role", type: "text" }, // Add role field for differentiation
      },
      async authorize(credentials) {
        if (!credentials) return null;

        let user = null;

        if (credentials.role === "admin") {
          // Check Admin table
          user = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });
        } else {
          // Check User table
          user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
        }

        if (!user) return null; // User/Admin not found

        // Compare hashed passwords (Ensure passwords are stored hashed in DB)
        // const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        // if (!passwordMatch) return null; // Incorrect password

        // Return user data (excluding sensitive fields)
        return {
          id: user.id,
          email: user.email,
          role: credentials.role, // Ensure role is set correctly
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days expiration
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect users based on role
      if (url.includes("/admin")) return `${baseUrl}/`;
      return `${baseUrl}/app`;
    },
  },
};
