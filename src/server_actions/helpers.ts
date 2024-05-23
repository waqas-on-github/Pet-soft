import prisma from "@/lib/db";
import { authSchema, petFormSchem } from "@/lib/schemas";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// checking user existance in db
export async function checkUserExists(email: string) {
  let doseUserExists;
  try {
    doseUserExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (doseUserExists) {
      if ("email" in doseUserExists) {
        throw new Error("user already exists");
      }
    }
  } catch (error) {
    throw new Error("user already exists");
  }
}

//validating pet data
export function validatePetData(data: unknown) {
  const isvalidPet = petFormSchem.safeParse(data);
  if (!isvalidPet || isvalidPet.error || !isvalidPet.success) {
    throw new Error("pet validation failed");
  }

  return isvalidPet.data;
}

// validateing user data
export function validateUserData(data: unknown) {
  const isvalidData = authSchema.safeParse(data);
  if (!isvalidData || isvalidData.error || !isvalidData.success) {
    throw new Error("user validation failed");
  }

  return isvalidData.data;
}

