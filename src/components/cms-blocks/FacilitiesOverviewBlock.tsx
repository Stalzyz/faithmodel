"use client";

import React from "react";
import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { 
  Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, 
  BookOpen, Microscope, Lightbulb, Globe, Palette, Bus, Dumbbell, Activity 
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Microscope,
  BookOpen,
  Palette,
  Monitor,
  Bus,
  Trophy,
  Sparkles,
  Music,
  Leaf,
  Globe,
  Lightbulb,
  Dumbbell,
  Activity,
  Medal,
  Theater,
  Bot
};

export default function FacilitiesOverviewBlock({ block }: { block: any }) {
  const data = block?.data || {};
  const facilities = data.facilities || [];

  return (
    <section className="py-24 border-t border-[rgba(74,74,94,0.08)] bg-[#fefcf3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading 
          annotation={data.annotation || "Infrastructure"} 
          title={data.title || "World-Class Facilities"} 
          subtitle={data.subtitle || "Every space is designed to ignite a different kind of spark."} 
        />
        
        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {facilities.map((f: any, i: number) => {
            const IconComponent = ICON_MAP[f.icon];

            return (
              <SketchReveal key={i} delay={i * 0.05} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex-grow max-w-sm">
                <div className="bg-[#fefcf3] border border-[rgba(74,74,94,0.12)] hover:border-[#FB7F05]/50 rounded-2xl p-8 group hover:bg-[#1a1a2e] transition-all duration-300 text-center h-full flex flex-col items-center justify-center shadow-xs hover:shadow-md">
                  <div className="text-3xl mb-4 text-[#FB7F05] group-hover:scale-110 transition-transform duration-300">
                    {IconComponent ? (
                      <IconComponent className="w-7 h-7 mx-auto text-[#FB7F05]" />
                    ) : (
                      <span>{f.icon || "✨"}</span>
                    )}
                  </div>
                  <div className="font-poppins text-sm font-semibold text-[#1a1a2e] group-hover:text-[#fefcf3] transition-colors mb-1">
                    {f.label}
                  </div>
                  <div className="font-caveat text-[#c17b5a] text-sm group-hover:text-[#FB7F05] transition-colors">
                    {f.sub}
                  </div>
                </div>
              </SketchReveal>
            );
          })}
        </div>

        {data.ctaLink && (
          <SketchReveal className="text-center mt-12">
            <Link 
              href={data.ctaLink || "/facilities"} 
              className="font-poppins text-sm font-medium text-[#4a4a5e] hover:text-[#FB7F05] transition-colors underline underline-offset-4 decoration-[#FB7F05]/40"
            >
              {data.ctaText || "View All Facilities →"}
            </Link>
          </SketchReveal>
        )}
      </div>
    </section>
  );
}
