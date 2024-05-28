"use server";
import prisma from "@/lib/db";
import { validatePetData } from "./helpers";
import { revalidatePath } from "next/cache";
import { checkAuth } from "@/utils/server_utils";
import { petType } from "@/types/petTypes";

export const editPet = async (data: petType) => {
  // // checking use auth
  const { user } = await checkAuth();
  // // checking petid is present or not
  if (!data.id) throw new Error("no pet id provided");

  // //validating data
  const petdata = validatePetData(data);

  // // updating pet data
  let updatedPet;
  try {
    updatedPet = prisma.pet.update({
      where: { id: data.id, userId: user.id },
      data: { ...petdata },
    });
  } catch (error) {
    console.error(error);
    throw new Error("failed to update pet ");
  }

  revalidatePath("/private/dashboard", "page");
  return updatedPet;
};
