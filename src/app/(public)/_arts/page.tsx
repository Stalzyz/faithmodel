import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arts & Culture — Faith Model School",
  description: "Explore the performing and visual arts programs at Faith Model School.",
};

export default function ArtsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Creative Expression</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Arts &<br /><em className="text-[#d4a017] not-italic">Culture</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
         <SketchReveal className="order-2 lg:order-1 h-[400px]">
            <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80" alt="Arts" className="w-full h-full object-cover rounded-sm" />
         </SketchReveal>
         <SketchReveal delay={0.2} className="order-1 lg:order-2">
            <SectionHeading annotation="Philosophy" title="Finding Your Voice" subtitle="Art is not an extracurricular activity; it is a fundamental way of understanding the world and expressing oneself." />
            <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4">Whether through the stroke of a brush, the rhythm of a dance, or the projection of a voice on stage, our comprehensive arts program ensures every child discovers their unique creative outlet.</p>
         </SketchReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="grid md:grid-cols-3 gap-8">
            {[
               { icon: "🎨", title: "Visual Arts", desc: "Painting, sketching, pottery, and digital art studios where imagination takes physical form." },
               { icon: "🎵", title: "Music", desc: "Classical and contemporary vocal training, along with instrumental instruction including keyboard, guitar, and drums." },
               { icon: "🎭", title: "Performing Arts", desc: "Drama, theatre production, and classical/modern dance housed in our 800-seat auditorium and dedicated studios." },
            ].map((p, i) => (
               <SketchReveal key={p.title} delay={i * 0.1}>
                  <div className="text-center p-8 border border-[rgba(74,74,94,0.1)] hover:border-[#d4a017] transition-colors h-full">
                     <div className="text-4xl mb-4">{p.icon}</div>
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
