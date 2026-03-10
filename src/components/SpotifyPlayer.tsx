"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

// Placeholder tracks
const TRACKS = [
  {
    id: 1,
    title: "Chill Vibes",
    artist: "Lofi Beats",
    cover: "/about/cover.jpg",
    audioUrl: "https://actions.google.com/sounds/v1/water/rain_on_roof.ogg",
  },
  {
    id: 2,
    title: "Focus",
    artist: "Deep Work",
    cover: "/about/avatar.jpg",
    audioUrl: "https://actions.google.com/sounds/v1/nature/river_stream.ogg",
  },
];

export function SpotifyPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };
  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      setProgress(currentTime / (duration || 1));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value * audioRef.current.duration;
      setProgress(value);
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="w-full aspect-square bg-white/80 backdrop-blur-md border border-aluminum/30 rounded-[32px] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] text-carbon flex flex-col justify-between selection:bg-ash/20">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      <div className="flex flex-col gap-4">
        {/* Album Cover */}
        <div className="relative w-full aspect-square max-h-[180px] rounded-2xl overflow-hidden shadow-lg group mx-auto">
          <Image
            src={currentTrack.cover}
            alt={currentTrack.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Info */}
        <div className="flex flex-col items-center text-center gap-1">
          <h3 className="font-bold text-xl tracking-tight truncate w-full">{currentTrack.title}</h3>
          <p className="text-[10px] font-bold text-ash truncate uppercase tracking-[0.2em]">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Progress */}
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={progress || 0}
            onChange={handleSeek}
            className="w-full h-1 bg-aluminum/30 rounded-full appearance-none cursor-pointer accent-carbon hover:h-1.5 transition-all"
          />
          <div className="flex justify-between px-0.5">
            <span className="text-[9px] font-bold text-ash tabular-nums">
              {audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}
            </span>
            <span className="text-[9px] font-bold text-ash tabular-nums">
              {audioRef.current?.duration ? formatTime(audioRef.current.duration) : "0:00"}
            </span>
          </div>
        </div>

        {/* Controls Area */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prevTrack}
            className="text-ash hover:text-carbon transition-all active:scale-90"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          
          <button
            onClick={togglePlay}
            className="group relative flex items-center justify-center w-12 h-12 bg-carbon text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {isPlaying ? (
              <Pause size={20} fill="white" strokeWidth={0} />
            ) : (
              <Play size={20} fill="white" strokeWidth={0} className="ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="text-ash hover:text-carbon transition-all active:scale-90"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}
