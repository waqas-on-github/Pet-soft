"use server";
import bcrypt from "bcryptjs";
import { userType } from "@/lib/schemas";
import { validateUserData } from "./helpers";
import prisma from "@/lib/db";
import { lucia } from "@/lib/auth";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import {
  SessionCheckResponse,
  UserCheckResponse,
  checkUserExists,
} from "./loginAction";

export const signUpAction = async (
  userCredentials: userType
): Promise<UserCheckResponse | SessionCheckResponse> => {
  // Validate user input
  const validatedUserInput = validateUserData(userCredentials);

  // Hash the password
  validatedUserInput.hashedpassword = await bcrypt.hash(
    userCredentials.hashedpassword,
    10
  );

  // Check if the username already exists
  const userCheck = await checkUserExists(validatedUserInput.username);

  if (userCheck.success) {
    return {
      success: false,
      error: { message: "User already exists" },
    };
  }

  // Insert user into the database
  const dbInsertResponse = await addUserToDb(validatedUserInput);

  if (!dbInsertResponse.success) {
    return dbInsertResponse;
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
): Promise<UserCheckResponse> => {
  try {
    const user = await prisma.user.create({
      data: validatedUserInput,
    });

    return {
      success: true,
      data: { user },
    };
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};

// Function to create a session for the user
export const createSessionForUser = async (
  user: User
): Promise<SessionCheckResponse> => {
  try {
    const session = await lucia.createSession(user.id, {});

    if (!session) {
      return {
        success: false,
        error: { message: "faile to create session" },
      };
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
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
