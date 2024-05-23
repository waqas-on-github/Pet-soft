import { authType } from "@/lib/schemas";
import { checkUserExists, validateUserData } from "./helpers";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { login } from "./userActions";

export async function signup(authData: authType) {
  // validate data
  const validatedUserData = validateUserData(authData);
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
    console.log(error);
  }

  await login(authData);
}
