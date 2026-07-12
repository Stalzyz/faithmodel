import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Levels — Faith Model School",
  description: "From Pre-KG to Senior Secondary, discover how Faith Model School's curriculum evolves at each stage of your child's growth.",
};

const levels = [
  { 
    title: "Pre-Primary", 
    grades: "Pre-KG, LKG, UKG", 
    age: "Ages 3–5",
    desc: "The foundation years. We focus on play-based learning, sensory exploration, motor skills, and building a love for learning in a warm, secure environment. Phonics and early numeracy are introduced gently.",
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Primary School", 
    grades: "Grades 1–5", 
    age: "Ages 5–10",
    desc: "Curiosity takes structure. Students build strong fundamentals in literacy and mathematics while exploring environmental science. Art, music, and physical education are integrated daily to ensure holistic growth.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Middle School", 
    grades: "Grades 6–8", 
    age: "Ages 11–13",
    desc: "The transition years. The curriculum expands to include specialized sciences, social studies, and a third language. Students begin structured programs in coding, robotics, and take on their first leadership roles.",
    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Secondary School", 
    grades: "Grades 9–10", 
    age: "Ages 14–15",
    desc: "Preparation for the first major milestone. Rigorous CBSE academic preparation is balanced with life skills, career counselling, and advanced co-curricular opportunities. Students sit for the AISSE at the end of Grade 10.",
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Senior Secondary", 
    grades: "Grades 11–12", 
    age: "Ages 16–17",
    desc: "Focus and specialization. We offer Science and Commerce streams. Students receive intensive board exam coaching (AISSCE) alongside university placement support, portfolio building, and competitive exam preparation.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
  },
];

export default function SchoolLevelsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Educational Stages</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#FB7F05] leading-[1.08] tracking-tight max-w-4xl">
            A Continuum of<br /><em className="text-[#d4a017] not-italic">Learning</em>
          </h1>
        </SketchReveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="space-y-24">
            {levels.map((level, i) => (
               <SketchReveal key={level.title} delay={0.1}>
                  <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                     <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                        <div className="flex items-center gap-4 mb-3">
                           <h2 className="font-cormorant text-4xl font-light text-[#FB7F05]">{level.title}</h2>
                        </div>
                        <div className="flex gap-4 mb-6">
                           <span className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest bg-[rgba(74,74,94,0.05)] px-3 py-1">{level.grades}</span>
                           <span className="font-caveat text-[#c17b5a] text-base mt-0.5">{level.age}</span>
                        </div>
                        <p className="font-inter text-[#4a4a5e] leading-relaxed mb-6">{level.desc}</p>
                        <Link href={`/admissions`} className="font-poppins text-sm font-medium text-[#FB7F05] border-b border-[#FB7F05] hover:text-[#d4a017] hover:border-[#d4a017] transition-colors pb-0.5">
                           Apply for {level.title} →
                        </Link>
                     </div>
                     <div className={`h-[40vh] lg:h-[50vh] overflow-hidden rounded-sm ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                        <img src={level.img} alt={level.title} className="w-full h-full object-cover" />
                     </div>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </div>
    </PageLayout>
  );
}
