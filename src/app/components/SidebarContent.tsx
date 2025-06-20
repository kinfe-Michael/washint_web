import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { CiSettings } from "react-icons/ci";
import {
  HiCheckCircle,
  HiClock,
  HiDotsVertical,
  HiHeart,
  HiMicrophone,
  HiMusicNote,
  HiSun,
  HiViewList,
} from "react-icons/hi";
import { HiLanguage, HiPlusCircle } from "react-icons/hi2";
function SidebarContent() {
  function SideBarButtons({ children }: { children: ReactNode }) {
    return <Button className="hover:text-gray-500">{children}</Button>;
  }
  function SideBarcard({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) {
    return (
      <Card className="bg-[#161616] p-1 lg:p-4 gap-1 border-0">
        <CardHeader>
          <CardTitle className="text-white font-light">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start">
          {children}
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="flex text-sm flex-col gap-1">
      <SideBarcard title="Menu">
        <SideBarButtons>
          <HiSun />
          Discover
        </SideBarButtons>
        <SideBarButtons>
          <HiCheckCircle />
          Albums
        </SideBarButtons>
        <SideBarButtons>
          <HiMicrophone />
          Artist
        </SideBarButtons>
        <SideBarButtons>
          <HiMusicNote />
          Song
        </SideBarButtons>
        <SideBarButtons>
          <CiSettings />
          Settings
        </SideBarButtons>
      </SideBarcard>
      <SideBarcard title="Library">
        <SideBarButtons>
          <HiHeart className="text-red-600" />
          Favorite
        </SideBarButtons>
        <SideBarButtons>
          <HiClock />
          Recent
        </SideBarButtons>
      </SideBarcard>
      <SideBarcard title="Playlist">
        <SideBarButtons>
          <HiPlusCircle />
          Create new
        </SideBarButtons>
        <SideBarButtons>
          <HiViewList />
          Sad soul
        </SideBarButtons>
      </SideBarcard>
      
    </div>
  );
}

export default SidebarContent;
