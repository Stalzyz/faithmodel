import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics — Faith Model School",
  description: "Explore our CBSE curriculum, teaching philosophy, STEM programs, digital learning, and academic calendar at Faith Model School.",
};

const subjects = {
  primary: ["English Language & Literature", "Mathematics", "Environmental Studies", "Hindi / Tamil (Second Language)", "Art & Craft", "Physical Education", "Music & Dance", "Computer Fundamentals"],
  middle: ["English", "Mathematics", "Science", "Social Science", "Hindi / Tamil", "French / German (Optional)", "Computer Science", "Visual Arts", "Physical & Health Education"],
  secondary: ["English Core", "Mathematics Standard / Basic", "Science (Physics, Chemistry, Biology)", "Social Science", "Hindi / Tamil / French", "Information Technology (Optional)"],
  senior: { science: ["Physics", "Chemistry", "Mathematics / Biology", "English Core", "Computer Science / Physical Education"], commerce: ["Accountancy", "Business Studies", "Economics", "English Core", "Mathematics / Informatics Practices"] },
};

export default function AcademicsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">CBSE Affiliated</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
            Academics at<br /><em className="text-[#d4a017] not-italic">Faith Model</em>
          </h1>
        </SketchReveal>
      </div>

      {/* Philosophy */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-center">
        <SketchReveal>
          <SectionHeading annotation="Our Philosophy" title="Beyond the Textbook" subtitle="We follow the CBSE curriculum enriched with our own pedagogy framework that champions inquiry, project-based learning, and the development of essential life skills alongside academic mastery." />
          <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mt-4">Our approach is guided by three principles: <strong className="text-[#1a1a2e]">Conceptual Understanding</strong> (not rote memorisation), <strong className="text-[#1a1a2e]">Application Thinking</strong> (connecting learning to real life), and <strong className="text-[#1a1a2e]">Reflective Growth</strong> (continuous self-assessment and improvement).</p>
        </SketchReveal>
        <SketchReveal delay={0.2}>
          <div className="relative h-[45vh] overflow-hidden rounded-sm">
            <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80" alt="Classroom" className="w-full h-full object-cover" />
          </div>
        </SketchReveal>
      </section>

      {/* Curriculum by Level */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="Grade-Wise" title="Curriculum Overview" />
        <div className="mt-16 space-y-12">
          {[
            { level: "Primary School", grades: "Grades 1–5", subjects: subjects.primary, img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=70" },
            { level: "Middle School", grades: "Grades 6–8", subjects: subjects.middle, img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=70" },
            { level: "Secondary School", grades: "Grades 9–10", subjects: subjects.secondary, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=70" },
          ].map((level, i) => (
            <SketchReveal key={level.level} delay={i * 0.06}>
              <div className="grid md:grid-cols-3 gap-8 py-10 border-b border-[rgba(74,74,94,0.06)]">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-poppins text-xl font-semibold text-[#1a1a2e]">{level.level}</h3>
                    <span className="font-caveat text-[#c17b5a] text-base">{level.grades}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {level.subjects.map(s => (
                      <span key={s} className="font-inter text-xs text-[#4a4a5e] border border-[rgba(74,74,94,0.15)] px-3 py-1.5 hover:border-[#d4a017] transition-colors">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="h-36 overflow-hidden rounded-sm">
                  <img src={level.img} alt={level.level} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </SketchReveal>
          ))}
        </div>
      </section>

      {/* Signature Programs */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="Beyond the Syllabus" title="Signature Academic Programs" />
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {[
            { title: "STEM Excellence Program", desc: "Integrated Science, Technology, Engineering, and Mathematics curriculum with dedicated project hours, Olympiad coaching, and state-competition participation.", tag: "Grades 6–12" },
            { title: "AI & Future Skills", desc: "Structured introduction to Artificial Intelligence, Machine Learning concepts, Python programming, and ethical technology use, developed in partnership with Microsoft.", tag: "Grades 7–12" },
            { title: "Language Enrichment Program", desc: "English communication, Tamil literary studies, and optional French or German with DELF and Cambridge certification pathways.", tag: "All Grades" },
            { title: "Value Education & Life Skills", desc: "Weekly structured sessions on empathy, mindfulness, financial literacy, civic responsibility, and social-emotional learning.", tag: "All Grades" },
            { title: "Olympiad Coaching", desc: "Mathematics, Science, English, and Cyber Olympiad preparation with dedicated faculty coaching and national qualification track record.", tag: "Grades 4–10" },
            { title: "Research & Innovation Projects", desc: "Annual student research fair where students develop original projects, work with mentors, and present findings to an external panel.", tag: "Grades 8–12" },
          ].map((p, i) => (
            <SketchReveal key={p.title} delay={i * 0.07}>
              <div className="border border-[rgba(74,74,94,0.1)] p-8 h-full group hover:border-[#d4a017] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-poppins text-base font-semibold text-[#1a1a2e] group-hover:text-[#d4a017] transition-colors leading-tight">{p.title}</h3>
                  <span className="font-caveat text-[#c17b5a] text-sm shrink-0 ml-4">{p.tag}</span>
                </div>
                <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{p.desc}</p>
              </div>
            </SketchReveal>
          ))}
        </div>
      </section>

      {/* Assessment */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
        <SectionHeading annotation="Evaluation" title="Assessment System" subtitle="Our assessment philosophy is continuous, holistic, and growth-focused — not a single-exam ranking system." />
        <div className="mt-12 grid md:grid-cols-4 gap-8">
          {[
            { label: "Formative Assessments", pct: "40%", desc: "Class tests, projects, assignments, and classroom participation." },
            { label: "Term Examinations", pct: "30%", desc: "Mid-term and end-of-term written examinations." },
            { label: "Projects & Portfolios", pct: "20%", desc: "Individual and group projects, lab records, and creative portfolios." },
            { label: "Co-curricular", pct: "10%", desc: "Sports, arts, community service, and club participation." },
          ].map((a, i) => (
            <SketchReveal key={a.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="font-manrope text-4xl font-extrabold text-[#d4a017] mb-3">{a.pct}</div>
                <div className="font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-widest mb-3">{a.label}</div>
                <p className="font-inter text-xs text-[#4a4a5e] leading-relaxed">{a.desc}</p>
              </div>
            </SketchReveal>
          ))}
        </div>
      </section>

      {/* Academic Calendar CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col md:flex-row items-center gap-8 justify-between">
        <SketchReveal>
          <h2 className="font-cormorant text-3xl font-light text-[#1a1a2e]">Download the 2026–27 Academic Calendar</h2>
          <p className="font-inter text-sm text-[#4a4a5e] mt-3">Term dates, examination schedules, holidays, and annual events.</p>
        </SketchReveal>
        <SketchReveal delay={0.2}>
          <a href="/downloads/academic-calendar-2026.pdf" className="shrink-0 font-poppins text-sm font-semibold bg-[#1a1a2e] text-[#fefcf3] px-8 py-4 hover:bg-[#d4a017] hover:text-[#1a1a2e] transition-all duration-300">
            Download Calendar (PDF)
          </a>
        </SketchReveal>
      </section>
    </PageLayout>
  );
}
