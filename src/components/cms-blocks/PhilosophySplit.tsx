import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function PhilosophySplit({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
      <SketchReveal>
        <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
        <div className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
      </SketchReveal>
      <SketchReveal delay={0.2}>
        <div className="relative h-[45vh] overflow-hidden rounded-sm">
          <img src={data.imageUrl} alt={data.title} className="w-full h-full object-cover" />
        </div>
      </SketchReveal>
    </section>
  );
}
