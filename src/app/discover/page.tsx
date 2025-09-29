export const dynamic = 'force-dynamic';

import PageWraper from "../components/PageWraper";
import InfiniteScroller from "../components/InfiniteScroller";
import { SongsApiResponse } from "../../lib/type";
import { api } from "@/lib/utils";

// This is a Server Component, so no "use client" directive here.
// It can be an async function to fetch data directly.
export default async function Page() {
  let songsData: SongsApiResponse | null = null;
  let error: string | null = null;

  try {
    const response = await api.get("http://localhost:8000/api/songs/");
    
    songsData = await response.data;
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