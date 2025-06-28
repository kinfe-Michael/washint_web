import BottomContainer from "./components/BottomContainer";
import MusicCard from "./components/MusicCard";
import PageWraper from "./components/PageWraper";
import Scroller from "./components/Scroller";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <PageWraper>
      <Scroller title="favorite" routeTo="">
        <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="hey-jude"
          artist="Yohana"
        />
      </Scroller>
    </PageWraper>
  );
}
