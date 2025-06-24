import Image from "next/image"

function ArtistCard({imageurl,artistName}:{imageurl:string,artistName:string}) {
  return (
       <div
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
       </div>
  )
}

export default ArtistCard