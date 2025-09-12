"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { HiPlay, HiOutlineTrash } from "react-icons/hi";
import axios from "axios";
import PageWraper from "../../components/PageWraper";
import type { Playlist } from "@/lib/type";
import DashboardButton from "@/app/components/DashboardButton";
import { HiTrash } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeSongFromPlaylist } from "@/lib/helperfunc";
import { DialogClose } from "@radix-ui/react-dialog";
import LoadingState from "@/app/components/LoadingAlbum";
import useWashintPlayer from "@/store/useWashintPlayer";

const PlaceholderImage = "/yohana.jpg";



const ErrorState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
    <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold text-red-400">
        Error Loading Playlist
      </h2>
      <p className="mt-2 text-red-200">{message}</p>
    </div>
  </div>
);

interface DeletePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeletePlaylistModal: React.FC<DeletePlaylistModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
      <div className="relative bg-zinc-900 rounded-xl p-8 shadow-2xl w-full max-w-sm text-center">
        <h2 className="text-xl font-bold text-white mb-4">Are you sure?</h2>
        <p className="text-zinc-300 mb-6">
          This action cannot be undone. All songs in this playlist will be
          permanently deleted.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-zinc-300 border border-zinc-700 hover:bg-zinc-800 transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const MainComponent = () => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const loadTrack = useWashintPlayer(state=>state.loadTrack)
  const setPlaying = useWashintPlayer(state=>state.setPlaying)
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const playlistId = params.playlist_id;
  const isMyPlaylist = searchParams.get("my-playlist") === "true";

  useEffect(() => {
    if (!playlistId) {
      setLoading(false);
      setError("Playlist ID not found in URL.");
      return;
    }

    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Playlist>(
          `http://localhost:8000/api/playlists/${playlistId}/`,
          {
            withCredentials: true,
          }
        );
        setPlaylist(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.detail || "Failed to fetch playlist data."
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const handleDeletePlaylist = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8000/api/playlists/${playlistId}/`, {
        withCredentials: true,
      });
      router.push("/playlists?my_playlist=true");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Failed to delete playlist.");
      } else {
        setError("An unexpected error occurred.");
      }
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!playlist) {
    return <ErrorState message="Playlist not found." />;
  }

  const firstSong = playlist.songs[0];
  const remainingSongs = playlist.songs.slice(1);
 
  return (
    <PageWraper>
      <div className="bg-black text-white min-h-screen lg:pt-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Playlist Hero Section */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 bg-zinc-900 p-6 rounded-xl shadow-lg">
            <div className="relative w-48 h-48 md:w-52 md:h-52 rounded-md overflow-hidden shadow-2xl">
              <Image
                src={playlist.signed_cover_art_url || PlaceholderImage}
                // src={PlaceholderImage}
                alt={`${playlist.title} cover`}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Playlist
              </span>
              <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
                {playlist.title}
              </h1>

              <p className="mt-1 text-sm text-zinc-400">
                Created by{" "}
                {playlist.owner?.profile?.display_name ||
                  playlist.owner?.username}
                {" • "}
                {playlist.songs.length} songs
              </p>
            </div>
            {isMyPlaylist && (
              <DashboardButton onClick={() => setIsDeleteModalOpen(true)}>
                <HiOutlineTrash />
              </DashboardButton>
            )}
          </div>

          {/* First Song and Controls */}
          <div onClick={()=>{
            loadTrack(firstSong)
            setPlaying(true)
          }} className="mt-8 bg-zinc-900 rounded-xl p-6 shadow-lg flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={firstSong?.signed_cover_url || PlaceholderImage}
                alt={`${firstSong?.title} cover`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {firstSong?.title || "No songs in this playlist."}
              </h3>
              <p className="text-zinc-400 text-sm">
                {firstSong?.artist?.display_name || ""}
              </p>
            </div>
            <button
              className="p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 transition-colors flex-shrink-0"
              aria-label="Play first song"
              disabled={!firstSong}
            >
              <HiPlay className="w-6 h-6" />
            </button>
          </div>

          {/* List of Remaining Songs */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">All Songs</h2>
            <ul className="space-y-3">
              {remainingSongs.length > 0 ? (
                remainingSongs.map((song, index) => (
                  <li
                    key={song.id}
                    onClick={()=> {
                      loadTrack(song)
                      setPlaying(true)
                      console.log(song)
                    }}
                    className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 rounded-lg p-3 transition-colors"
                  >
                    <span className="text-zinc-500 font-semibold">
                      {index + 2}
                    </span>
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
                      <p className="text-zinc-400 text-sm">
                        {song.artist.display_name}
                      </p>
                    </div>
                    <div onClick={(e)=> e.stopPropagation()}>
                      <Dialog>
                        <DialogTrigger>
                          <HiTrash />
                        </DialogTrigger>
                        <DialogContent className="bg-black text-white">
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              remove song from playlist
                            </DialogDescription>
                          </DialogHeader>
                          <DialogClose asChild>
                          <DashboardButton
                            onClick={() => {
                              if (typeof playlistId == "string")
                                removeSongFromPlaylist(playlistId, song.id);
                            }}
                          >
                            Remove song
                          </DashboardButton>
                           </DialogClose>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center text-zinc-500 py-4">
                  {playlist.songs.length === 1
                    ? "This playlist only contains one song."
                    : "There are no songs in this playlist."}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <DeletePlaylistModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePlaylist}
        isDeleting={isDeleting}
      />
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
