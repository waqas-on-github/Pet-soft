import "server-only";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { petType } from "@/types/petTypes";

// check server side auth
export async function CheckAuth() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return session;
}

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

export const getPets = async (id: string | undefined): Promise<petType[]> => {
  try {
    let pets = await prisma.pet.findMany({
      where: { userId: id },
    });
    if (!pets) {
      throw new Error("failed to find pets ");
    }
    return pets;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getUser = async (email: string | null | undefined) => {
  if (email) {
    try {
      let user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) throw new Error("failed to find user");
      return user;
    } catch (error) {
      throw new Error("failed to find user");
    }
  }
};

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
