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
  selectedPet: petType | undefined;
  totalPets: number;
};

type petButtonProps = {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
};

type searchConextType = {
  children: React.ReactNode;
  searchQuery: string;
  handleSrachState: (text: string) => void;
};
