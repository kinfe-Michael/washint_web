// components/Player.js
"use client";

import { Button } from "@/components/ui/button"; // Assuming you have shadcn/ui Button
import { useCallback, useEffect, useRef } from "react";

// Importing Zustand store from a separate file using a relative path for stability
import useWashintPlayer from "@/store/useWashintPlayer";

// Importing icons from react-icons/fa as requested
import {
  FaPause,
  FaPlay,
  FaRedo,
  FaStepBackward,
  FaStepForward,
  FaVolumeMute,
  FaVolumeUp
} from "react-icons/fa";
import Image from "next/image";


export default function Player() {
  // Extract state and actions from Zustand store
  const playing = useWashintPlayer((state) => state.playing);
  const played = useWashintPlayer((state) => state.played); // Current time in seconds
  const duration = useWashintPlayer((state) => state.duration);
  const volume = useWashintPlayer((state) => state.volume);
  const mute = useWashintPlayer((state) => state.mute);
  const seeking = useWashintPlayer((state) => state.seeking);
  const loop = useWashintPlayer((state) => state.repet); // Using 'repet' as per your store definition
  const currentTrack = useWashintPlayer((state) => state.currentTrack);

  const setDuration = useWashintPlayer((state) => state.setDuration);
  const setPlayed = useWashintPlayer((state) => state.setPlayed);
  const setPlaying = useWashintPlayer((state) => state.setPlaying);
  const setVolume = useWashintPlayer((state) => state.setVolume);
  const toggleMute = useWashintPlayer((state) => state.toggleMute);
  const setSeeking = useWashintPlayer((state) => state.setSeeking);
  const toggleLoop = useWashintPlayer((state) => state.togleRepet); // Using 'togleRepet' as per your store definition
  const setError = useWashintPlayer((state) => state.setError);

  // Reference to the HTML audio element
  const mediaRef = useRef<HTMLAudioElement>(null);

  // Load a default track when the component mounts if no track is currently loaded.
  // useEffect(() => {
  //   if (!currentTrack) {
  //     loadTrack({
  //       url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Use a direct MP3 URL
  //       artist: "SoundHelix",
  //       title: "SoundHelix Song 2",
  //       imageUrl: "/yohana.jpg", // Using a placeholder image URL
  //       titleSlug: "soundhelix-song-2",
  //       artistSlug: "soundhelix",
  //     });
  //   }
  // }, [currentTrack, loadTrack]); 

  // Effect to control play/pause based on Zustand 'playing' state
  useEffect(() => {
    const audio = mediaRef.current;
    if (!audio) return;

    if (playing) {
      audio.play().catch((err) => {
        console.error("Error playing audio:", err);
        setError(`Playback failed: ${err.message}`);
        setPlaying(false); // Ensure UI reflects paused state on error
      });
    } else {
      audio.pause();
    }
  }, [playing, setPlaying, setError]);

  // Effect to control volume and mute based on Zustand state
  useEffect(() => {
    const audio = mediaRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = mute;
    }
  }, [volume, mute]);

  // Callback for when audio metadata is loaded
  const handleLoadedMetadata = useCallback(() => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
    }
  }, [setDuration]);

  // Callback for time updates during playback
  const handleTimeUpdate = useCallback(() => {
    if (mediaRef.current && !seeking) {
      setPlayed(mediaRef.current.currentTime);
    }
  }, [seeking, setPlayed]);

  // Callback for when the audio ends
  const handleAudioEnded = useCallback(() => {
    setPlaying(false);
    setPlayed(0);
    // Add logic here to play the next song if desired
  }, [setPlaying, setPlayed]);

  // Callback for audio errors
  const handleAudioError = useCallback((event: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error("HTML Audio Element Error:", event);
    const audio = mediaRef.current;
    let errorMessage = "An unknown audio error occurred.";
    if (audio && audio.error) {
      switch (audio.error.code) {
        case audio.error.MEDIA_ERR_ABORTED:
          errorMessage = "Audio playback aborted by user.";
          break;
        case audio.error.MEDIA_ERR_NETWORK:
          errorMessage = "Network error: Audio download failed.";
          break;
        case audio.error.MEDIA_ERR_DECODE:
          errorMessage = "Audio decoding failed. Invalid format or corrupt file.";
          break;
        case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = "Audio source not supported by your browser.";
          break;
        default:
          errorMessage = "An unspecified audio error occurred.";
          break;
      }
    }
    setError(errorMessage);
  }, [setError]);

  // Handler for seekbar change (when user drags the thumb)
  const handleSeekChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Update the played state immediately for visual feedback
      setPlayed(parseFloat(event.target.value));
    },
    [setPlayed]
  );

  // Handler for seekbar mouse up (when user releases the thumb)
  const handleSeekMouseUp = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (mediaRef.current) {
        mediaRef.current.currentTime = parseFloat(event.currentTarget.value);
        setSeeking(false); // Stop seeking
        // If not playing, ensure it starts playing after seek
        if (!playing) {
          mediaRef.current.play().catch(err => {
            console.error("Error playing after seek:", err);
            setError(`Playback failed after seek: ${err.message}`);
            setPlaying(false); // Ensure state reflects failure
          });
          setPlaying(true); // Attempt to play after seek
        }
      }
    },
    [setSeeking, playing, setPlaying, setError]
  );

  // Handler for volume slider change
  const handleVolumeSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(event.target.value);
      setVolume(newVolume); // Update Zustand store
    },
    [setVolume]
  );

  // Direct handler for play/pause button click
  const handlePlayPause = useCallback(() => {
    const audio = mediaRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false); // Update Zustand state
    } else {
      audio.play().then(() => {
        setPlaying(true); // Update Zustand state only if play succeeds
      }).catch(err => {
        console.error("Error playing audio:", err);
        setError(`Playback failed: ${err.message}`);
        setPlaying(false); // Ensure state reflects failure
      });
    }
  }, [playing, setPlaying, setError]);


  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Calculate played percentage for seekbar background
  const playedPercentage = duration > 0 ? (played / duration) * 100 : 0;
  const volumePercentage = volume * 100;
