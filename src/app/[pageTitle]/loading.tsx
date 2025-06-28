// loading.tsx
"use client"; // This component will be rendered on the client side

import React from 'react';

// A simple skeleton for the PlaylistFolder component
const SkeletonPlaylistFolder: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative w-40 h-40 md:w-48 md:h-48 bg-gray-700 rounded-lg overflow-hidden shadow-lg animate-pulse ${className}`}>
    {/* Image Placeholder */}
    <div className="w-full h-3/4 bg-gray-600"></div>
    {/* Text Placeholders */}
    <div className="absolute bottom-0 left-0 w-full p-2 bg-gray-800 bg-opacity-75">
      <div className="h-4 bg-gray-600 rounded w-3/4 mb-1"></div> {/* Folder Name */}
      <div className="h-3 bg-gray-600 rounded w-1/4"></div> {/* Count */}
    </div>
  </div>
);

export default function Loading() {
  // Replicate the componentTorender structure for skeletons
  const skeletonFolders = [1, 2, 3, 4].map((i) => (
    <SkeletonPlaylistFolder key={i} className="col-span-2 sm:col-span-1" />
  ));

  return (
    // Simulating PageWraper's overall layout
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="text-white flex flex-col items-start">
        {/* Skeleton for the pageTitle */}
        <div className="h-8 bg-gray-700 rounded-md w-1/4 mb-6 animate-pulse"></div>

        {/* Skeleton for the flex container of folders */}
        <div className="flex flex-wrap gap-2 md:gap-6 w-full justify-around md:justify-start">
          {skeletonFolders}
        </div>
      </div>
    </div>
  );
}
