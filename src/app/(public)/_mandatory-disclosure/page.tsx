import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosure — Faith Model School",
  description: "CBSE Mandatory Public Disclosure for Faith Model School.",
};

const documents = [
  "Copies of Affiliation/Upgradation Letter and Recent Extension of Affiliation",
  "Copies of Societies/Trust/Company Registration/Renewal Certificate",
  "Copy of No Objection Certificate (NOC)",
  "Copies of Recognition Certificate under RTE Act, 2009",
  "Copy of Valid Building Safety Certificate",
  "Copy of Valid Fire Safety Certificate",
  "Copy of the DEO Certificate submitted by the school for Affiliation",
  "Copies of Valid Water, Health and Sanitation Certificates"
];

export default function MandatoryDisclosurePage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">CBSE Compliance</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Mandatory Public<br /><em className="text-[#d4a017] not-italic">Disclosure</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <SketchReveal>
            <SectionHeading annotation="Documents" title="Statutory Information" subtitle="As per CBSE guidelines, the following documents and information are provided for public disclosure." />
         </SketchReveal>
         
         <div className="mt-12 space-y-4 max-w-4xl">
            {documents.map((doc, i) => (
               <SketchReveal key={i} delay={i * 0.05}>
                  <div className="flex items-center justify-between p-4 border border-[rgba(74,74,94,0.1)] hover:border-[#d4a017] transition-colors group">
                     <span className="font-inter text-sm text-[#4a4a5e] group-hover:text-[#1a1a2e]">{doc}</span>
                     <a href="#" className="font-poppins text-xs font-semibold text-[#1a1a2e] px-4 py-2 bg-[rgba(74,74,94,0.05)] group-hover:bg-[#d4a017] transition-colors shrink-0 ml-4">View PDF</a>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
