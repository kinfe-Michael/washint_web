 'use server'
import { api } from "@/lib/utils"
 import { cookies } from "next/headers"
export async function getUserProfile(user:string,type:string){
const cookieStore = await cookies()
 

   if(type === 'artist'){
    const response = await api.get(`/public-artists/${user}`,{
      withCredentials:false,
    })
    return {profile:response.data.managed_by.profile}
  }

  if(user === 'my-profile'){
  const response = await api.get("/profiles/my-profile/",{
    withCredentials:true,
    headers:{
      Cookie:cookieStore.toString()
    }
  })
  return response.data
  }
  else {
  const response = await api.get(`/profiles/user_profile/?username=${user}`,{
    withCredentials:true,
    headers:{
      Cookie:cookieStore.toString()
    }
  })
  return response.data
  }
}


 