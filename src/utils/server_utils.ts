import "server-only";
import prisma from "@/lib/db";
import { petType } from "@/types/petTypes";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, Session, Pet } from "@prisma/client";
import { sleep } from "@/lib/utils";

// get single pet
export async function getSinglePet(petId: string): Promise<Pet> {
  let pet;
  try {
    pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    if (!pet) throw new Error("no pet found");
    return pet;
  } catch (error) {
    console.log(error);
    throw new Error("no pet found");
  }
}

export const getPets = async (id: string): Promise<petType[]> => {
  await sleep(3000);
  try {
    let pets = await prisma.pet.findMany({
      where: {
        userId: id,
      },
    });
    if (!pets) {
      throw new Error("failed to find pets");
    }
    return pets;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getSingleUser = async (userId: string) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("user not found");
  } catch (error: any) {
    throw new Error(error.message);
  }

  return user;
};

export const checkAuth = async (): Promise<{
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