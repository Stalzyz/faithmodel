"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function UpcomingEventsBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-16">
          <SectionHeading annotation={data.annotation || "Mark the Calendar"} title={data.title || "Upcoming Events"} />
          <Link href={data.ctaLink || "/news#events"} className="font-poppins text-sm text-[#4a4a5e] hover:text-[#FB7F05] transition-colors hidden md:block">
            {data.ctaText || "View Full Calendar →"}
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {(data.events || []).map((e: any, i: number) => (
            <SketchReveal key={i} delay={i * 0.08}>
              <div className="flex gap-6 p-6 border border-[rgba(74,74,94,0.1)] hover:border-[#FB7F05] transition-colors group h-full">
                <div className="text-center shrink-0 w-14">
                  <div className="font-manrope text-xl font-extrabold text-[#1a1a2e] leading-tight">{(e.date || "Jan 01").split(" ")[1]}</div>
                  <div className="font-caveat text-[#c17b5a] text-sm">{(e.date || "Jan 01").split(" ")[0]}</div>
                </div>
                <div className="border-l border-[rgba(74,74,94,0.1)] pl-6 flex-1">
                  <span className="font-caveat text-[#c17b5a] text-sm">{e.type}</span>
                  <h3 className="font-poppins text-base font-semibold text-[#1a1a2e] mt-1 mb-2 group-hover:text-[#FB7F05] transition-colors">{e.title}</h3>
                  <p className="font-inter text-sm text-[#4a4a5e]">{e.desc}</p>
                </div>
              </div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  
  );
}
