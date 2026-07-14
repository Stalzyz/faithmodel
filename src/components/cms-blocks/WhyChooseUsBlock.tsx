"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function WhyChooseUsBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "Why Faith Model?"} title={data.title || "Our Educational Promise"} subtitle={data.subtitle || "We go beyond traditional schooling..."} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 mt-16 border border-[rgba(74,74,94,0.1)]">
          {(data.pillars || []).map((p: any, i: number) => (
            <SketchReveal key={i} delay={i * 0.07} className="p-10 border-b border-r border-[rgba(74,74,94,0.08)] group hover:bg-[#1a1a2e] transition-colors duration-500">
              <div className="font-manrope text-3xl text-[#FB7F05] mb-4 group-hover:scale-110 transition-transform duration-300">
                {p.icon === "Sparkles" ? <Sparkles className="w-6 h-6 text-[#FB7F05]" /> : p.icon}
              </div>
              <h3 className="font-poppins text-base font-semibold text-[#1a1a2e] group-hover:text-[#fefcf3] transition-colors mb-3">{p.title}</h3>
              <p className="font-inter text-sm text-[#4a4a5e] group-hover:text-[#fefcf3]/70 transition-colors leading-relaxed">{p.desc}</p>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  
  );
}
