import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Life — Faith Model School",
  description: "Experience the vibrant student life at Faith Model School: houses, leadership, events, trips, and community service.",
};

const sections = [
  { title: "Student Council & Leadership", icon: "👑", desc: "We believe leaders are made, not born. Our Student Council, led by the Head Boy and Head Girl, gives students a voice in school decisions and experience in managing large-scale events." },
  { title: "The House System", icon: "🛡️", desc: "Every student belongs to one of four houses: Ignis (Red), Terra (Green), Aqua (Blue), or Aer (Yellow). Inter-house competitions foster healthy rivalry, teamwork, and a sense of belonging." },
  { title: "Clubs & Societies", icon: "🎯", desc: "From the Debate Society and Model UN to the Eco Club and Photography Guild, we offer over 15 clubs that meet weekly to pursue passions beyond the curriculum." },
  { title: "Educational Tours", icon: "✈️", desc: "Learning extends beyond the gates. Annual field trips, industrial visits, and international exchange programs provide crucial real-world context to classroom theory." },
  { title: "Community Service", icon: "🤝", desc: "Empathy in action. Students participate in rural education camps, environmental clean-ups, and partner with local NGOs to understand their role as responsible citizens." },
  { title: "Annual Festivals", icon: "🎉", desc: "The Academic Year is punctuated by grand celebrations: The Annual Day, Sports Meet, Science Fest, and Cultural Week — where every child gets a chance to shine on stage." },
];

export default function StudentLifePage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Beyond the Classroom</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            A Vibrant<br /><em className="text-[#d4a017] not-italic">Student Life</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
         <SketchReveal>
            <SectionHeading annotation="The Experience" title="Making Memories" subtitle="School is where the most enduring friendships are forged and the most defining memories are made. At Faith Model, we ensure these years are filled with joy, discovery, and shared experiences." />
         </SketchReveal>
         <SketchReveal delay={0.2} className="h-[400px]">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" alt="Students cheering" className="w-full h-full object-cover rounded-sm" />
         </SketchReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {sections.map((s, i) => (
               <SketchReveal key={s.title} delay={i * 0.1}>
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e] mb-3">{s.title}</h3>
                  <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{s.desc}</p>
               </SketchReveal>
            ))}
         </div>
      </section>
      
    </PageLayout>
  );
}
