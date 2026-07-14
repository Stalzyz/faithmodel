const fs = require('fs');
const path = require('path');

const components = {
  'WelcomeBlock': `
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
  `,
  'StatsBlock': `
    <section className="py-20 border-y border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "School at a Glance"} title={data.title || "By the Numbers"} center />
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
  `,
  'WhyChooseUsBlock': `
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
  `,
  'PhilosophySectionBlock': `
    <section className="py-28 overflow-hidden border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionHeading annotation={data.annotation || "Our Philosophy"} title={data.title || "Where Curiosity Meets Character"} subtitle={data.subtitle || "Faith Model School follows the belief..."} />
          <SketchReveal delay={0.3}>
            <ul className="mt-8 space-y-4">
              {(data.items || []).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 font-inter text-sm text-[#4a4a5e]">
                  <span className="text-[#FB7F05] mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </SketchReveal>
        </div>
        <div className="relative h-[50vh] rounded-sm overflow-hidden">
          <img src={data.imageUrl || "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"} alt="Learning" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 right-4 font-caveat text-[#fefcf3] text-base bg-[#1a1a2e]/60 px-3 py-1 backdrop-blur-sm">{data.imageCaption || "igniting curiosity →"}</div>
        </div>
      </div>
    </section>
  `,
  'AcademicExcellenceBlock': `
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
  `,
  'StudentJourneyBlock': `
    <section className="py-28 overflow-hidden border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "The Journey"} title={data.title || "Your Child's Story at Faith Model"} center />
        <div className="mt-16 relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-[rgba(74,74,94,0.12)] hidden md:block" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {(data.stages || []).map((s: any, i: number) => (
              <SketchReveal key={i} delay={i * 0.1} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-[rgba(74,74,94,0.15)] flex items-center justify-center text-2xl mb-4 bg-[#fefcf3] relative z-10 hover:border-[#FB7F05] transition-colors">
                  {s.icon === "BookOpen" ? <BookOpen className="w-6 h-6 text-[#FB7F05]" /> : s.icon === "Microscope" ? <Microscope className="w-6 h-6 text-[#FB7F05]" /> : s.icon === "Lightbulb" ? <Lightbulb className="w-6 h-6 text-[#FB7F05]" /> : s.icon === "Globe" ? <Globe className="w-6 h-6 text-[#FB7F05]" /> : s.icon}
                </div>
                <div className="font-caveat text-[#c17b5a] text-base mb-1">{s.year}</div>
                <div className="font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-wider">{s.label}</div>
              </SketchReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  `,
  'CampusExperienceBlock': `
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
        <div className="grid grid-cols-2 gap-4 h-[60vh]">
          <img src={data.image1 || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80"} alt="Campus" className="w-full h-full object-cover rounded-sm" />
          <img src={data.image2 || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80"} alt="Students" className="w-full h-full object-cover rounded-sm mt-8" />
        </div>
        <div>
          <SectionHeading annotation={data.annotation || "Campus Life"} title={data.title || "A World of Possibilities"} subtitle={data.subtitle || "Our 15-acre campus is designed as a second home..."} />
          <SketchReveal delay={0.3}>
            <ul className="mt-8 space-y-3">
              {(data.features || []).map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-3 font-inter text-sm text-[#4a4a5e]">
                  <span className="text-[#FB7F05] shrink-0 mt-0.5">✦</span>{f}
                </li>
              ))}
            </ul>
            <Link href={data.ctaLink || "/campus"} className="inline-block mt-8 font-poppins text-sm font-medium text-[#FB7F05] border-b border-[#FB7F05] hover:text-[#FB7F05] hover:border-[#FB7F05] transition-colors pb-0.5">
              {data.ctaText || "Explore the Campus →"}
            </Link>
          </SketchReveal>
        </div>
      </div>
    </section>
  `,
  'FacilitiesOverviewBlock': `
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation={data.annotation || "Infrastructure"} title={data.title || "World-Class Facilities"} subtitle={data.subtitle || "Every space is designed..."} />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(74,74,94,0.08)]">
          {(data.facilities || []).map((f: any, i: number) => (
            <SketchReveal key={i} delay={i * 0.05}>
              <div className="bg-[#fefcf3] p-8 group hover:bg-[#1a1a2e] transition-colors duration-500 text-center h-full">
                <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {f.icon === "Microscope" ? <Microscope className="w-6 h-6 mx-auto text-[#FB7F05]" /> : f.icon === "BookOpen" ? <BookOpen className="w-6 h-6 mx-auto text-[#FB7F05]" /> : f.icon === "Palette" ? <Palette className="w-6 h-6 mx-auto text-[#FB7F05]" /> : f.icon === "Monitor" ? <Monitor className="w-6 h-6 mx-auto text-[#FB7F05]" /> : f.icon}
                </div>
                <div className="font-poppins text-sm font-semibold text-[#1a1a2e] group-hover:text-[#fefcf3] transition-colors mb-1">{f.label}</div>
                <div className="font-caveat text-[#c17b5a] text-sm group-hover:text-[#FB7F05] transition-colors">{f.sub}</div>
              </div>
            </SketchReveal>
          ))}
        </div>
        <SketchReveal className="text-center mt-10">
          <Link href={data.ctaLink || "/facilities"} className="font-poppins text-sm font-medium text-[#4a4a5e] hover:text-[#FB7F05] transition-colors underline underline-offset-4 decoration-[#FB7F05]/40">
            {data.ctaText || "View All Facilities →"}
          </Link>
        </SketchReveal>
      </div>
    </section>
  `,
  'FeaturedProgramsBlock': `
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
  `,
  'AchievementsTickerBlock': `
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
  `,
  'UpcomingEventsBlock': `
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
  `,
  'TestimonialsBlock': `
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
            <button key={i} onClick={() => setActive(i)} className={\`w-8 h-px transition-all duration-300 \${i === active ? "bg-[#FB7F05] w-12" : "bg-[#fefcf3]/30"}\`} />
          ))}
        </div>
      </div>
    </section>
  `,
  'CustomHTMLBlock': `
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div dangerouslySetInnerHTML={{ __html: data.html || '' }} />
      </div>
    </section>
  `
};

Object.keys(components).forEach(name => {
  const filePath = path.join(__dirname, 'src/components/cms-blocks', name + '.tsx');
  
  // Custom states for Testimonials
  let extraImports = '';
  let extraHooks = '';
  if (name === 'TestimonialsBlock') {
    extraHooks = `
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!data.testimonials || data.testimonials.length === 0) return;
    const t = setInterval(() => setActive(p => (p + 1) % data.testimonials.length), 4500);
    return () => clearInterval(t);
  }, [data.testimonials]);
`;
  }
  
  const template = `"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function ${name}({ block }: { block: any }) {
  const data = block?.data || {};${extraHooks}
  return (
    ${components[name]}
  );
}
`;
  fs.writeFileSync(filePath, template);
});

console.log('Created components properly with content');
