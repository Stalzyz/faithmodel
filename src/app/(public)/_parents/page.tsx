import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Portal — Faith Model School",
  description: "Access resources, pay fees, track attendance, and stay connected with Faith Model School through the Parent Portal.",
};

export default function ParentsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)] bg-[#FB7F05] relative overflow-hidden -mx-6 lg:-mx-12 px-12 lg:px-24">
         <div className="absolute inset-0 graph-paper opacity-5" />
         <div className="relative z-10 text-center py-12">
            <SketchReveal>
               <div className="font-caveat text-[#d4a017] text-xl mb-4">Community</div>
               <h1 className="font-cormorant text-[clamp(3rem,6vw,5rem)] font-light text-[#fefcf3] leading-[1.08] tracking-tight">
                  Parent Portal
               </h1>
            </SketchReveal>
         </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16">
         <div>
            <SectionHeading annotation="Quick Access" title="Essential Links" />
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
               {[
                  { title: "Fee Payment Gateway", icon: "💳" },
                  { title: "Academic Reports", icon: "📊" },
                  { title: "Live Bus Tracking", icon: "🚌" },
                  { title: "Circulars & Notices", icon: "📄" },
                  { title: "Book PTM Slot", icon: "📅" },
                  { title: "Leave Application", icon: "📝" },
               ].map((item, i) => (
                  <SketchReveal key={item.title} delay={i * 0.05}>
                     <a href="#" className="flex items-center gap-4 p-4 border border-[rgba(74,74,94,0.1)] hover:border-[#d4a017] hover:bg-[#fefcf3] transition-colors group">
                        <span className="text-2xl grayscale group-hover:grayscale-0">{item.icon}</span>
                        <span className="font-poppins text-sm font-medium text-[#FB7F05]">{item.title}</span>
                     </a>
                  </SketchReveal>
               ))}
            </div>
         </div>
         <SketchReveal delay={0.2}>
            <div className="bg-[#fefcf3] p-10 border border-[rgba(74,74,94,0.1)] h-full">
               <h3 className="font-cormorant text-2xl font-light text-[#FB7F05] mb-6">Download the Parent App</h3>
               <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mb-8">
                  Get instant notifications for attendance, view daily homework, track the school bus in real-time, and communicate directly with teachers through our secure mobile application.
               </p>
               <div className="flex flex-wrap gap-4">
                  <a href="#" className="font-poppins text-xs font-semibold text-[#fefcf3] bg-[#FB7F05] px-6 py-3 hover:bg-[#d4a017] hover:text-[#FB7F05] transition-colors">App Store (iOS)</a>
                  <a href="#" className="font-poppins text-xs font-semibold text-[#fefcf3] bg-[#FB7F05] px-6 py-3 hover:bg-[#d4a017] hover:text-[#FB7F05] transition-colors">Google Play (Android)</a>
               </div>
            </div>
         </SketchReveal>
      </section>
    </PageLayout>
  );
}
