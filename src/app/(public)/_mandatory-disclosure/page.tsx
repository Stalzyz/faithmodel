import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import { FileText, Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosure — Faith Model School",
  description: "CBSE Mandatory Public Disclosure for Faith Model School.",
};

const documents = [
  { name: "Copies of Affiliation/Upgradation Letter and Recent Extension of Affiliation", file: "/downloads/affiliation-letter.pdf" },
  { name: "Copies of Societies/Trust/Company Registration/Renewal Certificate", file: "/downloads/trust-certificate.pdf" },
  { name: "Copy of No Objection Certificate (NOC)", file: "/downloads/noc.pdf" },
  { name: "Copies of Recognition Certificate under RTE Act, 2009", file: "/downloads/rte-recognition.pdf" },
  { name: "Copy of Valid Building Safety Certificate", file: "/downloads/building-safety.pdf" },
  { name: "Copy of Valid Fire Safety Certificate", file: "/downloads/fire-safety.pdf" },
  { name: "Copy of the DEO Certificate submitted by the school for Affiliation", file: "/downloads/deo-certificate.pdf" },
  { name: "Copies of Valid Water, Health and Sanitation Certificates", file: "/downloads/sanitation-certificate.pdf" }
];

export default function MandatoryDisclosurePage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-16 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">CBSE Compliance</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Mandatory Public<br /><em className="text-[#2d5a27] not-italic">Disclosure</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-20">
         <SketchReveal>
            <SectionHeading annotation="Documents" title="Statutory Information" subtitle="As per CBSE guidelines, the following documents and information are provided for public disclosure." />
         </SketchReveal>
         
         <div className="mt-12 space-y-4">
            {documents.map((doc, i) => (
               <SketchReveal key={i} delay={i * 0.05}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-[rgba(74,74,94,0.12)] rounded-2xl shadow-xs hover:border-[#2d5a27] transition-all group gap-4">
                     <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-[#2d5a27]/10 flex items-center justify-center shrink-0 text-[#2d5a27] group-hover:bg-[#2d5a27] group-hover:text-white transition-colors">
                           <FileText className="w-5 h-5" />
                        </div>
                        <span className="font-inter text-sm sm:text-base font-medium text-[#4a4a5e] group-hover:text-[#1a1a2e] leading-snug">{doc.name}</span>
                     </div>
                     <a href={doc.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 font-poppins text-xs font-semibold text-white px-5 py-2.5 bg-[#2d5a27] hover:bg-[#1f401b] rounded-full transition-all shrink-0 shadow-xs">
                        <span>View PDF</span>
                        <Download className="w-3.5 h-3.5" />
                     </a>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
