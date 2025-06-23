
import React, { ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HiMagnifyingGlass } from 'react-icons/hi2';


interface SearchResultsOverlayProps {
  searchTerm: string;
  onClose: () => void;
  setSearchTerm: (text:string) => any;
}


interface SearchResultItem {
  id: string; 
  imageUrl: string;
  mainText: string;
  subText: string;
}

export function SearchResultsOverlay({ searchTerm, onClose,setSearchTerm }: SearchResultsOverlayProps) {
  const allDummyResults: SearchResultItem[] = [
    { id: '1', imageUrl: "/yohana.jpg", mainText: `Product A: ${searchTerm}`, subText: "Category: Electronics" },
    { id: '2', imageUrl: "/yohana.jpg", mainText: `Service B: ${searchTerm}`, subText: "Provider: Tech Solutions" },
    { id: '3', imageUrl: "/yohana.jpg", mainText: `Article C: ${searchTerm}`, subText: "Published: 2024-05-15" },
    { id: '4', imageUrl: "/yohana.jpg", mainText: `Guide D: ${searchTerm}`, subText: "Difficulty: Intermediate" },
    { id: '5', imageUrl: "/yohana.jpg", mainText: `News E: ${searchTerm}`, subText: "Source: Daily Digest" },
    { id: '6', imageUrl: "/yohana.jpg", mainText: `Another Result: ${searchTerm}`, subText: "Info: Miscellaneous Item" },
    { id: '7', imageUrl: "/yohana.jpg", mainText: `Yet Another: ${searchTerm}`, subText: "Detail: More details here" },
    { id: '8', imageUrl: "/yohana.jpg", mainText: `Final Result: ${searchTerm}`, subText: "Status: Available" },
    { id: '9', imageUrl: "/yohana.jpg", mainText: `Extra Product A: ${searchTerm}`, subText: "Category: Gadgets" },
    { id: '10', imageUrl: "/yohana.jpg", mainText: `Extra Service B: ${searchTerm}`, subText: "Provider: Support Team" },
    { id: '11', imageUrl: "/yohana.jpg", mainText: `Extra Article C: ${searchTerm}`, subText: "Published: 2023-11-01" },
    { id: '12', imageUrl: "/yohana.jpg", mainText: `Extra Guide D: ${searchTerm}`, subText: "Difficulty: Advanced" },
    { id: '13', imageUrl: "/yohana.jpg", mainText: `Extra News E: ${searchTerm}`, subText: "Source: Business Wire" },
    { id: '14', imageUrl: "/yohana.jpg", mainText: `More Result: ${searchTerm}`, subText: "Info: Random Data" },
    { id: '15', imageUrl: "/yohana.jpg", mainText: `More Yet Another: ${searchTerm}`, subText: "Detail: Some other detail" },
    { id: '16', imageUrl: "/yohana.jpg", mainText: `More Final Result: ${searchTerm}`, subText: "Status: In Stock" },
  ];

  const filteredResults: SearchResultItem[] = searchTerm
    ? allDummyResults.filter(item =>
        item.mainText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subText.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
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
        lg:max-w-xl lg:mx-auto 
        z-[60] overflow-hidden 
      "
    >
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-lg">Search Results for "{searchTerm}"</CardTitle>
        <CardDescription className="text-gray-400">
          {searchTerm ? (
            `Showing ${filteredResults.length} result(s).`
          ) : (
            "Start typing to see suggestions..."
          )}
        </CardDescription>
          <div
                className="flex-grow  flex w-full justify-start md:hidden md:ml-10 lg:ml-40 relative"
                // ref={searchContainerRef}
              >
                <div className="bg-gradient-to-r w-full from-[#FF3B30] via-black to-black gap-4 flex items-center border border-gray-700 rounded-full max-w-min px-4 h-10">
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
        {filteredResults.length > 0 ? (
          <ScrollArea className="h-full max-h-[calc(100vh-150px)] md:max-h-[300px]">
            <ul className="space-y-2 pb-4">
              {filteredResults.map((item) => (
                <li
                  key={item.id} 
                  className="p-3 flex items-center gap-4 hover:bg-gray-800 rounded-md cursor-pointer transition-colors duration-200"
                >
                  <img
                    src={item.imageUrl}
                    alt="Result thumbnail"
                    className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p className="text-base font-semibold text-white">{item.mainText}</p>
                    <p className="text-sm text-gray-400">{item.subText}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-gray-400 p-4">No results found for "{searchTerm}".</p>
        )}
      </CardContent>
    </Card>
  );
}