"use client";

import { useState } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQBlockData {
  title?: string;
  subtitle?: string;
  annotation?: string;
  faqs?: FAQItem[];
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    category: "Admissions",
    question: "What is the age criteria for Pre-KG and Grade 1 admissions?",
    answer: "For Pre-KG, the child should complete 3 years of age as of March 31 of the academic year. For Grade 1, the child should complete 6 years of age."
  },
  {
    category: "Admissions",
    question: "What documents are required during the application process?",
    answer: "You will need: (1) Copy of Birth Certificate, (2) Transfer Certificate from previous school, (3) Recent passport-size photos, (4) Aadhaar card copy of student and parents."
  },
  {
    category: "Academics",
    question: "What curriculum does Faith Model School follow?",
    answer: "Faith Model School is affiliated with the Central Board of Secondary Education (CBSE), New Delhi, enhanced with experiential learning, STEM projects, and AI/Robotics modules."
  },
  {
    category: "Campus",
    question: "Is transport facility available for all routes?",
    answer: "Yes, our GPS-tracked and CCTV-monitored buses cover all major residential zones in Coimbatore with dedicated female attendants on every vehicle."
  },
  {
    category: "Campus",
    question: "What safety and medical facilities are on campus?",
    answer: "Our 15-acre green campus is monitored 24/7 by CCTV cameras, RFID access gates, and has an on-campus medical infirmary with qualified nursing staff."
  }
];

export default function FAQBlock({ data }: { data?: FAQBlockData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const faqs = data?.faqs || DEFAULT_FAQS;
  const categories = ["All", ...Array.from(new Set(faqs.map(f => f.category).filter(Boolean))) as string[]];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#FB7F05] font-semibold bg-[#FB7F05]/10 px-3.5 py-1.5 rounded-full inline-block">
            {data?.annotation || "Got Questions?"}
          </span>
          <h2 className="font-poppins font-bold text-gray-900 text-3xl md:text-4xl">
            {data?.title || "Frequently Asked Questions"}
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            {data?.subtitle || "Find instant answers to common queries about admissions, academics, campus life, and safety."}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. fees, bus, age limit)..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FB7F05]/20 focus:border-[#FB7F05] transition-all"
            />
          </div>

          {categories.length > 2 && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                    activeCategory === cat
                      ? "bg-[#1a1a2e] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? "border-[#FB7F05] bg-amber-50/20 shadow-md" : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-[#FB7F05]" : "text-gray-400"}`} />
                      <span className="font-semibold text-gray-900 text-base md:text-lg">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#FB7F05]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-amber-100/50">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-sm">No matching questions found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
