"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DEFAULT_NAV_CATEGORIES = [
  {
    title: "About",
    items: [
      { label: "Our Story", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Disclosures", href: "/mandatory-disclosure" },
    ]
  },
  {
    title: "Academics",
    items: [
      { label: "Approach", href: "/academics" },
      { label: "School Levels", href: "/school-levels" },
      { label: "Teachers", href: "/teachers" },
      { label: "Innovation", href: "/innovation" },
    ]
  },
  {
    title: "Campus",
    items: [
      { label: "The Campus", href: "/campus" },
      { label: "Facilities", href: "/facilities" },
      { label: "Sports", href: "/sports" },
      { label: "Arts", href: "/arts" },
      { label: "Student Life", href: "/student-life" },
      { label: "Safety", href: "/safety" },
    ]
  },
  {
    title: "Community",
    items: [
      { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
      { label: "Students", href: "/students" },
      { label: "Parents", href: "/parents" },
      { label: "Alumni", href: "/alumni" },
    ]
  },
  {
    title: "Admissions",
    items: [
      { label: "Admissions", href: "/admissions" },
      { label: "Portals", href: "/portals" },
      { label: "Downloads", href: "/downloads" },
      { label: "Contact Us", href: "/contact" },
    ]
  }
];

export default function SketchNav({ 
  navCategories,
  headerConfig
}: { 
  navCategories?: any;
  headerConfig?: { affiliationText?: string; ctaLabel?: string; ctaHref?: string };
}) {
  const categories = (Array.isArray(navCategories) && navCategories.length > 0) ? navCategories : DEFAULT_NAV_CATEGORIES;
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isCategoryActive = (items: { href: string }[]) => {
    return items.some(item => pathname === item.href || pathname.startsWith(item.href + "/"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/Faith_model_logo.svg" alt="Faith Model School Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/" className={`text-sm font-semibold transition-colors ${pathname === "/" ? "text-[#f39c12]" : "text-gray-800 hover:text-[#f39c12]"}`}>
            Home
          </Link>
          
          {categories.map((category: any) => (
            <div key={category.title} className="relative group">
              <button className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 ${isCategoryActive(category.items) ? "text-[#f39c12]" : "text-gray-800 group-hover:text-[#f39c12]"}`}>
                {category.title}
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Invisible hover bridge to prevent menu from closing when mouse moves down */}
              <div className="absolute top-full left-0 w-full h-2"></div>
              
              <div className="absolute top-[calc(100%+0.5rem)] left-0 min-w-[200px] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top group-hover:translate-y-0 translate-y-2 border border-gray-100">
                {category.items.map((item: any) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={`block px-5 py-3 text-sm transition-colors ${pathname === item.href ? "bg-[#f39c12] text-white" : "text-gray-700 hover:bg-[#f39c12] hover:text-white"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Affiliation Button & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {headerConfig?.ctaLabel && (
            <Link 
              href={headerConfig.ctaHref || "/admissions"} 
              className="bg-[#1a1a2e] text-[#fefcf3] text-xs font-semibold px-4 py-2.5 rounded hover:bg-[#FB7F05] hover:text-[#1a1a2e] transition-colors shadow-sm"
            >
              {headerConfig.ctaLabel}
            </Link>
          )}
          <div className="bg-black text-white px-4 py-2 text-xs font-semibold text-center leading-tight tracking-wide whitespace-pre-line">
            {headerConfig?.affiliationText || "Affiliation No\n1931557"}
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-gray-800 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden bg-white border-t transition-all duration-300 overflow-y-auto ${
          isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-4 shadow-inner">
          <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-[#f39c12]/10 hover:text-[#f39c12] rounded-md">Home</Link>
          
          {categories.map((category: any) => (
            <div key={category.title} className="px-3">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">{category.title}</div>
              <div className="space-y-1 pl-2 border-l-2 border-gray-100">
                {category.items.map((item: any) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={`block px-3 py-2 text-base font-medium rounded-md ${pathname === item.href ? "text-[#f39c12] bg-[#f39c12]/5" : "text-gray-700 hover:bg-[#f39c12]/10 hover:text-[#f39c12]"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
