const fs = require('fs');
const content = fs.readFileSync('old_page.tsx', 'utf8');

// The HeroSection is from function HeroSection() to the next function WelcomeSection()
const heroMatch = content.match(/function HeroSection\(\) \{([\s\S]*?)\}\n\n\/\* =========================================================\n   SECTION 3: Welcome Message/);
if (heroMatch) {
  const heroCode = `"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function HomepageHeroBlock({ block }: { block?: any }) {
  ${heroMatch[1]}
}
`;
  fs.writeFileSync('src/components/cms-blocks/HomepageHeroBlock.tsx', heroCode);
  console.log('Extracted HomepageHeroBlock.tsx');
} else {
  console.log('Could not find HeroSection');
}
