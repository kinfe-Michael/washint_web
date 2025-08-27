"use client"
import { cn } from "@/lib/utils";
import useWashintPlayer from "@/store/useWashintPlayer";
import Image from "next/image";
import { useState } from "react";
import NavLink from "./CustomNavLink";
import { FaPlay } from "react-icons/fa";
import { Song } from "@/lib/type";

function MusicCard({song}:{song:Song}) {
  const loadTrack = useWashintPlayer((state)=> state.loadTrack)
  const [hoverStyle,setHoverStyle] = useState("hidden")
  function handleClick(){
    loadTrack(song)
  }
  return (
    <NavLink href={`/song/${song.title}`}
    onClick={handleClick}
    onMouseOver={()=>setHoverStyle("flex")}
    onMouseLeave={()=>setHoverStyle("hidden")}
      className="
        
        text-white lg:p-2
        w-[100px]
        lg:w-[200px] 
        m-2
        hover:bg-gray-900 hover:shadow-lg shadow-gray-900
        cursor-pointer    
      "
    >
      <div className="relative">
 <Image
        src={song.signed_cover_url}
        alt={song.artist.display_name}
        height={200}
        width={200}
        className="rounded-md"
      />
       <div className={cn(`absolute top-0  flex items-center justify-center w-[100px]
        lg:w-[200px] h-full  hover:text-32`,hoverStyle)}>
          <FaPlay/>
      </div>
      </div>
     
      <div className="p-4">
        <h1 className="font-semibold text-sm md:text-base truncate">{song.title}</h1>
        <h1 className="text-xs md:text-sm font-light text-gray-400 truncate">
          {song.artist.display_name}
        </h1>
      </div>
     
    </NavLink>
  );
}

export default MusicCard;
