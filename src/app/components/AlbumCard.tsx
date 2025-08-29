"use client";

import Image from "next/image";
import { Album } from "../../lib/type";

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
      <div className="relative  w-32 h-32 md:w-48 md:h-48">
        <Image
          src={album.signed_cover_art_url}
          alt={album.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg md:text-xl font-semibold mb-1 text-white truncate">
          {album.title}
        </h2>
        <p className="text-sm text-gray-400 truncate">
          by {album.artist.display_name}
        </p>
      </div>
    </div>
  );
}