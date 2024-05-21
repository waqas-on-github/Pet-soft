"use server";
import prisma from "./db";

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
