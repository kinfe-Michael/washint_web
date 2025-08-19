// app/artists/page.tsx

import PageWraper from '../components/PageWraper';
import { getArtists } from './action';
import ArtistList from './artist-list';

export default async function ArtistsPage({
  searchParams,
}: {
  searchParams: { limit?: string; offset?: string };
}) {
  const limit = parseInt(searchParams.limit || '10', 10);
  const offset = parseInt(searchParams.offset || '0', 10);

  const initialArtists = await getArtists(limit, offset);

  return <PageWraper>
    <ArtistList initialArtists={initialArtists} limit={limit} />
  </PageWraper>;
}