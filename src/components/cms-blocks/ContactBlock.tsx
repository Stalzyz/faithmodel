import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function ContactBlock({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16">
      <SketchReveal>
        <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
        <div className="mt-8 space-y-6">
          {data.details?.map((detail: any, i: number) => (
            <div key={i}>
              <h4 className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-2">{detail.label}</h4>
              <p className="font-inter text-[#4a4a5e] whitespace-pre-wrap">{detail.value}</p>
            </div>
          ))}
        </div>
      </SketchReveal>
      <SketchReveal delay={0.2}>
        <div className="bg-[rgba(74,74,94,0.05)] h-[50vh] min-h-[400px] border border-[rgba(74,74,94,0.1)] rounded-sm flex items-center justify-center p-2 text-center overflow-hidden">
          {data.mapIframe ? (
            <div dangerouslySetInnerHTML={{ __html: data.mapIframe }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
          ) : (
            <div className="font-inter text-sm text-[#4a4a5e]/50">Map Integration Placeholder</div>
          )}
        </div>
      </SketchReveal>
    </section>
  );
}
