"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function TestimonialsBlock({ block }: { block: any }) {
  const data = block?.data || {};
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!data.testimonials || data.testimonials.length === 0) return;
    const t = setInterval(() => setActive(p => (p + 1) % data.testimonials.length), 4500);
    return () => clearInterval(t);
  }, [data.testimonials]);

  return (
    
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)] bg-[#1a1a2e] relative overflow-hidden">
      <div className="absolute inset-0 graph-paper opacity-5" />
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className="font-caveat text-[#FB7F05] text-xl mb-6">{data.annotation || "What Our Parents Say"}</div>
        <AnimatePresence mode="wait">
          {data.testimonials && data.testimonials.length > 0 && (
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <blockquote className="font-cormorant text-[clamp(1.4rem,3vw,2.2rem)] font-light text-[#fefcf3] italic leading-relaxed mb-8">
                "{data.testimonials[active]?.quote}"
              </blockquote>
              <div className="font-poppins text-sm font-semibold text-[#fefcf3]">{data.testimonials[active]?.name}</div>
              <div className="font-caveat text-[#FB7F05] text-base mt-1">{data.testimonials[active]?.child}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-10">
          {(data.testimonials || []).map((_: any, i: number) => (
            <button key={i} onClick={() => setActive(i)} className={`w-8 h-px transition-all duration-300 ${i === active ? "bg-[#FB7F05] w-12" : "bg-[#fefcf3]/30"}`} />
          ))}
        </div>
      </div>
    </section>
  
  );
}
