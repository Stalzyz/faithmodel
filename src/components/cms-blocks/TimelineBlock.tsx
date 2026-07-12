import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function TimelineBlock({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
      <div className="mt-16 space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[rgba(212,160,23,0.5)] before:to-transparent">
        {data.events?.map((item: any, i: number) => (
          <SketchReveal key={i} delay={i * 0.1}>
            <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#fefcf3] bg-[#d4a017] text-[#1a1a2e] shadow shrink-0 md:order-1 md:group-even:-ml-5 md:group-odd:-mr-5 z-10" />
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 border border-[rgba(74,74,94,0.1)] rounded-sm bg-white shadow-sm hover:border-[#d4a017] transition-colors">
                <h3 className="font-poppins text-xl font-bold text-[#1a1a2e] mb-2">{item.year}</h3>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{item.event}</p>
              </div>
            </div>
          </SketchReveal>
        ))}
      </div>
    </section>
  );
}
