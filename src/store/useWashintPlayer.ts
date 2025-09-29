import { addSongToRecentlyPlayed } from "@/lib/helperfunc";
import { Song } from "@/lib/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WashintPlayerState {
  playing: boolean;
  volume: number;
  mute: boolean;
  played: number;
  loaded: number;
  duration: number;
  seeking: boolean;
  error: string | null;

  currentTrack: Song | null;

  nextSongId: string | null;
  previousSongId: string | null;

  repet: boolean;

  togglePlaying: () => void;
  setPlaying: (status: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlayed: (played: number) => void;
  setLoaded: (loaded: number) => void;
  setDuration: (duration: number) => void;
  setSeeking: (seeking: boolean) => void;
  setError: (error: string | null) => void;
  togleRepet: () => void;

  loadTrack: (trackDetails: {
    id: string;
    title: string;
    album: string | null;
    genres: string[] | null;
    signed_audio_url: string;
    signed_cover_url: string;
    credits: string | null;
    duration_seconds: number;
    artist: {
      display_name: string;
      username: string;
      id: string;
    };
    play_count: number;
    created_at: string;
  }) => void;
  setNextSong: (nextSongId: string | null) => void;
  setPreviousSong: (previousSongId: string | null) => void;

  resetState: () => void;
}

const useWashintPlayer = create<WashintPlayerState>()(
  persist(
    (set) => ({
      // Initial State
      playing: false,
      volume: 0.6,
      mute: false,
      played: 0,
      loaded: 0,
      duration: 0,
      seeking: false,
      error: null,

      currentTrack: null,
      nextSongId: null,
      previousSongId: null,

      repet: false,

      // Actions
      togglePlaying: () => set((state) => ({ playing: !state.playing })),
      setPlaying: (status) => set({ playing: status }),
      setVolume: (volume) => set({ volume }),
      toggleMute: () => set((state) => ({ mute: !state.mute })),
      setPlayed: (played) => set({ played }),
      setLoaded: (loaded) => set({ loaded }),
      setDuration: (duration) => set({ duration }),
      setSeeking: (seeking) => set({ seeking }),
      setError: (error) => set({ error }),
      togleRepet: () => set((state) => ({ repet: !state.repet })),

      loadTrack: async (trackDetails) => {
        set({
          currentTrack: { ...trackDetails },
          played: 0,
          loaded: 0,
          duration: 0,
          playing: false,
          seeking: false,
          error: null,
        });
        addSongToRecentlyPlayed(trackDetails.id);
      },

      setNextSong: (nextSongId) => set({ nextSongId }),
      setPreviousSong: (previousSongId) => set({ previousSongId }),

      resetState: () =>
        set({
          playing: false,
          volume: 0.6,
          mute: false,
          played: 0,
          loaded: 0,
          duration: 0,
          seeking: false,
          error: null,
          currentTrack: null,
          nextSongId: null,
          previousSongId: null,
          repet: false,
        }),
    }),
    {
      name: "washint-player-storage", // A unique name for your player's state
      // You can also add 'partialize' or other options here if needed.
    }
  )
);

export default useWashintPlayer;