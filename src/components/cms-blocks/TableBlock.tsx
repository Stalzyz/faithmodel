import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function TableBlock({ data }: { data: any }) {
  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
      <div className="mt-12 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-[#1a1a2e]">
              {data.headers?.map((h: string, i: number) => (
                <th key={i} className="py-4 px-4 font-poppins text-sm font-semibold text-[#1a1a2e] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows?.map((row: any[], i: number) => (
              <SketchReveal key={i} delay={i * 0.03}>
                <tr className="border-b border-[rgba(74,74,94,0.1)] hover:bg-[rgba(210,195,160,0.1)] transition-colors">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className="py-4 px-4 font-inter text-sm text-[#4a4a5e] whitespace-pre-wrap">{cell}</td>
                  ))}
                </tr>
              </SketchReveal>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
