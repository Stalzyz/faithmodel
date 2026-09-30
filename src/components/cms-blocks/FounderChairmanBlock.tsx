import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";

export interface LeaderEntry {
  role: string;
  name: string;
  image?: string;
  bio: string;
  messageTitle: string;
  message: string;
  theme?: "amber" | "blue" | "default";
}

export interface FounderChairmanBlockData {
  annotation?: string;
  title?: string;
  subtitle?: string;
  leaders?: LeaderEntry[];
}

export default function FounderChairmanBlock({ data }: { data: FounderChairmanBlockData }) {
  const leaders: LeaderEntry[] = data.leaders || [
    {
      role: "FOUNDER",
      name: "Dr. S.A. Fazlulla",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
      bio: "Dr. S.A. Fazlulla is a child specialist with over four decades of experience in the medical field. In his capacity as a doctor, he not only treats children with medical issues but also deals with their psychological aspects such as behavior and development.\n\nFaith Model School (FMS) is his brainchild and Dr. Fazlulla currently mentors children to grow into healthy individuals both mentally and physically.",
      messageTitle: "Founder's Message:",
      message: "I believe children should not stop building castles in the air. And with groundwork from Faith Model School, their dreams are bound to come true.",
      theme: "amber",
    },
    {
      role: "CHAIRMAN",
      name: "Mr. K.S. Kader Batcha",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      bio: "Mr. K.S. Kader Batcha, is an industrialist, currently training and running businesses in China. He holds a degree in textile engineering. He owns and runs textiles business and mainly exports the products to US and European markets. The other company in the name of AMD Overseas Impex India Company in Tiruppur manufactures, exports and imports a vast range of Window Frames, UPVC doors and windows. Mr. Batcha is actively involved in children's education and as an entrepreneur, he is looked up to by his peers and subordinates alike.",
      messageTitle: "Chairman's Message:",
      message: "No one is born an entrepreneur. But there's no minimum age to begin training to be one. Faith Model School offers 21st century education focusing on entrepreneurship skills from a tender age.",
      theme: "blue",
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading 
        annotation={data.annotation || "Founding Pillars"} 
        title={data.title || "Founder & Chairman"} 
        subtitle={data.subtitle || "The visionary leadership fostering excellence, health, and 21st-century entrepreneurial mindset."}
        center
      />

      <div className="mt-16 space-y-16">
        {leaders.map((leader, idx) => {
          const isAmber = leader.theme === "amber" || idx % 2 === 0;

          return (
            <SketchReveal key={idx} delay={idx * 0.15}>
              <div className="bg-white border border-[rgba(74,74,94,0.1)] rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Profile Picture */}
                  <div className="lg:col-span-4 flex flex-col items-center">
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-gray-200">
                      {leader.image ? (
                        <img 
                          src={leader.image} 
                          alt={leader.name} 
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-semibold text-lg">
                          {leader.name}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-1.5 ${
                        isAmber 
                          ? "bg-amber-100 text-amber-900 border border-amber-200" 
                          : "bg-blue-100 text-blue-900 border border-blue-200"
                      }`}>
                        "{leader.role}"
                      </span>
                      <h3 className="font-poppins text-xl font-bold text-gray-900">{leader.name}</h3>
                    </div>
                  </div>

                  {/* Bio and Message */}
                  <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                    {/* Bio Text */}
                    <div className="font-inter text-sm md:text-base text-gray-700 leading-relaxed space-y-3">
                      {leader.bio.split("\n\n").map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    {/* Message Card */}
                    <div className={`rounded-2xl p-6 md:p-7 relative border ${
                      isAmber
                        ? "bg-[#D97706]/10 border-[#D97706]/30 text-amber-950"
                        : "bg-[#2563EB]/10 border-[#2563EB]/30 text-blue-950"
                    }`}>
                      <div className="flex items-center gap-2 mb-2 font-poppins text-xs font-bold uppercase tracking-wider">
                        <span className={`w-2 h-2 rounded-full ${isAmber ? "bg-amber-600" : "bg-blue-600"}`} />
                        {leader.messageTitle || "Message:"}
                      </div>

                      <div className="relative pl-6">
                        <span className={`absolute left-0 top-0 font-serif text-3xl leading-none select-none ${
                          isAmber ? "text-amber-500" : "text-blue-500"
                        }`}>
                          “
                        </span>
                        <blockquote className="font-cormorant text-xl md:text-2xl font-medium leading-relaxed italic">
                          {leader.message}
                        </blockquote>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </SketchReveal>
          );
        })}
      </div>
    </section>
  );
}
