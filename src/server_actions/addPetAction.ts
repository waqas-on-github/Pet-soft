"use server";

import { petTypetwo } from "@/lib/schemas";
import { validatePetData } from "./helpers";
import { revalidatePath } from "next/cache";
import { dbResponceType, petType } from "@/types/petTypes";
import { Pet, Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { CheckAuth } from "../utils/server_utils";

export const addPet = async (data: petTypetwo) => {
  // checking user is authancated ?
  const session = await CheckAuth();

  // //validating data
  let petdata = validatePetData(data);
  // adding user id into petdata
  petdata = {
    ...petdata,
    userId: session?.user?.id as string,
  };

  // inserting data into db
  const responce = await insertDataToDb(petdata);

  //checking errors
  if ("message" in responce) {
    throw new Error(responce.message);
  }

  revalidatePath("/private/dashboard", "page");
  return responce;
};

// inserting  pet data into db
export const insertDataToDb = async (
  data: Omit<petType, "id">
): Promise<Pet | dbResponceType> => {
  let responce;
  try {
    responce = await prisma.pet.create({
      data: { ...data },
    });
    if (!responce) return { message: "failed to add pet", error: "" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "pet alredy exists", error: error };
      }
    }
    return { message: "failed to add pet", error: error };
  }

  return responce;
};
