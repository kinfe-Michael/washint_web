// app/music-detail/[titleSlug]/page.tsx



import { MusicDetailCard } from '@/app/components/MusicDetailCard';
import { MusicListItem } from '@/app/components/MusicListItem';
import PageWraper from '@/app/components/PageWraper';
import { SectionTitle } from '@/app/components/SectionTitle';
import { notFound } from 'next/navigation'; // For handling 404 if music not found
import { fetchMusicByArtist, fetchMusicBySlug, fetchRelatedMusic } from '../../data/music';

interface PageProps {
  params: Promise<{ titleSlug: string }> ; // Next.js automatically passes params for dynamic routes
}

export default async function MusicDetailPage( {params} : PageProps) {
  const { titleSlug } = await params;

  // Fetch the main music details
  const music = await fetchMusicBySlug(titleSlug);

  if (!music) {
    notFound(); // Renders Next.js's default 404 page if music is not found
  }

  // Fetch other music by the same artist
  const otherMusicByArtist = await fetchMusicByArtist(music.artist, music.titleSlug);

  // Fetch related songs (e.g., by genre)
  const relatedSongs = await fetchRelatedMusic(music.genre, music.titleSlug);

  return (
    <PageWraper>
      <div className="flex flex-col items-center p-4">
        {/* Main Music Detail Card */}
        <MusicDetailCard music={music} />

        {/* Other Music by Artist Section */}
        {otherMusicByArtist.length > 0 && (
          <div className="w-full max-w-4xl">
            <SectionTitle title={`More from ${music.artist}`} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherMusicByArtist.map((item) => (
                <MusicListItem key={item.id} music={item} />
              ))}
            </div>
          </div>
        )}

        {/* Related Songs Section */}
        {relatedSongs.length > 0 && (
          <div className="w-full max-w-4xl mt-8">
            <SectionTitle title="Related Songs" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedSongs.map((item) => (
                <MusicListItem key={item.id} music={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWraper>
  );
}
