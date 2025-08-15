import MusicCard from "@/app/components/MusicCard";
import PageWraper from "@/app/components/PageWraper";
import Scroller from "@/app/components/Scroller";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import { getUserProfile } from "./getuserProfile";

interface PageProps {
  params: Promise<{ user: string }>; // For a single dynamic segment
}
async function page({ params }: PageProps) {
  const { user } = await params;
  const profileData = getUserProfile(user);
  const userType = "artist";
  return (
    <PageWraper>
      <div>
        <div className="flex flex-col md:flex-row items-center  gap-4">
          <Image
            className="rounded-full w-32 mdw-48"
            src="/yohana.jpg"
            alt="yohana"
            width={300}
            height={300}
          />
          <div className="text-white">
            <h1>yohana</h1>
            <h1 className="text-xs">@yohan12</h1>
          </div>
          {userType === "artist" && (
            <div className="flex flex-col">
              <Button>
                <HiPlus />
                Realese song
              </Button>
              <Button>
                <HiPlus />
                Release album
              </Button>
            </div>
          )}
          <div></div>
        </div>
      </div>
      <Scroller routeTo="" title="My songs">
        <MusicCard
          imageUrl="/yohana.jpg"
          musicUrl=""
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
      </Scroller>
    </PageWraper>
  );
}

export default page;
