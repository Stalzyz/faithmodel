import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

import * as Icons from "lucide-react";

export default function IconGridBlock({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] bg-[rgba(210,195,160,0.05)]">
      <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.items?.map((item: any, i: number) => {
          const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
          return (
            <SketchReveal key={i} delay={i * 0.05}>
              <div className="bg-white p-8 border border-[rgba(74,74,94,0.06)] rounded-sm h-full hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <div className="text-[#c17b5a] mb-6">
                  <IconComponent className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-poppins text-lg font-semibold text-[#FB7F05] mb-3">{item.title}</h3>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{item.desc}</p>
              </div>
            </SketchReveal>
          );
        })}
      </div>
    </section>
  );
}
