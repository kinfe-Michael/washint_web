
"use client";

import { useState, useEffect } from 'react';
import PageWraper from "../components/PageWraper";
import InfiniteScroller from "./InfiniteScroller";

import { api } from '@/lib/utils';
import axios from 'axios';
import { Song } from '@/lib/type';

export interface SongsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FavoriteSongData[];
}
interface FavoriteSongData {
    user:string;
    added_at:string;
    song:Song;
    id:string;
  }
export default function Page() {
  const [songsData, setSongsData] = useState<SongsApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<SongsApiResponse>("/favorites/");
        setSongsData(response.data);
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          console.error("Client-side Axios error:", err.response.data);
          setError(`API Error: ${err.response.status} ${JSON.stringify(err.response.data)}`);
        } else {
          console.error("Unexpected error:", err);
          setError("Failed to fetch favorite songs.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []); // The empty dependency array ensures this runs only once on component mount

  if (isLoading) {
    return (
      <PageWraper>
        <div className="text-center p-8">Loading...</div>
      </PageWraper>
    );
  }

  return (
    <PageWraper>
      {error ? (
        <div className="text-center text-red-500 p-8">
          Error: {error}
        </div>
      ) : (
        <InfiniteScroller
          initialSongs={songsData?.results || []}
          initialNextPageUrl={songsData?.next || null}
        />
      )}
    </PageWraper>
  );
}