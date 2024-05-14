import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export async function sleep(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time));
}