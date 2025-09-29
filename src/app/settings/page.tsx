"use client"
import { Button } from "@/components/ui/button";
import PageWraper from "../components/PageWraper"
import SettingButtons from "./components/SettingButtons"
import { api } from "@/lib/utils";
import { useEffect, useState } from "react";


function Page() {
  const [isArtist, setIsArtist] = useState(false);
  const [ShowBecomeArtist, setShowBecomeArtist] = useState(false);
    useEffect(() => {
    api
      .get("/artists/")
      .then((r) => {
        if (r.data.results[0]) {
          setIsArtist(true);
        } else setIsArtist(false);
        setShowBecomeArtist(true)
      })
      .catch((e) => {
        setShowBecomeArtist(false)
      });
  }, []);
  return (
    <PageWraper>
      {!isArtist && ShowBecomeArtist && (
        <Button
          onClick={() => {
            api
              .post("/artists/")
              .then((r) => {
                console.log(r);
                setIsArtist(true)
              })
              .catch((e) => console.log(e));
          }}
          
        >
          Become An Artist
        </Button>
      )}
        <h1 className="text-xl ml-4 font-bold">settings</h1>
{   isArtist &&     <SettingButtons text="Artist Dashbord" url="/settings/addNewContent"/>
}        <SettingButtons text="Change password" url="/settings/change-password"/>
    </PageWraper>
  )
}

export default Page