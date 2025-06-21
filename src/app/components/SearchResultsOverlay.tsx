
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";


interface SearchResultsOverlayProps {
  searchTerm: string;
  onClose: () => void;
}


interface SearchResultItem {
  id: string; 
  imageUrl: string;
  mainText: string;
  subText: string;
}

export function SearchResultsOverlay({ searchTerm, onClose }: SearchResultsOverlayProps) {
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

  return (
    <Card
      className="
        fixed top-0 left-0 w-full h-full rounded-none // Default (mobile) full screen
        md:absolute md:top-full md:mt-2 md:left-0 md:right-0 // Desktop positioning
        bg-black text-white border border-gray-700 // Your specified dark UI
        md:w-full md:h-auto md:max-h-[80vh] md:rounded-md // Desktop sizing
        lg:max-w-xl lg:mx-auto // Optional: Limit width and center on large screens
        z-[60] overflow-hidden // Ensure it's above other content and clips overflow
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