"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ChapterProps {
  title: string;
  heading: string;
  subheading: string;
  icon: LucideIcon;
  imageSrc: string;
  reverse?: boolean;
}

export default function Chapter({ title, heading, subheading, icon: Icon, imageSrc, reverse = false }: ChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this specific chapter's container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Stage 1: SVG Path Drawing (Pencil)
  const pathLength = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const iconOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.4, 0.5], [0, 1, 1, 0]);

  // Stage 2 & 3: Image Fade In & Filter Transition (Watercolor to Reality)
  const imageOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const imageGrayscale = useTransform(scrollYProgress, [0.4, 0.7], [100, 0]);
  const imageSepia = useTransform(scrollYProgress, [0.4, 0.7], [50, 0]);

  // Stage 4: Typography fade in
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.7], [30, 0]);

  return (
    <div ref={containerRef} className="min-h-[120vh] relative flex items-center justify-center border-b border-slate-200/50 py-32 px-4 md:px-12 lg:px-24">
      
      <div className={`w-full max-w-7xl flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-32`}>
        
        {/* Visual Storytelling Side */}
        <div className="w-full lg:w-1/2 relative h-[50vh] md:h-[60vh] flex items-center justify-center">
          
          {/* Sketch Phase */}
          <motion.div 
            style={{ opacity: iconOpacity }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <motion.div style={{ pathLength }} className="text-slate-700">
              <Icon strokeWidth={1.5} className="w-48 h-48 md:w-64 md:h-64" />
            </motion.div>
          </motion.div>

          {/* Reality Phase (The Image) - Removed blur and drop shadows */}
          <motion.div 
            style={{ 
              opacity: imageOpacity,
              filter: useTransform(
                [imageGrayscale, imageSepia],
                ([g, s]) => `grayscale(${g}%) sepia(${s}%)`
              ) as unknown as string
            }}
            className="absolute inset-0 w-full h-full z-10"
          >
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover rounded-sm"
            />
          </motion.div>

        </div>

        {/* Typography / Content Side */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="w-full lg:w-1/2 flex flex-col justify-center"
        >
          <span className="font-sans text-sm font-bold tracking-[0.3em] text-slate-400 uppercase mb-4">{title}</span>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-800 mb-8 leading-tight">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-inter font-light leading-relaxed mb-10">
            {subheading}
          </p>
          <div className="w-16 h-px bg-slate-300"></div>
        </motion.div>

      </div>
    </div>
  );
}
