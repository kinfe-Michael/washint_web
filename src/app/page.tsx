

import { SongsApiResponse } from "@/lib/type";
import PageWraper from "./components/PageWraper";
import InfiniteScroller from "./components/InfiniteScroller";
import { api } from "@/lib/utils";

export default async function Page() {
  let songsData: SongsApiResponse | null = null;
  let error: string | null = null;

  try {
    const response = await api.get("/songs/");
   
    songsData =  response.data
  } catch (err: any) {
    error = err.message;
  }

  return (
    <PageWraper>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <InfiniteScroller
          initialSongs={songsData?.results || []}
          initialNextPageUrl={songsData?.next || null}
        />
      )}
    </PageWraper>
  );
}