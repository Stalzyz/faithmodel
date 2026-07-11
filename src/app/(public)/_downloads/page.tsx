import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads & Resources — Faith Model School",
  description: "Download prospectuses, forms, syllabus, and other resources from Faith Model School.",
};

const resources = [
  { category: "Admissions", files: ["School Prospectus 2026-27", "Admission Form (Offline)", "Fee Structure Policy"] },
  { category: "Academics", files: ["Academic Calendar 2026-27", "Book List & Stationeries", "Syllabus Breakup (Term 1)"] },
  { category: "Policies & Guidelines", files: ["Student Code of Conduct", "Transport Policy", "Leave Application Form"] },
];

export default function DownloadsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Resource Centre</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Downloads &<br /><em className="text-[#d4a017] not-italic">Documents</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="space-y-16">
            {resources.map((res, i) => (
               <div key={res.category}>
                  <SketchReveal delay={i * 0.1}>
                     <h3 className="font-cormorant text-2xl font-light text-[#1a1a2e] mb-6">{res.category}</h3>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {res.files.map((file, j) => (
                           <a key={file} href="#" className="flex items-center gap-4 p-4 border border-[rgba(74,74,94,0.1)] hover:border-[#d4a017] group transition-colors">
                              <span className="text-xl opacity-60 group-hover:opacity-100 transition-opacity">📄</span>
                              <span className="font-inter text-sm text-[#4a4a5e] group-hover:text-[#1a1a2e]">{file}</span>
                           </a>
                        ))}
                     </div>
                  </SketchReveal>
               </div>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
