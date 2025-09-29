import { api } from "@/lib/utils";
import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { persist } from "zustand/middleware";

interface UserState {
  loading: boolean;
  isLogedIn:boolean;
  error: string | null;
  data: {
    bio: string;
    created_at: string;
    display_name: string;
    follower_count: number;
    following_count: number;
    id: string;
    profile_picture_url: string | null;
    updated_at: string;
    username: string;
  };
  fetchData: () => Promise<void>;
  resetData: ()=> void;
}

const useUserState = create<UserState>()(
  persist(
    (set) => ({
      loading: false,
      isLogedIn:false,
      error: null,
      data: {
        bio: "",
        created_at: "",
        display_name: "",
        follower_count: 0,
        following_count: 0,
        id: "",
        profile_picture_url: null,
        updated_at: "",
        username: "",
      },
      fetchData: async () => {
        set({ loading: true, error: null,isLogedIn:false });
        try {
          const response = await api.get("/profiles/my-profile/");
          const data = response.data;
          set({ data: data });
          set({ loading: false, error: null,isLogedIn:true });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            set({
              error: `Error: ${
                axiosError.response?.statusText || axiosError.message
              }`,
              loading: false,
              isLogedIn:false,
            });
          } else {
            const errorMessage =
              error instanceof Error ? error.message : "An unknown error occurred.";
            set({ error: errorMessage, loading: false });
          }
        }
      },
      resetData: ()=>{
        set({
          loading: false,
      isLogedIn:false,
      error: null,
      data: {
        bio: "",
        created_at: "",
        display_name: "",
        follower_count: 0,
        following_count: 0,
        id: "",
        profile_picture_url: null,
        updated_at: "",
        username: "",
      }
        })
      }
    }),
    {
      name: "user-profile-storage",
    
    }
  )
);

export default useUserState;