"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function FeaturedProgramsBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "Signature Programs"} title={data.title || "Featured Programs"} subtitle={data.subtitle || "Beyond the classroom..."} />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data.programs || []).map((p: any, i: number) => (
            <SketchReveal key={i} delay={i * 0.07}>
              <Link href={p.href || "#"} className="block group h-full border border-[rgba(74,74,94,0.1)] p-8 hover:border-[#FB7F05] transition-all duration-400 hover:shadow-[0_8px_32px_rgba(212,160,23,0.08)]">
                <span className="font-caveat text-[#c17b5a] text-base">{p.tag}</span>
                <h3 className="font-cormorant text-2xl font-light text-[#1a1a2e] mt-2 mb-4 group-hover:text-[#FB7F05] transition-colors leading-tight">{p.title}</h3>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{p.desc}</p>
                <div className="mt-6 font-poppins text-xs font-medium text-[#4a4a5e] group-hover:text-[#FB7F05] transition-colors">Learn more →</div>
              </Link>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  
  );
}
