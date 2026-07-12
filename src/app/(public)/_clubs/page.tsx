import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clubs & Societies — Faith Model School",
  description: "Explore the diverse range of clubs and societies at Faith Model School.",
};

const clubs = [
  "Coding & Robotics Club",
  "Model United Nations (MUN)",
  "Debate & Elocution Society",
  "Photography & Film Guild",
  "Eco & Sustainability Club",
  "Astronomy Club",
  "Literary & Poetry Society",
  "Mathletes (Mathematics Club)",
  "Entrepreneurship Cell",
  "Quiz Club",
  "Heritage & History Society",
  "Theatre & Drama Club"
];

export default function ClubsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Discover Your Passion</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Clubs &<br /><em className="text-[#FB7F05] not-italic">Societies</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clubs.map((club, i) => (
               <SketchReveal key={club} delay={i * 0.05}>
                  <div className="border border-[rgba(74,74,94,0.1)] p-6 h-full text-center hover:border-[#FB7F05] hover:bg-[#fefcf3] transition-colors group flex items-center justify-center min-h-[120px]">
                     <h3 className="font-poppins text-sm font-semibold text-[#1a1a2e] group-hover:text-[#FB7F05] transition-colors">{club}</h3>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
