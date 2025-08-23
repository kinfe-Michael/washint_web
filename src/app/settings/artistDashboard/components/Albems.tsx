"use client"

import { useState } from "react";
import {
    Music,
    Calendar,
    ChevronUp,
    ChevronRight
} from 'lucide-react'
function Albems() {
 const albumsData = [
  { id: 1, title: 'Starlight Symphony', releaseDate: '2023-01-15', trackCount: 12, imageUrl: 'https://placehold.co/150x150/f4511e/ffffff?text=SS' },
  { id: 2, title: 'Urban Serenade', releaseDate: '2022-09-01', trackCount: 10, imageUrl: 'https://placehold.co/150x150/f4511e/ffffff?text=US' },
  { id: 3, title: 'The Great Outdoors', releaseDate: '2021-05-20', trackCount: 8, imageUrl: 'https://placehold.co/150x150/f4511e/ffffff?text=GO' },
];
  const [showAllAlbums, setShowAllAlbums] = useState(false);

  const albumsToShow = showAllAlbums ? albumsData : albumsData.slice(0, 3);

  return (
       <div>
          <div className="bg-zinc-900 rounded-xl p-6 shadow-md border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Albums</h2>
              <button
                onClick={() => setShowAllAlbums(!showAllAlbums)}
                className="flex items-center text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {showAllAlbums ? 'Show Less' : 'View All'}
                {showAllAlbums ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronRight className="w-4 h-4 ml-1" />}
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {albumsToShow.map((album) => (
                <div key={album.id} className="bg-zinc-950  w-full p-4 rounded-xl flex items-start gap-4 hover:bg-zinc-800 transition-colors cursor-pointer">
                  <img src={album.imageUrl} alt={album.title} className="w-20 h-20 rounded-lg shadow-lg flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{album.title}</h3>
                    <p className="text-sm text-zinc-400 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {album.releaseDate}
                    </p>
                    <p className="text-sm text-zinc-400 flex items-center gap-1 mt-1">
                      <Music className="w-3 h-3 text-zinc-500" />
                      {album.trackCount} {album.trackCount === 1 ? 'Track' : 'Tracks'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
       
       </div>
  )
}

export default Albems