"use client"
import PageWraper from "@/app/components/PageWraper"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/utils"
import { useEffect, useState } from "react"

function page() {
    const [isArtist,setIsArtist] = useState(false)
useEffect(()=>{
    api.get('/artists/').then(r => {
        if(r.data[0]){
            setIsArtist(true)
        }
        else setIsArtist(false)
    }).catch(e => console.log(e))
   
},[])
  return (
    <PageWraper>
  {!isArtist && <Button
  onClick={()=>{
    api.post('/artists/')
    .then(r=>{
        console.log(r)
    })
    .catch(e=> console.log(e))
  }}
  >Become An Artist</Button>}
    </PageWraper>
  )
}

export default page