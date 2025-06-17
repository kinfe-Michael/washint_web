import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MusicCard from "./MusicCard";
import { ReactNode } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";

function Scroller({title,children}:{title:string,children:ReactNode}) {
  return (
    <ScrollArea className="p-4">
        <h1 className="text-white text-xl font-bold">{capitalizeFirstLetter(title)}</h1>
      <div className="flex w-max p-4 space-x-4">
        {children}
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default Scroller;
