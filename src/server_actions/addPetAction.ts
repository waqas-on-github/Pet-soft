"use server";

import { petTypetwo } from "@/lib/schemas";
import { validatePetData } from "./helpers";
import { revalidatePath } from "next/cache";
import { dbResponceType, petType } from "@/types/petTypes";
import { Pet } from "@prisma/client";
import prisma from "@/lib/db";
import { CheckAuth } from "./helpers_for_server";

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
    return { message: "failed to add pet", error: error };
  }

  return responce;
};
