import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports & Athletics — Faith Model School",
  description: "Faith Model School's sports philosophy, facilities, and athletic achievements.",
};

const sportsList = [
  { name: "Football", icon: "⚽", type: "Outdoor" },
  { name: "Cricket", icon: "🏏", type: "Outdoor" },
  { name: "Basketball", icon: "🏀", type: "Outdoor" },
  { name: "Athletics", icon: "🏃", type: "Track" },
  { name: "Swimming", icon: "🏊", type: "Aquatics" },
  { name: "Badminton", icon: "🏸", type: "Indoor" },
  { name: "Table Tennis", icon: "🏓", type: "Indoor" },
  { name: "Chess", icon: "♟️", type: "Mind Sports" },
];

export default function SportsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Athletics</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Strength, Skill &<br /><em className="text-[#FB7F05] not-italic">Sportsmanship</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
         <SketchReveal>
            <SectionHeading annotation="Philosophy" title="Lessons from the Field" subtitle="We believe that some of life's greatest lessons — resilience, teamwork, leadership, and dealing with failure — are best learned on the sports field." />
            <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4">Physical education is not an afterthought at Faith Model; it is a core component of our curriculum. Every student is encouraged to pick at least one sport and pursue it with dedication, supported by professional coaches and state-of-the-art infrastructure.</p>
         </SketchReveal>
         <SketchReveal delay={0.2} className="h-[400px]">
            <img src="https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80" alt="Sports" className="w-full h-full object-cover rounded-sm" />
         </SketchReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
         <SectionHeading annotation="Disciplines" title="Sports Offered" center />
         <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {sportsList.map((s, i) => (
               <SketchReveal key={s.name} delay={i * 0.05}>
                  <div className="border border-[rgba(74,74,94,0.1)] p-6 text-center hover:border-[#FB7F05] transition-colors group">
                     <div className="text-4xl mb-3 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{s.icon}</div>
                     <div className="font-poppins text-sm font-semibold text-[#1a1a2e]">{s.name}</div>
                     <div className="font-caveat text-[#c17b5a] text-sm mt-1">{s.type}</div>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
