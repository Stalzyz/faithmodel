"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function PhilosophySectionBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-28 overflow-hidden border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionHeading annotation={data.annotation || "Our Philosophy"} title={data.title || "Where Curiosity Meets Character"} subtitle={data.subtitle || "Faith Model School follows the belief..."} />
          <SketchReveal delay={0.3}>
            <ul className="mt-8 space-y-4">
              {(data.items || []).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 font-inter text-sm text-[#4a4a5e]">
                  <span className="text-[#FB7F05] mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </SketchReveal>
        </div>
        <div className="relative h-[50vh] rounded-sm overflow-hidden">
          <img src={data.imageUrl || "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"} alt="Learning" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 right-4 font-caveat text-[#fefcf3] text-base bg-[#1a1a2e]/60 px-3 py-1 backdrop-blur-sm">{data.imageCaption || "igniting curiosity →"}</div>
        </div>
      </div>
    </section>
  
  );
}
