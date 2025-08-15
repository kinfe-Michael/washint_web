import Image from "next/image"
import NavLink from "./CustomNavLink"

function ArtistCard({imageurl,artistName,username}:{imageurl:string,artistName:string,username:string}) {
  return (
       <NavLink href={`/profile/${username}`}
         className="
         
           text-white lg:p-2
           w-[100px]
           lg:w-[200px] 
           m-2
           hover:bg-gray-900 hover:shadow-lg shadow-gray-900
           cursor-pointer    
         "
       >
         <Image
           src={imageurl}
           alt={artistName}
           height={200}
           width={200}
           className="rounded-full"
         />
         <div className="p-4">
           
           <h1 className="text-xs md:text-sm font-light text-gray-400 truncate">
             {artistName}
           </h1>
         </div>
       </NavLink>
  )
}

export default ArtistCard