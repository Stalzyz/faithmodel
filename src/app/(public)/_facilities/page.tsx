import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities — Faith Model School",
  description: "Discover the world-class facilities at Faith Model School, including smart classrooms, advanced labs, sports complexes, and performing arts centres.",
};

const facilities = [
  { category: "Academic Spaces", items: [
    { title: "Smart Classrooms", icon: "📚", desc: "Equipped with interactive flat panels, high-speed internet, and ergonomic furniture to support diverse learning styles." },
    { title: "The Grand Library", icon: "📖", desc: "A two-story facility housing over 12,000 volumes, digital archives, and quiet reading zones bathed in natural light." },
    { title: "Language Lab", icon: "🗣️", desc: "Advanced audio-visual equipment for immersive phonetic training in English, French, and German." },
  ]},
  { category: "Science & Innovation", items: [
    { title: "Physics & Chemistry Labs", icon: "🔬", desc: "University-grade equipment complying with CBSE standards for hands-on experimental learning." },
    { title: "Biology & EVS Lab", icon: "🌿", desc: "Features high-resolution microscopes, specimen collections, and an adjoining botanical garden." },
    { title: "Robotics & AI Centre", icon: "🤖", desc: "Microsoft Showcase facility with 3D printers, IoT kits, and programmable drones for future-ready skills." },
    { title: "Mathematics Lab", icon: "📐", desc: "Manipulatives and visual aids that make abstract mathematical concepts concrete and understandable." },
  ]},
  { category: "Sports & Fitness", items: [
    { title: "Olympic Swimming Pool", icon: "🏊", desc: "Half-Olympic size, temperature-controlled pool with dedicated coaches and lifeguard stations." },
    { title: "Indoor Sports Complex", icon: "🏸", desc: "Wooden-floored courts for badminton, basketball, and table tennis, usable year-round." },
    { title: "Football & Cricket Grounds", icon: "⚽", desc: "Lush green professional turf with a 400m athletic track and dedicated cricket nets." },
  ]},
  { category: "Arts & Culture", items: [
    { title: "The Main Auditorium", icon: "🎭", desc: "800-seat acoustic marvel with professional lighting and sound systems for major productions." },
    { title: "Fine Arts Studio", icon: "🎨", desc: "Spacious, naturally lit studios for painting, sculpting, pottery, and mixed media art." },
    { title: "Music & Dance Rooms", icon: "🎵", desc: "Sound-proofed practice rooms for vocal training, instrumental music, and classical/contemporary dance." },
  ]},
  { category: "Health & Wellbeing", items: [
    { title: "Medical Centre", icon: "⚕️", desc: "Fully equipped infirmary staffed by a qualified nurse and a visiting pediatrician, with ambulance tie-ups." },
    { title: "Counselling Centre", icon: "🧠", desc: "A safe, private space for student wellbeing, staffed by certified child psychologists." },
    { title: "Organic Cafeteria", icon: "🥗", desc: "Serving highly nutritious, balanced meals prepared daily in a modern, hygienic kitchen." },
  ]}
];

export default function FacilitiesPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Infrastructure</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Spaces that Inspire<br /><em className="text-[#d4a017] not-italic">Greatness</em>
          </h1>
        </SketchReveal>
      </div>

      {facilities.map((cat, idx) => (
         <section key={cat.category} className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
            <SketchReveal>
               <h2 className="font-cormorant text-4xl font-light text-[#1a1a2e] mb-2">{cat.category}</h2>
               <div className="w-12 h-px bg-[#d4a017] mb-12" />
            </SketchReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {cat.items.map((item, i) => (
                  <SketchReveal key={item.title} delay={i * 0.1}>
                     <div className="border border-[rgba(74,74,94,0.1)] p-8 h-full bg-[#fefcf3] hover:border-[#d4a017] transition-colors group">
                        <div className="text-4xl mb-4 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">{item.icon}</div>
                        <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e] mb-3">{item.title}</h3>
                        <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{item.desc}</p>
                     </div>
                  </SketchReveal>
               ))}
            </div>
         </section>
      ))}
      
    </PageLayout>
  );
}
