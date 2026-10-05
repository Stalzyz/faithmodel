import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";

export interface LeaderEntry {
  role: string;
  name: string;
  image?: string;
  bio?: string;
  messageTitle?: string;
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
      message: "I believe children should not stop building castles in the air. And with groundwork from Faith Model School, their dreams are bound to come true.",
      theme: "amber",
    },
    {
      role: "CHAIRMAN",
      name: "Mr. K.S. Kader Batcha",
      message: "No one is born an entrepreneur. But there's no minimum age to begin training to be one. Faith Model School offers 21st century education focusing on entrepreneurship skills from a tender age.",
      theme: "blue",
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading 
        annotation={data.annotation || "Founding Pillars"} 
        title={data.title || "Founder & Chairman"} 
        subtitle={data.subtitle || "Visionary leadership nurturing character, mental and physical health, and 21st-century entrepreneurial capabilities."}
        center
      />

      <div className="mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12">
        {leaders.map((leader, idx) => {
          const isAmber = leader.theme === "amber" || idx % 2 === 0;

          return (
            <SketchReveal key={idx} delay={idx * 0.15}>
              <div className="h-full bg-white border border-[rgba(74,74,94,0.1)] rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative group">
                {/* Large Decorative Watermark Quote */}
                <div className="absolute -top-4 -right-4 text-[130px] font-serif text-slate-100 select-none pointer-events-none group-hover:text-amber-50/60 transition-colors">
                  “
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Role Tag */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                      isAmber 
                        ? "bg-amber-50 text-amber-900 border-amber-200" 
                        : "bg-blue-50 text-blue-900 border-blue-200"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isAmber ? "bg-amber-600" : "bg-blue-600"}`} />
                      {leader.role || (idx === 0 ? "FOUNDER" : "CHAIRMAN")}
                    </span>
                  </div>

                  {/* Main Quote / Message */}
                  <blockquote className="font-cormorant text-2xl md:text-3xl text-gray-900 leading-snug tracking-tight font-medium italic">
                    "{leader.message}"
                  </blockquote>
                </div>

                {/* Leader Name */}
                <div className="pt-8 mt-6 border-t border-gray-100 flex items-center justify-between relative z-10">
                  <div>
                    <h3 className="font-poppins text-lg md:text-xl font-bold text-gray-900">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">
                      {leader.role === "FOUNDER" || idx === 0 ? "Founder, Faith Model School" : "Chairman, Faith Model School"}
                    </p>
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
