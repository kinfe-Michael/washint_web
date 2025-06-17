import BottomContainer from "./components/BottomContainer";
import MusicCard from "./components/MusicCard";
import Scroller from "./components/Scroller";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <div className="">
      <Sidebar />
      <BottomContainer />
      <div className="m-4 ml-2 mt-20 lg:ml-64">
        <Scroller title="favorite" >
          <MusicCard url="/yohana.jpg" alt="yohana" title="Yetalesh" artist="Yohana"/>
        </Scroller>
      </div>
    </div>
  );
}
