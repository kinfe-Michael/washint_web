'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { HiPlay } from 'react-icons/hi';
import axios from 'axios';
import PageWraper from '../../components/PageWraper';

const PlaceholderImage = '/yohana.jpg';

interface Artist {
  id: string;
  username: string;
  display_name: string;
}

interface AlbumInfo {
  id: string;
  title: string;
  artist: Artist;
  signed_cover_art_url: string;
}

interface Song {
  id: string;
  title: string;
  artist: Artist;
  signed_cover_url: string;
}

interface AlbumSongsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Song[];
}

// Reusable Loading State component
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 animate-pulse">
    <div className="w-48 h-48 rounded-md bg-zinc-800" />
    <div className="mt-4 w-60 h-8 rounded-md bg-zinc-800" />
    <div className="mt-2 w-40 h-6 rounded-md bg-zinc-800" />
    <div className="mt-8 w-full flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 bg-zinc-900 p-3 rounded-lg">
          <div className="w-12 h-12 rounded-md bg-zinc-700" />
          <div className="flex-1">
            <div className="h-4 bg-zinc-700 rounded w-3/4 mb-1" />
            <div className="h-4 bg-zinc-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Reusable Error State component
const ErrorState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
    <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold text-red-400">Error Loading Album</h2>
      <p className="mt-2 text-red-200">{message}</p>
    </div>
  </div>
);

const MainComponent = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const albumId = params.album_Id;

  useEffect(() => {
    if (!albumId) {
      setLoading(false);
      setError('Album ID not found in URL.');
      return;
    }

    const fetchAlbumData = async () => {
      try {
        setLoading(true);
        const [albumResponse, songsResponse] = await Promise.all([
          axios.get<AlbumInfo>(`http://localhost:8000/api/albums/${albumId}/`, { withCredentials: true }),
          axios.get<AlbumSongsResponse>(`http://localhost:8000/api/albums/${albumId}/songs/`, { withCredentials: true }),
        ]);

        setAlbumInfo(albumResponse.data);
        setSongs(songsResponse.data.results);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.detail || 'Failed to fetch album data.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!albumInfo) {
    return <ErrorState message="Album not found." />;
  }

  return (
    <PageWraper>
      <div className="bg-black text-white min-h-screen lg:pt-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Album Hero Section */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 bg-zinc-900 p-6 rounded-xl shadow-lg">
            <div className="relative w-48 h-48 md:w-52 md:h-52 rounded-md overflow-hidden shadow-2xl">
              <Image
                src={albumInfo.signed_cover_art_url || PlaceholderImage}
                alt={`${albumInfo.title} cover`}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Album
              </span>
              <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
                {albumInfo.title}
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                By {albumInfo.artist.display_name}
                {' • '}
                {songs.length} songs
              </p>
            </div>
          </div>

          {/* List of Songs */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">All Songs</h2>
            <ul className="space-y-3">
              {songs.length > 0 ? (
                songs.map((song, index) => (
                  <li key={song.id} className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 rounded-lg p-3 transition-colors">
                    <span className="text-zinc-500 font-semibold">{index + 1}</span>
                    <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={song.signed_cover_url || PlaceholderImage}
                        alt={`${song.title} cover`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-lg">{song.title}</p>
                      <p className="text-zinc-400 text-sm">{song.artist.display_name}</p>
                    </div>
                    <button
                      className="p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Play ${song.title}`}
                    >
                      <HiPlay className="w-5 h-5" />
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-center text-zinc-500 py-4">No songs found for this album.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </PageWraper>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <MainComponent />
    </Suspense>
  );
}