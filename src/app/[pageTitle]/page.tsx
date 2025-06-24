import React, { ReactNode } from "react";
import PageWraper from "../components/PageWraper";
import Scroller from "../components/Scroller";
import { PlaylistFolder } from "./components/Folder";

interface PageProps {
  params: Promise<{ pageTitle: string }>; // For a single dynamic segment
}

const componentTorender = [1,2,3,4].map((i)=>{
   return <PlaylistFolder
          key={i}
            folderName="Classical Masterpieces"
            count={12}
            imageUrl="/yohana.jpg"
            className="col-span-2 sm:col-span-1"
          />
})


async function page({ params }: PageProps) {
  const { pageTitle } = await params;
  return (
    <PageWraper>
      <div className="text-white flex flex-col items-start">
        {pageTitle}
        <div className="flex  flex-wrap gap-2 w-full justify-around md:justify-start">
          {componentTorender}
        </div>
      </div>
    </PageWraper>
  );
}

export default page;
