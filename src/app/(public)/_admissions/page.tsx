import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import AdmissionsEnquiryForm from "@/components/forms/AdmissionsEnquiryForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions 2026–27 — Faith Model School",
  description: "Apply to Faith Model School for 2026–27. CBSE school admissions: process, eligibility, documents, fee structure, and online application.",
};

const steps = [
  { num: "01", title: "Submit Online Enquiry", desc: "Fill the enquiry form on this page or call our admissions helpline. Our counsellor will contact you within 24 hours." },
  { num: "02", title: "Campus Visit & Interaction", desc: "Visit our campus for a guided tour, meet the faculty, and speak with current parents and students to experience Faith Model first-hand." },
  { num: "03", title: "Application Form", desc: "Collect or download the application form. Submit along with all required documents at the admissions office." },
  { num: "04", title: "Grade-Appropriate Assessment", desc: "Children appear for a friendly, age-appropriate interaction or written assessment — not a stressful exam, but a chance for us to understand your child." },
  { num: "05", title: "Admission Confirmation", desc: "Selected students receive an offer letter. Confirm admission by paying the registration fee and submitting original documents." },
  { num: "06", title: "Orientation", desc: "Attend our New Family Orientation to meet teachers, understand systems, and ensure your child starts the year with confidence." },
];

const docs = ["Birth Certificate (original)", "Transfer Certificate from previous school", "CBSE Mark Sheet / Report Card (last 2 years)", "4 passport-size photographs", "Aadhaar card (student and parent)", "Medical fitness certificate", "Address proof (Aadhaar / Utility Bill)", "Community Certificate (if applicable)"];

const fees = [
  { grade: "Pre-KG & LKG", annual: "₹65,000", monthly: "₹5,417", note: "Includes books, uniform & activity fee" },
  { grade: "UKG – Grade 2", annual: "₹75,000", monthly: "₹6,250", note: "" },
  { grade: "Grades 3 – 5", annual: "₹85,000", monthly: "₹7,083", note: "" },
  { grade: "Grades 6 – 8", annual: "₹95,000", monthly: "₹7,917", note: "" },
  { grade: "Grades 9 – 10", annual: "₹1,05,000", monthly: "₹8,750", note: "" },
  { grade: "Grades 11 – 12", annual: "₹1,20,000", monthly: "₹10,000", note: "Science / Commerce streams" },
];

