import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety & Security — Faith Model School",
  description: "Learn about Faith Model School's comprehensive safety protocols, CCTV monitoring, transport security, and child protection policies.",
};

const safetyMeasures = [
  { title: "24/7 CCTV Surveillance", desc: "Over 300 high-definition cameras monitor the campus boundaries, corridors, and common areas round the clock." },
  { title: "RFID Access Control", desc: "Automated attendance and restricted entry. Parents receive instant SMS notifications when their child enters or leaves the campus." },
  { title: "GPS-Tracked Transport", desc: "All school buses are equipped with GPS tracking, speed governors, and CCTV cameras. Parents can track the bus live via the parent app." },
  { title: "Medical Emergency Readiness", desc: "A fully equipped 6-bed infirmary staffed by trained nurses, with a doctor on call and a dedicated ambulance on standby." },
  { title: "Fire Safety Protocols", desc: "Campus-wide fire alarms, smoke detectors, and extinguishers. Regular fire drills are conducted for students and staff." },
  { title: "Visitor Management", desc: "Strict verification for all visitors. Escort policy enforced for any maintenance or external staff during school hours." },
];

export default function SafetyPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Our First Priority</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Campus Safety &<br /><em className="text-[#FB7F05] not-italic">Security</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
         <SectionHeading annotation="Infrastructure" title="A Secure Environment" subtitle="We believe that children can only learn effectively when they feel completely safe. Our multi-layered security infrastructure ensures peace of mind for parents." />
         
         <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyMeasures.map((s, i) => (
               <SketchReveal key={s.title} delay={i * 0.08}>
                  <div className="border border-[rgba(74,74,94,0.1)] p-8 h-full hover:border-[#FB7F05] transition-colors">
                     <h3 className="font-poppins text-base font-semibold text-[#1a1a2e] mb-3">{s.title}</h3>
                     <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{s.desc}</p>
                  </div>
               </SketchReveal>
            ))}
         </div>
      </section>

      <section id="policies" className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <SketchReveal>
            <SectionHeading annotation="Guidelines" title="Child Protection Policy" />
            <div className="mt-8 max-w-4xl font-inter text-sm text-[#4a4a5e] leading-relaxed space-y-6">
               <p>Faith Model School has a zero-tolerance policy towards bullying, harassment, or abuse of any kind. We are fully compliant with the POCSO Act (Protection of Children from Sexual Offences).</p>
               <ul className="space-y-4 pl-4 border-l-2 border-[#FB7F05]">
                  <li>All staff, including teaching, administrative, and support staff, undergo rigorous background checks and police verification before employment.</li>
                  <li>Regular sensitization workshops are conducted for both staff and students to recognize and report inappropriate behaviour.</li>
                  <li>A dedicated Child Protection Committee meets monthly to review policies and address any concerns raised by the school community.</li>
                  <li>Anonymous reporting boxes are available across the campus, monitored directly by the Principal and the Head Counsellor.</li>
               </ul>
            </div>
         </SketchReveal>
      </section>
    </PageLayout>
  );
}
