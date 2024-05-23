"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CheckAuth, getSinglePet } from "./helpers_for_server";

// delete pet
export const deletePet = async (petId: string) => {
  console.log("runnign onn server");

  // check user existance
  const session = await CheckAuth();

  // checking pet id exists or not
  if (!petId) throw new Error("no pet id provided");
  // check pet existance and also ge its userId
  const pet = await getSinglePet(petId);
  //check authorization the pet user is requesting is user own this pet
  // for this we will match userId with userId in pet
  if (session.user?.id !== pet.userId) {
    throw new Error("not authorized to delete this pet");
  }

  let deletedPet;
  // trying to delete pet
  try {
    deletedPet = await prisma.pet.delete({
      where: {
        id: petId,
        userId: session.user.id,
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
