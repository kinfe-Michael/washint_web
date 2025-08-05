"use client";
import { openSearchBar } from "@/lib/searchStateOperation";
import { Home, Library, LucideIcon, Play, Search } from "lucide-react"; // Importing icons from lucide-react
import React, { useState } from "react";
import NavLink from "./CustomNavLink";
import { useCustomRouter } from "@/hooks/useCustomRouter";

export default function MobileNavbar() {
  const [activeLink, setActiveLink] = useState<string>("home");
  const router = useCustomRouter()
  return (
    <nav
      className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-2
                 flex justify-around items-center rounded-t-xl shadow-lg
                 md:hidden z-50"
    >
      <NavItem
        icon={Home}
        label="Home"
        linkName="home"
        routeTo={"/"}
        active={activeLink === "home"}
        onClick={() => {
          setActiveLink("home")
          router.push("/")
        }}
      />

      <NavItem
        icon={Library}
        label="Library"
        linkName="library"
        routeTo={"/playlist"}
        active={activeLink === "library"}
        onClick={() => {
          setActiveLink("library")
          router.push("/library")
        }}
      />

      <NavItem
        icon={Search}
        label="Search"
        linkName="search"
        routeTo={""}
        active={activeLink === "search"}
        onClick={() => {
          setActiveLink("search")
          openSearchBar()
        }}
      />

      <NavItem
        icon={Play}
        label="Playing"
        linkName="playing"
        routeTo={"/song"}
        active={activeLink === "playing"}
        onClick={() => {
          setActiveLink("playing")
          router.push("/playing")
        }}
      />
    </nav>
  );
}

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  linkName: string;
  active: boolean;
  routeTo:string;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  active,
  onClick,
  routeTo,
}) => {
 

  return (
    <NavLink href={routeTo}>
      <button
      className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors duration-200
                  ${
                    active
                      ? "text-[#eb5048] bg-gray-800"
                      : "text-gray-400 hover:text-blue-300 hover:bg-gray-800"
                  }`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon size={24} />

      <span className="text-xs mt-1 font-medium font-inter">{label}</span>
    </button>
    </NavLink>
  
  );
};
