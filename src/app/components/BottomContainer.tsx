import MobileNavbar from "./MobileNavbar";
import Player from "./Player";

function BottomContainer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 md:h-20 bg-transparent text-white flex items-center justify-center shadow-inner">
   <div className="bg-black p-2 hidden md:flex w-full h-full">
  <Player/>
   </div>
   <MobileNavbar/>
    </div>
  );
}

export default BottomContainer;
