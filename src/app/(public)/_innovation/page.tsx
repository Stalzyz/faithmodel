import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovation & Technology — Faith Model School",
  description: "Faith Model School's future-ready programs: AI, Robotics, Coding, and Maker Spaces.",
};

export default function InnovationPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Future-Ready</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Innovation &<br /><em className="text-[#d4a017] not-italic">Technology</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
         <SketchReveal>
            <SectionHeading annotation="The Hub" title="Building Tomorrow" subtitle="We don't just teach students how to use technology; we teach them how to create it." />
            <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4">Our Innovation Hub is a dedicated facility where students from Grade 3 onwards engage with coding, robotics, Internet of Things (IoT), and 3D design. As a Microsoft Showcase School, our technology curriculum is aligned with global standards, preparing students for careers that don't even exist yet.</p>
         </SketchReveal>
         <SketchReveal delay={0.2} className="h-[400px]">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" alt="Innovation" className="w-full h-full object-cover rounded-sm" />
         </SketchReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="grid md:grid-cols-2 gap-12">
            {[
               { title: "Artificial Intelligence", desc: "Understanding machine learning models, ethical AI, and data analysis." },
               { title: "Robotics & Automation", desc: "Building and programming autonomous robots using LEGO Mindstorms and Arduino." },
               { title: "Coding & Software", desc: "From Scratch and Block-based coding in primary to Python and Java in senior school." },
               { title: "Maker Space", desc: "Equipped with 3D printers, laser cutters, and electronics workstations for rapid prototyping." }
            ].map((p, i) => (
               <SketchReveal key={p.title} delay={i * 0.1}>
                  <div className="p-8 border border-[rgba(74,74,94,0.1)] hover:border-[#d4a017] transition-colors h-full">
                     <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e] mb-3">{p.title}</h3>
                     <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{p.desc}</p>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
