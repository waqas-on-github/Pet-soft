"use server";

import { validatePetData } from "./helpers";
import { revalidatePath } from "next/cache";
import { dbResponceType, petType } from "@/types/petTypes";
import { Pet, Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { checkAuth } from "@/utils/server_utils";

export const addPet = async (data: Omit<Omit<petType, "userId">, "id">) => {
  // checking user is authenticated
  const { user } = await checkAuth();
  if (!user || !user.id) {
    throw new Error("User is not authenticated");
  }

  // validating data
  let petdata = validatePetData(data);

  // adding user id into petdata

  if (user?.id !== undefined) {
    petdata = {
      ...petdata,
      userId: user.id,
    };
  }

  // inserting data into db
  const response = await insertDataToDb(petdata);

  // checking errors
  if ("message" in response) {
    throw new Error(response.message);
  }

  revalidatePath("/private/dashboard", "page");
  return response;
};

// inserting pet data into db
export const insertDataToDb = async (
  data: Omit<petType, "id">
): Promise<Pet | dbResponceType> => {
  let response;
  try {
    if (data && data.userId !== undefined) {
      response = await prisma.pet.create({
        data: { ...data, userId: data.userId },
      });
    }
    if (!response) return { message: "failed to add pet", error: "" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "pet already exists", error: error };
      }
    }
    return { message: "failed to add pet", error: error };
  }
  return response;
};
