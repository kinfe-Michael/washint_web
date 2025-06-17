import Image from "next/image";

function MusicCard({url,alt,title,artist}:{url:string,alt:string,title:string,artist:string}) {
  return (
    <div className="text-white p-2 hover:bg-gray-900 hover:shadow-lg shadow-gray-900">
      <Image src={url} alt={alt} height={200} width={200} />
      <div className="p-4">
        <h1>{title}</h1>
        <h1 className="text-sm font-light text-gray-400">{artist}</h1>
      </div>
    </div>
  );
}

export default MusicCard;
