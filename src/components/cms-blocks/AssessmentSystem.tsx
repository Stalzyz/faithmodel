import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function AssessmentSystem({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
      <div className="mt-12 grid md:grid-cols-4 gap-8">
        {data.assessments?.map((a: any, i: number) => (
          <SketchReveal key={a.label} delay={i * 0.08}>
            <div className="text-center">
              <div className="font-manrope text-4xl font-extrabold text-[#d4a017] mb-3">{a.pct}</div>
              <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-3">{a.label}</div>
              <p className="font-inter text-xs text-[#4a4a5e] leading-relaxed">{a.desc}</p>
            </div>
          </SketchReveal>
        ))}
      </div>
    </section>
  );
}
