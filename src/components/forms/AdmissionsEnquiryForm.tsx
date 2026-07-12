"use client";
import { useState } from "react";
import { submitEnquiry } from "@/actions/crm";
import SketchReveal from "@/components/SketchReveal";

export default function AdmissionsEnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const parentName = formData.get("parentName") as string;
    const childName = formData.get("childName") as string;
    const grade = formData.get("grade") as string;
    const phone = formData.get("phone") as string;

    const res = await submitEnquiry({
      name: `${parentName} (Parent of ${childName})`,
      phone: phone,
      courseInterest: grade,
      notes: `Child's Name: ${childName}`,
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
    <SketchReveal delay={0.2}>
      <div className="bg-[#FB7F05] p-10 relative overflow-hidden">
        <div className="absolute inset-0 graph-paper opacity-5" />
        <div className="relative z-10">
          <div className="font-caveat text-[#d4a017] text-xl mb-2">Quick Enquiry</div>
          <h3 className="font-cormorant text-3xl font-light text-[#fefcf3] mb-8">We'll call you back.</h3>
          
          {success ? (
            <div className="bg-[rgba(212,160,23,0.1)] border border-[#d4a017] p-6 text-center">
              <div className="text-[#d4a017] text-3xl mb-2">✓</div>
              <h4 className="font-poppins text-sm font-semibold text-[#fefcf3] mb-2">Enquiry Received</h4>
              <p className="font-inter text-sm text-[#fefcf3]/80">Our admissions counsellor will contact you within 24 hours.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 font-poppins text-xs font-semibold text-[#d4a017] hover:text-[#fefcf3] transition-colors"
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="text-red-400 text-sm font-inter mb-4">{error}</div>}
              
              <input name="parentName" required type="text" placeholder="Parent's Name" className="w-full border-b border-[rgba(254,252,243,0.2)] bg-transparent py-3 font-inter text-sm text-[#fefcf3] placeholder-[#fefcf3]/40 focus:outline-none focus:border-[#d4a017] transition-colors" />
              <input name="childName" required type="text" placeholder="Child's Name" className="w-full border-b border-[rgba(254,252,243,0.2)] bg-transparent py-3 font-inter text-sm text-[#fefcf3] placeholder-[#fefcf3]/40 focus:outline-none focus:border-[#d4a017] transition-colors" />
              <input name="grade" required type="text" placeholder="Grade Applying For" className="w-full border-b border-[rgba(254,252,243,0.2)] bg-transparent py-3 font-inter text-sm text-[#fefcf3] placeholder-[#fefcf3]/40 focus:outline-none focus:border-[#d4a017] transition-colors" />
              <input name="phone" required type="tel" placeholder="Mobile Number" className="w-full border-b border-[rgba(254,252,243,0.2)] bg-transparent py-3 font-inter text-sm text-[#fefcf3] placeholder-[#fefcf3]/40 focus:outline-none focus:border-[#d4a017] transition-colors" />
              
              <button disabled={loading} type="submit" className="w-full mt-2 bg-[#d4a017] text-[#FB7F05] font-poppins text-sm font-semibold py-4 hover:bg-[#fefcf3] transition-colors disabled:opacity-70">
                {loading ? "Submitting..." : "Request a Callback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </SketchReveal>
  );
}
