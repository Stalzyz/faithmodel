"use client";

import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Sparkles, Trophy, Medal, Theater, Monitor, Leaf, Bot, Music, BookOpen, Microscope, Lightbulb, Globe, Palette } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function CustomHTMLBlock({ block }: { block: any }) {
  const data = block?.data || {};
  return (
    
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div dangerouslySetInnerHTML={{ __html: data.html || '' }} />
      </div>
    </section>
  
  );
}
