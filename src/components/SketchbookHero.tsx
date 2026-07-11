"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PenTool, Send, GraduationCap, Microscope, Palette, Trophy, BookOpen } from 'lucide-react';

export default function SketchbookHero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Blank canvas with subtle blue sketches appearing
    const timer1 = setTimeout(() => setStage(1), 500); 
    
    // Stage 2: Color and reality bursts through (Yellow & Navy contrast)
    const timer2 = setTimeout(() => setStage(2), 2800); 
    
    // Stage 3: The yellow paper plane takes flight
    const timer3 = setTimeout(() => {
      const plane = document.getElementById('paper-plane');
      if (plane) {
        plane.style.transform = 'translate(120vw, -50vh) rotate(35deg) scale(1.5)';
        plane.style.opacity = '1';
      }
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary pt-20 perspective-[2000px]">
      
      {/* Deep Navy/Blue Blueprint Desk Background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0ea5e930_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e930_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F172A_100%)] pointer-events-none"></div>
      
      {/* The Sketchbook */}
      <div className="container relative z-10 mx-auto px-4 w-full max-w-7xl">
        {/* Subtle 3D tilt for realism that flattens on hover */}
        <div className="bg-[#FFFCF2] rounded-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col lg:flex-row min-h-[75vh] relative border-4 border-[#F5E6C6] transform rotate-x-2 rotate-y-2 hover:rotate-0 hover:scale-[1.01] transition-all duration-1000 ease-out">
          
          {/* Sketchbook Spine (Vibrant Yellow/Accent) */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-accent/90 border-r-2 border-yellow-600 shadow-[inset_-4px_0_10px_rgba(0,0,0,0.15)] z-20 flex items-center justify-center">
            {/* Book stitching details */}
            <div className="h-[90%] w-px border-l-2 border-dashed border-yellow-800/30"></div>
          </div>

          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-70 pointer-events-none z-0"></div>

          {/* Left Side: Typography (The Writing) */}
          <div className="lg:w-1/2 p-12 md:p-20 md:pl-28 relative z-10 flex flex-col justify-center border-r-2 border-slate-200/50">
            
            {/* Animated Blue/Navy Pencil */}
            <div className={`absolute pointer-events-none transition-all duration-[2200ms] ease-out z-20 ${stage === 0 ? 'opacity-100 translate-x-[20vw] -translate-y-20 rotate-45' : stage === 1 ? 'opacity-100 translate-x-[3vw] translate-y-[20vh] rotate-[15deg]' : 'opacity-0 translate-x-[15vw] translate-y-[40vh] rotate-90 scale-50'}`}>
              <PenTool className="w-14 h-14 text-secondary fill-secondary/20 drop-shadow-2xl" />
            </div>

            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-primary mb-8 leading-[1.15] tracking-tight relative z-10">
              <span className={`inline-block transition-all duration-[1200ms] transform origin-left ${stage >= 1 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>Every Great Future</span><br/>
              <span className={`inline-block transition-all duration-[1200ms] delay-[600ms] transform origin-left ${stage >= 1 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>Begins With A</span><br/>
              
              {/* Highlight word changes from sketch-gray to vibrant yellow */}
              <span className={`inline-block transition-colors duration-[1500ms] delay-[1800ms] ${stage >= 2 ? 'text-accent' : 'text-slate-400'} ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                Single Sketch.
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-slate-600 font-playfair italic leading-relaxed mb-12 transition-all duration-1000 delay-[2000ms] ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              "At Faith Model School, curiosity is the first line, learning adds the color, and every child creates a masterpiece."
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-[2800ms] ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link href="/admissions" className="group relative bg-primary text-white font-bold px-10 py-5 rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_10px_40px_rgba(245,158,11,0.5)] hover:-translate-y-1 transition-all duration-500 text-center overflow-hidden border border-transparent hover:border-accent">
                <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Start Your Masterpiece</span>
              </Link>
            </div>
          </div>

          {/* Right Side: The Illustration coming to life */}
          <div className="lg:w-1/2 relative p-8 z-10 flex items-center justify-center bg-[#F8F5EC] overflow-hidden">
            
            {/* The Sketch Phase (Blue & Navy pencil strokes) */}
            <div className={`absolute inset-0 flex flex-wrap items-center justify-center gap-10 p-12 transition-all duration-[1200ms] ${stage === 1 ? 'opacity-100 scale-100 blur-0' : stage === 2 ? 'opacity-0 scale-110 blur-md' : 'opacity-0 scale-90 blur-sm'}`}>
              <Microscope className="w-24 h-24 text-secondary stroke-[1.2] animate-pulse" />
              <Palette className="w-24 h-24 text-primary stroke-[1.2] animate-pulse delay-100" />
              <Trophy className="w-24 h-24 text-accent stroke-[1.2] animate-pulse delay-200" />
              <BookOpen className="w-24 h-24 text-secondary stroke-[1.2] animate-pulse delay-300" />
              <GraduationCap className="w-48 h-48 text-primary stroke-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
            </div>

            {/* The Reality Phase (Yellow framed vibrant photo) */}
            <div className={`absolute inset-6 md:inset-10 transition-all duration-[2000ms] ease-out origin-center rounded-2xl overflow-hidden border-4 border-accent shadow-2xl ${stage >= 2 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-6'}`}>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80" 
                alt="Students in full color reality" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[2000ms]"
              />
              {/* Subtle Blue Tint overlay for brand cohesion */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
            </div>

          </div>
        </div>
        
        {/* The Yellow Paper Airplane */}
        <div 
          id="paper-plane" 
          className="absolute bottom-10 left-10 z-50 transition-all duration-[4000ms] ease-in-out opacity-0 drop-shadow-2xl pointer-events-none" 
          style={{ transform: 'translate(0, 0) rotate(0deg) scale(0.5)' }}
        >
          <div className="relative">
            <Send className="w-20 h-20 text-accent fill-accent transform -rotate-12" />
            {/* Dashed Light Blue Trail */}
            <div className="absolute top-1/2 right-full w-[400px] border-t-4 border-dashed border-secondary/40 -translate-y-1/2 transform translate-x-4 rotate-12"></div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
