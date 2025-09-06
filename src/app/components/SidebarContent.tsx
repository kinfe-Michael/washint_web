import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavLink from "./CustomNavLink";
import { ReactNode } from "react";
import { CiSettings } from "react-icons/ci";
import {
  HiCheckCircle,
  HiClock,
  HiHeart,
  HiMicrophone,
  HiMusicNote,
  HiSun,
  HiViewList
} from "react-icons/hi";
import CreatePlaylist from "./CreatePlaylist";
import PlaylistsBar from "./PlaylistBar";
function SidebarContent() {
  function SideBarButtons({
    children,
    routeTo,
  }: {
    children: ReactNode;
    routeTo: string;
  }) {
    return (
      <NavLink href={routeTo}>
        <Button className="hover:text-gray-500">{children}</Button>
      </NavLink>
    );
  }
  function SideBarcard({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) {
    return (
      <Card className="bg-[#161616] p-1 lg:p-4 gap-1 border-0">
        <CardHeader>
          <CardTitle className="text-white font-light">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start">
          {children}
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="flex text-sm flex-col gap-1">
      <SideBarcard title="Menu">
        <SideBarButtons routeTo="/discover">
          <HiSun />
          Discover
        </SideBarButtons>
        <SideBarButtons routeTo="/albums">
          <HiCheckCircle />
          Albums
        </SideBarButtons>
        <SideBarButtons routeTo="/artists">
          <HiMicrophone />
          Artist
        </SideBarButtons>
        <SideBarButtons routeTo="/songs">
          <HiMusicNote />
          Song
        </SideBarButtons>
         <SideBarButtons routeTo="/playlists">
          <HiMusicNote />
          Playlists
        </SideBarButtons>
        <SideBarButtons routeTo="/settings">
          <CiSettings />
          Settings
        </SideBarButtons>
      </SideBarcard>
      <SideBarcard title="Library">
        <SideBarButtons routeTo="/favorite">
          <HiHeart className="text-red-600" />
          Favorite
        </SideBarButtons>
        <SideBarButtons routeTo="/recent">
          <HiClock />
          Recent
        </SideBarButtons>
      </SideBarcard>
      <SideBarcard title="Playlist">
      <CreatePlaylist/>

       <PlaylistsBar/>
      </SideBarcard>
    </div>
  );
}

export default SidebarContent;
