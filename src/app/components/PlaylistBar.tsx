'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiViewList } from 'react-icons/hi';
import axios from 'axios';

// Define the type for a single playlist object
interface Playlist {
  id: string;
  title: string;
}

// Define the type for the API response
interface PlaylistsResponse {
  count: number;
  results: Playlist[];
}

const PlaylistBar = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get<PlaylistsResponse>('http://localhost:8000/api/playlists/?my-playlist=true', {
          withCredentials: true,
        });
        setPlaylists(response.data.results);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const displayedPlaylists = playlists.slice(0, 2);
  const hasMorePlaylists = playlists.length > 2;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4 text-sm text-gray-400">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-sm text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ul className="space-y-1">
        {displayedPlaylists.map((playlist) => (
          <li key={playlist.id}>
            <Link
              href={`/playlists/${playlist.id}?my_playlist=true`}
              className="group flex items-center w-full px-3 py-2 text-left rounded-lg transition-colors duration-200 
               text-white  hover:text-gray-400"
            >
              <HiViewList className="w-5 h-5 mr-3" />
              <span className="flex-1 truncate text-sm">{playlist.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      {hasMorePlaylists && (
        <div className="mt-2">
          <Link
            href="/playlists?my_playlist=true" // Replace with the actual path to the page showing all playlists
            className="w-full block text-center px-3 py-2 text-sm font-medium text-white hover:text-gray-400 rounded-lg 
               transition-colors duration-200"
          >
            Show All Playlists
          </Link>
        </div>
      )}
    </div>
  );
};

export default PlaylistBar;