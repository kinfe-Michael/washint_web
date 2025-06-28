"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music } from '../data/music';
interface MusicDetailCardProps {
  music: Music;
}

export const MusicDetailCard: React.FC<MusicDetailCardProps> = ({ music }) => {
  return (
    <Card className="w-full bg-black text-white border-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-0 md:p-6 mb-8">
      <div className="relative w-64 h-64 flex-shrink-0 rounded-md overflow-hidden mr-0 md:mr-6 mb-4 md:mb-0">
        <Image
          src={music.coverImage}
          alt={`Cover of ${music.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col flex-grow text-center md:text-left">
        <CardHeader className="p-0 mb-4 md:mb-0 md:pr-4">
          <CardTitle className="text-2xl font-bold text-blue-400 leading-tight">
            {music.title}
          </CardTitle>
          <CardDescription className="text-xl sm:text-2xl text-gray-300 mt-1">
            {music.artist}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 text-sm text-gray-400 space-y-2">
          <p><strong>Album:</strong> {music.album}</p>
          <p><strong>Genre:</strong> {music.genre}</p>
          <p><strong>Duration:</strong> {music.duration}</p>
          <p><strong>Released:</strong> {music.releaseYear}</p>
        </CardContent>
      </div>
    </Card>
  );
};
