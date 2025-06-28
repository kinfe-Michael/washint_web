

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Music } from '../data/music'; 

interface MusicListItemProps {
  music: Music;
}

export const MusicListItem: React.FC<MusicListItemProps> = ({ music }) => {
  return (
    <Link href={`/song/${music.titleSlug}`} className="block">
      <div className="flex items-center space-x-4 p-3 bg-gray-900 hover:bg-gray-700 rounded-md transition-colors duration-200">
        <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={music.coverImage}
            alt={`Cover of ${music.title}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-white truncate">{music.title}</h3>
          <p className="text-sm text-gray-400 truncate">{music.artist}</p>
        </div>
        <p className="text-sm text-gray-500 flex-shrink-0">{music.duration}</p>
      </div>
    </Link>
  );
};
