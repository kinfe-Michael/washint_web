import PageWraper from "../components/PageWraper";
import InfiniteScroller from "../components/InfiniteScroller";
import { SongsApiResponse } from "../../lib/type";

// This is a Server Component, so no "use client" directive here.
// It can be an async function to fetch data directly.
export default async function Page() {
  let songsData: SongsApiResponse | null = null;
  let error: string | null = null;

  try {
    const response = await fetch("http://localhost:8000/api/songs/");
    if (!response.ok) {
      throw new Error("Failed to fetch initial songs");
    }
    songsData = await response.json();
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