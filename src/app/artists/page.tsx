// app/artists/page.tsx

import PageWraper from '../components/PageWraper';
import { getArtists } from './action';
import ArtistList from './artist-list';
interface PageProps {
  searchParams: Promise<{ limit?: string; offset?: string }>; // For a single dynamic segment
}
export default async function ArtistsPage({
  searchParams,
}: PageProps) {
  
  const {offset} = await searchParams 
  const initialArtists = await getArtists(parseInt(offset || 'O'));

  return <PageWraper>
    <ArtistList initialArtists={initialArtists}/>
  </PageWraper>;
}