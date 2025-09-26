
"use client";

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios'; // Import axios here
import { Song } from "../../lib/type";
import { api } from '@/lib/utils';

interface FavoriteSongData {
    user:string;
    added_at:string;
    song:Song;
    id:string;
  }
  export interface SongsApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: FavoriteSongData[];
  }

interface InfiniteScrollerProps {
  initialSongs: FavoriteSongData[];
  initialNextPageUrl: string | null;
}

const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  initialSongs,
  initialNextPageUrl,
}) => {
  const [songs, setSongs] = useState<FavoriteSongData[]>(initialSongs);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(initialNextPageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  const fetchMoreSongs = async () => {
    if (!nextPageUrl || isLoading) return;

    setIsLoading(true);
    setError(null);

  

    try {
      // Use axios to make the GET request
      const response = await api.get<SongsApiResponse>(nextPageUrl);

      const data = response.data;
      setSongs(prevSongs => [...prevSongs, ...data.results]);
      setNextPageUrl(data.next);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Client-side Axios error:", err.response.data);
        setError(`API Error: ${err.response.status} ${JSON.stringify(err.response.data)}`);
      } else {
        console.error("Unexpected error:", err);
        setError("Failed to fetch more songs.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchMoreSongs();
    }
  }, [inView]);

  return (
    <div>
      {songs.length > 0 ? (
        songs.map(song => (
          <div key={song.id} className="border-b py-4">
            <h3>{song.song.title}</h3>
            {/* <p>By {song.artist.display_name}</p> */}
          </div>
        ))
      ) : (
        !isLoading && <p className="text-center text-gray-500">No favorite songs found.</p>
      )}

      {nextPageUrl && (
        <div ref={ref} className="py-4 text-center">
          {isLoading ? (
            <p className="text-gray-500">Loading more songs...</p>
          ) : (
            <p className="text-gray-500">Scroll down to load more</p>
          )}
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          Error: {error}
        </div>
      )}

      {!nextPageUrl && !isLoading && songs.length > 0 && (
        <div className="py-4 text-center text-gray-500">{"You've reached the end of the list."}</div>
      )}
    </div>
  );
};

export default InfiniteScroller;