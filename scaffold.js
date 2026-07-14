const fs = require('fs');
const path = require('path');

const components = [
  'WelcomeBlock',
  'StatsBlock',
  'WhyChooseUsBlock',
  'PhilosophySectionBlock',
  'AcademicExcellenceBlock',
  'StudentJourneyBlock',
  'CampusExperienceBlock',
  'FacilitiesOverviewBlock',
  'FeaturedProgramsBlock',
  'AchievementsTickerBlock',
  'UpcomingEventsBlock',
  'TestimonialsBlock',
  'CustomHTMLBlock'
];

components.forEach(comp => {
  const filePath = path.join(__dirname, 'src/components/cms-blocks', `${comp}.tsx`);
  const template = `"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function ${comp}({ data }: { data: any }) {
  // TODO: Implement actual rendering logic based on page.tsx
  return (
    <section className="py-20 border-y border-[rgba(74,74,94,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-cormorant text-4xl text-[#1a1a2e] mb-4">${comp} placeholder</h2>
      </div>
    </section>
  );
}
`;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template);
  }
});

console.log('Created components');
