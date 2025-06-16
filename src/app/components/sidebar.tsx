"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { CiSettings } from "react-icons/ci";
import { HiCheckCircle, HiClock, HiDotsVertical, HiHeart, HiMicrophone, HiMusicNote, HiSun, HiViewList } from "react-icons/hi";
import { HiLanguage, HiPlusCircle } from "react-icons/hi2";
function Sidebar() {
  function SideBarcard({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) {
    return (
      <Card className="bg-[#161616] border-0">
        <CardHeader >
          <CardTitle className="text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start">{children}</CardContent>
      </Card>
    );
  }

  function SideBarButtons({ children }: { children: ReactNode }) {
    return <Button className="hover:text-gray-500">{children}</Button>;
  }

  return (
    <aside
      className={cn(
        "fixed hidden  bg-black  lg:flex flex-col gap-2  left-0 top-16 bottom-16 w-64  p-4 overflow-y-auto"
      )}
    >
      <SideBarcard title="Menu">
        <SideBarButtons>
          <HiSun />
          Discover
        </SideBarButtons>
        <SideBarButtons>
          <HiCheckCircle/>
          Albums
        </SideBarButtons>
        <SideBarButtons>
          <HiMicrophone/>
          Artist
        </SideBarButtons>
        <SideBarButtons>
          <HiMusicNote/>
          Song
        </SideBarButtons>
        <SideBarButtons>
        <CiSettings/>

          Settings
        </SideBarButtons>
        
      </SideBarcard>
      <SideBarcard title="Library">
        <SideBarButtons>
          <HiHeart className="text-red-600"/>
          Favorite
        </SideBarButtons>
        <SideBarButtons>
          <HiClock/>
          Recent
        </SideBarButtons>
      </SideBarcard>
      <SideBarcard title="Playlist">
        <SideBarButtons>
        <HiPlusCircle/>

          Create new
        </SideBarButtons>
        <SideBarButtons>
          <HiViewList/>
          Sad soul
        </SideBarButtons>
      </SideBarcard>
      <SideBarButtons>
          <HiLanguage/>
          language
        </SideBarButtons>
    </aside>
  );
}

export default Sidebar;
