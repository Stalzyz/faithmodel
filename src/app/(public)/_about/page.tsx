import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Faith Model School",
  description: "Learn about our 35-year legacy, vision, mission, core values, and the leadership team that shapes Faith Model School.",
};

const timeline = [
  { year: "1989", event: "Faith Model School founded by Dr. Thomas Abraham with 120 students." },
  { year: "1995", event: "Awarded Best Emerging School by the Tamil Nadu Government." },
  { year: "2001", event: "Senior Secondary (Grades 11–12) wing inaugurated; Science and Commerce streams launched." },
  { year: "2008", event: "New 15-acre campus opened with Olympic-standard sports complex." },
  { year: "2012", event: "First school in Chennai to establish a dedicated Robotics & AI Lab." },
  { year: "2016", event: "Microsoft Showcase School designation awarded." },
  { year: "2019", event: "30th Anniversary — 10,000+ alumni celebrated; new library and auditorium inaugurated." },
  { year: "2022", event: "Green School certification; solar energy installation covering 60% of campus power." },
  { year: "2025", event: "Ranked #1 CBSE school in the district; 100% board results for 10th consecutive year." },
];

const values = [
  { icon: "◉", title: "Integrity", desc: "We act with honesty and transparency in all that we do." },
  { icon: "✦", title: "Excellence", desc: "We set high standards and strive to exceed them, always." },
  { icon: "❋", title: "Compassion", desc: "We nurture empathy, kindness, and respect for all." },
  { icon: "◈", title: "Innovation", desc: "We encourage bold thinking, creativity, and the courage to be different." },
  { icon: "⬡", title: "Service", desc: "We believe in giving back to the community and the nation." },
  { icon: "◎", title: "Sustainability", desc: "We are stewards of the planet and build with the future in mind." },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Our Story</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#FB7F05] leading-[1.08] tracking-tight max-w-4xl">
            Thirty-Five Years of<br /><em className="text-[#d4a017] not-italic">Shaping Futures</em>
          </h1>
        </SketchReveal>
      </div>

      {/* History & Legacy */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-20 items-center border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <SectionHeading annotation="Our History" title="A Legacy Built One Child at a Time" subtitle="What began as a vision by Dr. Thomas Abraham in 1989 — a school that would combine academic rigour with heart — has grown into one of Tamil Nadu's most respected institutions, trusted by more than 10,000 families across three decades." />
          <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4">Today, Faith Model School stands as a living testament to what happens when inspired educators, supportive families, and curious young minds come together with a shared purpose. Our alumni serve as doctors, engineers, artists, entrepreneurs, and civil servants across India and the world — each carrying with them the values instilled during their time here.</p>
        </SketchReveal>
        <SketchReveal delay={0.2}>
          <div className="relative h-[50vh] overflow-hidden rounded-sm">
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80" alt="School History" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 right-4 font-caveat text-[#fefcf3] text-sm bg-[#FB7F05]/60 px-3 py-1">Est. 1989</div>
          </div>
        </SketchReveal>
      </section>

      {/* Vision, Mission, Motto */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="Our Foundation" title="Vision, Mission & Motto" center />
        <div className="mt-16 grid md:grid-cols-3 gap-px bg-[rgba(74,74,94,0.08)]">
          {[
            { label: "Vision", icon: "◉", text: "To be a globally recognised institution that nurtures confident, compassionate, and capable individuals who lead with purpose and serve with integrity." },
            { label: "Mission", icon: "✦", text: "To provide a holistic, learner-centred education that develops intellectual curiosity, character, creativity, and the resilience to thrive in a rapidly changing world." },
            { label: "Motto", icon: "◎", text: '"Wisdom in Knowledge, Strength in Character" — guiding every decision, every interaction, and every learning experience at Faith Model School.' },
          ].map((item, i) => (
            <SketchReveal key={item.label} delay={i * 0.1}>
              <div className="bg-[#fefcf3] p-12 h-full">
                <div className="font-manrope text-3xl text-[#d4a017] mb-4">{item.icon}</div>
                <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-4">{item.label}</div>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{item.text}</p>
              </div>
            </SketchReveal>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="What We Stand For" title="Core Values" />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <SketchReveal key={v.title} delay={i * 0.08}>
              <div className="group">
                <div className="font-manrope text-4xl text-[rgba(74,74,94,0.15)] mb-3 group-hover:text-[#d4a017] transition-colors duration-300">{v.icon}</div>
                <h3 className="font-poppins text-base font-semibold text-[#FB7F05] mb-2">{v.title}</h3>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{v.desc}</p>
              </div>
            </SketchReveal>
          ))}
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="35 Years" title="Our Milestones" />
        <div className="mt-16 relative">
          <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-[rgba(74,74,94,0.12)] hidden md:block" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <SketchReveal key={item.year} delay={i * 0.06} className="flex gap-8 items-start">
                <div className="font-manrope text-sm font-extrabold text-[#d4a017] w-16 shrink-0 pt-1 text-right">{item.year}</div>
                <div className="relative">
                  <div className="absolute -left-[calc(0.5rem+1px)] top-2 w-2 h-2 rounded-full bg-[#d4a017] hidden md:block" />
                  <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed pl-4">{item.event}</p>
                </div>
              </SketchReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Accreditation */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <SectionHeading annotation="Recognition" title="Awards & Accreditation" />
        <div className="mt-12 flex flex-wrap gap-4">
          {["#1 CBSE School — District 2025", "Microsoft Showcase School", "British Council ISA", "STEM.org Accredited", "Green School India", "ISO 9001:2015", "Best Infrastructure Award — TN Govt 2022", "NASSCOM Young Coders Partner", "National Sports Promotion Award"].map((award) => (
            <SketchReveal key={award}>
              <div className="border border-[rgba(74,74,94,0.15)] px-6 py-3 font-poppins text-xs font-medium text-[#4a4a5e] hover:border-[#d4a017] hover:text-[#FB7F05] transition-colors">{award}</div>
            </SketchReveal>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
