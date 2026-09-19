"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Play, Pause } from "lucide-react";

export interface ShowreelSlide {
  id?: string;
  imageUrl: string;
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const DEFAULT_SLIDES: ShowreelSlide[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80",
    tag: "A PROGRESSIVE LEARNING VILLAGE",
    titleLine1: "Empowering",
    titleLine2: "Future Minds",
    subtitle: "Nurturing young innovators through inquiry-based CBSE curriculum and 15-acre green campus.",
    ctaLabel: "APPLY FOR ADMISSION",
    ctaHref: "/admissions"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
    tag: "WORLD-CLASS INFRASTRUCTURE",
    titleLine1: "Inquiry &",
    titleLine2: "Discovery",
    subtitle: "State-of-the-art AI STEM labs, sports arenas, and creative arts studios built for holistic growth.",
    ctaLabel: "EXPLORE CAMPUS",
    ctaHref: "/campus"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
    tag: "HOLISTIC EDUCATION",
    titleLine1: "Beyond The",
    titleLine2: "Textbook",
    subtitle: "Fostering leadership, ethics, and critical thinking with personalized guidance for every child.",
    ctaLabel: "DISCOVER PROGRAMS",
    ctaHref: "/academics"
  }
];

export default function ShowreelHeroBlock({ block }: { block?: any }) {
  const data = block?.data || {};
  const slides: ShowreelSlide[] = data.slides && data.slides.length > 0 ? data.slides : DEFAULT_SLIDES;
  const autoPlayInterval = data.autoPlayInterval || 6000;
  const headerLogoText = data.headerLogoText || "SHOW REEL";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Auto-play timer effect
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length, autoPlayInterval, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex] || DEFAULT_SLIDES[0];
  const formattedIndex = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(slides.length).padStart(2, "0");

  const slideVariants: any = {
    initial: (dir: number) => ({
      opacity: 0,
      scale: 1.08,
      x: dir > 0 ? 40 : -40
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut"
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? -40 : 40,
      transition: {
        duration: 0.7,
        ease: "easeIn"
      }
    })
  };

  const textVariants: any = {
    hidden: { opacity: 0, y: 35 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + (i || 0) * 0.1,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] bg-black text-white overflow-hidden select-none font-sans">
      {/* Background Image Carousel with Overlay */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.titleLine1}
            className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.08]"
          />
          {/* Subtle Dark Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* TOP BAR OVERLAY */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 sm:px-12 py-8 flex justify-between items-center text-xs tracking-[0.25em] font-mono text-white/80 border-b border-white/10 backdrop-blur-[2px]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FB7F05] animate-ping" />
          <span className="font-bold text-white tracking-[0.3em] uppercase">{headerLogoText}</span>
        </div>

        {/* Slide Counter (e.g. 01 / 03) */}
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-[#FB7F05] font-bold">{formattedIndex}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/60">{formattedTotal}</span>
        </div>
      </div>

      {/* LEFT & RIGHT SIDE NAV BUTTONS */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2 text-white/60 hover:text-white transition-all uppercase text-[11px] tracking-[0.3em] font-mono group py-6 px-2"
      >
        <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#FB7F05] group-hover:bg-[#FB7F05]/20 flex items-center justify-center transition-all">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform text-white" />
        </div>
        <span className="hidden md:inline -rotate-90 origin-center text-white/50 group-hover:text-white">PREV</span>
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2 text-white/60 hover:text-white transition-all uppercase text-[11px] tracking-[0.3em] font-mono group py-6 px-2"
      >
        <span className="hidden md:inline -rotate-90 origin-center text-white/50 group-hover:text-white">NEXT</span>
        <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#FB7F05] group-hover:bg-[#FB7F05]/20 flex items-center justify-center transition-all">
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform text-white" />
        </div>
      </button>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-8 sm:px-16 md:px-24 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} className="max-w-4xl space-y-4 md:space-y-6">
            {/* Tag / Category Badge */}
            {currentSlide.tag && (
              <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible">
                <span className="inline-block font-mono text-xs sm:text-sm tracking-[0.35em] text-[#FB7F05] font-semibold uppercase bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#FB7F05]/30">
                  {currentSlide.tag}
                </span>
              </motion.div>
            )}

            {/* Oversized Dynamic Headline */}
            <motion.div custom={1} variants={textVariants} initial="hidden" animate="visible" className="space-y-1">
              <h1 className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold text-white leading-[0.95] tracking-tight drop-shadow-2xl">
                {currentSlide.titleLine1}
              </h1>
              {currentSlide.titleLine2 && (
                <h2 className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold text-[#FB7F05] leading-[0.95] tracking-tight drop-shadow-2xl italic">
                  {currentSlide.titleLine2}
                </h2>
              )}
            </motion.div>

            {/* Subtitle / Description */}
            {currentSlide.subtitle && (
              <motion.p
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="font-inter text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl drop-shadow-md pt-2"
              >
                {currentSlide.subtitle}
              </motion.p>
            )}

            {/* Call to Action Button */}
            {currentSlide.ctaLabel && (
              <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible" className="pt-6">
                <Link
                  href={currentSlide.ctaHref || "/admissions"}
                  className="group inline-flex items-center gap-4 bg-white text-black hover:bg-[#FB7F05] hover:text-white px-8 sm:px-10 py-4 sm:py-5 rounded-none font-poppins text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(251,127,5,0.5)]"
                >
                  <span>{currentSlide.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM CONTROLS & TIMELINE BAR */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-6 sm:px-12 py-6 flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 border-t border-white/10 backdrop-blur-sm bg-black/40">
        {/* Play/Pause Button & Timer Bar */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-[#FB7F05]" /> : <Play className="w-4 h-4 text-white fill-white" />}
          </button>

          {/* Animated Timeline Progress Line */}
          <div className="flex-1 sm:w-64 h-1 bg-white/20 rounded-full overflow-hidden relative">
            {isPlaying && (
              <motion.div
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
                className="h-full bg-[#FB7F05]"
              />
            )}
          </div>
        </div>

        {/* Thumbnail Dots Navigation */}
        <div className="flex items-center gap-3">
          {slides.map((s, idx) => (
            <button
              key={s.id || idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 transition-all duration-300 rounded-full ${
                idx === currentIndex ? "w-8 bg-[#FB7F05]" : "w-2.5 bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
