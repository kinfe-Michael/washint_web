import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from 'js-cookie';
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
  baseURL: 'http://localhost:8000/api/'
})
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token')
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }
)
