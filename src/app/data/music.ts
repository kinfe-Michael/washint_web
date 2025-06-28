
export interface Music {
  id: string;
  title: string;
  artist: string;
  artistSlug: string; 
  titleSlug: string; 
  album: string;
  genre: string;
  duration: string; 
  coverImage: string; 
  releaseYear: number;
}

export const mockMusicData: Music[] = [
  {
    id: "m1",
    title: "Symphony No. 5",
    artist: "Ludwig van Beethoven",
    artistSlug: "ludwig-van-beethoven",
    titleSlug: "symphony-no-5",
    album: "Beethoven's Greatest Symphonies",
    genre: "Classical",
    duration: "32:00",
    coverImage: "/yohana.jpg",
    releaseYear: 1808,
  },
  {
    id: "m2",
    title: "Für Elise",
    artist: "Ludwig van Beethoven",
    artistSlug: "ludwig-van-beethoven",
    titleSlug: "fur-elise",
    album: "Piano Masterpieces",
    genre: "Classical",
    duration: "2:55",
    coverImage: "/yohana.jpg",
    releaseYear: 1810,
  },
  {
    id: "m3",
    title: "Moonlight Sonata",
    artist: "Ludwig van Beethoven",
    artistSlug: "ludwig-van-beethoven",
    titleSlug: "moonlight-sonata",
    album: "Piano Masterpieces",
    genre: "Classical",
    duration: "15:00",
    coverImage: "/yohana.jpg",
    releaseYear: 1801,
  },
  {
    id: "m4",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    artistSlug: "queen",
    titleSlug: "bohemian-rhapsody",
    album: "A Night at the Opera",
    genre: "Rock",
    duration: "5:55",
    coverImage: "/yohana.jpg"  , 
     releaseYear: 1975,
    
  },
  {
    id: "m5",
    title: "Don't Stop Me Now",
    artist: "Queen",
    artistSlug: "queen",
    titleSlug: "dont-stop-me-now",
    album: "Jazz",
    genre: "Rock",
    duration: "3:29",
    coverImage: "/yohana.jpg",
    releaseYear: 1978,
  },
  {
    id: "m6",
    title: "Shape of You",
    artist: "Ed Sheeran",
    artistSlug: "ed-sheeran",
    titleSlug: "shape-of-you",
    album: "÷ (Divide)",
    genre: "Pop",
    duration: "3:53",
    coverImage: "/yohana.jpg",
    releaseYear: 2017,
  },
  {
    id: "m7",
    title: "Blinding Lights",
    artist: "The Weeknd",
    artistSlug: "the-weeknd",
    titleSlug: "blinding-lights",
    album: "After Hours",
    genre: "Pop",
    duration: "3:20",
    coverImage: "/yohana.jpg",
    releaseYear: 2019,
  },
  {
    id: "m8",
    title: "Yesterday",
    artist: "The Beatles",
    artistSlug: "the-beatles",
    titleSlug: "yesterday",
    album: "Help!",
    genre: "Rock",
    duration: "2:05",
    coverImage: "/yohana.jpg",
    releaseYear: 1965,
  },
  {
    id: "m9",
    title: "Hey Jude",
    artist: "The Beatles",
    artistSlug: "the-beatles",
    titleSlug: "hey-jude",
    album: "Single",
    genre: "Rock",
    duration: "7:11",
    coverImage: "/yohana.jpg",
    releaseYear: 1968,
  },
  {
    id: "m10",
    title: "Concerto for Two Violins",
    artist: "Johann Sebastian Bach",
    artistSlug: "johann-sebastian-bach",
    titleSlug: "concerto-for-two-violins",
    album: "Bach Concertos",
    genre: "Classical",
    duration: "13:30",
    coverImage: "/yohana.jpg",
      releaseYear: 1730,
  },
];

// Utility function to simulate fetching data
export const fetchMusicBySlug = async (slug: string): Promise<Music | undefined> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockMusicData.find(music => music.titleSlug === slug);
};

export const fetchMusicByArtist = async (artist: string, excludeSlug?: string): Promise<Music[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockMusicData.filter(music => music.artist === artist && music.titleSlug !== excludeSlug);
};

export const fetchRelatedMusic = async (genre: string, excludeSlug?: string): Promise<Music[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const related = mockMusicData.filter(
    music => music.genre === genre && music.titleSlug !== excludeSlug
  );
  // Return a subset if too many, to simulate "related"
  return related.sort(() => 0.5 - Math.random()).slice(0, 5);
};
