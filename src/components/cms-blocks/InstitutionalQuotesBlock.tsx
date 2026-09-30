import SketchReveal from "@/components/SketchReveal";
import SectionHeading from "@/components/SectionHeading";

export interface QuoteItem {
  quote: string;
  author?: string;
  source?: string;
  tag?: string;
}

export interface InstitutionalQuotesBlockData {
  annotation?: string;
  title?: string;
  subtitle?: string;
  quotes?: QuoteItem[];
}

export default function InstitutionalQuotesBlock({ data }: { data: InstitutionalQuotesBlockData }) {
  const quotes = data.quotes || [
    {
      tag: "FOUNDATION BELIEF",
      quote: "IF FAITH CAN MOVE MOUNTAINS, YOUR CHILD CAN DO WONDERS, AS YOU TAKE THE FIRST STEP IN CHOOSING FAITH MODEL SCHOOL, THE FOUNDATION STONE FOR YOUR CHILD'S GREAT FUTURE",
      source: "Faith Model School Prospectus",
      author: "School Creed",
    },
    {
      tag: "OUR COMMITMENT",
      quote: "WE as an EDUCATIONAL institution, aim to recognize your CHILD'S SKILLS, HARNESS THEIR TALENTS, and nurture them towards positive growth into little individuals capable of brandishing his or her own UNIQUE POTENTIAL OF FAITH.",
      source: "Institutional Mission",
      author: "Educational Charter",
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28 border-b border-[rgba(74,74,94,0.08)] relative">
      <SectionHeading 
        annotation={data.annotation || "Guiding Philosophy"} 
        title={data.title || "Words That Guide Our Vision"} 
        subtitle={data.subtitle || "The foundational beliefs that inspire our educational journey every day."}
        center
      />

      <div className="mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12">
        {quotes.map((q, idx) => (
          <SketchReveal key={idx} delay={idx * 0.15}>
            <div className="h-full relative bg-white border border-[rgba(74,74,94,0.1)] rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
              {/* Background watermark quote icon */}
              <div className="absolute -top-4 -right-4 text-[120px] font-serif text-slate-100 select-none pointer-events-none group-hover:text-blue-50/50 transition-colors">
                “
              </div>

              <div className="relative z-10">
                {q.tag && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-100 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    {q.tag}
                  </div>
                )}

                <blockquote className="font-cormorant text-2xl md:text-3xl text-gray-900 leading-snug tracking-tight font-medium">
                  "{q.quote}"
                </blockquote>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  {q.author && <div className="font-poppins text-xs font-bold text-gray-900 uppercase tracking-wider">{q.author}</div>}
                  {q.source && <div className="font-inter text-xs text-gray-500 mt-0.5">{q.source}</div>}
                </div>
                <div className="font-caveat text-xl text-[#FB7F05]">Faith Model</div>
              </div>
            </div>
          </SketchReveal>
        ))}
      </div>
    </section>
  );
}
