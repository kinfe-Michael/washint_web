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