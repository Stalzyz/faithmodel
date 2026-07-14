"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function AchievementsTickerBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-6 border-y border-[rgba(74,74,94,0.1)] overflow-hidden bg-[#1a1a2e]/3">
      <div className="flex gap-12 animate-[drift_30s_linear_infinite] whitespace-nowrap">
        {[...(data.items || []), ...(data.items || [])].map((item: any, i: number) => (
          <span key={i} className="font-caveat text-lg text-[#4a4a5e] shrink-0">
            {item.icon === "Trophy" ? <Trophy className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" /> : item.icon === "Medal" ? <Medal className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" /> : item.icon === "Theater" ? <Theater className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" /> : item.icon === "Monitor" ? <Monitor className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" /> : item.icon === "Leaf" ? <Leaf className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" /> : item.icon === "BookOpen" ? <BookOpen className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" /> : item.icon === "Bot" ? <Bot className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" /> : item.icon === "Music" ? <Music className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" /> : null}
            {item.text}
          </span>
        ))}
      </div>
    </section>
  
  );
}
