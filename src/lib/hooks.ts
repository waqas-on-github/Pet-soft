import { petContext } from "@/context/pet-context-provider";
import { searchContext } from "@/context/search-context_prvider";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(petContext);
  if (!context) {
    throw new Error("usepetcontext must be inide context provider");
  }

  return context;
}

export function usePetSearchContext() {
  const context = useContext(searchContext);
  if (!context) {
    throw new Error("search context must be inide context provider");
  }

  return context;
}