export default function AdmissionsPage() {
  return (
    <PageLayout>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Admissions 2026–27</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Begin Your Child's<br /><em className="text-[#d4a017] not-italic">Greatest Story</em>
          </h1>
          <p className="font-inter text-lg text-[#4a4a5e] font-light mt-6 max-w-2xl leading-relaxed">
            Seats for 2026–27 are limited and filling fast. We invite you to be part of a community where every child is celebrated, every talent is nurtured, and every future is possible.
          </p>
        </SketchReveal>
      </div>

      {/* Admission Process */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="Step by Step" title="The Admission Process" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <SketchReveal key={s.num} delay={i * 0.08}>
              <div className="border border-[rgba(74,74,94,0.1)] p-8 h-full hover:border-[#d4a017] transition-colors group">
                <div className="font-manrope text-4xl font-extrabold text-[rgba(74,74,94,0.07)] mb-4 group-hover:text-[rgba(212,160,23,0.2)] transition-colors">{s.num}</div>
                <h3 className="font-poppins text-base font-semibold text-[#1a1a2e] mb-3">{s.title}</h3>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{s.desc}</p>
              </div>
            </SketchReveal>
          ))}
        </div>
      </section>

      {/* Age Eligibility */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="Eligibility" title="Age Criteria 2026–27" subtitle="As per CBSE guidelines. Age calculated as of 31 March 2027." />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full font-inter text-sm text-[#4a4a5e] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(74,74,94,0.1)]">
                <th className="text-left py-4 font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-widest">Grade</th>
                <th className="text-left py-4 font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-widest">Min. Age</th>
                <th className="text-left py-4 font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-widest">Max. Age</th>
              </tr>
            </thead>
            <tbody>
              {[["Pre-KG", "2 years 6 months", "3 years 6 months"], ["LKG", "3 years 6 months", "4 years 6 months"], ["UKG", "4 years 6 months", "5 years 6 months"], ["Grade 1", "5 years 6 months", "6 years 6 months"], ["Grade 6", "10 years", "12 years"], ["Grade 9", "13 years", "15 years"], ["Grade 11", "15 years", "17 years"]].map(([g, min, max]) => (
                <tr key={g} className="border-b border-[rgba(74,74,94,0.06)] hover:bg-[rgba(212,160,23,0.04)] transition-colors">
                  <td className="py-4 font-medium text-[#1a1a2e]">{g}</td>
                  <td className="py-4">{min}</td>
                  <td className="py-4">{max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Required Documents */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading annotation="What to Bring" title="Required Documents" />
          <ul className="mt-8 space-y-3">
            {docs.map((d, i) => (
              <SketchReveal key={d} delay={i * 0.04}>
                <li className="flex items-start gap-3 font-inter text-sm text-[#4a4a5e] py-3 border-b border-[rgba(74,74,94,0.06)]">
                  <span className="text-[#d4a017] shrink-0 mt-0.5 font-manrope font-bold">{String(i + 1).padStart(2, "0")}</span>
                  {d}
                </li>
              </SketchReveal>
            ))}
          </ul>
        </div>

        {/* Quick Enquiry Form */}
        <AdmissionsEnquiryForm />
      </section>

      {/* Fee Structure */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="Transparent Pricing" title="Fee Structure 2026–27" subtitle="All fees are inclusive of tuition, activity, and library charges. Transport and hostel fees are charged separately." />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#1a1a2e]">
                <th className="text-left py-4 pr-8 font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-widest">Grade</th>
                <th className="text-left py-4 pr-8 font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-widest">Annual Fee</th>
                <th className="text-left py-4 font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-widest">Monthly Equivalent</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f, i) => (
                <tr key={f.grade} className={`border-b border-[rgba(74,74,94,0.06)] hover:bg-[rgba(212,160,23,0.04)] transition-colors ${i % 2 === 0 ? "" : "bg-[rgba(74,74,94,0.02)]"}`}>
                  <td className="py-5 pr-8 font-poppins text-sm font-medium text-[#1a1a2e]">{f.grade}</td>
                  <td className="py-5 pr-8 font-manrope text-lg font-bold text-[#1a1a2e]">{f.annual}</td>
                  <td className="py-5">
                    <span className="font-inter text-sm text-[#4a4a5e]">{f.monthly}</span>
                    {f.note && <span className="ml-3 font-caveat text-[#c17b5a] text-sm">{f.note}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-inter text-xs text-[#4a4a5e]/60 mt-4">* Fees subject to revision. Scholarships available for merit and economically weaker sections.</p>
      </section>

      {/* Scholarships */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <SectionHeading annotation="Financial Support" title="Scholarships" subtitle="We believe exceptional children should never be held back by financial constraints." />
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {[
            { title: "Academic Merit Scholarship", value: "Up to 50% fee waiver", desc: "For students with 95%+ in previous grade's annual exams." },
            { title: "Sports Excellence Award", value: "Up to 30% fee waiver", desc: "State/national-level representation in recognised sports." },
            { title: "Financial Assistance", value: "Up to 40% fee waiver", desc: "Need-based support for families with demonstrated financial need." },
          ].map((s, i) => (
            <SketchReveal key={s.title} delay={i * 0.1}>
              <div className="border border-[rgba(74,74,94,0.1)] p-8 h-full">
                <div className="font-manrope text-xl font-extrabold text-[#d4a017] mb-3">{s.value}</div>
                <h3 className="font-poppins text-sm font-semibold text-[#1a1a2e] mb-3">{s.title}</h3>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{s.desc}</p>
              </div>
            </SketchReveal>
          ))}
        </div>
        <SketchReveal className="mt-12">
          <Link href="/contact" className="inline-block font-poppins text-sm font-semibold text-[#1a1a2e] border border-[#1a1a2e] px-8 py-4 hover:bg-[#1a1a2e] hover:text-[#fefcf3] transition-all duration-400">
            Talk to Our Admissions Counsellor
          </Link>
        </SketchReveal>
      </section>
    </PageLayout>
  );
}
