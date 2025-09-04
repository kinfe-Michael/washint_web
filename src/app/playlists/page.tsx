'use client';

import { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { HiViewList, HiPlay } from 'react-icons/hi';
import axios from 'axios';
import PageWraper from '../components/PageWraper';

// Define the type for a single playlist object based on the provided API response
interface Playlist {
  id: string;
  title: string;
  is_public: boolean;
  songs_count: number;
  signed_cover_art_url: string | null;
  owner: {
    id: string;
    username: string;
    email: string;
    profile: {
      id: string;
      username: string;
      display_name: string | null;
      profile_picture_url: string | null;
      bio: string | null;
      followers_count: number;
      following_count: number;
      created_at: string;
      updated_at: string;
    };
  };
}

// Define the type for the API response
interface PlaylistsResponse {
  count: number;
  results: Playlist[];
}

const PlaceholderImage = '/yohana.jpg';

function AllPlaylistsPage (){
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 20;
  
  const searchParams = useSearchParams();
  const isMyPlaylist = searchParams.get('my-playlist') === 'true';
  const apiBaseUrl = 'http://localhost:8000/api/playlists/';

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPlaylists([]);
    setOffset(0);
    setHasMore(true);
    setLoading(false);
    setError(null);
  }, [isMyPlaylist]);

  const fetchPlaylists = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const url = `${apiBaseUrl}?offset=${offset}&limit=${limit}${isMyPlaylist ? '&my-playlist=true' : ''}`;
      const response = await axios.get<PlaylistsResponse>(url, {
        withCredentials: true,
      });

      setPlaylists((prevPlaylists) => {
        const newPlaylists = response.data.results;
        // Use a Set to store unique playlist IDs to avoid duplicates
        const uniquePlaylists = new Map(
          [...prevPlaylists, ...newPlaylists].map(p => [p.id, p])
        );
        return Array.from(uniquePlaylists.values());
      });
      setHasMore(response.data.results.length === limit);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, [offset, hasMore, loading, isMyPlaylist]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loading, hasMore]);

  useEffect(() => {
    fetchPlaylists();
  }, [offset, isMyPlaylist]);

  const handlePlayButtonClick = (event: React.MouseEvent, playlistId: string) => {
    event.preventDefault(); 
    event.stopPropagation();
    console.log(`Play button clicked for playlist with ID: ${playlistId}`);
  };

  const heroPlaylist = playlists[0];

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-red-500">
        <p className="text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
   <PageWraper>
   <div className="bg-black text-white">
      {/* Hero Section */}
      <div className=" w-full flex overflow-hidden">
      
        <div className=" inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            {isMyPlaylist ? 'My Playlists' : 'All Playlists'}
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Discover all your curated playlists.
          </p>
        </div>
      </div>

      <div className=" mx-auto  p-2 md:p-4 py-8">
        {playlists.length > 0 ? (
          <ul className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <Link
                  href={`/playlists/${playlist.id}`}
                  className="flex flex-col items-center justify-between w-38 md:w-60  md:gap-3 md:p-4 bg-zinc-900 rounded-lg shadow-xl transition-transform hover:scale-105 hover:bg-zinc-800 group"
                >
                  <div className="relative w-full h-40 rounded-md overflow-hidden">
                    <Image 
                      // src={playlist.signed_cover_art_url || PlaceholderImage} 
                      src={PlaceholderImage} 
                      alt="Playlist Cover" 
                      layout="fill" 
                      objectFit="cover" 
                    />
                  </div>
                  <div className="w-full flex justify-between items-center mt-2">
                    <div className="flex flex-col">
                      <span className="text-lg font-medium truncate">{playlist.title}</span>
                      <span className="text-sm text-gray-400">
                        {playlist.songs_count} songs by {playlist.owner?.profile?.display_name || playlist.owner?.username || 'Unknown'}
                      </span>
                    </div>
                    <button 
                      onClick={(event) => handlePlayButtonClick(event, playlist.id)}
                      className="p-2 rounded-full bg-indigo-500 text-white shadow-md hover:bg-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Play playlist"
                    >
                      <HiPlay className="w-5 h-5" />
                    </button>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            {loading ? <p>Loading playlists...</p> : <p>No playlists found.</p>}
          </div>
        )}
      </div>

      {/* Sentinel element for infinite scroll */}
      <div ref={observerRef} className="h-4" />

      {/* Loading and end-of-list messages */}
      <div className="text-center py-4">
        {loading && hasMore && <p className="text-gray-400">Loading more...</p>}
        {!hasMore && !loading && <p className="text-gray-500">No more playlists to show.</p>}
      </div>
    </div>
    </PageWraper>
  );
};



function page() {
  return ( <Suspense>
<AllPlaylistsPage/>
  </Suspense>
    
  )
}

export default page
