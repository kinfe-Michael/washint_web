import MusicCard from "./components/MusicCard";
import PageWraper from "./components/PageWraper";
import Scroller from "./components/Scroller";

export default function Home() {
  return (
    <PageWraper>
      <Scroller title="favorite" routeTo="">
        <MusicCard
        musicUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
          imageUrl="/yohana.jpg"
          alt="yohana"
          title="hey-jude"
          artist="Yohana"
        />
         <MusicCard
        musicUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          imageUrl="/yohana.jpg"
          alt="yohana"
          title="hey-jude"
          artist="Yohana"
        />
         <MusicCard
        musicUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
          imageUrl="/yohana.jpg"
          alt="yohana"
          title="hey-jude"
          artist="Yohana"
        />
         <MusicCard
        musicUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
          imageUrl="/yohana.jpg"
          alt="yohana"
          title="hey-jude"
          artist="Yohana"
        />
         <MusicCard
        musicUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
          imageUrl="/yohana.jpg"
          alt="yohana"
          title="hey-jude"
          artist="Yohana"
        />
        
      </Scroller>
    </PageWraper>
  );
}
