"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function CampusExperienceBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
        <div className="grid grid-cols-2 gap-4 h-[60vh]">
          <img src={data.image1 || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80"} alt="Campus" className="w-full h-full object-cover rounded-sm" />
          <img src={data.image2 || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80"} alt="Students" className="w-full h-full object-cover rounded-sm mt-8" />
        </div>
        <div>
          <SectionHeading annotation={data.annotation || "Campus Life"} title={data.title || "A World of Possibilities"} subtitle={data.subtitle || "Our 15-acre campus is designed as a second home..."} />
          <SketchReveal delay={0.3}>
            <ul className="mt-8 space-y-3">
              {(data.features || []).map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-3 font-inter text-sm text-[#4a4a5e]">
                  <span className="text-[#FB7F05] shrink-0 mt-0.5">✦</span>{f}
                </li>
              ))}
            </ul>
            <Link href={data.ctaLink || "/campus"} className="inline-block mt-8 font-poppins text-sm font-medium text-[#FB7F05] border-b border-[#FB7F05] hover:text-[#FB7F05] hover:border-[#FB7F05] transition-colors pb-0.5">
              {data.ctaText || "Explore the Campus →"}
            </Link>
          </SketchReveal>
        </div>
      </div>
    </section>
  
  );
}
