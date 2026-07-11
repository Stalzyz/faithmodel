"use client";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import { ChevronDown } from "lucide-react";

export default function AccordionBlock({ data }: { data: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
      <div className="mt-12 space-y-4">
        {data.items?.map((item: any, i: number) => (
          <SketchReveal key={i} delay={i * 0.05}>
            <div className="border border-[rgba(74,74,94,0.1)] bg-white overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-[rgba(210,195,160,0.05)] transition-colors"
              >
                <span className="font-poppins font-semibold text-[#1a1a2e]">{item.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#c17b5a] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 font-inter text-sm text-[#4a4a5e] leading-relaxed border-t border-[rgba(74,74,94,0.05)] mt-4 whitespace-pre-wrap">
                  {item.answer}
                </div>
              </div>
            </div>
          </SketchReveal>
        ))}
      </div>
    </section>
  );
}
