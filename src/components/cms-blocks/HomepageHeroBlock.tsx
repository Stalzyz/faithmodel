"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HomepageHeroBlock({ block }: { block?: any }) {
  const data = block?.data || {};

  const ribbonText = data.ribbonText || "Admissions for 2026–27 are now open";
  const ribbonCtaText = data.ribbonCtaText || "Apply Today";
  const annotation = data.annotation || "Faith Model School — Est. 2014";
  const headlineLine1 = data.headlineLine1 || "Every Great Future";
  const headlineLine2 = data.headlineLine2 || "Begins With A";
  const highlightWord = data.highlightWord || "Single Sketch.";
  const subtitle = data.subtitle || "Every child begins with a blank page. Through curiosity, creativity, and confidence, those pages become a story worth telling.";
  const primaryCtaLabel = data.primaryCtaLabel || "Begin the Story";
  const primaryCtaHref = data.primaryCtaHref || "/admissions";
  const secondaryCtaLabel = data.secondaryCtaLabel || "Virtual Tour ↗";
  const secondaryCtaHref = data.secondaryCtaHref || "/campus";

  const pencilRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<SVGSVGElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pencilRef.current || !sketchRef.current) return;
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(pencilRef.current,
      { opacity: 0, x: "30%", y: "-15%", rotation: -25 },
      { opacity: 1, x: "0%", y: "0%", rotation: 12, duration: 0.6, ease: "power3.out" }
    );

    const paths = sketchRef.current.querySelectorAll("path,line,circle,rect,polyline,ellipse");
    paths.forEach((p) => {
      const len = (p as SVGGeometryElement).getTotalLength?.() || 200;
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });

    tl.add("startAnimation", "-=0.2");

    tl.to(paths, { strokeDashoffset: 0, duration: 1.8, stagger: 0.05, ease: "power1.inOut" }, "startAnimation");
    tl.to(pencilRef.current, { x: "50%", y: "-80%", opacity: 0, rotation: 50, duration: 0.7, ease: "power2.in" }, "startAnimation+=1.2");
    
    const words = headlineRef.current?.querySelectorAll(".w") || [];
    tl.fromTo(words, { opacity: 0, y: 28, skewY: 1.5 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.05, ease: "power3.out" }, "startAnimation");
    if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "startAnimation+=0.4");
    if (ctaRef.current) tl.fromTo(ctaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "startAnimation+=0.6");
  }, [headlineLine1, headlineLine2, highlightWord]);

  const line1Words = headlineLine1.split(" ");
  const line2Words = headlineLine2.split(" ");

  return (
    <>
      {/* Admissions CTA Ribbon */}
      <div className="relative z-20 bg-[#FB7F05] py-2.5 text-center overflow-hidden">
        <div className="absolute inset-0 graph-paper opacity-10" />
        <p className="font-caveat text-base text-[#fefcf3] relative z-10">
          <Sparkles className="w-4 h-4 inline-block text-[#fefcf3] mr-2" /> {ribbonText}{" "}
          <Link href={primaryCtaHref} className="underline underline-offset-2 hover:text-[#1a1a2e] transition-colors font-semibold ml-1">
            — {ribbonCtaText}
          </Link>{" "}
          <Sparkles className="w-4 h-4 inline-block text-[#fefcf3] ml-2" />
        </p>
      </div>

      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-12 pb-16">
        <div className="absolute left-[7%] top-0 bottom-0 w-px bg-[#e8b4b0]/30 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[75vh]">
          {/* Left Column: Editable Headlines & CTA */}
          <div className="flex flex-col justify-center z-10">
            <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">{annotation}</div>
            <div ref={headlineRef}>
              <h1 className="font-cormorant text-[clamp(2.8rem,6vw,5.5rem)] font-light text-[#1a1a2e] leading-[1.12] tracking-tight">
                {line1Words.map((w: string, i: number) => (
                  <span key={`l1-${i}`} className="w inline-block mr-[0.22em] opacity-0">{w}</span>
                ))}
                <br />
                {line2Words.map((w: string, i: number) => (
                  <span key={`l2-${i}`} className="w inline-block mr-[0.22em] opacity-0">{w}</span>
                ))}
                <br />
                <em className="w inline-block opacity-0 text-[#FB7F05] not-italic mt-1">{highlightWord}</em>
              </h1>
            </div>
            <p ref={subRef} className="font-inter text-base lg:text-lg text-[#4a4a5e] font-light mt-6 mb-8 leading-relaxed max-w-lg opacity-0">
              {subtitle}
            </p>
            <div ref={ctaRef} className="flex gap-4 flex-wrap opacity-0">
              {primaryCtaLabel && (
                <Link href={primaryCtaHref} className="font-poppins text-sm font-semibold text-[#FB7F05] px-8 py-4 border border-[#FB7F05] hover:bg-[#FB7F05] hover:text-[#fefcf3] transition-all duration-300 sketch-border shadow-xs">
                  {primaryCtaLabel}
                </Link>
              )}
              {secondaryCtaLabel && (
                <Link href={secondaryCtaHref} className="font-poppins text-sm font-medium text-[#4a4a5e] px-8 py-4 hover:text-[#FB7F05] transition-colors underline underline-offset-4 decoration-[#FB7F05]/40">
                  {secondaryCtaLabel}
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Sketch Illustration */}
          <div className="relative flex flex-col items-center justify-center">
            <div ref={pencilRef} className="absolute top-2 right-6 z-20 pointer-events-none opacity-0">
              <svg width="22" height="72" viewBox="0 0 22 72" fill="none">
                <rect x="5" y="0" width="12" height="7" rx="1" fill="#f4c2b0" stroke="#c09080" strokeWidth="0.6"/>
                <rect x="4" y="7" width="14" height="3" fill="#b0b0b0"/>
                <rect x="4" y="10" width="14" height="50" fill="#f5e642" stroke="#c4aa00" strokeWidth="0.5"/>
                <rect x="6" y="10" width="4" height="50" fill="rgba(255,255,255,0.18)"/>
                <polygon points="4,60 18,60 11,72" fill="#d4a46a" stroke="#b07840" strokeWidth="0.5"/>
                <polygon points="8,68 14,68 11,72" fill="#2a2840"/>
              </svg>
            </div>

            <svg ref={sketchRef} viewBox="0 0 500 400" className="w-full h-auto max-w-lg" fill="none">
              <line x1="30" y1="300" x2="470" y2="300" stroke="#2a2840" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M60 300 Q62 255 68 230 Q72 210 74 190" stroke="#2d5a27" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M74 190 Q58 215 40 228 Q62 210 74 190 Q86 215 100 230 Q80 210 74 190Z" stroke="#2d5a27" strokeWidth="1.2"/>
              <path d="M400 300 Q402 252 408 228 Q412 210 416 190" stroke="#2d5a27" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M416 190 Q399 214 381 226 Q403 208 416 190 Q430 212 445 228 Q424 208 416 190Z" stroke="#2d5a27" strokeWidth="1.2"/>
              <rect x="140" y="175" width="220" height="125" stroke="#1a1a2e" strokeWidth="1.8" strokeLinecap="round"/>
              <polyline points="128,175 250,105 372,175" stroke="#1a1a2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="162" y="205" width="34" height="30" stroke="#1a1a2e" strokeWidth="1.2"/>
              <line x1="179" y1="205" x2="179" y2="235" stroke="#1a1a2e" strokeWidth="0.7"/>
              <line x1="162" y1="220" x2="196" y2="220" stroke="#1a1a2e" strokeWidth="0.7"/>
              <rect x="233" y="205" width="34" height="30" stroke="#1a1a2e" strokeWidth="1.2"/>
              <line x1="250" y1="205" x2="250" y2="235" stroke="#1a1a2e" strokeWidth="0.7"/>
              <line x1="233" y1="220" x2="267" y2="220" stroke="#1a1a2e" strokeWidth="0.7"/>
              <rect x="304" y="205" width="34" height="30" stroke="#1a1a2e" strokeWidth="1.2"/>
              <line x1="321" y1="205" x2="321" y2="235" stroke="#1a1a2e" strokeWidth="0.7"/>
              <line x1="304" y1="220" x2="338" y2="220" stroke="#1a1a2e" strokeWidth="0.7"/>
              <rect x="225" y="252" width="50" height="48" rx="2" stroke="#1a1a2e" strokeWidth="1.4"/>
              <line x1="250" y1="105" x2="250" y2="78" stroke="#1a1a2e" strokeWidth="1.2"/>
              <polyline points="250,78 282,88 250,99" stroke="#FB7F05" strokeWidth="1.2" fill="none"/>
              <line x1="97" y1="300" x2="97" y2="258" stroke="#1a1a2e" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="147" y1="300" x2="147" y2="258" stroke="#1a1a2e" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="97" y1="262" x2="147" y2="262" stroke="#1a1a2e" strokeWidth="1.1"/>
              <line x1="353" y1="300" x2="353" y2="258" stroke="#1a1a2e" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="403" y1="300" x2="403" y2="258" stroke="#1a1a2e" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="353" y1="262" x2="403" y2="262" stroke="#1a1a2e" strokeWidth="1.1"/>
              <circle cx="185" cy="292" r="8" stroke="#1a1a2e" strokeWidth="1.2"/>
              <circle cx="215" cy="290" r="8" stroke="#1a1a2e" strokeWidth="1.2"/>
              <circle cx="308" cy="291" r="8" stroke="#1a1a2e" strokeWidth="1.2"/>
              <path d="M82 65 Q93 50 108 54 Q112 40 127 41 Q142 30 156 43 Q172 38 177 52 Q188 49 192 62 Q192 72 177 72 L92 72 Q76 74 82 65Z" stroke="#4a4a5e" strokeWidth="1" strokeLinecap="round" fill="none"/>
              <path d="M298 42 Q309 29 324 31 Q327 20 340 21 Q352 12 364 24 Q377 19 381 31 Q390 28 394 40 Q394 49 381 49 L309 49 Q295 51 298 42Z" stroke="#4a4a5e" strokeWidth="1" strokeLinecap="round" fill="none"/>
              <path d="M198 32 Q204 25 210 32" stroke="#1a1a2e" strokeWidth="1" strokeLinecap="round"/>
              <path d="M218 22 Q224 15 230 22" stroke="#1a1a2e" strokeWidth="1" strokeLinecap="round"/>
              <path d="M238 35 Q244 28 250 35" stroke="#1a1a2e" strokeWidth="1" strokeLinecap="round"/>
            </svg>

            <div className="font-caveat text-[#c17b5a] text-sm text-center mt-2 opacity-80">
              Faith Model School — Nurturing Excellence
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
        >
          <span className="font-caveat text-[#4a4a5e] text-sm">scroll to turn the page</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-8 bg-gradient-to-b from-[#4a4a5e] to-transparent" />
        </motion.div>
      </section>
    </>
  );
}
