import { ReactNode } from "react";
import SketchReveal from "./SketchReveal";

interface SectionHeadingProps {
  annotation?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  delay?: number;
}

export default function SectionHeading({
  annotation,
  title,
  subtitle,
  center = false,
  delay = 0,
}: SectionHeadingProps) {
  return (
    <SketchReveal delay={delay} className={center ? "text-center flex flex-col items-center" : ""}>
      {annotation && (
        <p
          className={`font-caveat text-[#c17b5a] text-xl mb-3 -rotate-1 inline-block ${center ? "text-center" : ""}`}
          aria-hidden="true"
        >
          {annotation}
        </p>
      )}
      <h2 className={`font-cormorant text-[clamp(2.4rem,5vw,4.5rem)] font-light text-[#1a1a2e] leading-tight tracking-tight mb-4 ${center ? "text-center" : ""}`}>
        {title}
      </h2>
      <div
        className={`h-px bg-[#FB7F05] w-12 mb-6 ${center ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p className={`font-inter text-lg text-[#4a4a5e] font-light leading-relaxed max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
          {subtitle}
        </p>
      )}
    </SketchReveal>
  );
}
