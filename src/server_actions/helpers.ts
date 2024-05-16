import prisma from "@/lib/db";
import { petFormSchem, petTypetwo } from "@/lib/schemas";
import { Pet } from "@prisma/client";

export const collectFormData = (formData: FormData) => {
  const data = {
    ownerName: formData.get("ownerName") as string,
    name: formData.get("name") as string,
    imageUrl:
      (formData.get("imageUrl") as string) ||
      ("https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=100&w=1970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" as string),
    age: +(formData.get("age") as string),
    notes: formData.get("notes") as string,
  };

  return data;
};

export const insertDataToDb = async (
  data: Omit<petType, "id">
): Promise<Pet | dbResponceType> => {
  console.log(data);

  let responce;
  try {
    responce = await prisma.pet.create({
      data: { ...data },
    });
    if (!responce) return { message: "failed to add pet", error: "" };
  } catch (error) {
    console.log(error);
    console.log(error);

    return { message: "failed to add pet", error: error };
  }

  return responce;
};

export function validatePetData(data: unknown) {
  //validating data
  const isvalidPet = petFormSchem.safeParse(data);
  if (!isvalidPet || isvalidPet.error || !isvalidPet.success) {
    throw new Error("pet validation failed");
  }

  return isvalidPet.data;
}
