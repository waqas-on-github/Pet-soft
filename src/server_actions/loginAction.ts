"use server";
import bcrypt from "bcryptjs";
import { userType } from "@/lib/schemas";
import { validateUserData } from "./helpers";
import prisma from "@/lib/db";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { Session, User } from "@prisma/client";
import { SuccessResponse } from "@/types/petTypes";
import { createSessionForUser } from "./signUpAction";
import { sleep } from "@/lib/utils";

// Function to log in a user
export const logInAction = async (userCredentials: userType) => {
  await sleep(2000);
  // Validate inputs
  const validatedUserInput = validateUserData(userCredentials);

  // Check if the user exists
  const userCheck = await checkUserExists(validatedUserInput.username);

  if (!userCheck.success) {
    throw new Error("user not exists");
  }

  const user = userCheck.data.user;

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(
    validatedUserInput.hashedpassword,
    user.hashedpassword
  );

  if (!isPasswordValid) {
    throw new Error("invalid crediantials");
  }

  const createdSession = await createSessionForUser(user);
  // console.log(createdSession);

  // Check if session exists
  const sessionCheck = await getSessionFromDb(user.id);
  // if session not exists
  if (!sessionCheck.success) {
    throw new Error("session not exists ");
  }

  const session = sessionCheck.data.session;

  // Create session cookie and set it
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: true,
    user,
  };
};

// Function to check if a user exists
export const checkUserExists = async (
  username: string
): Promise<SuccessResponse<{ user: User }>> => {
  try {
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Function to get session from the database
export const getSessionFromDb = async (
  userId: string
): Promise<
  SuccessResponse<{
    session: Session;
  }>
> => {
  try {
    const session = await prisma.session.findFirst({
      where: { userId },
    });

    if (!session) {
      throw new Error("session not exists");
    }

    return {
      success: true,
      data: { session },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

