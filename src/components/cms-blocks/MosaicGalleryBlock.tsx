"use client";

import { useState } from "react";
import ImageLightbox, { LightboxImage } from "@/components/ImageLightbox";
import { Maximize2, Sparkles } from "lucide-react";

export interface GalleryItem {
  id?: string;
  url: string;
  title?: string;
  category?: string;
  span?: "normal" | "tall" | "wide" | "big";
}

export interface MosaicGalleryBlockData {
  title?: string;
  subtitle?: string;
  annotation?: string;
  layoutMode?: "mosaic" | "grid-3" | "grid-4";
  items?: GalleryItem[];
}

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    title: "15-Acre Green Campus Architecture",
    category: "Campus",
    span: "big"
  },
  {
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    title: "AI & Robotics Innovation Hub",
    category: "Academics",
    span: "normal"
  },
  {
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    title: "Primary Classroom Learning",
    category: "Academics",
    span: "tall"
  },
  {
    url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80",
    title: "Annual Sports Day Athletics",
    category: "Sports",
    span: "wide"
  },
  {
    url: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80",
    title: "Performing Arts & Drama Festival",
    category: "Arts",
    span: "normal"
  },
  {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    title: "Student Council Mentorship",
    category: "Events",
    span: "normal"
  }
];

export default function MosaicGalleryBlock({ data }: { data?: MosaicGalleryBlockData }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const title = data?.title || "Life at Faith Model School";
  const subtitle = data?.subtitle || "Explore vibrant moments from our classrooms, sports grounds, arts festivals, and campus celebrations.";
  const annotation = data?.annotation || "Photo Showcase";
  const items = data?.items || DEFAULT_GALLERY_ITEMS;
  const layoutMode = data?.layoutMode || "mosaic";

  const categories = ["All", ...Array.from(new Set(items.map(i => i.category).filter(Boolean))) as string[]];

  const filteredItems = items.filter(item => activeCategory === "All" || item.category === activeCategory);

  const lightboxImages: LightboxImage[] = filteredItems.map(item => ({
    url: item.url,
    title: item.title,
    category: item.category,
  }));

  const getItemSpanClass = (span?: string) => {
    if (layoutMode !== "mosaic") return "col-span-1";
    switch (span) {
      case "big": return "md:col-span-2 md:row-span-2 h-80 md:h-[420px]";
      case "wide": return "md:col-span-2 h-60 md:h-80";
      case "tall": return "md:row-span-2 h-80 md:h-[420px]";
      default: return "col-span-1 h-60 md:h-80";
    }
  };

  const getGridContainerClass = () => {
    switch (layoutMode) {
      case "grid-3": return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case "grid-4": return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";
      default: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px]";
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#FB7F05] font-semibold bg-[#FB7F05]/10 px-3.5 py-1.5 rounded-full inline-block">
            {annotation}
          </span>
          <h2 className="font-poppins font-bold text-gray-900 text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-5 py-2.5 rounded-full transition-all ${
                  activeCategory === cat
                    ? "bg-[#FB7F05] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Mosaic Grid */}
        <div className={`grid gap-4 ${getGridContainerClass()}`}>
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gray-200 ${getItemSpanClass(item.span)}`}
            >
              <img
                src={item.url}
                alt={item.title || "Gallery image"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  {item.category && (
                    <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                      {item.category}
                    </span>
                  )}
                  <div className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-md transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {item.title && (
                  <h3 className="font-semibold text-white text-base leading-snug drop-shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex ?? 0}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      </div>
    </section>
  );
}
