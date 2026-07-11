import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni Network — Faith Model School",
  description: "Connect with the Faith Model School alumni network.",
};

export default function AlumniPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Once a Student, Always Family</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Alumni<br /><em className="text-[#d4a017] not-italic">Network</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
         <SketchReveal>
            <SectionHeading annotation="Our Legacy" title="A Global Community" subtitle="With over 10,000 alumni spread across the globe, the Faith Model family continues to grow and make an impact in every field imaginable." />
            <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4">We encourage our alumni to stay connected, mentor current students, and participate in our annual Alumni Meet. Your journey inspires the next generation.</p>
            <a href="#" className="inline-block mt-8 font-poppins text-sm font-semibold text-[#1a1a2e] border border-[#1a1a2e] px-8 py-4 hover:bg-[#1a1a2e] hover:text-[#fefcf3] transition-all duration-400">
               Register as Alumni
            </a>
         </SketchReveal>
         <SketchReveal delay={0.2} className="h-[400px]">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" alt="Alumni" className="w-full h-full object-cover rounded-sm" />
         </SketchReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="grid md:grid-cols-3 gap-8">
            {[
               { title: "Alumni Directory", icon: "📖", desc: "Find and connect with your batchmates and other alumni." },
               { title: "Mentorship Program", icon: "🤝", desc: "Give back by mentoring senior secondary students in your field of expertise." },
               { title: "Events & Reunions", icon: "🎉", desc: "Stay updated on the annual Alumni Meet and regional chapter gatherings." },
            ].map((item, i) => (
               <SketchReveal key={item.title} delay={i * 0.1}>
                  <div className="text-center p-8 border border-[rgba(74,74,94,0.1)] hover:border-[#d4a017] transition-colors h-full">
                     <div className="text-4xl mb-4 grayscale opacity-80">{item.icon}</div>
                     <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e] mb-3">{item.title}</h3>
                     <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{item.desc}</p>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
