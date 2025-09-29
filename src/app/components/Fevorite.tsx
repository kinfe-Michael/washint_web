"use client"

import { Button } from "@/components/ui/button";
import { addSongToFavorites } from "@/lib/helperfunc";
import { useState } from "react";
import { HiHeart } from "react-icons/hi";

function Fevorite({songId}:{songId:string}) {
    const [fevorite,setFevorite]=useState(false)
    const handleFavoriteClick = async () => {
   

    try {
      const newFavorite = await addSongToFavorites(songId);
      console.log('Song added to favorites:', newFavorite);
      setFevorite(true)
      
    } catch (error) {
      console.error('Failed to add song to favorites:', error);
    }
  };
  return (
    <Button className="w-6" onClick={handleFavoriteClick}>
        {fevorite ? <HiHeart className="text-red-600"/>
         : <HiHeart className="text-gray-200"/>}
    </Button>
  )
}

export default Fevorite