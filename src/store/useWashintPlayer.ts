import { create } from "zustand";

interface WashintPlayerState {
  playing: boolean;
  volume: number;
  played: number;
  loaded: number;
  duration: number;
  seeking: boolean;
  artist: string;
  title: string;
  imageUrl: string;
  nextSong: string;
  previousSong: string;
  titleSlug: string;
  artistSlug: string;
  repet: boolean;

  toglePlaying: () => void;
  setVolume: (volume: number) => void;
  setPlayed: (played: number) => void;
  setLoaded: (loaded: number) => void;
  setDuration: (duration: number) => void;
  togleSeeking: () => void;
  setArtist: (artist: string) => void;
  setTitle: (title: string) => void;
  setImageUrl: (imageUrl: string) => void;
  setNextSong: (nextSong: string) => void;
  setPreviousSong: (previousSong: string) => void;
  setTitleSlug: (titleSlug: string) => void;
  setArtistSlug: (artistSlug: string) => void;
  togleRepet: () => void;
  resetState: () => void;
}

const useWashintPlayer = create<WashintPlayerState>((set, get) => ({
  playing: false,
  volume: 0.6,
  played: 0,
  loaded: 0,
  duration: 0,
  seeking: false,
  artist: "",
  title: "",
  imageUrl: "",
  nextSong: "",
  previousSong: "",
  titleSlug: "",
  artistSlug: "",
  repet: false,

  toglePlaying: () => set((state) => ({ playing: !state.playing })),
  setVolume: (volume) => set({ volume }),
  setPlayed: (played) => set({ played }),
  setLoaded: (loaded) => set({ loaded }),
  setDuration: (duration) => set({ duration }),
  togleSeeking: () => set((state) => ({ seeking: !state.seeking })),
  setArtist: (artist) => set({ artist }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setNextSong: (nextSong) => set({ nextSong }),
  setPreviousSong: (previousSong) => set({ previousSong }),
  setTitle: (title) => set({ title }),
  setTitleSlug: (titleSlug) => set({ titleSlug }),
  setArtistSlug: (artistSlug) => set({ artistSlug }),
  togleRepet: () => set((state) => ({ repet: !state.repet })),
  resetState: () =>
    set({
      playing: false,
      volume: 0.6,
      played: 0,
      loaded: 0,
      duration: 0,
      seeking: false,
      artist: "",
      title: "",
      imageUrl: "",
      nextSong: "",
      previousSong: "",
      titleSlug: "",
      artistSlug: "",
      repet: false,
    }),
}));

export default useWashintPlayer;
