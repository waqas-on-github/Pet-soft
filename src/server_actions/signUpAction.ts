"use server";
import bcrypt from "bcryptjs";
import { userType } from "@/lib/schemas";
import { validateUserData } from "./helpers";
import prisma from "@/lib/db";
import { lucia } from "@/lib/auth";
import { Session, User } from "@prisma/client";
import { cookies } from "next/headers";
import { SuccessResponse } from "@/types/petTypes";

export const signUpAction = async (
  userCredentials: userType
): Promise<SuccessResponse<{ user: User } | { session: Session }>> => {
  // Validate user input
  const validatedUserInput = validateUserData(userCredentials);

  // Hash the password
  validatedUserInput.hashedpassword = await bcrypt.hash(
    userCredentials.hashedpassword,
    10
  );

  // Check if the username already exists
  const userCheck = await checkUserExistsForSignUp(validatedUserInput.username);
  console.log("reached heer ");
  // console.log(userCheck);

  if (userCheck?.success) {
    throw new Error("User already exists");
  }

  // // Insert user into the database
  const dbInsertResponse = await addUserToDb(validatedUserInput);

  if (!dbInsertResponse.success) {
    throw new Error("failed to create account");
  }

  // Create session for the new user

  const sessionResponse = await createSessionForUser(
    dbInsertResponse.data.user
  );

  return sessionResponse;
};

// Function to add user to the database
const addUserToDb = async (
  validatedUserInput: userType
): Promise<SuccessResponse<{ user: User }>> => {
  try {
    const user = await prisma.user.create({
      data: validatedUserInput,
    });
    if (!user) throw new Error("failed to add user in db ");
    return {
      success: true,
      data: { user },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
// Function to create a session for the user
export const createSessionForUser = async (
  user: User
): Promise<SuccessResponse<{ session: Session }>> => {
  try {
    const session = await lucia.createSession(user.id, {});

    if (!session) {
      throw new Error("failed to create session");
    }

    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: { session },
    };
  } catch (error: any) {
    throw new Error(error.message, error.stack);
  }
};

export const checkUserExistsForSignUp = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  return {
    success: true,
    data: { user },
  };
};
