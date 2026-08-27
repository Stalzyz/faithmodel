"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

export interface VideoBlockData {
  title?: string;
  subtitle?: string;
  annotation?: string;
  videoSource?: "youtube" | "local";
  videoUrl?: string;
  posterImage?: string;
  caption?: string;
}

function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1` : null;
}

export default function VideoBlock({ data }: { data?: VideoBlockData }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const title = data?.title || "Experience Life at Faith Model School";
  const subtitle = data?.subtitle || "Take a virtual walkthrough of our 15-acre green campus, state-of-the-art AI labs, and vibrant student community.";
  const annotation = data?.annotation || "Campus Tour & Highlights";
  const poster = data?.posterImage || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80";
  const source = data?.videoSource || "youtube";
  const url = data?.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  const youtubeEmbedUrl = getYoutubeEmbedUrl(url);

  return (
    <section className="py-20 bg-[#1a1a2e] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#FB7F05] font-semibold bg-[#FB7F05]/10 px-3.5 py-1.5 rounded-full inline-block">
            {annotation}
          </span>
          <h2 className="font-poppins font-bold text-white text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-black aspect-video max-w-4xl mx-auto">
          {!isPlaying ? (
            <div className="relative w-full h-full">
              <img
                src={poster}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-[#FB7F05] hover:bg-white text-white hover:text-[#1a1a2e] flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110"
                  aria-label="Play Video"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full bg-black">
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-20 bg-black/60 text-white rounded-full p-2 hover:bg-black transition-colors"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
              </button>

              {source === "youtube" && youtubeEmbedUrl ? (
                <iframe
                  src={youtubeEmbedUrl}
                  title={title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          )}
        </div>

        {data?.caption && (
          <p className="text-center text-xs text-gray-400 italic">
            {data.caption}
          </p>
        )}
      </div>
    </section>
  );
}
