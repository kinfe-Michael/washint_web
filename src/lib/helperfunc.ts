// services/playlistService.ts
import axios from 'axios';
import { ErrorResponse, PlaylistSong } from './type';
import { api } from './utils';
import useUserState from '@/store/useUserState';

/**
 * Adds a song to a specific playlist using Axios.
 * @param playlistId The UUID of the playlist.
 * @param songId The UUID of the song to add.
 * @returns A promise that resolves to the new PlaylistSong object.
 * @throws An error with a message if the API call fails.
 */
export async function addSongToPlaylist(playlistId: string, songId: string): Promise<PlaylistSong> {
  try {
    const response = await api.post<PlaylistSong>(
      `/playlists/${playlistId}/songs/add-song/`,
      { song_id: songId }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data as ErrorResponse;
      throw new Error(errorData.detail || 'Failed to add song to playlist.');
    }
    
    throw new Error('An unexpected error occurred while adding the song.');
  }
}
export async function removeSongFromPlaylist(playlistId: string, songId: string): Promise<void> {
  try {
    await api.delete(
      `/playlists/${playlistId}/songs/remove-song/${songId}/`
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data as ErrorResponse;
      throw new Error(errorData.detail || 'Failed to remove song from playlist.');
    }
    throw new Error('An unexpected error occurred while removing the song.');
  }
}

export async function unfollowUser(followObjectId: string): Promise<void> {
    const apiURL = `http://localhost:8000/api/follows/${followObjectId}/`; // Use backticks for string interpolation

    try {
        await axios.delete(apiURL, {
            withCredentials: true,
            headers: {
                'X-CSRFToken': 'your-csrf-token-here'
            }
        });

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Unfollow request failed:', error.response.data);
            throw new Error(error.response.data.detail || 'An unexpected error occurred.');
        } else {
            console.error('An unknown error occurred:', error);
            throw new Error('An unknown error occurred.');
        }
    }
}

interface FollowResponse {
    id: string;
    following: string;
    created_at: string;
}

// Define the payload for the follow request
interface FollowPayload {
    following: string;
}


export async function followUser(userId: string): Promise<FollowResponse> {
    const apiURL = 'http://localhost:8000/api/follows/'; // Replace with your actual backend URL

    const payload: FollowPayload = {
        following: userId
    };

    try {
        const response = await axios.post<FollowResponse>(apiURL, payload, {
            // Optional: Include credentials for cookie-based authentication
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json',
                // Optional: Include a CSRF token for Django's CSRF protection
                'X-CSRFToken': 'your-csrf-token-here' 
            }
        });

        // Return the data from the successful response
        return response.data;
    } catch (error) {
        // You can check for specific error responses from the server
        if (axios.isAxiosError(error) && error.response) {
            console.error('Follow request failed:', error.response.data);
            throw new Error(error.response.data.detail || 'An unexpected error occurred.');
        } else {
            console.error('An unknown error occurred:', error);
            throw new Error('An unknown error occurred.');
        }
    }
}

export async function checkIsFollowing(targetUserId: string): Promise<boolean> {
    const apiURL = `http://localhost:8000/api/follows/is-following/?user_id=${targetUserId}`;

    try {
        const response = await axios.get<{ is_following: boolean }>(apiURL, {
            withCredentials: true,
        });

        return response.data.is_following;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Failed to check follow status:', error.response.data);
            if (error.response.status === 401) {
                return false;
            }
        } else {
            console.error('An unknown error occurred:', error);
            return false
        }
        throw new Error('Failed to check follow status.');
    }
}

export async function logout() {
    const response = await api.post('/logout/')
    return response
}


// api/favorites.ts



// Define the base URL of your Django API.
// It's a good practice to use environment variables for this.

/**
 * Interface for the data to be sent in the request body.
 * Assumes your backend expects a 'song' ID.
 */
interface AddFavoritePayload {
  song_id: string; // The UUID of the song
}

/**
 * Interface for a successful response.
 * Adjust this based on what your Django API returns on success.
 */
interface AddFavoriteResponse {
  id: string;
  user: string;
  song: string;
  added_at: string;
}

/**
 * Adds a song to the user's favorites.
 * @param songId The UUID of the song to favorite.
 * @param token The user's authentication token (e.g., JWT).
 * @returns A promise that resolves with the favorite object on success.
 */
export const addSongToFavorites = async (
  songId: string,
  
): Promise<AddFavoriteResponse> => {

  const payload: AddFavoritePayload = {
    song_id: songId,
  };
  console.log(songId)
  console.log(songId)
  console.log(songId)
  console.log(songId)
  console.log(songId)

  try {
    const response = await api.post<AddFavoriteResponse>(
      `/favorites/`,
      payload,
    );

    return response.data;
  } catch (error) {
    // Handle specific Axios errors or re-throw
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('API Error:', error.response.data);
        throw new Error(
          `Failed to add song to favorites: ${JSON.stringify(error.response.data)}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Network Error:', error.request);
        throw new Error('Network error. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred.');
  }
};




/**
 * Interface for the data to be sent in the request body.
 */
interface AddRecentlyPlayedPayload {
  song: string; // The UUID of the song
}

/**
 * Interface for the successful response from the server.
 */
interface RecentlyPlayedResponse {
  id: string;
  user: string;
  song: {
    id: string;
    title: string;
    artist: string; // Or a more detailed artist object
  };
  played_at: string;
}

/**
 * Adds or updates a song in the user's recently played list.
 * @param songId The UUID of the song to add.
 * @param token The user's authentication token.
 * @returns A promise that resolves with the updated recently played object.
 */
export const addSongToRecentlyPlayed = async (
  songId: string,
 
): Promise<RecentlyPlayedResponse> => {
 

  const payload: AddRecentlyPlayedPayload = {
    song: songId,
  };

  try {
    const response = await api.post<RecentlyPlayedResponse>(
      `/recently-played/`,
      payload,
    );
    console.log(response)

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error:', error.response.data);
        throw new Error(
          `Failed to add song to recently played: ${JSON.stringify(error.response.data)}`
        );
      }
    }
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred.');
  }
};