"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Scroller from "../components/Scroller";
import { AlbumsApiResponse, Album } from "../../lib/type";
import AlbumCard from "../components/AlbumCard";

interface AlbumsScrollerProps {
  initialAlbums: Album[];
  initialNextPageUrl: string | null;
}

export default function AlbumsScroller({ initialAlbums, initialNextPageUrl }: AlbumsScrollerProps) {
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(initialNextPageUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);

  const fetchMoreAlbums = useCallback(async () => {
    if (!nextPageUrl || loading) return;

    setLoading(true);
    try {
      const response = await fetch(nextPageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch more albums");
      }
      const data: AlbumsApiResponse = await response.json();
      setAlbums((prevAlbums) => [...prevAlbums, ...data.results]);
      setNextPageUrl(data.next);
    } catch (err) {
    //   setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [nextPageUrl, loading]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && nextPageUrl) {
      fetchMoreAlbums();
    }
  }, [fetchMoreAlbums, nextPageUrl]);

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
      <Scroller title="Top Albums" routeTo="">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
          />
        ))}
        {loading && <p>Loading more albums...</p>}
        {error && <p>Error: {error}</p>}
      </Scroller>
      <div ref={loader} style={{ height: "20px" }}></div>
    </>
  );
}