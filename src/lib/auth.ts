import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./db";

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


