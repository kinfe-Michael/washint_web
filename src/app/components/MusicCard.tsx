import Image from "next/image";

function MusicCard({
  url,
  alt,
  title,
  artist,
}: {
  url: string;
  alt: string;
  title: string;
  artist: string;
}) {
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
        src={url}
        alt={alt}
        height={200}
        width={200}
        className="rounded-md"
      />
      <div className="p-4">
        <h1 className="font-semibold text-sm md:text-base truncate">{title}</h1>{" "}
        <h1 className="text-xs md:text-sm font-light text-gray-400 truncate">
          {artist}
        </h1>{" "}
      </div>
    </div>
  );
}

export default MusicCard;
