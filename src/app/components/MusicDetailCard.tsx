"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import type {Song} from '../../lib/type'
import DashboardButton from './DashboardButton';
import AddSongToPlayList from '../song/components/AddSongToPlayList';
interface MusicDetailCardProps {
  music: Song;
}

export const MusicDetailCard: React.FC<MusicDetailCardProps> = ({ music }) => {
  return (
    <Card className="w-full bg-black text-white border-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-0 md:p-6 mb-8">
      <div className="relative w-64 h-64 flex-shrink-0 rounded-md overflow-hidden mr-0 md:mr-6 mb-4 md:mb-0">
        <Image
          src={music.signed_cover_url}
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
            {music.artist.display_name}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 text-sm text-gray-400 space-y-2">
          <p><strong>Album:</strong> {music.album}</p>
          <p><strong>Genre:</strong> {music.genres}</p>
          <p><strong>Duration:</strong> {music.duration_seconds}</p>
          <p><strong>Released:</strong> {music.created_at}</p>
        </CardContent>
      </div>
      <div>
        <AddSongToPlayList songId={music.id}/>
      </div>
    </Card>
  );
};
