import Image from "next/image";
import NavLink from "./CustomNavLink";

function ArtistCard({
  imageurl,
  artistName,
  id,
}: {
  imageurl: string;
  artistName: string;
  id: string;
}) {
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  return (
    <NavLink
      href={`/profile/${id}?type=artist`}
      className="
         text-white lg:p-2
          flex items-center flex-col
           m-2
           hover:bg-gray-900 hover:shadow-lg shadow-gray-900
           cursor-pointer    
         "
    >
      <Image
        src={imageurl || "/yohana.jpg"}
        alt={artistName}
        height={200}
        width={200}
        className="rounded-full  w-[100px]
           lg:w-[200px] "
      />
      <div className="p-4">
        <h1 className="text-xs md:text-sm font-light text-gray-400 truncate">
          {artistName}
        </h1>
      </div>
    </NavLink>
  );
}

export default ArtistCard;
