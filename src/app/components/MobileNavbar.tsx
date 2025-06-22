"use client";
import React, { useState } from "react";
import { Home, Library, Search, Play } from "lucide-react"; // Importing icons from lucide-react
import { LucideIcon } from "lucide-react"; // Import the type for Lucide icons

export default function MobileNavbar() {
  const [activeLink, setActiveLink] = useState<string>("home");

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
        active={activeLink === "home"}
        onClick={() => setActiveLink("home")}
      />

      <NavItem
        icon={Library}
        label="Library"
        linkName="library"
        active={activeLink === "library"}
        onClick={() => setActiveLink("library")}
      />

      <NavItem
        icon={Search}
        label="Search"
        linkName="search"
        active={activeLink === "search"}
        onClick={() => setActiveLink("search")}
      />

      <NavItem
        icon={Play}
        label="Playing"
        linkName="playing"
        active={activeLink === "playing"}
        onClick={() => setActiveLink("playing")}
      />
    </nav>
  );
}

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  linkName: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  active,
  onClick,
}) => {
  return (
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
  );
};
