"use client" 
import ReactPlayer from "react-player";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import useWashintPlayer from "@/store/useWashintPlayer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaPause, FaPlay, FaStepBackward, FaStepForward, FaVolumeUp } from "react-icons/fa";
export default function Player() {

  

  //   const formatTime = (seconds: number) => {
  //   if (isNaN(seconds) || seconds < 0) return "0:00";
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = Math.floor(seconds % 60);
  //   return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  // };
  return (
    <div
    className=" w-full"
    >
      <ReactPlayer
        slot="media"
        src="https://www.google.com/search?q=https://cdn.zapsplat.com/music/free_sound_effects_downloads/zapsplat_musical_chime_simple_short_bright_happy_002.mp3"
        controls={false}
        style={{
          width: "100%",
          height: "100%",
        //   "--controls": "none",
        }}
      ></ReactPlayer>
      <div className="seekbar-wrapper relative w-full flex items-center mb-4">
 <div className="absolute top-0 w-full h-1 bg-gray-500 rounded-full overflow-hidden">
      {/*
        The underlying div that acts as the "track" or static background.
        It has w-full and h-1 as requested.
      */}
      {/*
        The draggable range input.
        - absolute top-0 left-0 w-full h-full makes it perfectly overlay the parent div.
        - appearance-none removes default browser styling.
        - bg-transparent makes its own background invisible so the parent's background shows.
        - Pseudo-elements [::-webkit-slider-thumb] and [::-moz-range-thumb] style the thumb.
        - The `style` attribute with `linear-gradient` creates the progress fill for the track.
      */}
      <input
        type="range"
        min={0}
        max={1} // Assuming a 0-1 range for percentage
        step="any"
        // value={0.5}
        // onMouseDown={handleMouseDown}
        // onChange={handleChange}
        // onMouseUp={handleMouseUp}
        className="
          absolute top-0 left-0 w-full h-full
          appearance-none bg-transparent cursor-pointer
          [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-red-800 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none
          [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:bg-red-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:appearance-none
        "
        style={{
          // This creates the filled-in track effect
          background: `linear-gradient(to right, #FF3B30 0%, #ff3a30d8 ${0.5 * 100}%, #ddd ${0.5 * 100}%, #ddd 100%)`
        }}
      />
    </div>      
     <div className="relative flex h-16 w-16 ">
        <Image
        className="rounded-full p-1"
        layout="fill"
        src={"/yohana.jpg"}
        alt="yohana"
        />
      
       </div>
         <div className="m-2 md:mr-10">
          <h1>yetalesh</h1>
          <h1 className="text-gray-500 text-sm">Yohana</h1>
        </div>
      
       
        <Button className="bg-transparent hover:bg-gray-900">
          <FaStepBackward/>
        </Button>
        <Button className="bg-transparent hover:bg-gray-900">
          <FaPlay/>
        </Button>
        <Button className="bg-transparent hover:bg-gray-900">
          <FaPause/>
        </Button>
       
         <Button className="bg-transparent hover:bg-gray-900">
          <FaStepForward/>
        </Button>
        <div className="flex-grow">
        </div>
         <Button className="bg-transparent  hover:bg-gray-900">
          Lyrics
        </Button>
                 <Button className="bg-transparent hover:bg-gray-900">
          <FaVolumeUp/>
        </Button>
             <input
            type="range"
            min={0}
            max={1}
            step="any"
            // value={0.4}
            // onChange={(e) => setVolume(parseFloat(e.target.value))} // Use Zustand action
            className="w-24 h-1 appearance-none bg-gray-600 rounded-full cursor-pointer
                       [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none
                       [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-red-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:appearance-none"
             style={{
                  background: `linear-gradient(to right, #FF3B30 0%, #ff3a30d8 ${0.4 * 100}%, #ddd ${0.4 * 100}%, #ddd 100%)`
              }}
          />
        
      </div>
    </div>
  );
}