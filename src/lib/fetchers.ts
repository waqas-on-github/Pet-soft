"use server";

import prisma from "./db";

export const getPets = async (): Promise<petType[]> => {
  try {
    let pets = await prisma.pet.findMany({});
    return pets;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
