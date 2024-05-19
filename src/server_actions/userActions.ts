"use server";
import { signIn } from "@/lib/auth";
import { authType } from "@/lib/schemas";
import { validateUserData } from "./helpers";

export const logIn = async (authData: authType) => {
  const validUserData = validateUserData(authData);

  const result = await signIn("credentials", validUserData);

  console.log(result);
};
