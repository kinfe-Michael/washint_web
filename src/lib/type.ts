export type UserProfile = {
  profile: {
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
};
