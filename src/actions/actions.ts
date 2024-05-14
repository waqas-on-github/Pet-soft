"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { collectFormData, insertDataToDb } from "./helpers";
import { sleep } from "@/lib/utils";

export const addPet = async (formData) => {
  await sleep(2000);
  // collecting data form form
  const data: Omit<petType, "id"> = collectFormData(formData);
  //validating data

  // senitizing data

  //creating a new pet
  const responce = await insertDataToDb(data);

  revalidatePath("/private/dashboard", "page");

  return responce;
};

export const editPet = async (petId: string) => {
  try {
  } catch (error) {
    throw new Error(error);
  }
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
};
