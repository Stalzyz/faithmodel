import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership — Faith Model School",
  description: "Meet the leadership team guiding Faith Model School towards excellence.",
};

const leaders = [
  { name: "Dr. Thomas Abraham", role: "Founder & Chairman", desc: "With over 40 years in education, Dr. Abraham's vision of holistic, value-based learning continues to be the guiding light for Faith Model School." },
  { name: "Prof. Michael Chang", role: "Principal", desc: "An advocate for inquiry-based learning and technological integration, Prof. Chang ensures our curriculum remains globally competitive." },
  { name: "Dr. Sarah Thomas", role: "Vice Principal (Administration)", desc: "Overseeing campus operations, safety, and community outreach, Dr. Thomas ensures a seamless experience for students and parents." },
  { name: "Mrs. Latha Krishnan", role: "Academic Director", desc: "A subject matter expert in pedagogy, Mrs. Krishnan designs our curriculum framework and leads teacher professional development." },
];

export default function LeadershipPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Our Guiding Light</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#FB7F05] leading-[1.08] tracking-tight max-w-4xl">
            School<br /><em className="text-[#d4a017] not-italic">Leadership</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="grid md:grid-cols-2 gap-12">
            {leaders.map((leader, i) => (
               <SketchReveal key={leader.name} delay={i * 0.1}>
                  <div className="flex flex-col sm:flex-row gap-8">
                     <div className="w-32 h-32 shrink-0 bg-[rgba(74,74,94,0.05)] border border-[rgba(74,74,94,0.1)] rounded-full flex items-center justify-center">
                        <span className="text-4xl opacity-20">👤</span>
                     </div>
                     <div>
                        <h3 className="font-cormorant text-2xl font-semibold text-[#FB7F05] mb-1">{leader.name}</h3>
                        <div className="font-caveat text-[#c17b5a] text-base mb-4">{leader.role}</div>
                        <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{leader.desc}</p>
                     </div>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
