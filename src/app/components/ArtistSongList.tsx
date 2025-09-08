"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Song, SongsApiResponse } from '@/lib/type';
import useWashintPlayer from '@/store/useWashintPlayer';

export default function ArtistSongsList({ artistId }: { artistId: string }) {
    
    const  loadTrack  = useWashintPlayer(state=>state.loadTrack);
    const  setPlaying  = useWashintPlayer(state=>state.setPlaying);
    const [songs, setSongs] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API_BASE_URL = 'http://localhost:8000/api';
    const PlaceholderImage = 'https://placehold.co/48x48/CCCCCC/555555?text=Img';

    useEffect(() => {
        if (!artistId) {
            setIsLoading(false);
            return;
        }

        const fetchSongs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get<SongsApiResponse>(`${API_BASE_URL}/artists/${artistId}/songs/`);
                setSongs(response.data.results);
            } catch (err) {
                console.error('Failed to fetch artist songs:', err);
                setError('Error loading songs. Please check the artist ID.');
                setSongs([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSongs();
    }, [artistId]);

    const artistName = songs.length > 0 ? (songs[0].artist.display_name || songs[0].artist.username) : 'Unknown Artist';

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-gray-500">Loading songs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-red-500 mt-8">{error}</p>
            </div>
        );
    }

    if (songs.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Artist Not Found or No Songs</h1>
                <p className="text-gray-500">There are no songs available for this artist.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Songs by {artistName}</h1>
            <ul className="space-y-3">
                {songs.map((song, index) => (
                    <li
                        key={song.id}
                        onClick={() => {
                            loadTrack(song);
                            setPlaying(true);
                        }}
                        className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 rounded-lg p-3 transition-colors group cursor-pointer"
                    >
                        <span className="text-zinc-500 font-semibold">{index + 1}</span>
                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <img
                                src={song.signed_cover_url || PlaceholderImage}
                                alt={`${song.title} cover`}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-lg text-white">{song.title}</p>
                            <p className="text-zinc-400 text-sm">{song.artist.display_name}</p>
                        </div>
                        <button
                            className="p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Play ${song.title}`}
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
