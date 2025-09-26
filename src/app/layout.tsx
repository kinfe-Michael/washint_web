"use client"
import useUserState from "@/store/useUserState";
import BottomContainer from "./components/BottomContainer";
import Header from "./components/header";
import ProgressBar from "./components/ProgressBar";
import "./globals.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Still needed for your Scroller component, but not necessarily this root layout's structure
import { useEffect } from "react";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchData = useUserState(state=>state.fetchData)
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <html lang="en">
      <body className="flex flex-col max-w-screen min-h-screen bg-black text-white">
        <div className=" mx-auto flex-grow w-full">
          <div className="flex flex-col flex-1">
            <Header />
            <ScrollArea className="flex-1">
              {children}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        </div>
        <ProgressBar/>
        <BottomContainer/>
      </body>
    </html>
  );
}
