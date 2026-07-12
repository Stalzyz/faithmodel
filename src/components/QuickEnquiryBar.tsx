"use client";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

export default function QuickEnquiryBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1a1a2e] border-t border-[rgba(212,160,23,0.3)] px-4 py-3 flex items-center justify-between gap-3">
      <p className="font-poppins text-xs text-[#fefcf3]/80 flex-1">
        Admissions 2026–27 are <span className="text-[#FB7F05] font-semibold">now open</span>
      </p>
      <Link
        href="/admissions"
        className="font-poppins text-xs font-semibold bg-[#FB7F05] text-[#1a1a2e] px-4 py-2 shrink-0"
      >
        Apply Now
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="text-[#fefcf3]/40 hover:text-[#fefcf3] transition-colors shrink-0"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
