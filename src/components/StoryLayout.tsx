"use client";

import PencilCursor from "./PencilCursor";
import SketchNav from "./SketchNav";

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Fixed global background: graph paper on ivory */}
      <div className="fixed inset-0 -z-10 bg-[#fefcf3] graph-paper" />
      
      {/* Subtle vignette on all four edges (desk depth) */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 60%, rgba(210, 195, 160, 0.25) 100%)
          `,
        }}
      />

      {/* Bookmark-style Navigation */}
      <SketchNav />

      {/* The Sketchbook Content */}
      <main>{children}</main>
    </div>
  );
}
