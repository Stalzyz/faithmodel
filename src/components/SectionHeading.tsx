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
    <SketchReveal delay={delay} className={center ? "text-center" : ""}>
      {annotation && (
        <p
          className="font-caveat text-[#c17b5a] text-xl mb-3 -rotate-1 inline-block"
          aria-hidden="true"
        >
          {annotation}
        </p>
      )}
      <h2 className="font-cormorant text-[clamp(2.4rem,5vw,4.5rem)] font-light text-[#FB7F05] leading-tight tracking-tight mb-4">
        {title}
      </h2>
      <div
        className={`h-px bg-[#d4a017] w-12 mb-6 ${center ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p className="font-inter text-lg text-[#4a4a5e] font-light leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </SketchReveal>
  );
}
