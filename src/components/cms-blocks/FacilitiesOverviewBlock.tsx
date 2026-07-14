"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function FacilitiesOverviewBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "Infrastructure"} title={data.title || "World-Class Facilities"} subtitle={data.subtitle || "Every space is designed..."} />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(74,74,94,0.08)]">
          {(data.facilities || []).map((f: any, i: number) => (
            <SketchReveal key={i} delay={i * 0.05}>
              <div className="bg-[#fefcf3] p-8 group hover:bg-[#1a1a2e] transition-colors duration-500 text-center h-full">
                <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {f.icon === "Microscope" ? <Microscope className="w-6 h-6 mx-auto text-[#FB7F05]" /> : f.icon === "BookOpen" ? <BookOpen className="w-6 h-6 mx-auto text-[#FB7F05]" /> : f.icon === "Palette" ? <Palette className="w-6 h-6 mx-auto text-[#FB7F05]" /> : f.icon === "Monitor" ? <Monitor className="w-6 h-6 mx-auto text-[#FB7F05]" /> : f.icon}
                </div>
                <div className="font-poppins text-sm font-semibold text-[#1a1a2e] group-hover:text-[#fefcf3] transition-colors mb-1">{f.label}</div>
                <div className="font-caveat text-[#c17b5a] text-sm group-hover:text-[#FB7F05] transition-colors">{f.sub}</div>
              </div>
            </SketchReveal>
          ))}
        </div>
        <SketchReveal className="text-center mt-10">
          <Link href={data.ctaLink || "/facilities"} className="font-poppins text-sm font-medium text-[#4a4a5e] hover:text-[#FB7F05] transition-colors underline underline-offset-4 decoration-[#FB7F05]/40">
            {data.ctaText || "View All Facilities →"}
          </Link>
        </SketchReveal>
      </div>
    </section>
  
  );
}
