import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function SignaturePrograms({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} />
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        {data.programs?.map((p: any, i: number) => (
          <SketchReveal key={i} delay={i * 0.07}>
            <div className="border border-[rgba(74,74,94,0.1)] p-8 h-full group hover:border-[#d4a017] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-poppins text-base font-semibold text-[#1a1a2e] group-hover:text-[#d4a017] transition-colors leading-tight">{p.title}</h3>
                <span className="font-caveat text-[#c17b5a] text-sm shrink-0 ml-4">{p.tag}</span>
              </div>
              <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{p.desc}</p>
            </div>
          </SketchReveal>
        ))}
      </div>
    </section>
  );
}
