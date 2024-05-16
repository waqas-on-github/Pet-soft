"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { collectFormData, insertDataToDb } from "./helpers";
import { petFormSchem } from "@/lib/schemas";

export const addPet = async (data: FormData) => {
  await sleep(2000);
  // collecting data form form
  const petData: Omit<petType, "id"> = collectFormData(data);

  //validating data
  const isvalidPet = petFormSchem.safeParse(petData);
  if (!isvalidPet) {
    return { message: "invalid pet data ", error: isvalidPet };
  }

  //creating a new pet
  const responce = await insertDataToDb(petData);
  if ("message" in responce) {
    console.log(responce);

    throw new Error(responce.message);
  }
  revalidatePath("/private/dashboard", "page");

  return responce;
};

export const editPet = async (petId: string, formData: FormData) => {
  if (!petId) throw new Error("no pet id provided");
  const data: Omit<petType, "id"> = collectFormData(formData);

  let updatedPet;
  try {
    updatedPet = prisma.pet.update({
      where: { id: petId },
      data: { ...data },
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
  await sleep(2000);
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

const petData = {
  data: {
    success: true,
    data: {
      name: "adsad",
      ownerName: "asdasdsaa",
      imageUrl:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=100&w=1970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      age: 1,
      notes: "asda",
    },
    name: "hola",
  },
};
