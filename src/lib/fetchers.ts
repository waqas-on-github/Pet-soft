"use server";

export const getPets = async () => {
  const responce = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!responce.ok) {
    throw new Error("failed to fetch pets");
  }
  const pets: petType[] = await responce.json();

  return pets;
};
