import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Faith Model School",
  description: "Explore career opportunities at Faith Model School.",
};

const jobs = [
  { title: "PGT - Physics", type: "Full Time", category: "Academic" },
  { title: "TGT - English", type: "Full Time", category: "Academic" },
  { title: "Student Counsellor", type: "Full Time", category: "Support" },
  { title: "Robotics Instructor", type: "Part Time", category: "Innovation" },
  { title: "Admissions Officer", type: "Full Time", category: "Administration" },
];

export default function CareersPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Join Our Team</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Careers at<br /><em className="text-[#FB7F05] not-italic">Faith Model</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
         <SketchReveal>
            <SectionHeading annotation="Work With Us" title="Shape the Future" subtitle="We are always looking for passionate educators, administrators, and support staff who share our commitment to holistic education." />
            <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4">Faith Model School offers a dynamic, supportive work environment, continuous professional development, and competitive remuneration packages.</p>
         </SketchReveal>
         <SketchReveal delay={0.2} className="h-[400px]">
            <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" alt="Teachers collaborating" className="w-full h-full object-cover rounded-sm" />
         </SketchReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <SectionHeading annotation="Opportunities" title="Current Openings" />
         <div className="mt-12 space-y-4 max-w-4xl">
            {jobs.map((job, i) => (
               <SketchReveal key={job.title} delay={i * 0.05}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-[rgba(74,74,94,0.1)] hover:border-[#FB7F05] transition-colors group">
                     <div>
                        <h3 className="font-cormorant text-2xl font-semibold text-[#1a1a2e] mb-2">{job.title}</h3>
                        <div className="flex gap-4 font-poppins text-xs font-semibold text-[#4a4a5e] uppercase tracking-wider">
                           <span>{job.category}</span>
                           <span className="text-[#FB7F05]">{job.type}</span>
                        </div>
                     </div>
                     <a href="mailto:careers@faithmodelschool.edu.in" className="mt-4 sm:mt-0 font-poppins text-xs font-semibold text-[#1a1a2e] px-6 py-3 bg-[rgba(74,74,94,0.05)] group-hover:bg-[#FB7F05] transition-colors shrink-0 text-center">Apply Now</a>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
