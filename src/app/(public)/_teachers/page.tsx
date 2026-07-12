import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty & Teachers — Faith Model School",
  description: "Meet the dedicated educators at Faith Model School and explore teaching career opportunities.",
};

export default function TeachersPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Our Educators</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            The Heart of<br /><em className="text-[#FB7F05] not-italic">Faith Model</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
         <SketchReveal>
            <SectionHeading annotation="Philosophy" title="More Than Teachers" subtitle="A great curriculum is only as effective as the educator delivering it. Our faculty members are mentors, guides, and lifelong learners themselves." />
            <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4">We maintain a strict 1:15 student-to-teacher ratio. Every educator undergoes over 60 hours of professional development annually, ensuring they remain at the cutting edge of pedagogical practices, child psychology, and technological integration.</p>
         </SketchReveal>
         <SketchReveal delay={0.2}>
            <div className="h-[400px] overflow-hidden rounded-sm">
               <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" alt="Teachers" className="w-full h-full object-cover" />
            </div>
         </SketchReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
         <SketchReveal>
            <h2 className="font-cormorant text-4xl font-light text-[#1a1a2e] mb-6">Join Our Faculty</h2>
            <p className="font-inter text-[#4a4a5e] mb-10 max-w-2xl mx-auto">We are always looking for passionate educators who share our vision. Explore open positions or submit your resume for future opportunities.</p>
            <a href="/careers" className="inline-block font-poppins text-sm font-semibold text-[#1a1a2e] border border-[#1a1a2e] px-8 py-4 hover:bg-[#1a1a2e] hover:text-[#fefcf3] transition-all duration-400">
               View Open Positions
            </a>
         </SketchReveal>
      </section>
    </PageLayout>
  );
}
