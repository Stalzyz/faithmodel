"use client";

import React from "react";
import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import { BookOpen, Microscope, Lightbulb, Globe, Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, Palette } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen, Microscope, Lightbulb, Globe, Sparkles, Trophy, Medal,
  Theater, Monitor, Leaf, Bot, Music, Palette,
};

export default function StudentJourneyBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    <section className="py-24 overflow-hidden border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "The Journey"} title={data.title || "Your Child's Story at Faith Model"} center />
        <div className="mt-16 relative">
          <div className="absolute top-8 left-16 right-16 h-px bg-[rgba(74,74,94,0.12)] hidden md:block z-0" />
          <div className="flex flex-wrap justify-center items-start gap-8 md:gap-16 relative z-10 max-w-5xl mx-auto">
            {(data.stages || []).map((s: any, i: number) => {
              const IconComp = ICON_MAP[s.icon] || Sparkles;
              return (
                <SketchReveal key={i} delay={i * 0.1} className="flex flex-col items-center text-center min-w-[120px]">
                  <div className="w-16 h-16 rounded-full border-2 border-[rgba(74,74,94,0.15)] flex items-center justify-center text-2xl mb-4 bg-[#fefcf3] shadow-xs relative z-10 hover:border-[#FB7F05] transition-colors">
                    <IconComp className="w-6 h-6 text-[#FB7F05]" />
                  </div>
                  <div className="font-caveat text-[#c17b5a] text-base mb-1">{s.year}</div>
                  <div className="font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-wider">{s.label}</div>
                </SketchReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
