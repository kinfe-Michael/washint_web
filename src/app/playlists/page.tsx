'use client';

import { useEffect, useState, useRef, useCallback, Suspense, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { HiViewList, HiPlay } from 'react-icons/hi';
import { ImageIcon } from "lucide-react";
import axios from 'axios';
import PageWraper from '../components/PageWraper';
import DashboardButton from '../components/DashboardButton';

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

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, type = 'text', value, onChange, placeholder, error }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-zinc-400 text-sm font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full p-3 rounded-lg bg-zinc-800 text-zinc-200 border-2
        focus:outline-none transition-colors duration-200
        ${error ? 'border-red-500' : 'border-zinc-700 focus:border-white'}
      `}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface FormImageUploadProps {
  id: string;
  label: string;
  file: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormImageUpload: React.FC<FormImageUploadProps> = ({ id, label, file, onChange, error }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [file]);

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-zinc-400 text-sm font-semibold mb-2">
        {label}
      </label>
      <div className={`relative w-36 h-36 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${error ? 'border-red-500' : 'border-zinc-700 focus-within:border-white'}`}>
        <label htmlFor={id} className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-2 text-zinc-400 hover:text-white transition-colors">
          {preview ? (
            <img src={preview} alt="Album Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <ImageIcon className="w-8 h-8" />
              <span className="mt-2 text-center text-sm">Upload Cover</span>
            </div>
          )}
        </label>
        <input
          type="file"
          id={id}
          name={id}
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaylistCreated: () => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ isOpen, onClose, onPlaylistCreated }) => {
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [coverArt, setCoverArt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError('Title is required.');
      return;
    }
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('is_public', isPublic.toString());
    if (coverArt) {
      formData.append('cover_art_upload', coverArt);
    }
    
    try {
      await axios.post('http://localhost:8000/api/playlists/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onPlaylistCreated();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Failed to create playlist. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
      <div className="relative bg-zinc-900 rounded-xl p-8 shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6">Create New Playlist</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            id="title"
            label="Playlist Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Chill Vibes"
            error={error?.includes('Title') ? error : undefined}
          />
          <div className="mb-6">
            <label className="flex items-center text-zinc-400 text-sm font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-500 rounded border-zinc-700 bg-zinc-800 transition-colors duration-200"
              />
              <span className="ml-2">Make playlist public</span>
            </label>
          </div>
          <FormImageUpload
            id="cover_art_upload"
            label="Upload Cover Art"
            file={coverArt}
            onChange={(e) => setCoverArt(e.target.files ? e.target.files[0] : null)}
          />
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-zinc-300 border border-zinc-700 hover:bg-zinc-800 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};


function AllPlaylistsPage (){
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const limit = 20;
  
  const searchParams = useSearchParams();
  const isMyPlaylist = searchParams.get('my_playlist') === 'true';
  const apiBaseUrl = 'http://localhost:8000/api/playlists/';

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPlaylists = useCallback(async () => {
    if (loading || (!hasMore && offset > 0)) return;
    setLoading(true);
    try {
      const url = `${apiBaseUrl}?offset=${offset}&limit=${limit}${isMyPlaylist ? '&my-playlist=true' : ''}`;
      const response = await axios.get<PlaylistsResponse>(url, {
        withCredentials: true,
      });

      setPlaylists((prevPlaylists) => {
        const newPlaylists = response.data.results;
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
    setPlaylists([]);
    setOffset(0);
    setHasMore(true);
    fetchPlaylists();
  }, [isMyPlaylist, refreshTrigger]);

  const handlePlaylistCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handlePlayButtonClick = (event: React.MouseEvent, playlistId: string) => {
    event.preventDefault(); 
    event.stopPropagation();
    console.log(`Play button clicked for playlist with ID: ${playlistId}`);
  };

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
      <div className=" w-full flex justify-between items-center overflow-hidden">
      
        <div className=" inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-2 md:p-8">
          <h1 className="md:text-4xl text-2xl font-extrabold tracking-tight text-white">
            {isMyPlaylist ? 'My Playlists' : 'All Playlists'}
          </h1>
          <p className="mt-2  md:text-lg text-gray-300">
            Discover all your curated playlists.
          </p>
        </div>
        <div>
          <DashboardButton onClick={()=> setIsModalOpen(true)}>
            <h1>Create playlist</h1>
          </DashboardButton>
        </div>
      </div>

      <div className=" mx-auto  p-2 md:p-4 py-8">
        {playlists.length > 0 ? (
          <ul className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <Link
                  href={`/playlists/${playlist.id}${isMyPlaylist ? '?my-playlist=true' : ''}`}
                  className="flex flex-col items-center justify-between w-38 md:w-60  md:gap-3  rounded-lg shadow-xl transition-transform hover:scale-105 hover:bg-zinc-800 group"
                >
                  <div className="relative w-full h-40 rounded-md overflow-hidden">
                    <Image 
                      src={playlist.signed_cover_art_url || PlaceholderImage} 
                      // src={PlaceholderImage} 
                      alt="Playlist Cover" 
                      layout="fill" 
                      objectFit="cover" 
                    />
                  </div>
                  <div className="w-full flex justify-between items-center p-2">
                    <div className="flex flex-col">
                      <span className="text-lg font-medium truncate">{playlist.title}</span>
                      <span className="text-sm text-gray-400">
                        {playlist.songs_count} songs by {playlist.owner?.profile?.display_name || playlist.owner?.username || 'Unknown'}
                      </span>
                    </div>
                    <button 
                      onClick={(event) => handlePlayButtonClick(event, playlist.id)}
                      className="p-2 rounded-full  text-white shadow-md hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
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
    <CreatePlaylistModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlaylistCreated={handlePlaylistCreated}
      />
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
