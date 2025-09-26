"use client"
import { usePathname } from 'next/navigation';
import MobileNavbar from "./MobileNavbar";
import Player from "./Player";

function BottomContainer() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 md:h-20 bg-transparent text-white flex items-center justify-center shadow-inner">
       {/* Use startsWith() to check if the path starts with "/song" */}
       {pathname.startsWith("/song") && (
         <div className="bg-black p-2 mb-40 md:mb-2 md:flex w-full h-full">
           <Player />
         </div>
       )}
       <MobileNavbar />
    </div>
  );
}

export default BottomContainer;