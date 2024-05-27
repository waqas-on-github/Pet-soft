"use server";
import bcrypt from "bcryptjs";
import { userType } from "@/lib/schemas";
import { validateUserData } from "./helpers";
import prisma from "@/lib/db";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { Session, User } from "@prisma/client";

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
  };
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export type UserCheckResponse = ErrorResponse | SuccessResponse<{ user: User }>;
export type SessionCheckResponse =
  | ErrorResponse
  | SuccessResponse<{ session: Session }>;

// Function to log in a user
export const logInAction = async (userCredentials: userType) => {
  // Validate inputs
  const validatedUserInput = validateUserData(userCredentials);

  // Check if the user exists
  const userCheck = await checkUserExists(validatedUserInput.username);

  if (!userCheck.success) {
    return userCheck;
  }

  const user = userCheck.data.user;

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(
    validatedUserInput.hashedpassword,
    user.hashedpassword
  );

  if (!isPasswordValid) {
    return {
      success: false,
      error: {
        message: "Invalid credentials",
      },
    };
  }

  // const createdSession = await createSessionForUser(user);
  // console.log(createdSession);

  // Check if session exists
  const sessionCheck = await getSessionFromDb(user.id);

  if (!sessionCheck.success) {
    return sessionCheck;
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
): Promise<UserCheckResponse> => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return {
        success: false,
        error: {
          message: "User does not exist",
        },
      };
    }

    return {
      success: true,
      data: { user },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }
};

// Function to get session from the database
export const getSessionFromDb = async (
  userId: string
): Promise<SessionCheckResponse> => {
  try {
    const session = await prisma.session.findFirst({
      where: { userId },
    });

    if (!session) {
      return {
        success: false,
        error: {
          message: "Session does not exist",
        },
      };
    }

    return {
      success: true,
      data: { session },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }
};
