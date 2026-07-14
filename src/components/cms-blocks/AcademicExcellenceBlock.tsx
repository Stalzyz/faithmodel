"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function AcademicExcellenceBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "Academics"} title={data.title || "A Journey of Learning"} subtitle={data.subtitle || "From first steps to board exams..."} />
        <div className="mt-16 space-y-0">
          {(data.programs || []).map((p: any, i: number) => (
            <SketchReveal key={i} delay={i * 0.06}>
              <div className="flex flex-col md:flex-row items-start gap-8 py-8 border-b border-[rgba(74,74,94,0.08)] group">
                <div className="font-manrope text-[clamp(3rem,6vw,5rem)] font-extrabold text-[rgba(74,74,94,0.06)] leading-none w-20 shrink-0 group-hover:text-[rgba(212,160,23,0.15)] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e]">{p.title}</h3>
                    <span className="font-caveat text-[#c17b5a] text-base">{p.age}</span>
                  </div>
                  <p className="font-inter text-[#4a4a5e] text-sm leading-relaxed max-w-xl">{p.desc}</p>
                </div>
                <Link href={p.href || "/school-levels"} className="font-poppins text-xs font-medium text-[#4a4a5e] hover:text-[#FB7F05] transition-colors mt-1 shrink-0">
                  Learn more →
                </Link>
              </div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  
  );
}
