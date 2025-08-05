import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ReactNode } from "react";
import NavLink from "./CustomNavLink";

function Scroller({ title, children,routeTo }: { title: string; children: ReactNode,routeTo:string }) {
  return (
    <div className="max-w-dvw flex flex-col">
      <div className=" flex justify-between items-center mr-10 lg:mr-70 max-w-dvw">
         <h1 className="text-base font-bold">{capitalizeFirstLetter(title)}</h1>
         <NavLink href={routeTo}>
        <h3 className="hover:underline text-xs cursor-pointer">Show all</h3>
         </NavLink>
      </div>

      <ScrollArea className=" overflow-y-auto w-full bg-black">
        <div className="flex flex-nowrap space-x-4">{children}</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default Scroller;
