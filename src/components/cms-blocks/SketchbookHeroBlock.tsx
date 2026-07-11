"use client";

import SketchbookHero from "@/components/SketchbookHero";

export default function SketchbookHeroBlock({ block }: { block: any }) {
  // We can pass data to SketchbookHero if we update it, but for now we just render it.
  return <SketchbookHero />;
}
