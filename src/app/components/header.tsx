"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { HiSparkles, HiViewList } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import PhoneSidebar from "./PhoneSidebar";
function Header() {
  return (
    <header className="fixed flex  top-0 h-16 left-0 right-0 z-50 bg-black text-white items-center px-4 shadow-md">
      <HiSparkles className="text-xl"/>
      <h1 className="font-semibold">Washint</h1>
      <div className="flex-grow ml-4 hidden md:flex  md:ml-10 lg:ml-40  ">
        
        <div className=" bg-gradient-to-r from-[#FF3B30] via-black to-black  gap-4 flex items-center border-1 border-gray-700 rounded-4xl max-w-min px-4 h-10">
          <HiMagnifyingGlass className="text-2xl font-bold"/>
          <input className="focus:outline-0  " type="text" />
        </div>
      </div>
      <div className="flex flex-grow items-center justify-end  gap-2">
      <Button className=" px-2 text-xs hidden md:block font-bold">Login</Button>
      <Button className="bg-[#FF3B30] text-xs  px-1 hover:bg-[#ff3a30d8] font-bold">Sign up</Button>
      <PhoneSidebar/>
      </div>
    </header>
  );
}

export default Header;
