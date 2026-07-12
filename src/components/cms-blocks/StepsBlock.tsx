import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function StepsBlock({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {data.steps?.map((step: any, i: number) => (
          <SketchReveal key={i} delay={i * 0.06}>
            <div className="relative border-t border-[rgba(74,74,94,0.1)] pt-6 h-full">
              <div className="absolute -top-4 bg-[#fefcf3] pr-4 font-caveat text-3xl text-[#d4a017]">{step.num}</div>
              <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e] mt-4 mb-3">{step.title}</h3>
              <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{step.desc}</p>
            </div>
          </SketchReveal>
        ))}
      </div>
    </section>
  );
}
