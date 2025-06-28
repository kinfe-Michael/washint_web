"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";
import { HiPlusCircle } from "react-icons/hi";

function CreatePlaylist() {
    
    function CreatePlaylistForm(){
        return (
             <form className="bg-black ml-0 mb-10 lg:ml-10  gap-4 flex flex-col rounded-md border-gray-600 text-white">
              <Label>Playlist title</Label>
              <Input />
              <Button className="bg-[#FF3B30]">Create Playlist</Button>
            
            </form>
        )
    }
  return (
    <div>
      <div className="flex lg:hidden">
        <Drawer>
          <DrawerTrigger className="text-white indent-2">
            {/* <HiPlusCircle className="text-xl m-2" /> */}
           &#43; Create new
          </DrawerTrigger>
          <DrawerContent className="bg-black border-gray-600 text-white">
            <DrawerHeader className="">
              <DrawerTitle className="text-white">Create Playlist</DrawerTitle>
              
            </DrawerHeader>
            <DrawerFooter>
             
             <CreatePlaylistForm/>
             
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="bg-black hidden lg:flex">
        <Popover>
          <PopoverTrigger className="text-white flex  items-center">
            <HiPlusCircle className="text-xl m-2" />
            Create new
          </PopoverTrigger>
          <PopoverContent className="bg-black border-0">
           <CreatePlaylistForm/>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default CreatePlaylist;
