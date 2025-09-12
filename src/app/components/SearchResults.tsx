"use client"
import React from 'react';
import Image from 'next/image';
import { Song } from '@/lib/type';
import useWashintPlayer from '@/store/useWashintPlayer';
import { useCustomRouter } from '@/hooks/useCustomRouter';


interface Artist {
  id: string;
  name: string;
  rank: number;
  signed_profile_url: string | null;
}

interface Album {
  id: string;
  title: string;
  artist_name: string | null;
  rank: number;
  signed_cover_art_url: string | null;
}

interface SearchResultsProps {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
}

// --- Main Component ---
const SearchResults: React.FC<SearchResultsProps> = ({ songs, artists, albums }) => {

const loadTrack = useWashintPlayer(state=>state.loadTrack)
const setPlaying = useWashintPlayer(state=>state.setPlaying)
const router = useCustomRouter()
  // Combine all results into a single array for sorting
  const allResults = [
    ...songs?.map(item => ({ 
      ...item, 
      song:item,
      type: 'song', 
      name: item.title, 
      sub: item.artist.display_name, 
      imageUrl: item.signed_cover_url,
    })),
    ...artists?.map(item => ({ 
      ...item, 
      type: 'artist', 
      name: item.name, 
      sub: null, 
      imageUrl: item.signed_profile_url,
    })),
    ...albums?.map(item => ({ 
      ...item, 
      type: 'album', 
      name: item.title, 
      sub: item.artist_name, 
      imageUrl: item.signed_cover_art_url,
    })),
  ];
   
  function routeTo(result:any){
    let navLink
    if(result.type === 'artist'){
      router.push(`/profile/${result.id}/?type=artist`)
    }
    else if(result.type === 'song'){
      router.push(`/song/${result.title}`)
      loadTrack(result.song)
      setPlaying(true)
    }else if (result.type === 'album'){
    router.push(`/albums/${result.id}`)
  }
}


  return (
    <div className="h-full bg-gray-950 text-gray-100 p-6">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Search Results</h1>
        {allResults.length === 0 ? (
          <p className="text-gray-400 text-lg">No results found.</p>
        ) : (
          <div className="flex flex-wrap  gap-6">
            {allResults.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                onClick={()=>{
                  routeTo(result)
                }}
                className="bg-gray-900 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <div className="p-4 flex items-center space-x-4">
                  {/* Conditionally render Image or SVG icon */}
                  <div className="flex-shrink-0">
                    {result.imageUrl ? (
                      <div className="relative h-16 w-16">
                        <Image
                          src={result.imageUrl}
                          alt={`${result.name} cover`}
                          layout="fill"
                          objectFit="cover"
                          className={`rounded-lg ${result.type === 'artist' ? 'rounded-full' : ''}`}
                        />
                      </div>
                    ) : (
                      // Fallback SVG icons
                      result.type === 'song' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v14m-3 0V6.5" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a4 4 0 014-4h2.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H13a2 2 0 00-2 2v2M21 3l-6 3m-6 0l-6 3" />
                        </svg>
                      ) : result.type === 'artist' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-8-4 8-4 8 4-8 4z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l8-4-8-4-8 4m-4 4L12 18l8-4m-4 4l4 4-8 4-8-4 4-4z" />
                        </svg>
                      )
                    )}
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-white truncate">{result.name}</h2>
                    <p className="text-sm text-gray-400 capitalize">{result.type}</p>
                    {result.sub && <p className="text-sm text-gray-500 truncate">{result.sub}</p>}
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default SearchResults