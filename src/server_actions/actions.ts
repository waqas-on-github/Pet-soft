"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  checkUserExists,
  insertDataToDb,
  validatePetData,
  validateUserData,
} from "./helpers";
import { authType, petTypetwo } from "@/lib/schemas";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const addPet = async (data: petTypetwo) => {
  //validating data
  const petdata = validatePetData(data);
  //creating a new pet
  const responce = await insertDataToDb(petdata);

  if ("message" in responce) {
    throw new Error(responce.message);
  }

  revalidatePath("/private/dashboard", "page");
  return responce;
};

export const editPet = async (petId: string, data: unknown) => {
  if (!petId) throw new Error("no pet id provided");

  const petdata = validatePetData(data);

  let updatedPet;
  try {
    updatedPet = prisma.pet.update({
      where: { id: petId },
      data: { ...petdata },
    });
  } catch (error) {
    console.error(error);
    throw new Error("failed to update pet ");
  }

  revalidatePath("/private/dashboard", "page");
  return updatedPet;
};

// delete pet
export const deletePet = async (petId: string) => {
  // checking pet id exists or not
  if (!petId) throw new Error("no pet id provided");

  let deletedPet;
  // trying to delete pet
  try {
    deletedPet = await prisma.pet.delete({
      where: {
        id: petId,
      },
    });

    if (!deletedPet) throw new Error("failed to delete pet");
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }

  revalidatePath("/private/dashboard", "page");
  return deletedPet;
};

//-----------user actions -----
export async function login(authData: authType) {
  // validate data
  const validatedUserData = validateUserData(authData);
  await signIn("credentials", validatedUserData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

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