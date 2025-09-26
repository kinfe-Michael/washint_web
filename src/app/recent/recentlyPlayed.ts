// api/recentlyPlayed.ts

import { Song } from '@/lib/type';
import { api } from '@/lib/utils';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// This is the structure your DRF API returns for a paginated list
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Data structure for a single song item in the list
interface RecentlyPlayedItem {
  id: string;
  song: Song;
  played_at: string;
}

/**
 * Fetches a paginated list of recently played songs for the authenticated user.
 * @param token The user's authentication token.
 * @param page The page number to fetch.
 * @returns A promise with the paginated response.
 */
export const getRecentlyPlayedSongs = async (
 
  page: number = 1
): Promise<PaginatedResponse<RecentlyPlayedItem>> => {
 

  try {
    const response = await api.get<PaginatedResponse<RecentlyPlayedItem>>(
      `${API_URL}/recently-played/?page=${page}`,
    
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`API Error: ${JSON.stringify(error.response.data)}`);
    }
    throw new Error('An unexpected error occurred.');
  }
};