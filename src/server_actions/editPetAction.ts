"use server";
import prisma from "@/lib/db";
import { validatePetData } from "./helpers";
import { revalidatePath } from "next/cache";

export const editPet = async (petId: string, data: unknown) => {
  // checking use auth

  // checking petid is present or not
  if (!petId) throw new Error("no pet id provided");

  //validating data
  const petdata = validatePetData(data);

  // updating pet data
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
