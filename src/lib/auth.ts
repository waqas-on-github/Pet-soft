import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";

// Your own logic for dealing with plaintext password strings; be careful!
export const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // will run on every login attempt
        // check if credentials exists and have value\

        const { email, password } = credentials;
        let user;
        // qeuering user form db by email
        try {
          user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
        } catch (error) {
          console.log(error);
          console.log("prisma error ");
        }
        // throwing error if user record not found in db
        if (!user) {
          console.log("no user found");
          return null;
        }
        // if we reached here suer we have user object let check password also
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user?.hashedPassword
        );
        if (!isPasswordCorrect) {
          console.log("invalid crediantial");
          return null;
        }

        return user;

        // comparing hashed password
      },
    }),
  ],

  callbacks: {
    authorized: ({ request, auth }) => {
      // will run on every request
      console.log(auth);
      const isLoggedIn = Boolean(auth?.user);

      const isTryingToAccessAppDashboard =
        request.nextUrl.pathname.includes("/private");
      //   if (!isLoggedIn && isTryingToAccessAppDashboard) {
      //     return false;
      //   }

      //   if (isLoggedIn && isTryingToAccessAppDashboard) {
      //     return true;
      //   }

      //   if (!isLoggedIn && !isTryingToAccessAppDashboard) {
      //     return true;
      //   }
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
