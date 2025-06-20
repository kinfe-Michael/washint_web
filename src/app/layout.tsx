// Corrected RootLayout.tsx
import Header from "./components/header";
// import Sidebar from "./components/sidebar"; // If you have a sidebar, integrate it later
import "./globals.css";
// import BottomContainer from "./components/BottomContainer"; // If you have a fixed footer, integrate it later
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Still needed for your Scroller component, but not necessarily this root layout's structure

export const metadata = {
  title: "",
  description:
    "Layout with fixed header, sidebar, scrolling content, and fixed footer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </body>
    </html>
  );
}
