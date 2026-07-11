"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Microscope, Palette, Trophy, Mic, Music, Code, Camera, Briefcase } from 'lucide-react';

const ROLES = [
  {
    title: "Scientist",
    icon: <Microscope className="w-16 h-16 md:w-24 md:h-24" />,
    bgClass: "from-blue-900 to-slate-950",
    textClass: "text-blue-400",
    shadowClass: "shadow-blue-500/20"
  },
  {
    title: "Artist",
    icon: <Palette className="w-16 h-16 md:w-24 md:h-24" />,
    bgClass: "from-rose-900 to-slate-950",
    textClass: "text-rose-400",
    shadowClass: "shadow-rose-500/20"
  },
  {
    title: "Athlete",
    icon: <Trophy className="w-16 h-16 md:w-24 md:h-24" />,
    bgClass: "from-emerald-900 to-slate-950",
    textClass: "text-emerald-400",
    shadowClass: "shadow-emerald-500/20"
  },
  {
    title: "Leader",
    icon: <Mic className="w-16 h-16 md:w-24 md:h-24" />,
    bgClass: "from-purple-900 to-slate-950",
    textClass: "text-purple-400",
    shadowClass: "shadow-purple-500/20"
  },
  {
    title: "Musician",
    icon: <Music className="w-16 h-16 md:w-24 md:h-24" />,
    bgClass: "from-amber-900 to-slate-950",
    textClass: "text-amber-400",
    shadowClass: "shadow-amber-500/20"
  },
  {
    title: "Coder",
    icon: <Code className="w-16 h-16 md:w-24 md:h-24" />,
    bgClass: "from-cyan-900 to-slate-950",
    textClass: "text-cyan-400",
    shadowClass: "shadow-cyan-500/20"
  },
  {
    title: "Photographer",
    icon: <Camera className="w-16 h-16 md:w-24 md:h-24" />,
    bgClass: "from-zinc-800 to-black",
    textClass: "text-zinc-300",
    shadowClass: "shadow-zinc-500/20"
  },
  {
    title: "Entrepreneur",
    icon: <Briefcase className="w-16 h-16 md:w-24 md:h-24" />,
    bgClass: "from-indigo-900 to-slate-950",
    textClass: "text-indigo-400",
    shadowClass: "shadow-indigo-500/20"
  }
];

export default function RotatingFacesHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isRotating]);

  const activeRole = ROLES[activeIndex];

  return (
    <section 
      className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 transition-colors duration-1000 bg-gradient-to-br ${activeRole.bgClass}`}
    >
      {/* Dynamic Background Overlays */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80')] opacity-5 mix-blend-overlay"></div>
      
      <div className="container relative z-10 mx-auto px-4 w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Dynamic Typography */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight tracking-tight">
            Every Child Has <br />
            <span className="italic font-serif opacity-90">Many Talents.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 mb-12 font-light leading-relaxed">
            We Help Them Discover <br className="hidden md:block" />
            <span className={`font-bold transition-colors duration-1000 ${activeRole.textClass}`}>
              Every One.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/admissions" className="group relative bg-white text-slate-900 font-bold px-10 py-5 rounded-full overflow-hidden shadow-xl hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Their Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side: Rotating "Faces" Cube/Carousel */}
        <div 
          className="lg:w-1/2 flex items-center justify-center relative h-[400px] w-full"
          onMouseEnter={() => setIsRotating(false)}
          onMouseLeave={() => setIsRotating(true)}
        >
          {ROLES.map((role, idx) => {
            const isActive = idx === activeIndex;
            const isPrev = idx === (activeIndex - 1 + ROLES.length) % ROLES.length;
            const isNext = idx === (activeIndex + 1) % ROLES.length;
            
            let transformClass = "opacity-0 scale-50 translate-y-20 z-0";
            if (isActive) {
              transformClass = "opacity-100 scale-100 translate-y-0 z-20";
            } else if (isPrev) {
              transformClass = "opacity-40 scale-75 -translate-x-32 -translate-y-10 z-10 blur-sm";
            } else if (isNext) {
              transformClass = "opacity-40 scale-75 translate-x-32 -translate-y-10 z-10 blur-sm";
            }

            return (
              <div 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`absolute transition-all duration-700 ease-in-out cursor-pointer flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] p-12 md:p-16 w-64 md:w-80 ${transformClass} ${isActive ? activeRole.shadowClass + ' shadow-2xl' : ''}`}
              >
                <div className={`mb-6 transition-colors duration-1000 ${isActive ? activeRole.textClass : 'text-slate-400'}`}>
                  {role.icon}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white tracking-wide">
                  {role.title}
                </h3>
              </div>
            );
          })}
          
          {/* Navigation Dots */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {ROLES.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${idx === activeIndex ? `w-10 bg-white` : 'bg-white/30 hover:bg-white/50'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
