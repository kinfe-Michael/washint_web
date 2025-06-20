"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { CiSettings } from "react-icons/ci";
import { HiCheckCircle, HiClock, HiDotsVertical, HiHeart, HiMicrophone, HiMusicNote, HiSun, HiViewList } from "react-icons/hi";
import { HiLanguage, HiPlusCircle } from "react-icons/hi2";
import SidebarContent from "./SidebarContent";
function Sidebar() {




  return (
    <aside
      className={cn(
        "fixed hidden  bg-black  lg:flex flex-col  left-0 top-16 bottom-16 w-64  p-4 overflow-y-auto"
      )}
    >
     <SidebarContent/>
    </aside>
  );
}

export default Sidebar;
