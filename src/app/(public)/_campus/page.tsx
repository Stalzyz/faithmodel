import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus — Faith Model School",
  description: "Explore our 15-acre green campus, state-of-the-art facilities, and the vibrant environment that makes Faith Model a second home.",
};

const areas = [
  { name: "Academic Block A", desc: "Houses Primary and Middle School classrooms, the Junior Science Lab, and the Primary Art Studio." },
  { name: "Academic Block B", desc: "Dedicated to Senior Secondary students. Features smart classrooms, the main Science Laboratories, and the Career Counselling Centre." },
  { name: "The Innovation Hub", desc: "A standalone facility for the AI Lab, Robotics Centre, Maker Space, and Computer Labs." },
  { name: "Sports Complex", desc: "Includes an indoor stadium, Olympic-size swimming pool, basketball courts, and a full-size football field." },
  { name: "Performing Arts Centre", desc: "Features an 800-seat auditorium, acoustic music rooms, and dance studios with sprung floors." },
  { name: "The Green Quad", desc: "The heart of the campus. A landscaped central courtyard with old banyan trees where students gather, read, and relax." },
];

export default function CampusPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">15 Acres of Possibility</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            A Campus Designed for<br /><em className="text-[#d4a017] not-italic">Discovery</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
        <SketchReveal>
          <SectionHeading annotation="Overview" title="More Than Just Classrooms" subtitle="Our campus is purposefully designed to be an active participant in your child's education. From sustainable architecture to spaces that encourage collaborative learning, every inch of Faith Model School serves a purpose." />
          <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4">We believe that a well-designed environment reduces stress, increases focus, and inspires creativity. That's why our campus features extensive natural lighting, open green spaces, and specialised zones for different types of learning and play.</p>
        </SketchReveal>
        <SketchReveal delay={0.2}>
          <div className="grid grid-cols-2 gap-4 h-[50vh]">
            <div className="h-full overflow-hidden rounded-sm">
               <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80" alt="Campus Green" className="w-full h-full object-cover" />
            </div>
            <div className="h-full overflow-hidden rounded-sm mt-8">
               <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80" alt="Campus Building" className="w-full h-full object-cover" />
            </div>
          </div>
        </SketchReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="Master Plan" title="Campus Map & Zones" center />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((a, i) => (
            <SketchReveal key={a.name} delay={i * 0.08}>
              <div className="border border-[rgba(74,74,94,0.1)] p-8 h-full hover:border-[#d4a017] transition-colors group bg-[#fefcf3]">
                <div className="font-manrope text-3xl font-extrabold text-[rgba(74,74,94,0.07)] mb-4 group-hover:text-[rgba(212,160,23,0.2)] transition-colors">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e] mb-3">{a.name}</h3>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{a.desc}</p>
              </div>
            </SketchReveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] bg-[#1a1a2e] relative overflow-hidden -mx-6 lg:-mx-12 px-12 lg:px-24">
        <div className="absolute inset-0 graph-paper opacity-5" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <SketchReveal>
              <div className="font-caveat text-[#d4a017] text-xl mb-4 -rotate-1">Sustainability</div>
              <h2 className="font-cormorant text-[clamp(2.5rem,5vw,4rem)] font-light text-[#fefcf3] leading-tight mb-6">A Green Campus</h2>
              <div className="w-12 h-px bg-[#d4a017] mb-6" />
              <p className="font-inter text-sm text-[#fefcf3]/70 leading-relaxed mb-8">We don't just teach environmental science; we live it. Our campus is a certified Green School, demonstrating sustainable practices to our students every day.</p>
              <ul className="space-y-4">
                {[
                  "Solar panels generating 60% of our energy needs",
                  "Rainwater harvesting systems across all buildings",
                  "Organic kitchen garden maintained by students",
                  "Zero single-use plastic policy on campus",
                  "Comprehensive waste segregation and composting"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-inter text-sm text-[#fefcf3]/80">
                     <span className="text-[#d4a017] shrink-0 mt-0.5">✦</span>{item}
                  </li>
                ))}
              </ul>
            </SketchReveal>
            <SketchReveal delay={0.2} className="h-[400px]">
               <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80" alt="Green Campus" className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
            </SketchReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
         <SketchReveal>
            <h2 className="font-cormorant text-4xl font-light text-[#1a1a2e] mb-6">Experience It Yourself</h2>
            <p className="font-inter text-[#4a4a5e] mb-10">The best way to understand the Faith Model difference is to walk our halls.</p>
            <a href="/contact" className="inline-block font-poppins text-sm font-semibold text-[#1a1a2e] border border-[#1a1a2e] px-8 py-4 hover:bg-[#1a1a2e] hover:text-[#fefcf3] transition-all duration-400">
               Book a Campus Tour
            </a>
         </SketchReveal>
      </section>
    </PageLayout>
  );
}
