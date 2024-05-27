import { userSchema, petFormSchem } from "@/lib/schemas";

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
  const isvalidData = userSchema.safeParse(data);
  if (!isvalidData || isvalidData.error || !isvalidData.success) {
    throw new Error("user validation failed");
  }

  return isvalidData.data;
}
