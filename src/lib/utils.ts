import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function capitalizeFirstLetter(str:string) {
  if (typeof str !== 'string' || str.length === 0) {
    return ""; 
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}