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
        if (user && typeof hashedPassword === "string") {
          isValidepassword = await bcrypt.compare(
            hashedPassword,
            user?.hashedPassword
          );
        }

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
        const url = new URL("/private/dashboard", request.nextUrl);
        return Response.redirect(url.href);
      }
      if (!isValidUser && !isTryingToAccessApp) {
        return true;
      }

      return false;
    },
    // run on jwt creation
    jwt: ({ token, user }) => {
      // console.log("run on ever jwt creation ");

      if (user && user.id) {
        // on sign in
        // console.log("runs on singIn/ logIn ");
        token.userId = user.id;
      }
      return token;
    },
    // runs on client side session
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token?.userId;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);
