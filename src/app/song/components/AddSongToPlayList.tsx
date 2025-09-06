"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Playlist } from "@/lib/type";
import axios from "axios";
import { useEffect, useState } from "react";
import AddSongButton from "./AddSongButton";


interface PlaylistsResponse {
  count: number;
  results: Playlist[];
}


function AddSongToPlayList({songId}:{songId:string}) {
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
  return (
    <div>
<Dialog> 
  <DialogTrigger>Add to playlist</DialogTrigger>
  <DialogContent className="bg-black text-white border-gray-700">
    <DialogHeader>
      <DialogTitle>A song to playlist!</DialogTitle>
      <DialogDescription>
        set your mood right!
      </DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-2 ">
      {
        playlists.map(playlist=> {
          return <AddSongButton key={playlist.id} title={playlist.title} playlistId={playlist.id} songId={songId} />
        })
      }
    </div>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddSongToPlayList