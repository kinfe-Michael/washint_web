import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Image from "next/image";
import { HiViewList } from "react-icons/hi";
import SidebarContent from "./SidebarContent";
function PhoneSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <HiViewList className="lg:hidden  text-2xl" />
      </SheetTrigger>

      <SheetContent className="bg-[#161616] border-gray-700">
        <SheetHeader className="h-0">
          <SheetTitle className="text-white">Washint</SheetTitle>
        </SheetHeader>
        <div className="flex items-center  gap-2">
          <Button className=" px-2 text-xs  md:block font-bold">
            Login
          </Button>
          <Button className="bg-[#FF3B30] text-xs   px-1 hover:bg-[#ff3a30d8] font-bold">
            Sign up
          </Button>
          
        </div>
        <div className="flex gap-4 p-2">
          <Image
            className="rounded-full"
            src="/yohana.jpg"
            alt="yohana"
            width={50}
            height={50}
          />
          <div className="text-sm font-light">
            <h1>Yohana melkamu</h1>
            <h2 className="text-xs">@yohana</h2>
          </div>
        </div>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}

export default PhoneSidebar;
