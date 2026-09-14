import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function PhilosophySplit({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <SketchReveal className="flex flex-col justify-center">
          <SectionHeading annotation={data.annotation || "Our Philosophy"} title={data.title} subtitle={data.subtitle} />
          <div 
            className="font-inter text-base text-[#4a4a5e] leading-relaxed mt-6 max-w-xl font-light space-y-3 [&_strong]:text-[#1a1a2e] [&_strong]:font-semibold" 
            dangerouslySetInnerHTML={{ __html: data.contentHtml }} 
          />
        </SketchReveal>
        <SketchReveal delay={0.2} className="w-full">
          <div className="relative h-[400px] lg:h-[450px] w-full overflow-hidden rounded-lg shadow-sm border border-[rgba(74,74,94,0.1)]">
            <img src={data.imageUrl} alt={data.title || "Philosophy"} className="w-full h-full object-cover" />
          </div>
        </SketchReveal>
      </div>
    </section>
  );
}
