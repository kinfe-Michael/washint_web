import PageWraper from "../components/PageWraper";
import Artists from "./components/Artists";
import { PlaylistFolder } from "./components/Folder";

interface PageProps {
  params: Promise<{ pageTitle: string }>; // For a single dynamic segment
}




async function page({ params }: PageProps) {
  const { pageTitle } = await params;
  let componentTorender
  if(pageTitle == 'artists'){
     componentTorender = <Artists/>
  }
  else{
    componentTorender = <p>No pages found!</p>
  }
  return (
    <PageWraper>
      <div className="text-white flex flex-col items-start">
        {pageTitle}
        <div className="flex  flex-wrap gap-2 md:gap-6 w-full justify-around md:justify-start">
          {componentTorender}
        </div>
      </div>
    </PageWraper>
  );
}

export default page;
