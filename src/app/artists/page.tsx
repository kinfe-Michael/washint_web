// app/artists/page.tsx

import PageWraper from '../components/PageWraper';
import { getArtists } from './action';
import ArtistList from './artist-list';

export default async function ArtistsPage({
  searchParams,
}: {
  searchParams: { limit?: string; offset?: string };
}) {
  const offset = parseInt(searchParams.offset || '0', 10);

  const initialArtists = await getArtists(offset);

  return <PageWraper>
    <ArtistList initialArtists={initialArtists}/>
  </PageWraper>;
}