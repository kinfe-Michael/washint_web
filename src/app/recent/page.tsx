"use client"

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getRecentlyPlayedSongs } from './recentlyPlayed';
import SongListItem from './SongListItem';
import { Song } from '@/lib/type';
import PageWraper from '../components/PageWraper';

interface RecentlyPlayedItem {
  id: string;
  song: Song;
  played_at: string;
}

const RecentlyPlayedPage: React.FC = () => {
  const [songs, setSongs] = useState<RecentlyPlayedItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useInView hook to detect when the user scrolls to the bottom
  const { ref, inView } = useInView({
    threshold: 0, // Trigger when the element is just entering the viewport
    rootMargin: '200px', // Start loading when 200px from the bottom
  });

  const fetchSongs = async (pageToFetch: number) => {
    
    setIsLoading(true);
    setError(null);

    try {
      const data = await getRecentlyPlayedSongs( pageToFetch);
      setSongs(prevSongs => [...prevSongs, ...data.results]);
      setHasMore(data.next !== null);
      setPage(pageToFetch + 1);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch songs.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    
      fetchSongs(1);
    
  }, []);

  // Effect to trigger fetching more data when the sentinel element is in view
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      fetchSongs(page);
    }
  }, [inView, hasMore, isLoading]);

 

  return (
    <PageWraper>
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Recently Played Songs</h1>
      {songs.length === 0 && !isLoading && !error && (
        <p className="text-center text-gray-500">No songs found. Start playing some music!</p>
      )}
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div>
        {songs.map(item => (
          <SongListItem 
            key={item.id} 
            song={item.song} 
            playedAt={item.played_at} 
          />
        ))}
      </div>

      {/* Sentinel element for infinite scroll */}
      {hasMore && (
        <div ref={ref} className="py-4 text-center">
          {isLoading ? (
            <p className="text-gray-500">Loading more songs...</p>
          ) : (
            <p className="text-gray-500">Scroll down to load more</p>
          )}
        </div>
      )}

      {!hasMore && !isLoading && songs.length > 0 && (
        <div className="py-4 text-center text-gray-500">{"You've reached the end of the list."}</div>
      )}
    </div>
    </PageWraper>
  );
};

export default RecentlyPlayedPage;