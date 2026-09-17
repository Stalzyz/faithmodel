"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import SketchReveal from "@/components/SketchReveal";

export default function AdmissionsSpotlightBlock({ block }: { block?: any }) {
  const data = block?.data || {};

  const annotation = data.annotation || "A Progressive Learning Village";
  const title = data.title || "Admissions Open for Academic Year 2026–27";
  const subtitle = data.subtitle || "We nurture young minds through inquiry, play, and conceptual understanding. Join a warm, vibrant community focused on holistic growth.";
  const ctaLabel = data.ctaLabel || "Apply for Admission";
  const ctaHref = data.ctaHref || "/admissions";
  const bgImage = data.bgImage || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80";
  const bannerHeadline = data.bannerHeadline || "ADMISSIONS OPEN";
  const bannerText = data.bannerText || "Applications for 2026–27 are now being accepted";
  const bannerCta = data.bannerCta || "Apply";

  const features = data.features || [
    "CBSE Curriculum with Future-Ready Pedagogy",
    "15-Acre Eco-Friendly Green Campus",
    "Holistic Arts, Sports & AI STEM Labs"
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#fefcf3] border-b border-[rgba(74,74,94,0.08)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <SketchReveal delay={0.1}>
              <div className="font-caveat text-[#c17b5a] text-xl -rotate-1">
                {annotation}
              </div>
              <h2 className="font-cormorant text-[clamp(2.4rem,4.5vw,3.6rem)] font-light text-[#1a1a2e] leading-[1.12] tracking-tight mt-2">
                {title}
              </h2>
            </SketchReveal>

            <SketchReveal delay={0.2}>
              <p className="font-inter text-base lg:text-lg text-[#4a4a5e] font-light leading-relaxed">
                {subtitle}
              </p>
            </SketchReveal>

            <SketchReveal delay={0.3}>
              <ul className="space-y-3 pt-2">
                {features.map((feat: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 font-inter text-sm text-[#2a2840] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7F05] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </SketchReveal>

            <SketchReveal delay={0.4}>
              <div className="pt-4 flex items-center gap-4 flex-wrap">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 font-poppins text-sm font-semibold text-[#fefcf3] bg-[#1a1a2e] hover:bg-[#FB7F05] px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/mandatory-disclosure"
                  className="font-poppins text-sm font-medium text-[#4a4a5e] hover:text-[#FB7F05] transition-colors underline underline-offset-4"
                >
                  CBSE Disclosures ↗
                </Link>
              </div>
            </SketchReveal>
          </div>

          {/* Right Image Container Column matching user design */}
          <div className="lg:col-span-6">
            <SketchReveal delay={0.2}>
              {/* Outer Warm Beige Rounded Frame Container */}
              <div className="relative p-3 sm:p-4 bg-[#f4efe4] border border-[#e6decc] rounded-[2.5rem] shadow-sm">
                {/* Main Rounded Image */}
                <div className="relative h-[420px] sm:h-[480px] w-full rounded-[2rem] overflow-hidden shadow-inner bg-gray-200">
                  <img
                    src={bgImage}
                    alt="Faith Model School Campus & Students"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Admissions Open Pill Box Overlay at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#f5f1e6]/95 backdrop-blur-md border border-[#e2d9c5] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-between gap-3 sm:gap-4 transition-transform duration-300 hover:scale-[1.01]">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#1a1a2e] rounded-full flex items-center justify-center shrink-0 shadow-sm text-white">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#FB7F05]" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-poppins text-[11px] sm:text-xs font-bold text-[#FB7F05] uppercase tracking-wider">
                          {bannerHeadline}
                        </div>
                        <p className="font-inter text-xs sm:text-sm text-[#2a2840] font-medium truncate mt-0.5">
                          {bannerText}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={ctaHref}
                      className="shrink-0 bg-[#FB7F05] hover:bg-[#1a1a2e] text-white font-poppins text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 rounded-full transition-colors shadow-sm"
                    >
                      {bannerCta}
                    </Link>
                  </div>
                </div>
              </div>
            </SketchReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
