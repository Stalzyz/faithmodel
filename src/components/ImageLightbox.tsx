"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  url: string;
  title?: string;
  altText?: string;
  category?: string;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && images.length > 1) {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight" && images.length > 1) {
        onNavigate((currentIndex + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 text-white select-none animate-fade-in"
      onClick={onClose}
    >
      {/* Header Bar */}
      <div className="flex justify-between items-center z-10">
        <div className="text-xs font-semibold tracking-wider bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>

        <button
          onClick={onClose}
          className="bg-white/10 hover:bg-white/30 text-white rounded-full p-2.5 backdrop-blur-md transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Preview Container */}
      <div 
        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-2 md:left-6 z-10 bg-black/40 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition-all hover:scale-110"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={currentImg.url}
          alt={currentImg.altText || currentImg.title || "Gallery preview"}
          className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300 transform scale-100"
        />

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-2 md:right-6 z-10 bg-black/40 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition-all hover:scale-110"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption Footer */}
      <div className="text-center z-10 space-y-1">
        {(currentImg.title || currentImg.altText) && (
          <h4 className="text-base font-semibold text-white drop-shadow-sm">
            {currentImg.title || currentImg.altText}
          </h4>
        )}
        {currentImg.category && (
          <span className="inline-block text-xs uppercase tracking-widest text-amber-400 font-medium">
            {currentImg.category}
          </span>
        )}
      </div>
    </div>
  );
}
