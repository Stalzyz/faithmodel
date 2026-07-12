"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import StoryLayout from "@/components/StoryLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import QuickEnquiryBar from "@/components/QuickEnquiryBar";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   SECTION 1 & 2: Hero + Admissions CTA
   ========================================================= */
function HeroSection() {
  const pencilRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<SVGSVGElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pencilRef.current || !sketchRef.current) return;
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(pencilRef.current,
      { opacity: 0, x: "30%", y: "-15%", rotation: -25 },
      { opacity: 1, x: "0%", y: "0%", rotation: 12, duration: 1, ease: "power3.out" }
    );

    const paths = sketchRef.current.querySelectorAll("path,line,circle,rect,polyline,ellipse");
    paths.forEach((p) => {
      const len = (p as SVGGeometryElement).getTotalLength?.() || 200;
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    tl.to(paths, { strokeDashoffset: 0, duration: 2.2, stagger: 0.12, ease: "power1.inOut" }, "-=0.2");
    tl.to(pencilRef.current, { x: "50%", y: "-80%", opacity: 0, rotation: 50, duration: 0.7, ease: "power2.in" }, "-=0.6");
    const words = headlineRef.current?.querySelectorAll(".w") || [];
    tl.fromTo(words, { opacity: 0, y: 28, skewY: 1.5 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.09, ease: "power3.out" }, "-=0.2");
    if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
    if (ctaRef.current) tl.fromTo(ctaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
  }, []);

  return (
    <>
      {/* Admissions CTA Ribbon */}
      <div className="relative z-20 bg-[#FB7F05] py-2.5 text-center overflow-hidden">
        <div className="absolute inset-0 graph-paper opacity-10" />
        <p className="font-caveat text-base text-[#fefcf3] relative z-10">
          ✦ Admissions for 2026–27 are{" "}
          <span className="text-[#d4a017] font-semibold">now open</span> —{" "}
          <Link href="/admissions" className="underline underline-offset-2 hover:text-[#d4a017] transition-colors">
            Apply Today
          </Link>{" "}
          ✦
        </p>
      </div>

      <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-16">
        <div className="absolute left-[7%] top-0 bottom-0 w-px bg-[#e8b4b0]/30 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="flex flex-col justify-center">
            <div className="font-caveat text-[#c17b5a] text-xl mb-6 -rotate-1">Faith Model School — Est. 1989</div>
            <div ref={headlineRef}>
              <h1 className="font-cormorant text-[clamp(3.2rem,7.5vw,6.5rem)] font-light text-[#FB7F05] leading-[1.08] tracking-tight">
                {["Every", "Great", "Future"].map((w, i) => <span key={i} className="w inline-block mr-[0.18em] opacity-0">{w}</span>)}
                <br />
                {["Begins", "With", "A"].map((w, i) => <span key={i} className="w inline-block mr-[0.18em] opacity-0">{w}</span>)}
                <br />
                <em className="w inline-block opacity-0 text-[#d4a017] not-italic">Single Sketch.</em>
              </h1>
            </div>
            <p ref={subRef} className="font-inter text-lg text-[#4a4a5e] font-light mt-7 mb-10 leading-relaxed max-w-md opacity-0">
              Every child begins with a blank page. Through curiosity, creativity, and confidence, those pages become a story worth telling.
            </p>
            <div ref={ctaRef} className="flex gap-4 flex-wrap opacity-0">
              <Link href="/admissions" className="font-poppins text-sm font-semibold text-[#FB7F05] px-8 py-4 border border-[#FB7F05] hover:bg-[#FB7F05] hover:text-[#fefcf3] transition-all duration-400 sketch-border">
                Begin the Story
              </Link>
              <Link href="/campus" className="font-poppins text-sm font-medium text-[#4a4a5e] px-8 py-4 hover:text-[#d4a017] transition-colors underline underline-offset-4 decoration-[#d4a017]/40">
                Virtual Tour ↗
              </Link>
            </div>
          </div>

          <div className="relative h-[60vh] flex items-center justify-center">
            <div ref={pencilRef} className="absolute top-4 right-4 z-20 pointer-events-none opacity-0">
              <svg width="22" height="72" viewBox="0 0 22 72" fill="none">
                <rect x="5" y="0" width="12" height="7" rx="1" fill="#f4c2b0" stroke="#c09080" strokeWidth="0.6"/>
                <rect x="4" y="7" width="14" height="3" fill="#b0b0b0"/>
                <rect x="4" y="10" width="14" height="50" fill="#f5e642" stroke="#c4aa00" strokeWidth="0.5"/>
                <rect x="6" y="10" width="4" height="50" fill="rgba(255,255,255,0.18)"/>
                <polygon points="4,60 18,60 11,72" fill="#d4a46a" stroke="#b07840" strokeWidth="0.5"/>
                <polygon points="8,68 14,68 11,72" fill="#2a2840"/>
              </svg>
            </div>

            <svg ref={sketchRef} viewBox="0 0 500 400" className="w-full h-full max-w-lg" fill="none">
              <line x1="30" y1="300" x2="470" y2="300" stroke="#2a2840" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M60 300 Q62 255 68 230 Q72 210 74 190" stroke="#2d5a27" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M74 190 Q58 215 40 228 Q62 210 74 190 Q86 215 100 230 Q80 210 74 190Z" stroke="#2d5a27" strokeWidth="1.2"/>
              <path d="M400 300 Q402 252 408 228 Q412 210 416 190" stroke="#2d5a27" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M416 190 Q399 214 381 226 Q403 208 416 190 Q430 212 445 228 Q424 208 416 190Z" stroke="#2d5a27" strokeWidth="1.2"/>
              <rect x="140" y="175" width="220" height="125" stroke="#FB7F05" strokeWidth="1.8" strokeLinecap="round"/>
              <polyline points="128,175 250,105 372,175" stroke="#FB7F05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="162" y="205" width="34" height="30" stroke="#FB7F05" strokeWidth="1.2"/>
              <line x1="179" y1="205" x2="179" y2="235" stroke="#FB7F05" strokeWidth="0.7"/>
              <line x1="162" y1="220" x2="196" y2="220" stroke="#FB7F05" strokeWidth="0.7"/>
              <rect x="233" y="205" width="34" height="30" stroke="#FB7F05" strokeWidth="1.2"/>
              <line x1="250" y1="205" x2="250" y2="235" stroke="#FB7F05" strokeWidth="0.7"/>
              <line x1="233" y1="220" x2="267" y2="220" stroke="#FB7F05" strokeWidth="0.7"/>
              <rect x="304" y="205" width="34" height="30" stroke="#FB7F05" strokeWidth="1.2"/>
              <line x1="321" y1="205" x2="321" y2="235" stroke="#FB7F05" strokeWidth="0.7"/>
              <line x1="304" y1="220" x2="338" y2="220" stroke="#FB7F05" strokeWidth="0.7"/>
              <rect x="225" y="252" width="50" height="48" rx="2" stroke="#FB7F05" strokeWidth="1.4"/>
              <line x1="250" y1="105" x2="250" y2="78" stroke="#FB7F05" strokeWidth="1.2"/>
              <polyline points="250,78 282,88 250,99" stroke="#d4a017" strokeWidth="1.2" fill="none"/>
              <line x1="97" y1="300" x2="97" y2="258" stroke="#FB7F05" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="147" y1="300" x2="147" y2="258" stroke="#FB7F05" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="97" y1="262" x2="147" y2="262" stroke="#FB7F05" strokeWidth="1.1"/>
              <line x1="353" y1="300" x2="353" y2="258" stroke="#FB7F05" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="403" y1="300" x2="403" y2="258" stroke="#FB7F05" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="353" y1="262" x2="403" y2="262" stroke="#FB7F05" strokeWidth="1.1"/>
              <circle cx="185" cy="292" r="8" stroke="#FB7F05" strokeWidth="1.2"/>
              <circle cx="215" cy="290" r="8" stroke="#FB7F05" strokeWidth="1.2"/>
              <circle cx="308" cy="291" r="8" stroke="#FB7F05" strokeWidth="1.2"/>
              <path d="M82 65 Q93 50 108 54 Q112 40 127 41 Q142 30 156 43 Q172 38 177 52 Q188 49 192 62 Q192 72 177 72 L92 72 Q76 74 82 65Z" stroke="#4a4a5e" strokeWidth="1" strokeLinecap="round" fill="none"/>
              <path d="M298 42 Q309 29 324 31 Q327 20 340 21 Q352 12 364 24 Q377 19 381 31 Q390 28 394 40 Q394 49 381 49 L309 49 Q295 51 298 42Z" stroke="#4a4a5e" strokeWidth="1" strokeLinecap="round" fill="none"/>
              <path d="M198 32 Q204 25 210 32" stroke="#FB7F05" strokeWidth="1" strokeLinecap="round"/>
              <path d="M218 22 Q224 15 230 22" stroke="#FB7F05" strokeWidth="1" strokeLinecap="round"/>
              <path d="M238 35 Q244 28 250 35" stroke="#FB7F05" strokeWidth="1" strokeLinecap="round"/>
            </svg>

            <div className="absolute -left-4 top-1/2 font-caveat text-[#c17b5a] text-sm -rotate-90 whitespace-nowrap opacity-50">
              Faith Model School — Nurturing Excellence
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
        >
          <span className="font-caveat text-[#4a4a5e] text-sm">scroll to turn the page</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-8 bg-gradient-to-b from-[#4a4a5e] to-transparent" />
        </motion.div>
      </section>
    </>
  );
}

/* =========================================================
   SECTION 3: Welcome Message
   ========================================================= */
function WelcomeSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute left-[7%] top-0 bottom-0 w-px bg-[#e8b4b0]/25 hidden lg:block" />
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">A Message from Our Principal</div>
          <blockquote className="font-cormorant text-[clamp(1.8rem,3.5vw,3rem)] font-light text-[#FB7F05] italic leading-relaxed mb-8">
            "At Faith Model School, we believe that education is not merely the transmission of knowledge, but the ignition of curiosity. Every child who walks through our gate carries within them the seeds of something extraordinary."
          </blockquote>
          <div className="w-12 h-px bg-[#d4a017] mx-auto mb-6" />
          <div className="font-poppins text-sm font-medium text-[#FB7F05]">Prof. Michael Chang</div>
          <div className="font-caveat text-[#c17b5a] text-base mt-1">Principal, Faith Model School</div>
        </SketchReveal>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 4: Stats Counter (School at a Glance)
   ========================================================= */
function StatsSection() {
  const stats = [
    { num: "35+", label: "Years of Excellence", note: "Est. 1989" },
    { num: "2,500+", label: "Students Enrolled", note: "Across all grades" },
    { num: "100%", label: "CBSE Board Results", note: "Consecutive 10 years" },
    { num: "15 ac", label: "Green Campus", note: "Eco-certified" },
    { num: "180+", label: "Faculty Members", note: "Qualified & dedicated" },
    { num: "48+", label: "Awards & Trophies", note: "2024–25 alone" },
  ];
  return (
    <section className="py-20 border-y border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation="School at a Glance" title="By the Numbers" center />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-16">
          {stats.map((s, i) => (
            <SketchReveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-manrope text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-[#FB7F05] leading-none mb-2">{s.num}</div>
              <div className="font-poppins text-xs font-semibold text-[#4a4a5e] uppercase tracking-widest mb-1">{s.label}</div>
              <div className="font-caveat text-[#c17b5a] text-sm">{s.note}</div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 5: Why Choose Us
   ========================================================= */
function WhyChooseUs() {
  const pillars = [
    { icon: "✦", title: "Academic Excellence", desc: "Rigorous CBSE curriculum enhanced with global standards, project-based learning, and critical thinking programs." },
    { icon: "◉", title: "Holistic Development", desc: "Sport, Arts, Music, Drama, Coding, Robotics — every child discovers their unique genius." },
    { icon: "◈", title: "Expert Faculty", desc: "180+ qualified educators with an industry-leading 1:15 student-teacher ratio for personalised attention." },
    { icon: "❋", title: "Safe & Nurturing", desc: "CCTV-monitored, RFID-secured, GPS-tracked transport — your child's safety is our first promise." },
    { icon: "⬡", title: "Future-Ready Skills", desc: "AI Lab, Robotics, IoT, 3D Printing, and a dedicated Innovation Centre for the leaders of tomorrow." },
    { icon: "◎", title: "15-Acre Green Campus", desc: "Eco-certified campus with gardens, nature trails, and sustainably designed learning spaces." },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation="Why Faith Model?" title="Our Educational Promise" subtitle="We go beyond traditional schooling to craft an environment where curiosity leads, creativity flourishes, and every child is celebrated." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 mt-16 border border-[rgba(74,74,94,0.1)]">
          {pillars.map((p, i) => (
            <SketchReveal key={p.title} delay={i * 0.07} className="p-10 border-b border-r border-[rgba(74,74,94,0.08)] group hover:bg-[#FB7F05] transition-colors duration-500">
              <div className="font-manrope text-3xl text-[#d4a017] mb-4 group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
              <h3 className="font-poppins text-base font-semibold text-[#FB7F05] group-hover:text-[#fefcf3] transition-colors mb-3">{p.title}</h3>
              <p className="font-inter text-sm text-[#4a4a5e] group-hover:text-[#fefcf3]/70 transition-colors leading-relaxed">{p.desc}</p>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 6: Educational Philosophy
   ========================================================= */
function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <section ref={ref} className="py-28 overflow-hidden border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionHeading annotation="Our Philosophy" title="Where Curiosity Meets Character" subtitle="Faith Model School follows the belief that every child is uniquely talented. Our curriculum is designed not to fill a bucket, but to light a fire — nurturing thinkers, creators, leaders, and compassionate human beings." />
          <SketchReveal delay={0.3}>
            <ul className="mt-8 space-y-4">
              {["Inquiry-Based Learning", "Value Education at Every Level", "Experiential & Project-Based Pedagogy", "Social-Emotional Learning Framework", "Global Mindset with Indian Values"].map((item) => (
                <li key={item} className="flex items-start gap-3 font-inter text-sm text-[#4a4a5e]">
                  <span className="text-[#d4a017] mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </SketchReveal>
        </div>
        <motion.div style={{ x }} className="relative h-[50vh] rounded-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80" alt="Learning" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 right-4 font-caveat text-[#fefcf3] text-base bg-[#FB7F05]/60 px-3 py-1 backdrop-blur-sm">igniting curiosity →</div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 7: Academic Excellence
   ========================================================= */
function AcademicExcellence() {
  const programs = [
    { title: "Pre-Primary", age: "Ages 3–5", desc: "Play-based learning, sensory exploration, and foundational skill building in a joyful, safe environment." },
    { title: "Primary School", age: "Grades 1–5", desc: "Core academics with integrated arts, sports, and digital literacy. Strong emphasis on reading and mathematical thinking." },
    { title: "Middle School", age: "Grades 6–8", desc: "Critical thinking, project-based learning, and introduction to STEM, coding, and leadership programs." },
    { title: "Secondary School", age: "Grades 9–10", desc: "CBSE board preparation with focused academics, life skills, and career orientation programs." },
    { title: "Senior Secondary", age: "Grades 11–12", desc: "Science and Commerce streams with optional vocational subjects. University counselling and placement guidance." },
  ];
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation="Academics" title="A Journey of Learning" subtitle="From first steps to board exams, every stage of your child's education is thoughtfully crafted for success." />
        <div className="mt-16 space-y-0">
          {programs.map((p, i) => (
            <SketchReveal key={p.title} delay={i * 0.06}>
              <div className="flex flex-col md:flex-row items-start gap-8 py-8 border-b border-[rgba(74,74,94,0.08)] group">
                <div className="font-manrope text-[clamp(3rem,6vw,5rem)] font-extrabold text-[rgba(74,74,94,0.06)] leading-none w-20 shrink-0 group-hover:text-[rgba(212,160,23,0.15)] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-poppins text-lg font-semibold text-[#FB7F05]">{p.title}</h3>
                    <span className="font-caveat text-[#c17b5a] text-base">{p.age}</span>
                  </div>
                  <p className="font-inter text-[#4a4a5e] text-sm leading-relaxed max-w-xl">{p.desc}</p>
                </div>
                <Link href="/school-levels" className="font-poppins text-xs font-medium text-[#4a4a5e] hover:text-[#d4a017] transition-colors mt-1 shrink-0">
                  Learn more →
                </Link>
              </div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 8: Student Journey Timeline
   ========================================================= */
function StudentJourney() {
  const stages = [
    { year: "Age 3", label: "Pre-KG", icon: "🌱" },
    { year: "Age 5", label: "Primary", icon: "📚" },
    { year: "Age 11", label: "Middle School", icon: "🔬" },
    { year: "Age 14", label: "Secondary", icon: "💡" },
    { year: "Age 16", label: "Senior Secondary", icon: "🎓" },
    { year: "Age 18", label: "University", icon: "🌍" },
  ];
  return (
    <section className="py-28 overflow-hidden border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation="The Journey" title="Your Child's Story at Faith Model" center />
        <div className="mt-16 relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-[rgba(74,74,94,0.12)] hidden md:block" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {stages.map((s, i) => (
              <SketchReveal key={s.label} delay={i * 0.1} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-[rgba(74,74,94,0.15)] flex items-center justify-center text-2xl mb-4 bg-[#fefcf3] relative z-10 hover:border-[#d4a017] transition-colors">
                  {s.icon}
                </div>
                <div className="font-caveat text-[#c17b5a] text-base mb-1">{s.year}</div>
                <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-wider">{s.label}</div>
              </SketchReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 9: Campus Experience
   ========================================================= */
function CampusExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <section ref={ref} className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
        <div className="grid grid-cols-2 gap-4 h-[60vh]">
          <motion.img style={{ y: y1 }} src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80" alt="Campus" className="w-full h-full object-cover rounded-sm" />
          <motion.img style={{ y: y2 }} src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80" alt="Students" className="w-full h-full object-cover rounded-sm mt-8" />
        </div>
        <div>
          <SectionHeading annotation="Campus Life" title="A World of Possibilities" subtitle="Our 15-acre campus is designed as a second home — every corner crafted to inspire exploration, connection, and growth." />
          <SketchReveal delay={0.3}>
            <ul className="mt-8 space-y-3">
              {["Smart Classrooms with interactive technology", "Olympic-standard swimming pool & sports grounds", "Dedicated AI, Robotics & Innovation labs", "Performing arts theatre and music studios", "Cafeteria serving healthy, nutritious meals", "Medical centre with on-campus counsellor"].map((f) => (
                <li key={f} className="flex items-start gap-3 font-inter text-sm text-[#4a4a5e]">
                  <span className="text-[#d4a017] shrink-0 mt-0.5">✦</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/campus" className="inline-block mt-8 font-poppins text-sm font-medium text-[#FB7F05] border-b border-[#FB7F05] hover:text-[#d4a017] hover:border-[#d4a017] transition-colors pb-0.5">
              Explore the Campus →
            </Link>
          </SketchReveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 10: Facilities Overview
   ========================================================= */
function FacilitiesOverview() {
  const facs = [
    { icon: "🔬", label: "Science Labs", sub: "Physics · Chemistry · Biology" },
    { icon: "🤖", label: "Robotics & AI Lab", sub: "Microsoft Showcase" },
    { icon: "📚", label: "Digital Library", sub: "12,000+ volumes" },
    { icon: "🎭", label: "Auditorium", sub: "800-seat capacity" },
    { icon: "🏊", label: "Swimming Pool", sub: "Olympic standard" },
    { icon: "🎨", label: "Art Studios", sub: "Fine Arts & Craft" },
    { icon: "🎵", label: "Music Room", sub: "Vocal & Instrumental" },
    { icon: "💻", label: "Computer Lab", sub: "100+ workstations" },
  ];
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation="Infrastructure" title="World-Class Facilities" subtitle="Every space is designed to ignite a different kind of spark." />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(74,74,94,0.08)]">
          {facs.map((f, i) => (
            <SketchReveal key={f.label} delay={i * 0.05}>
              <div className="bg-[#fefcf3] p-8 group hover:bg-[#FB7F05] transition-colors duration-500 text-center">
                <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300">{f.icon}</div>
                <div className="font-poppins text-sm font-semibold text-[#FB7F05] group-hover:text-[#fefcf3] transition-colors mb-1">{f.label}</div>
                <div className="font-caveat text-[#c17b5a] text-sm group-hover:text-[#d4a017] transition-colors">{f.sub}</div>
              </div>
            </SketchReveal>
          ))}
        </div>
        <SketchReveal className="text-center mt-10">
          <Link href="/facilities" className="font-poppins text-sm font-medium text-[#4a4a5e] hover:text-[#d4a017] transition-colors underline underline-offset-4 decoration-[#d4a017]/40">
            View All 28 Facilities →
          </Link>
        </SketchReveal>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 11: Featured Programs
   ========================================================= */
function FeaturedPrograms() {
  const programs = [
    { title: "STEM Excellence Program", tag: "Academics", desc: "Integrated Science, Technology, Engineering, and Mathematics with hands-on project labs and Olympiad preparation.", href: "/academics#stem" },
    { title: "Young Leaders Initiative", tag: "Leadership", desc: "Student council, Model UN, public speaking, and structured mentorship programs to build tomorrow's leaders.", href: "/student-life#leadership" },
    { title: "Performing Arts Academy", tag: "Arts", desc: "Professional training in music, dance, drama, and fine arts from experienced performing artists.", href: "/arts" },
    { title: "Sports Excellence Track", tag: "Sports", desc: "Professional coaching in cricket, basketball, swimming, athletics, and chess with state-level competition exposure.", href: "/sports" },
    { title: "AI & Future Skills Lab", tag: "Innovation", desc: "Coding, AI fundamentals, robotics, IoT, and 3D printing — the skills that will define the next decade.", href: "/innovation" },
    { title: "International Language Program", tag: "Languages", desc: "English, Tamil, Hindi, French, and German language labs with Cambridge and DELF certification pathways.", href: "/academics#languages" },
  ];
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation="Signature Programs" title="Featured Programs" subtitle="Beyond the classroom — programs that discover and develop each child's unique potential." />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <SketchReveal key={p.title} delay={i * 0.07}>
              <Link href={p.href} className="block group h-full border border-[rgba(74,74,94,0.1)] p-8 hover:border-[#d4a017] transition-all duration-400 hover:shadow-[0_8px_32px_rgba(212,160,23,0.08)]">
                <span className="font-caveat text-[#c17b5a] text-base">{p.tag}</span>
                <h3 className="font-cormorant text-2xl font-light text-[#FB7F05] mt-2 mb-4 group-hover:text-[#d4a017] transition-colors leading-tight">{p.title}</h3>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{p.desc}</p>
                <div className="mt-6 font-poppins text-xs font-medium text-[#4a4a5e] group-hover:text-[#d4a017] transition-colors">Learn more →</div>
              </Link>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 12: Achievements Ticker
   ========================================================= */
function AchievementsTicker() {
  const items = ["🏆 National Science Olympiad Champions 2025", "🥇 CBSE Cluster Athletics Gold Medal", "🎭 State Drama Festival Best Production", "💻 NASSCOM Young Coder Award", "🌿 Green School National Award", "📚 100% Board Pass Rate — 10 consecutive years", "🤖 FIRST Robotics Qualifier 2025", "🎵 National Music Talent Award"];
  return (
    <section className="py-6 border-y border-[rgba(74,74,94,0.1)] overflow-hidden bg-[#FB7F05]/3">
      <div className="flex gap-12 animate-[drift_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-caveat text-lg text-[#4a4a5e] shrink-0">{item}</span>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 13: Upcoming Events
   ========================================================= */
function UpcomingEvents() {
  const events = [
    { date: "Aug 15", title: "Independence Day Celebration", type: "Celebration", desc: "School-wide flag hoisting, cultural performances, and patriotic programs." },
    { date: "Sep 5", title: "Teachers' Day Awards", type: "Event", desc: "Honouring our exceptional faculty with student-led performances and awards ceremony." },
    { date: "Oct 2", title: "Annual Science Exhibition", type: "Academic", desc: "Student projects on display — open to parents and the wider community." },
    { date: "Nov 14", title: "Children's Day Annual Fest", type: "Festival", desc: "A day of joy, talent, games, and celebration exclusively for our students." },
  ];
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-16">
          <SectionHeading annotation="Mark the Calendar" title="Upcoming Events" />
          <Link href="/news#events" className="font-poppins text-sm text-[#4a4a5e] hover:text-[#d4a017] transition-colors hidden md:block">
            View Full Calendar →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((e, i) => (
            <SketchReveal key={e.title} delay={i * 0.08}>
              <div className="flex gap-6 p-6 border border-[rgba(74,74,94,0.1)] hover:border-[#d4a017] transition-colors group">
                <div className="text-center shrink-0 w-14">
                  <div className="font-manrope text-xl font-extrabold text-[#FB7F05] leading-tight">{e.date.split(" ")[1]}</div>
                  <div className="font-caveat text-[#c17b5a] text-sm">{e.date.split(" ")[0]}</div>
                </div>
                <div className="border-l border-[rgba(74,74,94,0.1)] pl-6 flex-1">
                  <span className="font-caveat text-[#c17b5a] text-sm">{e.type}</span>
                  <h3 className="font-poppins text-base font-semibold text-[#FB7F05] mt-1 mb-2 group-hover:text-[#d4a017] transition-colors">{e.title}</h3>
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

/* =========================================================
   SECTION 14-15: Testimonials
   ========================================================= */
function Testimonials() {
  const testimonials = [
    { name: "Priya & Rajan Sharma", child: "Parent of Arjun, Grade 9", quote: "The transformation we've seen in our son over three years at Faith Model is extraordinary. He's not just performing better academically — he's grown into a thoughtful, confident young man." },
    { name: "Dr. Anitha Krishnamurthy", child: "Parent of Meera, Grade 11", quote: "As a doctor, I was particularly impressed by the Science labs and the way teachers kindle genuine curiosity. Meera now talks about research as a career — at 16!" },
    { name: "Mr. & Mrs. Mohammed Ibrahim", child: "Parents of twins, Grades 6 & 8", quote: "The faculty here truly understands that every child is different. Both our children have completely different personalities, and the school nurtures each of them uniquely." },
    { name: "Sarah & James Peterson", child: "Parent of Emma, Grade 4", quote: "We moved from the UK and were worried about the transition. Faith Model made it seamless. The warmth of the teachers and the quality of the environment exceeded everything we expected." },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)] bg-[#FB7F05] relative overflow-hidden">
      <div className="absolute inset-0 graph-paper opacity-5" />
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className="font-caveat text-[#d4a017] text-xl mb-6">What Our Parents Say</div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <blockquote className="font-cormorant text-[clamp(1.4rem,3vw,2.2rem)] font-light text-[#fefcf3] italic leading-relaxed mb-8">
              "{testimonials[active].quote}"
            </blockquote>
            <div className="font-poppins text-sm font-semibold text-[#fefcf3]">{testimonials[active].name}</div>
            <div className="font-caveat text-[#d4a017] text-base mt-1">{testimonials[active].child}</div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-8 h-px transition-all duration-300 ${i === active ? "bg-[#d4a017] w-12" : "bg-[#fefcf3]/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 16: Gallery Grid
   ========================================================= */
function GallerySection() {
  const imgs = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=70",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=70",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=500&q=70",
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=500&q=70",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=70",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=70",
  ];
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading annotation="Campus Gallery" title="Life at Faith Model" />
          <Link href="/gallery" className="font-poppins text-sm text-[#4a4a5e] hover:text-[#d4a017] transition-colors hidden md:block">View Full Gallery →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {imgs.map((src, i) => (
            <SketchReveal key={i} delay={i * 0.06}>
              <div className="overflow-hidden aspect-square group">
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 17: News & Updates
   ========================================================= */
function NewsSection() {
  const news = [
    { date: "Jul 10, 2026", title: "Faith Model Tops District in CBSE Grade 10 Results", tag: "Achievement", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=70" },
    { date: "Jul 5, 2026", title: "Robotics Team Qualifies for National FIRST Championship", tag: "Innovation", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=70" },
    { date: "Jun 28, 2026", title: "New AI Lab Inaugurated by Education Commissioner", tag: "Campus", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=70" },
  ];
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading annotation="Stay Informed" title="News & Updates" />
          <Link href="/news" className="font-poppins text-sm text-[#4a4a5e] hover:text-[#d4a017] transition-colors hidden md:block">All News →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((n, i) => (
            <SketchReveal key={n.title} delay={i * 0.08}>
              <Link href="/news" className="group block">
                <div className="overflow-hidden mb-4 aspect-[4/3]">
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <span className="font-caveat text-[#c17b5a] text-base">{n.tag}</span>
                <h3 className="font-cormorant text-xl font-light text-[#FB7F05] mt-1 mb-2 group-hover:text-[#d4a017] transition-colors leading-snug">{n.title}</h3>
                <div className="font-inter text-xs text-[#4a4a5e]">{n.date}</div>
              </Link>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 18: Accreditation & Affiliations
   ========================================================= */
function AccreditationSection() {
  const badges = ["CBSE Affiliated", "Microsoft Showcase School", "British Council ISA", "STEM.org Accredited", "Green School India", "ISO 9001:2015"];
  return (
    <section className="py-16 border-y border-[rgba(74,74,94,0.1)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="font-caveat text-[#c17b5a] text-lg mb-8 -rotate-1">Recognised & Accredited By</div>
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
          {badges.map((b) => (
            <div key={b} className="font-poppins text-sm font-semibold text-[rgba(74,74,94,0.5)] hover:text-[#FB7F05] transition-colors">{b}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 19: Book a Campus Visit
   ========================================================= */
function BookVisitSection() {
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Visit Us</div>
          <h2 className="font-cormorant text-[clamp(2.4rem,5vw,4rem)] font-light text-[#FB7F05] leading-tight mb-6">
            Book a Campus Tour
          </h2>
          <div className="w-12 h-px bg-[#d4a017] mb-6" />
          <p className="font-inter text-lg text-[#4a4a5e] font-light leading-relaxed mb-8">
            Experience Faith Model School in person. Meet our faculty, explore the facilities, and see exactly why thousands of families have chosen us as the place where their child's story begins.
          </p>
          <ul className="space-y-3 mb-8">
            {["Guided campus walk with a faculty member", "One-on-one session with our Admissions Counsellor", "Meet current parents and students", "Overview of curriculum and assessment approach"].map(f => (
              <li key={f} className="flex items-start gap-3 font-inter text-sm text-[#4a4a5e]">
                <span className="text-[#d4a017] shrink-0 mt-0.5">—</span>{f}
              </li>
            ))}
          </ul>
        </SketchReveal>
        <SketchReveal delay={0.2}>
          <form className="space-y-4 p-8 border border-[rgba(74,74,94,0.12)]">
            <div className="font-caveat text-[#c17b5a] text-lg mb-6">Fill in Your Details</div>
            {[["Parent's Full Name", "text"], ["Child's Name & Grade", "text"], ["Mobile Number", "tel"], ["Email Address", "email"]].map(([placeholder, type]) => (
              <input key={placeholder} type={type} placeholder={placeholder}
                className="w-full border-b border-[rgba(74,74,94,0.2)] bg-transparent py-3 font-inter text-sm text-[#FB7F05] placeholder-[#4a4a5e]/50 focus:outline-none focus:border-[#d4a017] transition-colors" />
            ))}
            <select className="w-full border-b border-[rgba(74,74,94,0.2)] bg-transparent py-3 font-inter text-sm text-[#4a4a5e] focus:outline-none focus:border-[#d4a017] transition-colors">
              <option>Preferred Visit Date</option>
              <option>Monday – Friday (Weekday)</option>
              <option>Saturday (Weekend)</option>
            </select>
            <button type="submit" className="w-full mt-4 bg-[#FB7F05] text-[#fefcf3] font-poppins text-sm font-semibold py-4 hover:bg-[#d4a017] hover:text-[#FB7F05] transition-all duration-400">
              Request Campus Visit
            </button>
          </form>
        </SketchReveal>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 20: Download Brochure
   ========================================================= */
function DownloadSection() {
  return (
    <section className="py-20 bg-[#FB7F05] border-t border-[rgba(74,74,94,0.08)] relative overflow-hidden">
      <div className="absolute inset-0 graph-paper opacity-5" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <SketchReveal>
          <div className="font-caveat text-[#d4a017] text-xl mb-4">Take It With You</div>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-light text-[#fefcf3] mb-6">
            Download Our School Prospectus
          </h2>
          <p className="font-inter text-[#fefcf3]/70 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Everything you need to know about Faith Model School — curriculum, faculty, fees, programs, and admissions — in one beautifully crafted document.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/downloads/prospectus-2026.pdf" className="font-poppins text-sm font-semibold bg-[#d4a017] text-[#FB7F05] px-10 py-4 hover:bg-[#fefcf3] transition-colors">
              Download Prospectus (PDF)
            </a>
            <Link href="/downloads" className="font-poppins text-sm font-medium text-[#fefcf3] border border-[#fefcf3]/30 px-10 py-4 hover:bg-[#fefcf3]/10 transition-colors">
              All Downloads
            </Link>
          </div>
        </SketchReveal>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 21: FAQ Accordion
   ========================================================= */
function FAQSection() {
  const faqs = [
    { q: "What is the admission process at Faith Model School?", a: "Admissions involve submitting an online application, appearing for a grade-appropriate assessment, and an interaction with our counselling team. Details vary by grade — visit our Admissions page for a complete step-by-step guide." },
    { q: "What is the student-teacher ratio?", a: "We maintain a strict 1:15 student-to-teacher ratio across all grades, ensuring every child receives personalised attention, mentorship, and support." },
    { q: "Is transport available from all parts of the city?", a: "Yes. We operate 22 GPS-tracked, CCTV-monitored buses covering major routes across Chennai. All vehicles are maintained to the highest safety standards." },
    { q: "Does Faith Model offer scholarships?", a: "We offer merit-based and need-based scholarships for academically exceptional students and those demonstrating outstanding talent in sports or the arts. Contact our admissions office for details." },
    { q: "What board does the school follow?", a: "Faith Model School is affiliated with the Central Board of Secondary Education (CBSE), New Delhi, for Grades 1 through 12." },
    { q: "Are there separate streams available in Senior Secondary?", a: "Yes. We offer Science (Physics, Chemistry, Biology / Computer Science) and Commerce (with/without Mathematics) streams in Grades 11 and 12." },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <SectionHeading annotation="Common Questions" title="Frequently Asked Questions" center />
        <div className="mt-16 space-y-0">
          {faqs.map((f, i) => (
            <SketchReveal key={i} delay={i * 0.04}>
              <div className="border-b border-[rgba(74,74,94,0.1)]">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-start justify-between py-6 text-left gap-6 group">
                  <span className="font-poppins text-base font-medium text-[#FB7F05] group-hover:text-[#d4a017] transition-colors leading-snug">{f.q}</span>
                  <span className="font-manrope text-[#d4a017] text-xl shrink-0 mt-0.5 transition-transform duration-300" style={{ transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                      <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed pb-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SketchReveal>
          ))}
        </div>
        <SketchReveal className="text-center mt-10">
          <Link href="/admissions#faq" className="font-poppins text-sm text-[#4a4a5e] hover:text-[#d4a017] transition-colors underline underline-offset-4 decoration-[#d4a017]/40">
            View All FAQs →
          </Link>
        </SketchReveal>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 22: Contact & Map
   ========================================================= */
function ContactSection() {
  return (
    <section className="py-28 border-t border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">
        <SketchReveal>
          <SectionHeading annotation="Find Us" title="Get in Touch" />
          <div className="mt-8 space-y-6 font-inter text-sm text-[#4a4a5e]">
            <div>
              <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-2">Address</div>
              <address className="not-italic leading-relaxed">123 Education Lane, Nungambakkam,<br />Chennai, Tamil Nadu 600 034</address>
            </div>
            <div>
              <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-2">Phone</div>
              <a href="tel:+914412345678" className="hover:text-[#d4a017] transition-colors">+91 44 1234 5678</a>
              <span className="mx-3 opacity-40">|</span>
              <a href="tel:+914498765432" className="hover:text-[#d4a017] transition-colors">+91 44 9876 5432</a>
            </div>
            <div>
              <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-2">Email</div>
              <a href="mailto:admissions@faithmodelschool.edu.in" className="hover:text-[#d4a017] transition-colors block">admissions@faithmodelschool.edu.in</a>
              <a href="mailto:info@faithmodelschool.edu.in" className="hover:text-[#d4a017] transition-colors block">info@faithmodelschool.edu.in</a>
            </div>
            <div>
              <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-2">Office Hours</div>
              <p>Monday – Friday: 8:00 AM – 4:30 PM</p>
              <p>Saturday: 9:00 AM – 1:00 PM</p>
            </div>
          </div>
          <Link href="/contact" className="inline-block mt-8 font-poppins text-sm font-medium text-[#FB7F05] border-b border-[#FB7F05] hover:text-[#d4a017] hover:border-[#d4a017] transition-colors pb-0.5">
            Full Contact Page →
          </Link>
        </SketchReveal>
        <SketchReveal delay={0.2}>
          <div className="w-full h-[400px] bg-[rgba(74,74,94,0.06)] border border-[rgba(74,74,94,0.1)] flex items-center justify-center overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5!2d80.2!3d13.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzM2LjAiTiA4MMKwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%" loading="lazy" title="Faith Model School Location"
              className="border-0 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </SketchReveal>
      </div>
    </section>
  );
}

/* =========================================================
   SKETCHBOOK FOOTER
   ========================================================= */
function SketchFooter() {
  return (
    <footer className="relative border-t border-[rgba(74,74,94,0.12)] bg-[#fefcf3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <div className="font-cormorant text-2xl font-semibold text-[#FB7F05] mb-1">Faith Model</div>
          <div className="font-caveat text-[#d4a017] text-sm mb-4">— School —</div>
          <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">Empowering minds, shaping futures since 1989. CBSE Affiliated.</p>
        </div>
        <div>
          <h4 className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-4">Explore</h4>
          <ul className="space-y-2">
            {[["About Us", "/about"], ["Academics", "/academics"], ["Facilities", "/facilities"], ["Student Life", "/student-life"], ["Admissions", "/admissions"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="font-inter text-sm text-[#4a4a5e] hover:text-[#d4a017] transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-4">Community</h4>
          <ul className="space-y-2">
            {[["Parents", "/parents"], ["Students", "/students"], ["Alumni", "/alumni"], ["Careers", "/careers"], ["News", "/news"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="font-inter text-sm text-[#4a4a5e] hover:text-[#d4a017] transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-4">Contact</h4>
          <address className="not-italic font-inter text-sm text-[#4a4a5e] leading-relaxed space-y-1">
            <p>Chennai, Tamil Nadu 600 034</p>
            <a href="tel:+914412345678" className="hover:text-[#d4a017] transition-colors block mt-2">+91 44 1234 5678</a>
            <a href="mailto:info@faithmodelschool.edu.in" className="hover:text-[#d4a017] transition-colors block text-xs">info@faithmodelschool.edu.in</a>
          </address>
        </div>
      </div>
      <div className="border-t border-[rgba(74,74,94,0.08)] py-6 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#4a4a5e]/50 font-inter">
        <span>© 2026 Faith Model School. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/mandatory-disclosure" className="hover:text-[#d4a017] transition-colors">CBSE Disclosure</Link>
          <Link href="/safety#policies" className="hover:text-[#d4a017] transition-colors">Child Protection</Link>
          <Link href="/contact#grievance" className="hover:text-[#d4a017] transition-colors">Grievance</Link>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   PAGE ASSEMBLY
   ========================================================= */
export default function Home() {
  return (
    <StoryLayout>
      <HeroSection />
      <WelcomeSection />
      <StatsSection />
      <WhyChooseUs />
      <PhilosophySection />
      <AcademicExcellence />
      <StudentJourney />
      <CampusExperience />
      <FacilitiesOverview />
      <FeaturedPrograms />
      <AchievementsTicker />
      <UpcomingEvents />
      <Testimonials />
      <GallerySection />
      <NewsSection />
      <AccreditationSection />
      <BookVisitSection />
      <DownloadSection />
      <FAQSection />
      <ContactSection />
      <SketchFooter />
      <QuickEnquiryBar />
    </StoryLayout>
  );
}
