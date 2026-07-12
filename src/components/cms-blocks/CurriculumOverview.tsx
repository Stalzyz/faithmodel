import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function CurriculumOverview({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} />
      <div className="mt-16 space-y-12">
        {data.levels?.map((level: any, i: number) => (
          <SketchReveal key={level.level} delay={i * 0.06}>
            <div className="grid md:grid-cols-3 gap-8 py-10 border-b border-[rgba(74,74,94,0.06)]">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="font-poppins text-xl font-semibold text-[#FB7F05]">{level.level}</h3>
                  <span className="font-caveat text-[#c17b5a] text-base">{level.grades}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {level.subjects?.map((s: string) => (
                    <span key={s} className="font-inter text-xs text-[#4a4a5e] border border-[rgba(74,74,94,0.15)] px-3 py-1.5 hover:border-[#d4a017] transition-colors">{s}</span>
                  ))}
                </div>
              </div>
              {level.img && (
                <div className="h-36 overflow-hidden rounded-sm">
                  <img src={level.img} alt={level.level} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
            </div>
          </SketchReveal>
        ))}
      </div>
    </section>
  );
}
