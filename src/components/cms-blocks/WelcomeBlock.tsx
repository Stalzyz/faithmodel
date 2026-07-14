"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function WelcomeBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-20 bg-[#fefcf3] border-b border-[rgba(74,74,94,0.08)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <SketchReveal>
          <div className="w-16 h-16 bg-[#FB7F05] rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="font-caveat text-3xl text-[#fefcf3]">{data.logoText || 'FM'}</span>
          </div>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3rem)] font-light text-[#1a1a2e] mb-6 leading-tight">
            {data.title || "Welcome to Faith Model"}
          </h2>
          <blockquote className="font-inter text-lg text-[#4a4a5e] font-light leading-relaxed mb-8">
            "{data.quote || "At Faith Model School, we believe that education is not merely the transmission of knowledge, but the ignition of curiosity. Every child who walks through our gate carries within them the seeds of something extraordinary."}"
          </blockquote>
          <div className="w-12 h-px bg-[#FB7F05] mx-auto mb-6" />
          <div className="font-poppins text-sm font-medium text-[#1a1a2e]">{data.author || "Amina M., M.A., B.Ed."}</div>
          <div className="font-caveat text-[#c17b5a] text-base mt-1">{data.role || "Principal, Faith Model School"}</div>
        </SketchReveal>
      </div>
    </section>
  
  );
}
