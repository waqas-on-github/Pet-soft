import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./db";
import { cache } from "react";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);
// initilize new lucia instance
export const lucia = new Lucia(adapter, {
  // cookies opetion confugrable
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// !IMPORTENT

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

export const validateRequest = cache(async () => {
  // get session id from cookies
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId)
    return {
      user: null,
      session: null,
    };

  // get user and session from db tables and validate it
  const { user, session } = await lucia.validateSession(sessionId);
  console.log(user);

  //! purpose of blew code is unknown
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!session) {
      const blankSessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes
      );
    }
  } catch (error) {}

  return {
    user,
    session,
  };
});

