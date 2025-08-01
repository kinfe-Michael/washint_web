import { create } from "zustand";

interface WashintPlayerState {
  playing: boolean;
  volume: number; // 0.0 to 1.0
  mute: boolean;
  played: number; // Current playback position as a fraction (0.0 to 1.0)
  loaded: number; // Amount of the media buffered as a fraction (0.0 to 1.0)
  duration: number; // Total duration of the current track in seconds
  seeking: boolean; // True when the user is actively dragging the seekbar thumb
  error: string | null;

  // Current track metadata
  currentTrack: {
    url: string; // URL of the currently playing song
    artist: string;
    title: string;
    imageUrl: string;
    titleSlug: string; // Used for URLs, etc.
    artistSlug: string; // Used for URLs, etc.
  } | null;

  // Playback queue/navigation
  nextSongId: string | null; // ID for next song (or URL, depending on how you manage your queue)
  previousSongId: string | null; // ID for previous song

  repet: boolean; // Renamed from 'repet' to 'loop' for common terminology

  // Actions

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

  // Actions for managing the current track
  loadTrack: (trackDetails: {
    url: string;
    artist: string;
    title: string;
    imageUrl: string;
    titleSlug: string;
    artistSlug: string;
  }) => void;
  setNextSong: (nextSongId: string | null) => void;
  setPreviousSong: (previousSongId: string | null) => void;

  resetState: () => void; // Resets all player-related state
}

const useWashintPlayer = create<WashintPlayerState>((set) => ({
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

  repet: false, // Initial value for loop

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
  togleRepet: () => set((state) => ({ repet: !state.repet })), // Corrected action name

  loadTrack: (trackDetails) =>
    set({
      currentTrack: { ...trackDetails },
      played: 0,
      loaded: 0,
      duration: 0,
      playing: false, // Ensure playing is false by default on load
      seeking: false,
      error: null,
    }),
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
}));

export default useWashintPlayer;
