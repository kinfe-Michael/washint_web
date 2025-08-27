export type UserProfile = {
 
    id: string;
    username: string;
    display_name: string;
    profile_picture_url: string | null;
    bio: string | null;
    followers_count: number;
    following_count: number;
    created_at: string;
    updated_at: string;
  };


export interface Song {
  id: string;
  title: string;
  album: string | null;
  genres: string[] | null;
  signed_audio_url: string;
  signed_cover_url: string;
  credits: string | null;
  duration_seconds: number;
  artist: {
      display_name:string,
      username:string,
      id:string,
    }; // Note: This is an artist ID. You may need to fetch the artist's name separately.
  play_count: number;
  created_at: string;
}

export interface SongsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Song[];
}