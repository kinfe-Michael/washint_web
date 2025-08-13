"use server"
import {cookies} from 'next/headers';
import { api } from './utils';

export const handleLogin = async (username:string, password:string) => {
    
  try {
    const response = await api.post('token/', {
      username,
      password,
    });

    const { access, refresh } = response.data;
    
 
(await cookies()).set('access_token', access, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Set to true for production
  sameSite: 'strict',
  path: '/',
  maxAge: 60 * 15, // Expires in 15 minutes
});

(await cookies()).set('refresh_token', refresh, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Set to true for production
  sameSite: 'strict',
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
});

 
    return {isLogedIn:true}
  } catch (error) {
    return {isLogedIn:false}
    
    
  }
  
};