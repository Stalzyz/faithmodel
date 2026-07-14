const fs = require('fs');
const path = require('path');

const pageBuilderUpdates = [];
const dynamicPageUpdates = [];

function generateComponent(name, fields, renderCode) {
  const filePath = path.join(__dirname, 'src/components/cms-blocks', `${name}.tsx`);
  const template = `"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function ${name}({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    ${renderCode}
  );
}
`;
  fs.writeFileSync(filePath, template);
}

// 1. WelcomeBlock
generateComponent('WelcomeBlock', {}, `
    <section className="py-20 bg-[#fefcf3] border-b border-[rgba(74,74,94,0.08)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <SketchReveal>
          <div className="w-16 h-16 bg-[#FB7F05] rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="font-caveat text-3xl text-[#fefcf3]">{data.logoText || 'FM'}</span>
          </div>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3rem)] font-light text-[#1a1a2e] mb-6 leading-tight">
            {data.title}
          </h2>
          <blockquote className="font-inter text-lg text-[#4a4a5e] font-light leading-relaxed mb-8">
            "{data.quote}"
          </blockquote>
          <div className="w-12 h-px bg-[#FB7F05] mx-auto mb-6" />
          <div className="font-poppins text-sm font-medium text-[#1a1a2e]">{data.author}</div>
          <div className="font-caveat text-[#c17b5a] text-base mt-1">{data.role}</div>
        </SketchReveal>
      </div>
    </section>
`);

// 2. StatsBlock
generateComponent('StatsBlock', {}, `
    <section className="py-20 border-y border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation} title={data.title} center />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-16">
          {(data.stats || []).map((s: any, i: number) => (
            <SketchReveal key={i} delay={i * 0.08} className="text-center">
              <div className="font-manrope text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-[#1a1a2e] leading-none mb-2">{s.num}</div>
              <div className="font-poppins text-xs font-semibold text-[#4a4a5e] uppercase tracking-widest mb-1">{s.label}</div>
              <div className="font-caveat text-[#c17b5a] text-sm">{s.note}</div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
`);

// 3. WhyChooseUsBlock
generateComponent('WhyChooseUsBlock', {}, `
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
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
`);

// 4. CustomHTMLBlock
generateComponent('CustomHTMLBlock', {}, `
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div dangerouslySetInnerHTML={{ __html: data.html || '' }} />
      </div>
    </section>
`);

console.log('Created components properly');
