import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import ContactForm from "@/components/forms/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Faith Model School",
  description: "Get in touch with Faith Model School. Contact our admissions office, find our location, or submit an enquiry.",
};

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
        <SketchReveal>
          <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">Get in Touch</div>
          <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#FB7F05] leading-[1.08] tracking-tight max-w-4xl">
            We'd Love to<br /><em className="text-[#d4a017] not-italic">Hear from You</em>
          </h1>
        </SketchReveal>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <SketchReveal>
            <SectionHeading annotation="Contact Details" title="Our Offices" />
            <div className="mt-8 space-y-10 font-inter text-sm text-[#4a4a5e]">
              <div>
                <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-3">Main Campus</div>
                <address className="not-italic leading-relaxed text-base">
                  Faith Model School<br />
                  123 Education Lane, Nungambakkam,<br />
                  Chennai, Tamil Nadu 600 034<br />
                  India
                </address>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-2">General Enquiries</div>
                  <a href="tel:+914412345678" className="hover:text-[#d4a017] transition-colors block text-base">+91 44 1234 5678</a>
                  <a href="mailto:info@faithmodelschool.edu.in" className="hover:text-[#d4a017] transition-colors block mt-1 text-base break-words">info@faithmodelschool.edu.in</a>
                </div>
                <div>
                  <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-2">Admissions Office</div>
                  <a href="tel:+914498765432" className="hover:text-[#d4a017] transition-colors block text-base">+91 44 9876 5432</a>
                  <a href="mailto:admissions@faithmodelschool.edu.in" className="hover:text-[#d4a017] transition-colors block mt-1 text-base break-words">admissions@faithmodelschool.edu.in</a>
                </div>
              </div>

              <div>
                <div className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-2">Office Hours</div>
                <div className="flex justify-between max-w-sm text-base">
                  <span>Monday – Friday</span>
                  <span>8:00 AM – 4:30 PM</span>
                </div>
                <div className="flex justify-between max-w-sm text-base mt-1">
                  <span>Saturday</span>
                  <span>9:00 AM – 1:00 PM</span>
                </div>
                <div className="flex justify-between max-w-sm text-base mt-1">
                  <span>Sunday & Public Holidays</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </SketchReveal>

          <SketchReveal delay={0.2} className="mt-16">
            <h3 id="grievance" className="font-poppins text-lg font-semibold text-[#FB7F05] mb-4">Grievance Redressal</h3>
            <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed mb-4">
              For any grievances or concerns, please contact our Grievance Redressal Officer:
            </p>
            <div className="p-6 border border-[rgba(74,74,94,0.1)] bg-[rgba(74,74,94,0.02)]">
              <div className="font-poppins text-sm font-semibold text-[#FB7F05] mb-1">Dr. Sarah Thomas</div>
              <div className="font-inter text-sm text-[#4a4a5e] mb-2">Vice Principal (Administration)</div>
              <a href="mailto:grievance@faithmodelschool.edu.in" className="font-inter text-sm text-[#d4a017] hover:underline">grievance@faithmodelschool.edu.in</a>
            </div>
          </SketchReveal>
        </div>

        <ContactForm />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <SketchReveal>
          <SectionHeading annotation="Location" title="Find Us on the Map" center />
          <div className="mt-12 w-full h-[500px] bg-[rgba(74,74,94,0.06)] border border-[rgba(74,74,94,0.1)] flex items-center justify-center overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5!2d80.2!3d13.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzM2LjAiTiA4MMKwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%" loading="lazy" title="Faith Model School Location"
              className="border-0 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </SketchReveal>
      </section>
    </PageLayout>
  );
}