if(!currentTrack) return 
  return (
    <div className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg flex items-center justify-between relative overflow-hidden h-16">
      {/* Custom styles for slider thumbs */}
      <style jsx>{`
        .seekbar-input::-webkit-slider-thumb {
          width: 14px;
          height: 14px;
          background-color: #dc2626; /* red-600 */
          border-radius: 9999px; /* rounded-full */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
          -webkit-appearance: none;
          appearance: none;
        }
        .seekbar-input::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background-color: #dc2626; /* red-600 */
          border-radius: 9999px; /* rounded-full */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
          -moz-appearance: none;
          appearance: none;
        }

        .volume-input::-webkit-slider-thumb {
          width: 12px;
          height: 12px;
          background-color: #dc2626; /* red-600 */
          border-radius: 9999px; /* rounded-full */
          -webkit-appearance: none;
          appearance: none;
        }
        .volume-input::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background-color: #dc2626; /* red-600 */
          border-radius: 9999px; /* rounded-full */
          -moz-appearance: none;
          appearance: none;
        }
      `}</style>

      {/* HTML5 Audio Element */}
      {currentTrack?.signed_audio_url && (
        <audio
          ref={mediaRef}
          src={currentTrack.signed_audio_url}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
          onError={handleAudioError}
          loop={loop}
          muted={mute}
          preload="auto"
        >
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Seekbar as Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-600">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step="any"
          value={played || 0}
          onChange={handleSeekChange}
          onMouseDown={() => setSeeking(true)}
          onMouseUp={handleSeekMouseUp}
          className="absolute top-0 left-0 w-full h-full appearance-none bg-transparent cursor-pointer seekbar-input"
          style={{
            background: `linear-gradient(to right, #FF3B30 0%, #ff3a30d8 ${playedPercentage}%, #ddd ${playedPercentage}%, #ddd 100%)`,
          }}
        />
      </div>

      {/* Main Player Content */}
      <div className="flex items-center w-full justify-between h-full">
        {/* Track Details and Time Display */}
        <div className="flex items-center h-full">
          {/* Album Art */}
          <div className="relative h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden mr-3">
            <Image
            layout="fill"
              className="rounded-lg object-cover w-full h-full"
              src={currentTrack?.signed_cover_url || "https://placehold.co/64x64/FF3B30/FFFFFF?text=Music"} 
              alt={currentTrack?.title || "Album Art"}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = "https://placehold.co/64x64/FF3B30/FFFFFF?text=Music"; // Fallback image on error
              }}
            />
          </div>
          {/* Song Info and Time Display */}
          <div className="flex flex-col justify-center">
            <h1 className="text-sm font-semibold line-clamp-1">
              {currentTrack?.title || "Unknown Title"}
            </h1>
            <h1 className="text-xs text-gray-400 line-clamp-1">
              {currentTrack?.artist.display_name || "Unknown Artist"}
            </h1>
            <div className="text-xs text-gray-400 mt-0.5">
              <span>{formatTime(played)}</span> / <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent hover:bg-gray-700 p-1 rounded-full h-8 w-8 flex items-center justify-center"
            aria-label="Previous Song"
          >
            <FaStepBackward size={20} />
          </Button>
          <Button
            onClick={handlePlayPause} 
            className="bg-transparent hover:bg-gray-700 p-1 rounded-full h-8 w-8 flex items-center justify-center"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
          </Button>
          <Button
            className="bg-transparent hover:bg-gray-700 p-1 rounded-full h-8 w-8 flex items-center justify-center"
            aria-label="Next Song"
          >
            <FaStepForward size={20} />
          </Button>
        </div>

        {/* Right-side Controls (Lyrics, Volume, Loop) */}
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent hover:bg-gray-700 p-1 rounded-full text-xs h-8 flex items-center justify-center"
            aria-label="Lyrics"
          >
            Lyrics
          </Button>
          <Button
            onClick={toggleMute}
            className="bg-transparent hover:bg-gray-700 p-1 rounded-full h-8 w-8 flex items-center justify-center"
            aria-label={mute ? "Unmute" : "Mute"}
          >
            {mute ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </Button>
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onChange={handleVolumeSliderChange}
            className="w-24 h-1 appearance-none bg-gray-600 rounded-full cursor-pointer volume-input"
            style={{
              background: `linear-gradient(to right, #FF3B30 0%, #ff3a30d8 ${volumePercentage}%, #ddd ${volumePercentage}%, #ddd 100%)`,
            }}
            aria-label="Volume Slider"
          />
          <Button
            onClick={toggleLoop}
            className={`bg-transparent hover:bg-gray-700 p-1 rounded-full h-8 w-8 flex items-center justify-center ${loop ? 'text-red-500' : 'text-white'}`}
            aria-label={loop ? "Disable Loop" : "Enable Loop"}
          >
            <FaRedo size={18} />
          </Button>
        </div>
      </div> 
    </div>
  );
}
