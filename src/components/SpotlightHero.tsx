"use client";

import { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SpotlightHero() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden pt-20"
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(14, 165, 233, 0.15), transparent 40%)`
        }}
      />
      
      {/* Subtle background grid for extra tech vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-slate-800/80 backdrop-blur-md text-slate-300 font-semibold text-xs mb-8 border border-slate-700 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            Admissions Open 2026-27
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 leading-tight tracking-tight max-w-5xl mx-auto">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>Empowering Minds.</div>
          <div className="animate-fade-in-up text-slate-400 mt-2" style={{ animationDelay: '0.5s', opacity: 0 }}>
            Shaping the <span className="text-accent italic font-serif">Future.</span>
          </div>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.7s', opacity: 0 }}>
          Join a dynamic community dedicated to academic excellence, innovation, and holistic development.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
          
          {/* CTA with popup image */}
          <div className="relative group">
            <Link href="/admissions" className="relative z-20 flex items-center justify-center gap-2 bg-accent text-slate-900 font-bold px-10 py-4 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300">
              Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Pop-up Image on Hover */}
            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 h-32 bg-white rounded-xl shadow-2xl overflow-hidden opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-30 border-2 border-white">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80" alt="Campus Preview" className="w-full h-full object-cover" />
            </div>
          </div>

          <Link href="/contact" className="text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-full hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all duration-300">
            Book a Campus Tour
          </Link>
        </div>
      </div>
    </section>
  );
}
