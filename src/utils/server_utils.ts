import "server-only";
import prisma from "@/lib/db";
import { petType } from "@/types/petTypes";
import { sleep } from "@/lib/utils";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, Session } from "@prisma/client";

// get single pet
export async function getSinglePet(petId: string) {
  let pet;
  try {
    pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    if (!pet) throw new Error("no pe t found");
    return pet;
  } catch (error) {
    console.log(error);
    throw new Error("no pet found");
  }
}

export const getPets = async (): Promise<petType[]> => {
  await sleep(3000);
  try {
    let pets = await prisma.pet.findMany({});
    if (!pets) {
      throw new Error("failed to find pets ");
    }
    return pets;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const validateSession = async (): Promise<{
  user: Pick<User, "id">;
  session: Session;
}> => {
  const { user, session } = await validateRequest();
  if (!session || !user) {
    return redirect("/login");
  }
  return {
    user,
    session,
  };
};