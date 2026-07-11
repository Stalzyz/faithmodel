"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: 'About', href: '/about', subLinks: ['History & Legacy', 'Leadership Team', 'Vision & Mission'] },
    { name: 'Academics', href: '/academics', subLinks: ['CBSE Curriculum', 'Digital Learning', 'STEM Education'] },
    { name: 'Admissions', href: '/admissions', subLinks: ['Admission Process', 'Fee Structure', 'Apply Online'] },
    { name: 'Facilities', href: '/facilities', subLinks: ['Smart Classrooms', 'Labs & Innovation', 'Sports Complex'] },
    { name: 'Portals', href: '/portals', subLinks: ['Parent Portal', 'Student Portal', 'Teacher Portal'] },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-playfair font-bold text-primary">FAITH</span>
            <span className="text-lg font-bold text-accent tracking-widest mt-1">MODEL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={link.href} className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-primary transition-colors py-2">
                  {link.name}
                  <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
                </Link>
                
                {/* Mega Menu / Dropdown */}
                {activeDropdown === link.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-xl rounded-b-lg border-t-2 border-primary py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {link.subLinks.map((sub, i) => (
                      <Link key={i} href={`${link.href}#${sub.toLowerCase().replace(/ /g, '-')}`} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Call to Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/admissions" className="text-sm font-semibold text-primary hover:text-accent transition-colors">
              Admissions 2026
            </Link>
            <Link href="/contact" className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-md">
              Book a Tour
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t p-4 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b pb-2">
                <Link href={link.href} className="font-semibold text-lg text-primary block py-2">{link.name}</Link>
                <div className="pl-4 flex flex-col gap-2 mt-2">
                  {link.subLinks.map((sub, i) => (
                    <Link key={i} href={`${link.href}#${sub.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-slate-600">{sub}</Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/contact" className="bg-primary text-white text-center font-semibold px-6 py-3 rounded-md mt-4">
              Book a Tour
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
