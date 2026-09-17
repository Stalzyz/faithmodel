"use client";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import { ChevronDown, FileText, Download } from "lucide-react";

export default function AccordionBlock({ data }: { data: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
      <div className="mt-12 space-y-4">
        {data.items?.map((item: any, i: number) => (
          <SketchReveal key={i} delay={i * 0.05}>
            <div className="border border-[rgba(74,74,94,0.1)] bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-xs">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-[#fcfaf4] transition-colors"
              >
                <span className="font-poppins font-semibold text-[#1a1a2e]">{item.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#c17b5a] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 font-inter text-sm text-[#4a4a5e] leading-relaxed border-t border-[rgba(74,74,94,0.05)] mt-4 whitespace-pre-wrap flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>{item.answer}</div>
                  {(item.fileUrl || item.file) && (
                    <a
                      href={item.fileUrl || item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d5a27] text-white hover:bg-[#1f401b] rounded-full text-xs font-semibold font-poppins shrink-0 transition-colors shadow-xs"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Download PDF</span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SketchReveal>
        ))}
      </div>
    </section>
  );
}

