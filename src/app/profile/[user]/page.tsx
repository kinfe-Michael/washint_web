import MusicCard from "@/app/components/MusicCard";
import PageWraper from "@/app/components/PageWraper";
import Scroller from "@/app/components/Scroller";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HiBell } from "react-icons/hi";
import { getUserProfile } from "./getuserProfile";
import type { UserProfile } from "../../../lib/type";
interface PageProps {
  params: Promise<{ user: string }>; // For a single dynamic segment
  searchParams: Promise<{ type: string }>; // For a single dynamic segment
}
async function page({ params,searchParams }: PageProps) {
  const { user } = await params;
  const { type } = await searchParams;
  
  const { profile,isNew }: {profile:UserProfile,isNew:boolean | undefined}= await getUserProfile(user,type);
  if(isNew){
    console.log('new user alert')
  }
  const userType = "artist";
  if (!profile) {
    return <div className="text-black">Loading</div>;
  }
  return (
    <PageWraper>
      <div className="mb-10">
        <div className="flex flex-col md:flex-row items-center  lg:p-10 gap-4">
          <div className="flex min-w-64 gap-2 flex-col items-center justify-center">
            <Image
              className="rounded-full w-64  md:w-48"
              src={profile.profile_picture_url || "/yohana.jpg"}
              // src="/yohana.jpg"
              alt={profile.username}
              // alt="yohana"
              width={300}
              height={300}
            />
            <div className="flex gap-1">
              {user != 'my-profile' && <Button>Follow</Button>}
              {user == 'my-profile' && <Button>Edit Profile</Button>}
             {user != 'my-profile' && <Button>
                <HiBell />
              </Button>}
            </div>
          </div>

          <div className="text-white text-center md:text-left flex-grow">
            <h1 className="text-lg">{profile.display_name}</h1>
            <h1 className="text-sm">@{profile.username}</h1>
            <h1 className="text-sm"> {profile.followers_count} followers</h1>
            <h1 className="text-sm"> {profile.following_count} following</h1>
          </div>

          {profile.bio && profile.bio != '' && (
            <div className="max-w-3xl  text-sm p-4">
              <h1 className="text-lg">Bio</h1>
              <p className="text-gray-400">
             {profile.bio}
              </p>
            </div>
          )}
        </div>

        <div></div>
      </div>
      {/* <Scroller routeTo="" title="My songs">
        <MusicCard
          imageUrl="/yohana.jpg"
          musicUrl=""
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
      </Scroller> */}
    </PageWraper>
  );
}

export default page;
