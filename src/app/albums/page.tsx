import PageWraper from "../components/PageWraper";
import AlbumsScroller from "./AlbumScroller";
import { AlbumsApiResponse } from "../../lib/type";

// This is a Server Component, so it can be an async function.
export default async function Page() {
  let albumsData: AlbumsApiResponse | null = null;
  let error: string | null = null;

  try {
    const response = await fetch("http://localhost:8000/api/albums/");
    if (!response.ok) {
      throw new Error("Failed to fetch initial albums");
    }
    albumsData = await response.json();
  } catch (err) {
    error = 'something went wrong!'
  }

  return (
    <PageWraper>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <AlbumsScroller
          initialAlbums={albumsData?.results || []}
          initialNextPageUrl={albumsData?.next || null}
        />
      )}
    </PageWraper>
  );
}