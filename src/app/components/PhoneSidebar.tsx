"use client"
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import Image from "next/image";
import { HiViewList } from "react-icons/hi";
import SidebarContent from "./SidebarContent";
import useUserState from "@/store/useUserState";
import { useEffect } from "react";
import { logout } from "@/lib/helperfunc";
import { useCustomRouter } from "@/hooks/useCustomRouter";
function PhoneSidebar() {
  const router = useCustomRouter()
  const {fetchData,data,isLogedIn,resetData} = useUserState()
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <Sheet>
      <SheetTrigger>
        <HiViewList className="lg:hidden  text-2xl" />
      </SheetTrigger>

      <SheetContent className="bg-[#161616] border-gray-700">
        <SheetHeader className="h-0">
          <SheetTitle className="text-white">Washint</SheetTitle>
        </SheetHeader>
       
        
        <SidebarContent SheetClose={SheetClose} />
        { isLogedIn &&
           <Button onClick={()=>{
            logout()
            resetData()
           }} className="bg-[#FF3B30] text-xs m-4  px-1 hover:bg-[#ff3a30d8] font-bold">
            Logout
          </Button>
         }
           {!isLogedIn && <>
         <Button onClick={()=>{
          router.push('/auth/login')
          
         }} className=" px-2 text-xs shadow-md hover:bg-gray-900 m-4 md:block font-bold">
            Login
          </Button>
          <Button onClick={()=>{
          router.push('/auth/signup')
          
         }} className="bg-[#FF3B30] text-xs m-4  px-1 hover:bg-[#ff3a30d8] font-bold">
            Sign up
          </Button>
         </> }
       
      </SheetContent>
    </Sheet>
  );
}

export default PhoneSidebar;
