
import { Song } from '@/lib/type';
import React from 'react';

interface SongListItemProps {
  song: Song;
  playedAt: string;
}

const SongListItem: React.FC<SongListItemProps> = ({ song, playedAt }) => {
  const formattedDate = new Date(playedAt).toLocaleString();

  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="text-lg font-semibold">{song.title}</h3>
      <p className="text-gray-600">
        <span className="font-medium">{song.artist.display_name}</span>
      </p>
      <p className="text-sm text-gray-400">Played at: {formattedDate}</p>
    </div>
  );
};

export default SongListItem;