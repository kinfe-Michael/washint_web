import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";

function Scroller({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="max-w-dvw flex flex-col">
      <div className=" flex justify-between items-center mr-10 lg:mr-70 max-w-dvw">
         <h1 className="text-base font-bold">{capitalizeFirstLetter(title)}</h1>
        <h3 className="hover:underline text-xs cursor-pointer">Show all</h3>
      </div>

      <ScrollArea className=" overflow-y-auto w-full bg-black">
        <div className="flex flex-nowrap space-x-4">{children}</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default Scroller;
