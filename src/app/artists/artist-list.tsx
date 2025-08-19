'use client';

import { useState, useEffect, useRef } from 'react';
import { getArtists } from './action';
import ArtistCard from '../components/ArtistCard';

export default function ArtistList({
  initialArtists,
  limit,
}: {
  initialArtists: any;
  limit: number;
}) {
  const [artists, setArtists] = useState(initialArtists.results);
  const [offset, setOffset] = useState(initialArtists.results.length);
  const [hasMore, setHasMore] = useState(!!initialArtists.next);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreArtists();
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore]);

  const loadMoreArtists = async () => {
    const newArtistsData = await getArtists(limit, offset);
    setArtists((prev: any) => [...prev, ...newArtistsData.results]);
    setOffset((prev: any) => prev + newArtistsData.results.length);
    setHasMore(!!newArtistsData.next);
  };

  return (
    <div>
      <h1>Artists</h1>
      <ul className='flex flex-wrap gap-4 justify-center items-center'>
        {artists.map((artist: any) => (
          <li key={artist.id}>
            <ArtistCard  artistName={artist.managed_by.profile.display_name} username={artist.managed_by.profile.username} imageurl={artist.managed_by.profile.profile_picture_url} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <div ref={loadingRef} style={{ height: '50px', margin: '20px 0' }}>
          Loading...
        </div>
      )}
    </div>
  );
}