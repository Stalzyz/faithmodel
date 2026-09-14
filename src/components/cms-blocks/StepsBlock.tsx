import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import AdmissionsEnquiryForm from "@/components/forms/AdmissionsEnquiryForm";

export default function StepsBlock({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation || "How to Apply"} title={data.title || "Step-by-Step Admissions"} subtitle={data.subtitle} />
      
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {data.steps?.map((step: any, i: number) => (
          <SketchReveal key={i} delay={i * 0.06}>
            <div className="relative border-t border-[rgba(74,74,94,0.1)] pt-6 h-full">
              <div className="absolute -top-4 bg-[#fefcf3] pr-4 font-caveat text-3xl text-[#FB7F05]">{step.num}</div>
              <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e] mt-4 mb-3">{step.title}</h3>
              <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{step.desc}</p>
            </div>
          </SketchReveal>
        ))}
      </div>

      <div className="mt-20 pt-16 border-t border-[rgba(74,74,94,0.08)] max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="font-caveat text-[#c17b5a] text-xl mb-1">Online Application Form</div>
          <h3 className="font-cormorant text-3xl text-[#1a1a2e] font-light">Submit Your Application Online</h3>
          <p className="font-inter text-sm text-[#4a4a5e] mt-2">
            Fill out the form below. Your application will be sent directly to <span className="font-semibold text-[#1a1a2e]">Admissions@faithmodelschool.com</span>.
          </p>
        </div>
        <AdmissionsEnquiryForm />
      </div>
    </section>
  );
}
