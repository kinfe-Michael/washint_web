"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import SearchResults from '../components/SearchResults';
import { Song } from "@/lib/type";


interface SearchResultsOverlayProps {
  searchTerm: string;
  onClose: () => void;
  setSearchTerm: (text:string) => void;
}


interface Artist {
  id: string;
  name: string;
  rank: number;
  signed_profile_url: string | null;
}

interface Album {
  id: string;
  title: string;
  artist_name: string | null;
  rank: number;
  signed_cover_art_url: string | null;
}

interface SearchResultsProps {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
}


export function SearchResultsOverlay({ searchTerm, onClose,setSearchTerm }: SearchResultsOverlayProps) {

  const API_BASE_URL = "http://127.0.0.1:8000/api/"; // Replace with your Django API URL



  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResultsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    handleSearch(searchTerm)
  },[searchTerm])

  const handleSearch = async (q:string) => {
   
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.get(`${API_BASE_URL}search/`, {
        params: { q: q },
      });
      setResults(response.data);
    } catch (err) {
      setError("Failed to fetch search results. Please check your Django server and URL.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    console.log(results)
  },[results])




      const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
        setSearchTerm(event.target.value);
        
      };

  return (
    <Card
      className="
        fixed top-0 left-0 w-full h-full rounded-none 
        md:absolute md:top-full md:mt-2 md:left-0 md:right-0 
        bg-black text-white border border-gray-700 
        md:w-full md:h-auto md:max-h-[80vh] md:rounded-md 
         lg:mx-auto 
        z-[60] overflow-hidden 
      "
    >
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-lg">Search Results for {searchTerm}</CardTitle>
        <CardDescription className="text-gray-400">
         <p>Search and enjoy</p>
        </CardDescription>
          <div
                className="flex-grow  flex w-full justify-start md:hidden md:ml-10 lg:ml-40 relative"
                // ref={searchContainerRef}
              >
                <div className="bg-gradient-to-r w-full from-[#FF3B30] via-black to-black gap-4 flex items-center border border-gray-700 rounded-full px-4 h-10">
                  <HiMagnifyingGlass className="text-2xl font-bold" />
                  <input
                    // ref={searchInputRef}
                    className="focus:outline-0 min-w-[200px] bg-transparent text-white placeholder-gray-400 w-full"
                    type="text"
                    placeholder="Search..."
                    // onFocus={handleFocus}
                    onChange={handleChange}
                    value={searchTerm}
                  />
                </div>
              
              </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl"
          aria-label="Close search results"
        >
          &times;
        </button>
      </CardHeader>
      <CardContent className="h-full md:h-auto">
        { results && <SearchResults songs={results.songs || []} albums={results.albums || []} artists={results.artists || []}/>}
      </CardContent>
    </Card>
  );
}


