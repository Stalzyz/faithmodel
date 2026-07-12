"use client";
import { useState } from "react";
import { submitEnquiry } from "@/actions/crm";
import SketchReveal from "@/components/SketchReveal";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const type = formData.get("enquiry_type") as string;
    const message = formData.get("message") as string;

    const res = await submitEnquiry({
      name,
      email,
      phone,
      notes: `Type: ${type}\nMessage: ${message}`,
    });

    if (res.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      setError(res.error || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <SketchReveal delay={0.1} className="h-full">
      <div className="bg-[#FB7F05] p-10 relative overflow-hidden h-full">
        <div className="absolute inset-0 graph-paper opacity-5" />
        <div className="relative z-10">
          <div className="font-caveat text-[#d4a017] text-xl mb-2">Send a Message</div>
          <h3 className="font-cormorant text-3xl font-light text-[#fefcf3] mb-8">How can we help?</h3>
          
          {success ? (
            <div className="bg-[rgba(212,160,23,0.1)] border border-[#d4a017] p-8 text-center mt-12">
              <div className="text-[#d4a017] text-4xl mb-4">✓</div>
              <h4 className="font-poppins text-lg font-semibold text-[#fefcf3] mb-3">Message Sent!</h4>
              <p className="font-inter text-sm text-[#fefcf3]/80 mb-6">Thank you for reaching out. A member of our team will get back to you shortly.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="font-poppins text-sm font-semibold border border-[#d4a017] text-[#d4a017] px-6 py-3 hover:bg-[#d4a017] hover:text-[#FB7F05] transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="text-red-400 text-sm font-inter mb-4">{error}</div>}
              
              <div>
                <label htmlFor="name" className="block font-poppins text-xs font-medium text-[#fefcf3]/70 mb-1">Full Name *</label>
                <input id="name" name="name" type="text" required className="w-full border-b border-[rgba(254,252,243,0.2)] bg-transparent py-2 font-inter text-base text-[#fefcf3] focus:outline-none focus:border-[#d4a017] transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block font-poppins text-xs font-medium text-[#fefcf3]/70 mb-1">Email Address *</label>
                  <input id="email" name="email" type="email" required className="w-full border-b border-[rgba(254,252,243,0.2)] bg-transparent py-2 font-inter text-base text-[#fefcf3] focus:outline-none focus:border-[#d4a017] transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-poppins text-xs font-medium text-[#fefcf3]/70 mb-1">Mobile Number</label>
                  <input id="phone" name="phone" type="tel" className="w-full border-b border-[rgba(254,252,243,0.2)] bg-transparent py-2 font-inter text-base text-[#fefcf3] focus:outline-none focus:border-[#d4a017] transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="enquiry_type" className="block font-poppins text-xs font-medium text-[#fefcf3]/70 mb-1">Enquiry Type *</label>
                <select id="enquiry_type" name="enquiry_type" required className="w-full border-b border-[rgba(254,252,243,0.2)] bg-transparent py-2 font-inter text-base text-[#fefcf3] focus:outline-none focus:border-[#d4a017] transition-colors appearance-none">
                  <option value="" disabled selected className="text-[#FB7F05]">Select an option</option>
                  <option value="admissions" className="text-[#FB7F05]">Admissions</option>
                  <option value="careers" className="text-[#FB7F05]">Careers</option>
                  <option value="general" className="text-[#FB7F05]">General Enquiry</option>
                  <option value="alumni" className="text-[#FB7F05]">Alumni Relations</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block font-poppins text-xs font-medium text-[#fefcf3]/70 mb-1">Message *</label>
                <textarea id="message" name="message" rows={4} required className="w-full border-b border-[rgba(254,252,243,0.2)] bg-transparent py-2 font-inter text-base text-[#fefcf3] focus:outline-none focus:border-[#d4a017] transition-colors resize-none"></textarea>
              </div>
              <button disabled={loading} type="submit" className="w-full mt-4 bg-[#d4a017] text-[#FB7F05] font-poppins text-sm font-semibold py-4 hover:bg-[#fefcf3] transition-colors disabled:opacity-70">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </SketchReveal>
  );
}
