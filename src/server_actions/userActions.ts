"use server";
import { validateUserData } from "./helpers";
import { authType } from "@/lib/schemas";
import { signIn, signOut } from "@/lib/auth";

//-----------user actions -----
export async function login(authData: authType) {
  // validate data
  const validatedUserData = validateUserData(authData);
  await signIn("credentials", validatedUserData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}
