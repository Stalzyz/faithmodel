"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SketchReveal from "@/components/SketchReveal";
import { ArrowRight } from "lucide-react";

export default function GoldenHero({ block }: { block: any }) {
  const { headline, subheadline, quote, primaryCtaLabel, primaryCtaHref, mediaUrl, secondaryImageUrl } = block.data;

  // Placeholder imagery if none uploaded
  const mainImg = mediaUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop";
  const smallImg = secondaryImageUrl || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop";

  return (
    <section className="relative w-full h-auto md:h-[90vh] min-h-[700px] bg-[#fefcf3] overflow-hidden border-b border-[#FB7F05]/30">
      
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 graph-paper opacity-50 z-0" />

      {/* Main Grid Wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
        
        {/* LEFT COLUMN: 61.8% (Golden Ratio Large) */}
        <div className="w-full md:w-[61.8%] h-[50vh] md:h-full relative border-b md:border-b-0 md:border-r border-[#FB7F05]/30 overflow-hidden group">
          <motion.div 
            initial={{ scale: 1.1, filter: "blur(10px)", opacity: 0 }}
            animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img src={mainImg} alt="Hero Media" className="w-full h-full object-cover origin-center group-hover:scale-105 transition-transform duration-[10s] ease-out" />
            <div className="absolute inset-0 bg-[#1a1a2e]/20 group-hover:bg-[#1a1a2e]/10 transition-colors duration-1000" />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 38.2% (Golden Ratio Small) */}
        <div className="w-full md:w-[38.2%] h-full flex flex-col">
          
          {/* Box 1: Text & CTA (50% of the right column) */}
          <div className="flex-1 border-b border-[#FB7F05]/30 p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative overflow-hidden bg-[#fefcf3]">
            {/* Animated Draw Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-[1px] bg-[#FB7F05]"
            />

            <SketchReveal delay={0.4}>
              <h1 className="font-cormorant text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1a1a2e] leading-[1.05] tracking-tight mb-4">
                {headline}
              </h1>
            </SketchReveal>

            <SketchReveal delay={0.6}>
              <p className="font-inter text-[#4a4a5e] text-lg lg:text-xl mb-8 leading-relaxed max-w-sm">
                {subheadline}
              </p>
            </SketchReveal>

            <SketchReveal delay={0.8}>
              {primaryCtaLabel && primaryCtaHref && (
                <Link 
                  href={primaryCtaHref}
                  className="group inline-flex items-center gap-4 font-poppins text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a2e] hover:text-[#FB7F05] transition-colors"
                >
                  <span className="pb-1 border-b border-[#1a1a2e] group-hover:border-[#FB7F05] transition-colors">{primaryCtaLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </SketchReveal>
          </div>

          {/* Bottom Split (50% of the right column) -> Divided again into 2 boxes horizontally */}
          <div className="flex-1 flex flex-col sm:flex-row">
            
            {/* Box 2: Quote (Left side of the bottom split) */}
            <div className="flex-1 border-b sm:border-b-0 sm:border-r border-[#FB7F05]/30 p-8 flex items-center justify-center relative bg-[#1a1a2e] text-[#fefcf3]">
               <motion.div 
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[1px] bg-[#FB7F05]/50 hidden sm:block"
              />
              <SketchReveal delay={1.0}>
                <div className="text-center">
                  <span className="text-[#FB7F05] text-4xl leading-none font-cormorant absolute -mt-4 -ml-4">"</span>
                  <p className="font-caveat text-2xl lg:text-3xl text-white/90 leading-tight px-4 drop-shadow-sm">
                    {quote}
                  </p>
                  <span className="text-[#FB7F05] text-4xl leading-none font-cormorant absolute ml-1 mt-2">"</span>
                </div>
              </SketchReveal>
            </div>

            {/* Box 3: Secondary Image (Right side of the bottom split) */}
            <div className="flex-1 relative overflow-hidden group min-h-[250px]">
              <motion.div 
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img src={smallImg} alt="Secondary Hero Media" className="w-full h-full object-cover filter grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[5s] ease-out" />
                <div className="absolute inset-0 border-[8px] border-[#fefcf3]/20" />
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
