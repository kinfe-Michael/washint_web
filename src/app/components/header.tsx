
"use client";
import { Button } from "@/components/ui/button";
import { closeSearchBar, openSearchBar } from "@/lib/searchStateOperation";
import useWashintStore from "@/store/useWashintStore";
import NavLink  from "./CustomNavLink";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"; // Import React specific types
import { HiSparkles } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import PhoneSidebar from "./PhoneSidebar";
import { SearchResultsOverlay } from "./SearchResultsOverlay";
function Header() {
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const searchInputRef = useRef<HTMLInputElement>(null); 
  const searchContainerRef = useRef<HTMLDivElement>(null); 
  const isSearchBarActive = useWashintStore((state)=> state.isSearchBarOpen)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) { 
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        // setShowSearchResults(false);
        closeSearchBar()
      }
    }

    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, []);

  const handleFocus = () => { 
    // setShowSearchResults(true);
    openSearchBar()
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
    setSearchTerm(event.target.value);
    // setShowSearchResults(true);
    openSearchBar()
  };

  const handleCloseSearchResults = () => {
    // setShowSearchResults(false);
    closeSearchBar()
    setSearchTerm("");
  };

  return (
    <header className="fixed flex top-0 h-16 left-0 right-0 z-50 bg-black text-white items-center px-4 shadow-md">
      <HiSparkles className="text-xl" />
      <NavLink href={"/"}>
      <h1 className="font-semibold">Washint</h1>

      </NavLink>
      <div
        className="flex-grow ml-4  md:ml-10 lg:ml-40 relative"
        ref={searchContainerRef}
      >
        <div className="bg-gradient-to-r hidden md:flex from-[#FF3B30] via-black to-black gap-4  items-center border border-gray-700 rounded-full max-w-min px-4 h-10">
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
        {isSearchBarActive && (
          <SearchResultsOverlay setSearchTerm={setSearchTerm} searchTerm={searchTerm} onClose={handleCloseSearchResults} />
        )}
      </div>
      <div className="flex flex-grow items-center justify-end gap-2">
       <NavLink href={"/auth/login"}>
        <Button className="px-2 text-xs hidden md:block font-bold">Login</Button>

       </NavLink>
       <NavLink href={"/auth/signup"}>
        <Button className="bg-[#FF3B30] text-xs px-1 hover:bg-[#ff3a30d8] font-bold">
          Sign up
        </Button>
       </NavLink>
       
        <PhoneSidebar />
      </div>
    </header>
  );
}

export default Header;