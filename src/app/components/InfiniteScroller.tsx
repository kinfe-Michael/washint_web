"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import MusicCard from "./MusicCard";
import Scroller from "./Scroller";
import { SongsApiResponse, Song } from "../../lib/type"; // Import the types we created

interface InfiniteScrollerProps {
  initialSongs: Song[];
  initialNextPageUrl: string | null;
}

export default function InfiniteScroller({ initialSongs, initialNextPageUrl }: InfiniteScrollerProps) {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(initialNextPageUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);

  const fetchMoreSongs = useCallback(async () => {
    if (!nextPageUrl || loading) return;

    setLoading(true);
    try {
      const response = await fetch(nextPageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch more songs");
      }
      const data: SongsApiResponse = await response.json();
      setSongs((prevSongs) => [...prevSongs, ...data.results]);
      setNextPageUrl(data.next);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [nextPageUrl, loading]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && nextPageUrl) {
      fetchMoreSongs();
    }
  }, [fetchMoreSongs, nextPageUrl]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <>
      <Scroller title="Top" routeTo="">
        {songs.map((song) => (
          <MusicCard
            key={song.id}
            song={song}
          />
        ))}
        {loading && <p>Loading more songs...</p>}
        {error && <p>Error: {error}</p>}
      </Scroller>
      <div ref={loader} style={{ height: "20px" }}></div>
    </>
  );
}