"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function StudentJourneyBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-28 overflow-hidden border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "The Journey"} title={data.title || "Your Child's Story at Faith Model"} center />
        <div className="mt-16 relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-[rgba(74,74,94,0.12)] hidden md:block" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {(data.stages || []).map((s: any, i: number) => (
              <SketchReveal key={i} delay={i * 0.1} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-[rgba(74,74,94,0.15)] flex items-center justify-center text-2xl mb-4 bg-[#fefcf3] relative z-10 hover:border-[#FB7F05] transition-colors">
                  {s.icon === "BookOpen" ? <BookOpen className="w-6 h-6 text-[#FB7F05]" /> : s.icon === "Microscope" ? <Microscope className="w-6 h-6 text-[#FB7F05]" /> : s.icon === "Lightbulb" ? <Lightbulb className="w-6 h-6 text-[#FB7F05]" /> : s.icon === "Globe" ? <Globe className="w-6 h-6 text-[#FB7F05]" /> : s.icon}
                </div>
                <div className="font-caveat text-[#c17b5a] text-base mb-1">{s.year}</div>
                <div className="font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-wider">{s.label}</div>
              </SketchReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  
  );
}
