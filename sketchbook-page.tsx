"use client";

import { useEffect, useState } from 'react';
import StoryLayout from '@/components/StoryLayout';
import Chapter from '@/components/Chapter';
import { PenTool, School, BookOpen, Library, Microscope, Cpu, Trophy, Palette, Users, Star, GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Opening Scene Animation Sequence
    const t1 = setTimeout(() => setStage(1), 3000); // Pencil lifts and starts drawing
    const t2 = setTimeout(() => setStage(2), 5000); // Text appears
    const t3 = setTimeout(() => setStage(3), 7000); // Image fades in
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <StoryLayout>
      
      {/* OPENING SCENE (HERO) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-slate-200/50 pt-20 pb-32">
        <div className="container mx-auto px-4 w-full max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 p-8 md:p-12 relative z-10">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-slate-800 mb-8 leading-[1.1] tracking-tight relative">
              <span className={`inline-block transition-opacity duration-[2000ms] ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>Every Great Future</span><br/>
              <span className={`inline-block transition-opacity duration-[2000ms] delay-500 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>Begins With A</span><br/>
              <span className={`inline-block transition-opacity duration-[2000ms] delay-1000 text-slate-500 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>Single Sketch.</span>
              
              {/* Animated Pencil for Hero */}
              <PenTool className={`absolute -right-4 bottom-0 w-8 h-8 text-slate-400 transition-all duration-[3000ms] ease-in-out ${stage === 0 ? 'opacity-0 translate-y-20 rotate-0' : stage === 1 ? 'opacity-100 translate-x-10 translate-y-[-20vh] rotate-[45deg]' : 'opacity-0 translate-x-32 translate-y-32 rotate-90'}`} />
            </h1>
            
            <p className={`text-xl md:text-2xl text-slate-600 font-playfair italic leading-relaxed mb-12 transition-opacity duration-[2000ms] delay-[1500ms] ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              "Every child begins with a blank page. Through curiosity, creativity, and confidence, those pages become a story worth telling."
            </p>

            <div className={`flex flex-col sm:flex-row gap-6 transition-opacity duration-[2000ms] delay-[2500ms] ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <Link href="/admissions" className="bg-slate-800 text-[#FFFCF2] font-poppins font-medium px-8 py-4 rounded-full hover:bg-slate-700 transition-colors cursor-none border border-slate-700">
                Begin the Story
              </Link>
              <button className="text-slate-600 font-poppins font-medium px-8 py-4 rounded-full border border-slate-300 hover:bg-slate-100 transition-colors cursor-none">
                Watch Campus Film
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative h-[50vh] md:h-[60vh] w-full flex items-center justify-center">
            {/* The SVG Sketch that transforms into reality */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-[3000ms] ease-in-out ${stage === 1 ? 'opacity-100 blur-0' : stage >= 2 ? 'opacity-0 blur-md scale-110' : 'opacity-0'}`}>
              <School strokeWidth={1} className="w-64 h-64 text-slate-400" />
            </div>
            
            {/* The Drone Campus Image */}
            <div className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out origin-center rounded-sm overflow-hidden shadow-2xl border-8 border-white ${stage >= 3 ? 'opacity-100 scale-100 grayscale-0 sepia-0' : 'opacity-0 scale-95 grayscale sepia'}`}>
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80" 
                alt="Campus Drone View" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* CHAPTER 1: Welcome */}
      <Chapter 
        title="Chapter One"
        heading="Welcome"
        subheading="The sketch becomes real. We welcome families into a community built on strong values, mutual respect, and a shared vision for excellence."
        icon={School}
        imageSrc="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
        reverse={true}
      />

      {/* CHAPTER 2: Learning Begins */}
      <Chapter 
        title="Chapter Two"
        heading="Learning Begins"
        subheading="Classrooms where equations come to life and paper textures hold the weight of new discoveries. Handwriting shapes the future."
        icon={BookOpen}
        imageSrc="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=80"
        reverse={false}
      />

      {/* CHAPTER 3: The Library */}
      <Chapter 
        title="Chapter Three"
        heading="The Library"
        subheading="Books slowly open, and knowledge flows from the pages. Reading becomes alive, and quiet moments turn into vast adventures."
        icon={Library}
        imageSrc="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80"
        reverse={true}
      />

      {/* CHAPTER 4: Science */}
      <Chapter 
        title="Chapter Four"
        heading="Science"
        subheading="Chemical reactions animate. Planets rotate. The microscope zooms. The sketch becomes a real laboratory of endless inquiry."
        icon={Microscope}
        imageSrc="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80"
        reverse={false}
      />

      {/* CHAPTER 5: Innovation */}
      <Chapter 
        title="Chapter Five"
        heading="Innovation"
        subheading="Robots move. Circuits glow. Students begin programming the AI of tomorrow. Technology emerges naturally from imagination."
        icon={Cpu}
        imageSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80"
        reverse={true}
      />

      {/* CHAPTER 6: Sports */}
      <Chapter 
        title="Chapter Six"
        heading="Sports"
        subheading="A football rolls, and the drawing becomes a field. Students run, play, and learn the true meaning of teamwork and resilience."
        icon={Trophy}
        imageSrc="https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1000&q=80"
        reverse={false}
      />

      {/* CHAPTER 7: Arts */}
      <Chapter 
        title="Chapter Seven"
        heading="Arts"
        subheading="Watercolor slowly spreads. The artwork transforms into actual student performances, where every note and stroke tells a story."
        icon={Palette}
        imageSrc="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1000&q=80"
        reverse={true}
      />

      {/* CHAPTER 8: Campus Life */}
      <Chapter 
        title="Chapter Eight"
        heading="Campus Life"
        subheading="Gardens grow. Friendships form. Assemblies and celebrations fill the air with joy. Every day feels vibrant and alive."
        icon={Users}
        imageSrc="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
        reverse={false}
      />

      {/* CHAPTER 9: Achievements */}
      <Chapter 
        title="Chapter Nine"
        heading="Achievements"
        subheading="Thousands of stars. Every star becomes a success story—Olympiads, leadership, arts. Each one expanding into brilliant reality."
        icon={Star}
        imageSrc="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
        reverse={true}
      />

      {/* CHAPTER 10 & FINAL SCENE */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-48 text-center px-4">
        
        {/* The Final Chapter Content */}
        <div className="mb-24 flex flex-col items-center max-w-4xl">
          <GraduationCap strokeWidth={1} className="w-32 h-32 text-slate-400 mb-8" />
          <span className="font-sans text-sm font-bold tracking-[0.3em] text-slate-400 uppercase mb-4">Chapter Ten</span>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-800 mb-8">Graduation</h2>
          <p className="text-xl text-slate-600 font-inter font-light leading-relaxed">
            The sketchbook reaches its final page. Students, parents, and certificates. The illustration slowly becomes the real graduation ceremony. The sketchbook gently closes.
          </p>
        </div>

        {/* The Final Scene */}
        <div className="max-w-3xl border-t border-slate-300 pt-24 flex flex-col items-center">
          <div className="w-full flex items-center justify-center gap-8 mb-12">
            <div className="h-px bg-slate-300 w-full flex-1"></div>
            <PenTool className="w-6 h-6 text-slate-400 transform -rotate-45" />
            <div className="h-px bg-slate-300 w-full flex-1"></div>
          </div>
          
          <blockquote className="text-2xl md:text-4xl font-playfair italic text-slate-700 leading-relaxed mb-16 px-4">
            "Every masterpiece begins with a single line.<br/><br/>
            Every future begins with a single day."
          </blockquote>
          
          <Link href="/admissions" className="bg-slate-800 text-[#FFFCF2] font-poppins font-medium px-12 py-5 rounded-full hover:bg-slate-700 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-none border border-slate-700">
            Admissions
          </Link>
        </div>

      </section>

    </StoryLayout>
  );
}