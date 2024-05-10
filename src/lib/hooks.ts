import { petContext } from "@/context/pet-context-provider";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(petContext);
  if (!context) {
    throw new Error("usepetcontext must be inide context provider");
  }

  return context;
}
