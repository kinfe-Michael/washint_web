import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from 'axios'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function capitalizeFirstLetter(str:string) {
  if (typeof str !== 'string' || str.length === 0) {
    return ""; 
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials:true,
    headers: {
    'Content-Type': 'application/json',
  },
})

