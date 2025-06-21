
"use client";
import React, { useState, useEffect, useRef, ChangeEvent, FocusEvent, MouseEvent } from "react"; // Import React specific types
import { Button } from "@/components/ui/button";
import { HiSparkles, HiViewList } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import PhoneSidebar from "./PhoneSidebar";
import { SearchResultsOverlay } from "./SearchResultsOverlay";

function Header() {
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false); 
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const searchInputRef = useRef<HTMLInputElement>(null); 
  const searchContainerRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) { 
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, []);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => { 
    setShowSearchResults(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
    setSearchTerm(event.target.value);
    setShowSearchResults(true);
  };

  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
    setSearchTerm("");
  };

  return (
    <header className="fixed flex top-0 h-16 left-0 right-0 z-50 bg-black text-white items-center px-4 shadow-md">
      <HiSparkles className="text-xl" />
      <h1 className="font-semibold">Washint</h1>
      <div
        className="flex-grow ml-4 hidden md:flex md:ml-10 lg:ml-40 relative"
        ref={searchContainerRef}
      >
        <div className="bg-gradient-to-r from-[#FF3B30] via-black to-black gap-4 flex items-center border border-gray-700 rounded-full max-w-min px-4 h-10">
          <HiMagnifyingGlass className="text-2xl font-bold" />
          <input
            ref={searchInputRef}
            className="focus:outline-0 min-w-[200px] bg-transparent text-white placeholder-gray-400 w-full"
            type="text"
            placeholder="Search..."
            onFocus={handleFocus}
            onChange={handleChange}
            value={searchTerm}
          />
        </div>
        {showSearchResults && (
          <SearchResultsOverlay searchTerm={searchTerm} onClose={handleCloseSearchResults} />
        )}
      </div>
      <div className="flex flex-grow items-center justify-end gap-2">
        <Button className="px-2 text-xs hidden md:block font-bold">Login</Button>
        <Button className="bg-[#FF3B30] text-xs px-1 hover:bg-[#ff3a30d8] font-bold">
          Sign up
        </Button>
        <PhoneSidebar />
      </div>
    </header>
  );
}

export default Header;