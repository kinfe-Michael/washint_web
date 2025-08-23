"use client";
import PageWraper from "@/app/components/PageWraper";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/utils";
import { useEffect, useState } from "react";
import ArtistDashboard from "./components/Dashboard";

function page() {
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
      {isArtist && <ArtistDashboard/>}
      {!isArtist && ShowBecomeArtist && (
        <Button
          onClick={() => {
            api
              .post("/artists/")
              .then((r) => {
                console.log(r);
              })
              .catch((e) => console.log(e));
          }}
        >
          Become An Artist
        </Button>
      )}
    </PageWraper>
  );
}

export default page;
