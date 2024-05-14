type petType = {
  id: string;
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

type childernType = {
  children?: React.ReactNode;
};

type petvalueType = {
  pets: petType[];
  selectedPetId: string | null;
  handlePetChange: (id: string) => void;
  handleAddNewPet: (newPet: Omit<petType, "id">) => void;
  handleEditNewPet: (newId: string, newPetData: Omit<petType, "id">) => void;
  selectedPet: petType | undefined;
  totalPets: number;
};

type petButtonProps = {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
  onClk?: () => void;
};

type searchConextType = {
  children: React.ReactNode;
  searchQuery: string;
  handleSrachState: (text: string) => void;
};

type PetFormProps = {
  actionType: "add" | "edit";
  checkFormOpen: (formResponce: boolean) => void;
};

type dbResponceType = {
  message: string;
};