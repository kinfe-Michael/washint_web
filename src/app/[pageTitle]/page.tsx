import React from 'react'
import PageWraper from '../components/PageWraper';
import Scroller from '../components/Scroller';
import { PlaylistFolder } from './components/Folder';

interface PageProps {
  params: Promise<{ pageTitle: string }>; // For a single dynamic segment
}

async function page({params}:PageProps) {
    const {pageTitle} =await params
  return (
    <PageWraper>
      <div className='text-white flex flex-col items-start'>
      {pageTitle}
      <div className='flex  flex-wrap gap-2 w-full justify-around md:justify-start'  >
        <PlaylistFolder
          folderName="Liked Songs"
          count={245}
          imageUrl="/yohana.jpg"
        />
        <PlaylistFolder folderName="Workout Jams" count={88} imageUrl="/yohana.jpg" />
        <PlaylistFolder
          folderName="Chill Lo-Fi Beats"
          count={50}
          imageUrl="/yohana.jpg"
        />
        <PlaylistFolder
          folderName="Road Trip Anthems"
          count={72}
          imageUrl="/yohana.jpg"
        />
        <PlaylistFolder
          folderName="Indie Discoveries"
          count={15}
          imageUrl="/yohana.jpg"
        />
        <PlaylistFolder
          folderName="Acoustic Covers"
          count={30}
          imageUrl="/yohana.jpg"
        />
        <PlaylistFolder folderName="Summer Vibes Mix" imageUrl="/yohana.jpg" />
        <PlaylistFolder
          folderName="Classical Masterpieces"
          count={12}
          imageUrl="/yohana.jpg"
          className="col-span-2 sm:col-span-1"
        />
      </div>

    </div>
    </PageWraper>
  )
}

export default page