"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import SketchReveal from "@/components/SketchReveal";

export default function MoodboardHero({ block }: { block: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // A subtle scroll parallax for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const { headline, subheadline, primaryCtaLabel, primaryCtaHref, images } = block.data;

  // Provide fallback placeholder images if none are uploaded
  const img1 = images?.[0] || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop";
  const img2 = images?.[1] || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop";
  const img3 = images?.[2] || "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1470&auto=format&fit=crop";
  const img4 = images?.[3] || "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1470&auto=format&fit=crop";

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[90vh] min-h-[700px] bg-transparent flex items-center justify-center overflow-hidden border-b border-[rgba(74,74,94,0.08)] perspective-1000"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full border border-black/50" />
      </div>

      {/* Floating Polaroids (Moodboard) */}
      
      {/* Top Left */}
      <motion.div 
        initial={{ opacity: 0, x: -50, y: -50, rotate: -15 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: -6 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        drag
        dragConstraints={containerRef}
        className="absolute top-[10%] left-[10%] md:left-[15%] w-48 md:w-64 aspect-[4/5] p-2 md:p-3 bg-white shadow-xl shadow-black/5 rounded-sm z-10 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
      >
        <img src={img1} alt="" className="w-full h-full object-cover rounded-sm border border-gray-100" />
      </motion.div>

      {/* Bottom Right */}
      <motion.div 
        initial={{ opacity: 0, x: 50, y: 50, rotate: 15 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 8 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        drag
        dragConstraints={containerRef}
        className="absolute bottom-[10%] right-[10%] md:right-[15%] w-56 md:w-72 aspect-square p-2 md:p-3 bg-white shadow-xl shadow-black/5 rounded-sm z-10 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
      >
        <img src={img2} alt="" className="w-full h-full object-cover rounded-sm border border-gray-100" />
      </motion.div>

      {/* Top Right (smaller) */}
      <motion.div 
        initial={{ opacity: 0, x: 30, y: -30, rotate: 20 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 12 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        drag
        dragConstraints={containerRef}
        className="absolute top-[20%] right-[5%] md:right-[25%] w-32 md:w-48 aspect-square p-2 bg-white shadow-lg shadow-black/5 rounded-sm z-0 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform hidden md:block"
      >
        <img src={img3} alt="" className="w-full h-full object-cover rounded-sm border border-gray-100 filter sepia-[0.3]" />
      </motion.div>

      {/* Bottom Left (smaller) */}
      <motion.div 
        initial={{ opacity: 0, x: -30, y: 30, rotate: -20 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: -12 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        drag
        dragConstraints={containerRef}
        className="absolute bottom-[20%] left-[5%] md:left-[25%] w-40 md:w-56 aspect-[3/4] p-2 bg-white shadow-lg shadow-black/5 rounded-sm z-0 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform hidden md:block"
      >
        <img src={img4} alt="" className="w-full h-full object-cover rounded-sm border border-gray-100 filter grayscale-[0.5]" />
      </motion.div>


      {/* Central Content */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-20 text-center max-w-4xl px-6 pointer-events-none"
      >
        <SketchReveal delay={0.1}>
          <div className="font-caveat text-3xl md:text-5xl text-[#d4a017] mb-6 drop-shadow-sm">
            Welcome to
          </div>
        </SketchReveal>

        <SketchReveal delay={0.3}>
          <h1 className="font-cormorant text-6xl md:text-8xl lg:text-[7rem] leading-none font-bold text-[#1a1a2e] tracking-tight mb-8 drop-shadow-xl">
            {headline}
          </h1>
        </SketchReveal>

        <SketchReveal delay={0.5}>
          <p className="font-inter text-lg md:text-xl text-[#4a4a5e] max-w-2xl mx-auto mb-10 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/40 shadow-sm">
            {subheadline}
          </p>
        </SketchReveal>

        <SketchReveal delay={0.7}>
          {primaryCtaLabel && primaryCtaHref && (
            <div className="pointer-events-auto">
              <Link 
                href={primaryCtaHref}
                className="inline-flex items-center justify-center h-14 px-8 font-poppins text-sm font-semibold tracking-wider uppercase text-white bg-[#1a1a2e] hover:bg-[#d4a017] rounded-sm transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-1"
              >
                {primaryCtaLabel}
              </Link>
            </div>
          )}
        </SketchReveal>
      </motion.div>
    </section>
  );
}
