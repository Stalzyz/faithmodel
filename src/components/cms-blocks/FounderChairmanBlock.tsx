import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";

export interface LeaderEntry {
  role: string;
  name: string;
  degree?: string;
  image?: string;
  bio?: string;
  messageTitle?: string;
  message?: string;
  theme?: "amber" | "blue" | "default";
}

export interface FounderChairmanBlockData {
  annotation?: string;
  title?: string;
  subtitle?: string;
  nameSize?: "sm" | "base" | "lg" | "xl";
  bioSize?: "sm" | "base" | "lg";
  quoteSize?: "sm" | "base" | "lg";
  leaders?: LeaderEntry[];
}

const DEFAULT_LEADERS: LeaderEntry[] = [
  {
    role: "FOUNDER",
    name: "Dr. S.A. Fazlulla",
    degree: "M.B.B.S, D.C.H",
    bio: "Dr. S.A. Fazlulla is a child specialist with over four decades of experience in the medical field. In his capacity as a doctor, he not only treats children with medical issues but also deals with their psychological aspects such as behavior and development.\n\nFaith Model School (FMS) is his brainchild and Dr. Fazlulla currently mentors children to grow into healthy individuals both mentally and physically.",
    messageTitle: "FOUNDER'S MESSAGE",
    message: "I believe children should not stop building castles in the air. And with groundwork from Faith Model School, their dreams are bound to come true.",
    theme: "amber",
  },
  {
    role: "CHAIRMAN",
    name: "Mr. K.S. Kader Batcha",
    degree: "B.Tech",
    bio: "Mr. K.S. Kader Batcha is an industrialist, currently training and running businesses in China. He holds a degree in textile engineering. He owns and runs textiles business and mainly exports the products to US and European markets. The other company in the name of AMD Overseas Impex India Company in Tiruppur manufactures, exports and imports a vast range of Window Frames, UPVC doors and windows. Mr. Batcha is actively involved in children's education and as an entrepreneur, he is looked up to by his peers and subordinates alike.",
    messageTitle: "CHAIRMAN'S MESSAGE",
    message: "No one is born an entrepreneur. But there's no minimum age to begin training to be one. Faith Model School offers 21st century education focusing on entrepreneurship skills from a tender age.",
    theme: "blue",
  }
];

export default function FounderChairmanBlock({ data }: { data: FounderChairmanBlockData }) {
  const hasCustomLeaders = Array.isArray(data?.leaders) && data.leaders.length > 0;
  const leaders: LeaderEntry[] = hasCustomLeaders ? data.leaders! : DEFAULT_LEADERS;

  const getNameSizeClass = (size?: string) => {
    switch (size) {
      case "sm": return "text-xl md:text-2xl";
      case "lg": return "text-3xl md:text-4xl";
      case "xl": return "text-4xl md:text-5xl";
      case "base":
      default:
        return "text-2xl md:text-3xl"; // Clean, refined modern size
    }
  };

  const getBioSizeClass = (size?: string) => {
    switch (size) {
      case "sm": return "text-xs md:text-sm";
      case "lg": return "text-base md:text-lg";
      case "base":
      default:
        return "text-sm md:text-base";
    }
  };

  const getQuoteSizeClass = (size?: string) => {
    switch (size) {
      case "sm": return "text-base md:text-lg";
      case "lg": return "text-2xl md:text-3xl";
      case "base":
      default:
        return "text-lg md:text-xl";
    }
  };

  const nameSizeClass = getNameSizeClass(data?.nameSize);
  const bioSizeClass = getBioSizeClass(data?.bioSize);
  const quoteSizeClass = getQuoteSizeClass(data?.quoteSize);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading 
        annotation={data?.annotation || "Founding Pillars"} 
        title={data?.title || "Founder & Chairman"} 
        subtitle={data?.subtitle || "Visionary leadership nurturing character, mental and physical health, and 21st-century entrepreneurial capabilities."}
        center
      />

      <div className="mt-16 space-y-10 md:space-y-14">
        {leaders.map((leader, idx) => {
          const isAmber = leader.theme === "amber" || idx % 2 === 0;
          const bioText = typeof leader.bio === "string" ? leader.bio.trim() : "";
          const bioParagraphs = bioText ? bioText.split("\n\n").filter(Boolean) : [];
          const messageText = typeof leader.message === "string" ? leader.message.trim() : "";

          return (
            <SketchReveal key={idx} delay={idx * 0.15}>
              <div className="bg-white border border-[rgba(74,74,94,0.1)] rounded-3xl p-8 md:p-10 shadow-xs hover:shadow-md transition-all overflow-hidden relative group">
                
                {/* Header: Highlighted Name & Role Badge at Top */}
                <div className="border-b border-gray-100 pb-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                        isAmber 
                          ? "bg-amber-50 text-amber-900 border-amber-200" 
                          : "bg-blue-50 text-blue-900 border-blue-200"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${isAmber ? "bg-amber-600" : "bg-blue-600"}`} />
                        "{leader.role || (idx === 0 ? "FOUNDER" : "CHAIRMAN")}"
                      </span>
                    </div>

                    <h3 className={`font-poppins font-bold text-gray-900 tracking-tight ${nameSizeClass}`}>
                      {leader.name}
                      {leader.degree && (
                        <span className="ml-2 font-medium text-[0.85em] text-gray-900 inline">
                          {leader.degree}
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="h-1 bg-[#FB7F05] w-12 rounded-full self-start md:self-auto hidden md:block" />
                </div>

                {/* Body: Biography & Quote (only render if present) */}
                <div className="space-y-6">
                  {/* Biography Paragraphs */}
                  {bioParagraphs.length > 0 && (
                    <div className={`font-inter text-gray-700 leading-relaxed space-y-3.5 font-normal ${bioSizeClass}`}>
                      {bioParagraphs.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  )}

                  {/* Highlighted Quote Box */}
                  {messageText && (
                    <div className={`rounded-2xl p-6 md:p-7 relative border ${
                      isAmber
                        ? "bg-amber-50/70 border-amber-200/80 text-amber-950"
                        : "bg-blue-50/70 border-blue-200/80 text-blue-950"
                    }`}>
                      <div className="flex items-center gap-2 mb-2.5 font-poppins text-xs font-bold uppercase tracking-wider">
                        <span className={`w-2 h-2 rounded-full ${isAmber ? "bg-amber-600" : "bg-blue-600"}`} />
                        {leader.messageTitle || (idx === 0 ? "FOUNDER'S MESSAGE" : "CHAIRMAN'S MESSAGE")}
                      </div>

                      <div className="relative pl-6">
                        <span className={`absolute left-0 top-0 font-serif text-3xl leading-none select-none ${
                          isAmber ? "text-amber-500" : "text-blue-500"
                        }`}>
                          “
                        </span>
                        <blockquote className={`font-cormorant font-medium leading-relaxed italic ${quoteSizeClass}`}>
                          {messageText}
                        </blockquote>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </SketchReveal>
          );
        })}
      </div>
    </section>
  );
}
