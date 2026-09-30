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
      <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-xl shadow-blue-600/5">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-caveat text-blue-600 text-xl font-medium">Quick Enquiry</span>
          </div>
          <h3 className="font-cormorant text-3xl md:text-4xl font-light text-[#1a1a2e] mb-2">We&apos;ll call you back.</h3>
          <p className="font-inter text-xs text-gray-500 mb-6">Leave your contact details and our admissions counsellor will reach out shortly.</p>
          
          {success ? (
            <div className="bg-blue-50/80 border-2 border-blue-600/30 rounded-xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto text-xl font-bold mb-3 shadow-md shadow-blue-600/20">✓</div>
              <h4 className="font-poppins text-base font-semibold text-gray-900 mb-1">Enquiry Received</h4>
              <p className="font-inter text-sm text-gray-600">Our admissions counsellor will contact you within 24 hours.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 inline-flex items-center gap-1 font-poppins text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider"
              >
                ← Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-inter">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Parent&apos;s Name <span className="text-red-500">*</span></label>
                <input 
                  name="parentName" 
                  required 
                  type="text" 
                  placeholder="e.g. Rajesh Kumar" 
                  className="w-full bg-gray-50/60 border border-blue-200 rounded-lg px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Child&apos;s Name <span className="text-red-500">*</span></label>
                <input 
                  name="childName" 
                  required 
                  type="text" 
                  placeholder="e.g. Aarav Kumar" 
                  className="w-full bg-gray-50/60 border border-blue-200 rounded-lg px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Grade Applying For <span className="text-red-500">*</span></label>
                  <input 
                    name="grade" 
                    required 
                    type="text" 
                    placeholder="e.g. Grade 1 / Pre-KG" 
                    className="w-full bg-gray-50/60 border border-blue-200 rounded-lg px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Mobile Number <span className="text-red-500">*</span></label>
                  <input 
                    name="phone" 
                    required 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    className="w-full bg-gray-50/60 border border-blue-200 rounded-lg px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
                </div>
              </div>
              
              <button 
                disabled={loading} 
                type="submit" 
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-poppins text-sm font-semibold py-3.5 px-6 rounded-lg shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Submitting..." : "Request a Callback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </SketchReveal>
  );
}
