"use client";
import { cn } from "@/lib/utils";
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
