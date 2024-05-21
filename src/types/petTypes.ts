import { authType } from "@/lib/schemas";

export type petType = {
  id: string;
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

export type childernType = {
  children?: React.ReactNode;
};

export type petvalueType = {
  pets: petType[];
  selectedPetId: string | null;
  handlePetChange: (id: string) => void;
  handleAddNewPet: (newPet: Omit<petType, "id">) => void;
  handleEditNewPet: (newId: string, newPetData: Omit<petType, "id">) => void;
  selectedPet: petType | undefined;
  totalPets: number;
};

export type petButtonProps = {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
  onClk?: () => void;
  disabled?: boolean;
};

export type searchConextType = {
  children: React.ReactNode;
  searchQuery: string;
  handleSrachState: (text: string) => void;
};

export type PetFormProps = {
  actionType: "add" | "edit";
  checkFormOpen: (formResponce: boolean) => void;
};

export type dbResponceType = {
  message: string;
  error: unknown;
};

export type submitFormType = {
  formData: FormData;
  actionType: "add" | "edit";
  checkFormOpen: (formResponce: boolean) => void;
  selectedPet: petType | undefined;
};

export type authProviderType = {
  children: React.ReactNode;
  user: authType | undefined;
};
