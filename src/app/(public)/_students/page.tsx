import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Portal — Faith Model School",
  description: "Access assignments, timetable, exam results, and digital library resources.",
};

export default function StudentsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)] bg-[#1a1a2e] relative overflow-hidden -mx-6 lg:-mx-12 px-12 lg:px-24">
         <div className="absolute inset-0 graph-paper opacity-5" />
         <div className="relative z-10 text-center py-12">
            <SketchReveal>
               <div className="font-caveat text-[#d4a017] text-xl mb-4">Your Dashboard</div>
               <h1 className="font-cormorant text-[clamp(3rem,6vw,5rem)] font-light text-[#fefcf3] leading-[1.08] tracking-tight">
                  Student Portal
               </h1>
            </SketchReveal>
         </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
               { title: "Microsoft Teams Login", icon: "💻", desc: "Access virtual classes, assignments, and class notebooks." },
               { title: "Digital Library", icon: "📚", desc: "Browse our catalogue of 5,000+ e-books and research journals." },
               { title: "Exam Results", icon: "🏆", desc: "View your latest term marks and continuous assessment grades." },
               { title: "Timetable", icon: "📅", desc: "Check your weekly class schedule and upcoming project deadlines." },
               { title: "Clubs & Activities", icon: "🎯", desc: "Register for new clubs or view your current extracurricular schedule." },
               { title: "Help Desk", icon: "💬", desc: "Reach out to the IT team or the student counsellor." },
            ].map((item, i) => (
               <SketchReveal key={item.title} delay={i * 0.05}>
                  <a href="#" className="block p-8 border border-[rgba(74,74,94,0.1)] hover:border-[#d4a017] transition-colors group h-full">
                     <div className="text-3xl mb-4 grayscale group-hover:grayscale-0">{item.icon}</div>
                     <h3 className="font-poppins text-base font-semibold text-[#1a1a2e] mb-2">{item.title}</h3>
                     <p className="font-inter text-sm text-[#4a4a5e]">{item.desc}</p>
                  </a>
               </SketchReveal>
            ))}
         </div>
      </section>
    </PageLayout>
  );
}
