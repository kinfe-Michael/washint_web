// services/playlistService.ts
import axios from 'axios';
import { ErrorResponse, PlaylistSong } from './type';
import { api } from './utils';

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
    console.log('Song added successfully:', response.data);
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
    console.log('Song removed successfully.');
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

        console.log(`Successfully unfollowed user (Follow object ID: ${followObjectId})`);
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