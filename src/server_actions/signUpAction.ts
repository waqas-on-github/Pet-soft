"use server";
import { authType } from "@/lib/schemas";
import { validateUserData } from "./helpers";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { login } from "./userActions";
import { Prisma } from "@prisma/client";
import { sleep } from "@/lib/utils";
import { checkUserExists } from "@/utils/server_utils";

export async function signup(authData: authType) {
  await sleep(3000);
  // validate data
  const validatedUserData = validateUserData(authData);
  // sanitize data
  // check email if it already exists
  await checkUserExists(validatedUserData.email);

  // after validating hash password
  const hashedPassword = await bcrypt.hash(
    validatedUserData.hashedPassword,
    10
  );

  validatedUserData.hashedPassword = hashedPassword;

  // insert data in to db

  let dbInsertResult;
  try {
    dbInsertResult = await prisma.user.create({
      data: {
        ...validatedUserData,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("user already exists");
      }
    }
  }

  await login(authData);
}
