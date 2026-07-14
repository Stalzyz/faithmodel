"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function StatsBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-20 border-y border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "School at a Glance"} title={data.title || "By the Numbers"} center />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-16">
          {(data.stats || []).map((s: any, i: number) => (
            <SketchReveal key={i} delay={i * 0.08} className="text-center">
              <div className="font-manrope text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-[#1a1a2e] leading-none mb-2">{s.num}</div>
              <div className="font-poppins text-xs font-semibold text-[#4a4a5e] uppercase tracking-widest mb-1">{s.label}</div>
              <div className="font-caveat text-[#c17b5a] text-sm">{s.note}</div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  
  );
}
