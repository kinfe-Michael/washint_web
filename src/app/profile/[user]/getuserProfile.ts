 'use server'
import axios from "axios"
 import { cookies } from "next/headers"
export async function getUserProfile(user:string){
const cookieStore = await cookies()
 
  console.log(user)

  if(user === 'my-profile'){
  const response = await axios.get("http://localhost:8000/api/profiles/my-profile/",{
    withCredentials:true,
    headers:{
      Cookie:cookieStore.toString()
    }
  })
  return {profile:response.data}
  }
  else {
  const response = await axios.get(`http://localhost:8000/api/profiles/user_profile/?username=${user}`,{
    withCredentials:true,
    headers:{
      Cookie:cookieStore.toString()
    }
  })
  return response.data
  }
}


 