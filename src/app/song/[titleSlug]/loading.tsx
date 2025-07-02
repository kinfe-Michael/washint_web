

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PageWraper from '@/app/components/PageWraper';

const SkeletonMusicDetailCard: React.FC = () => (
  <Card className="w-full bg-gray-800 text-white border-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-4 md:p-6 mb-8 animate-pulse">
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 rounded-md overflow-hidden mr-0 md:mr-6 mb-4 md:mb-0 bg-gray-700"></div>
    <div className="flex flex-col flex-grow text-center md:text-left w-full">
      <CardHeader className="p-0 mb-4 md:mb-0 md:pr-4">
        <div className="h-9 sm:h-10 bg-gray-700 rounded-md w-3/4 mx-auto md:mx-0 mb-2"></div>
        <div className="h-6 sm:h-7 bg-gray-700 rounded-md w-1/2 mx-auto md:mx-0"></div>
      </CardHeader>
      <CardContent className="p-0 text-lg sm:text-xl text-gray-400 space-y-2 w-full">
        <div className="h-5 bg-gray-700 rounded-md w-2/3 mx-auto md:mx-0"></div>
        <div className="h-5 bg-gray-700 rounded-md w-1/2 mx-auto md:mx-0"></div>
        <div className="h-5 bg-gray-700 rounded-md w-2/5 mx-auto md:mx-0"></div>
        <div className="h-5 bg-gray-700 rounded-md w-1/3 mx-auto md:mx-0"></div>
      </CardContent>
    </div>
  </Card>
);

const SkeletonMusicListItem: React.FC = () => (
  <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-md animate-pulse">
    <div className="w-16 h-16 bg-gray-700 rounded-md flex-shrink-0"></div> {/* Image Placeholder */}
    <div className="flex-grow">
      <div className="h-5 bg-gray-700 rounded-md w-3/4 mb-1"></div> {/* Title Placeholder */}
      <div className="h-4 bg-gray-700 rounded-md w-1/2"></div> {/* Artist Placeholder */}
    </div>
    <div className="h-4 bg-gray-700 rounded-md w-1/6 flex-shrink-0"></div> {/* Duration Placeholder */}
  </div>
);

export default function MusicDetailLoading() {
  return (
    <PageWraper>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="flex flex-col items-center p-4">
        <SkeletonMusicDetailCard />

        <div className="w-full max-w-4xl mt-8">
          <div className="h-8 bg-gray-700 rounded-md w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => ( 
              <SkeletonMusicListItem key={i} />
            ))}
          </div>
        </div>

        <div className="w-full max-w-4xl mt-8">
          <div className="h-8 bg-gray-700 rounded-md w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => ( 
              <SkeletonMusicListItem key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </PageWraper>

  );
}
