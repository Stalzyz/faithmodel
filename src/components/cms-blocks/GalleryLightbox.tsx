"use client";

import { useState } from "react";
import { getAlbumMedia } from "@/actions/media";
import { X, ChevronLeft, ChevronRight, Loader2, FolderOpen } from "lucide-react";
import SketchReveal from "@/components/SketchReveal";

export default function GalleryLightbox({ albums }: { albums: any[] }) {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openAlbum = async (title: string) => {
    setLoading(true);
    setActiveAlbum(title);
    const res = await getAlbumMedia(title);
    if (res.success && res.media) {
      setMedia(res.media);
      setCurrentIndex(0);
      setLightboxOpen(true);
    }
    setLoading(false);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveAlbum(null);
    setMedia([]);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album, i) => (
          <SketchReveal key={album.title} delay={i * 0.1}>
            <div 
              onClick={() => openAlbum(album.title)}
              className="group cursor-pointer relative rounded-xl overflow-hidden aspect-[4/3] shadow-md border border-[rgba(74,74,94,0.08)] bg-gray-50 flex items-center justify-center"
            >
              {loading && activeAlbum === album.title && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                  <Loader2 className="w-8 h-8 animate-spin text-[#d4a017]" />
                </div>
              )}
              
              {album.cover ? (
                <img 
                  src={album.cover} 
                  alt={album.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              ) : (
                <FolderOpen className="w-16 h-16 text-gray-300" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-1 translate-y-2 group-hover:translate-y-0 transition-transform">{album.title}</h3>
                <p className="text-white/80 font-inter text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 delay-75">{album.count} Photos</p>
              </div>
            </div>
          </SketchReveal>
        ))}
      </div>

      {lightboxOpen && media.length > 0 && (
        <div className="fixed inset-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md flex items-center justify-center">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            onClick={prevImage}
            className="absolute left-6 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button 
            onClick={nextImage}
            className="absolute right-6 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="w-full max-w-5xl px-12 md:px-24">
            <div className="relative aspect-[16/9] flex items-center justify-center">
              <img 
                src={media[currentIndex].url} 
                alt={media[currentIndex].altText || activeAlbum || ""}
                className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
              />
            </div>
            
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-white/80 font-inter text-sm">
                <span className="font-semibold text-white">{activeAlbum}</span> • {currentIndex + 1} of {media.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
