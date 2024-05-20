import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
  providers: [
    credentials({
      //runs on login
      async authorize(credentials) {
        // console.log(credentials);
        console.log("crediantials in provider ....................");

        const { email, hashedPassword } = credentials;
        let user;
        let isValidepassword;
        // check email
        if (typeof email === "string") {
          user = await prisma.user.findUnique({
            where: { email: email },
          });
        }

        if (!user) {
          console.log(" failed to get user ------- error form provider");
        }

        // // check password
        if (user) {
          isValidepassword = await bcrypt.compare(
            hashedPassword,
            user?.hashedPassword
          );
        }
        console.log(isValidepassword);

        // console.log(user);

        if (!isValidepassword) {
          console.log("invalid  credintials  -------error from provider  ");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      // run on every request

      const isValidUser = auth?.user;

      const isTryingToAccessApp = request.nextUrl.pathname.includes("/private");

      if (!isValidUser && isTryingToAccessApp) {
        return false;
      }
      if (isValidUser && isTryingToAccessApp) {
        return true;
      }

      if (isValidUser && !isTryingToAccessApp) {
        // const url = new URL("/private/dashboard", request.nextUrl);
        // return Response.redirect(url.href);
        return true;
      }
      if (!isValidUser && !isTryingToAccessApp) {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
