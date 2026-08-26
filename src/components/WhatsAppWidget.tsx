"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { MessageCircle, X, Send, Sparkles, ChevronRight } from "lucide-react";

export default function WhatsAppWidget({ settings }: { settings?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");

  const isEnabled = settings?.enabled ?? true;
  const rawPhone = settings?.phoneNumber || "+919876543210";
  const cleanPhone = rawPhone.replace(/[^\d+]/g, "");
  const defaultMsg = settings?.defaultMessage || "Hello Faith Model School! I would like to inquire about admissions for 2026-27.";
  const title = settings?.greetingTitle || "Need Admissions Guidance?";
  const subtitle = settings?.greetingMessage || "Chat live with our Faith Model admissions team on WhatsApp!";
  const position = settings?.position === "bottom-left" ? "bottom-left" : "bottom-right";
  const graftyScriptUrl = settings?.graftyScriptUrl;

  const quickPrompts = [
    "🎓 Admissions Process & Eligibility",
    "💰 Fee Structure & Payment Details",
    "🏫 Book a Campus Visit",
    "📞 Talk to an Admission Counsellor"
  ];

  const handleOpenWhatsApp = (customText?: string) => {
    const textToSend = customText || userMsg || defaultMsg;
    const url = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isEnabled) return null;

  const positionClasses = position === "bottom-left" 
    ? "left-6 sm:left-8 text-left" 
    : "right-6 sm:right-8 text-right";

  const cardPositionClasses = position === "bottom-left"
    ? "left-6 sm:left-8 origin-bottom-left"
    : "right-6 sm:right-8 origin-bottom-right";

  return (
    <>
      {/* Grafty Script Integration if URL provided */}
      {graftyScriptUrl && (
        <Script 
          src={graftyScriptUrl} 
          strategy="lazyOnload" 
          onLoad={() => console.log("Grafty SDK script loaded successfully.")}
        />
      )}

      {/* Floating Widget Container */}
      <div className={`fixed bottom-6 z-50 ${positionClasses}`}>
        {/* Expanded Chat Popup */}
        {isOpen && (
          <div className={`fixed bottom-24 ${cardPositionClasses} w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200 z-50`}>
            {/* Header */}
            <div className="bg-[#075e54] text-white p-5 relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                    <img src="/Faith_model_logo.svg" alt="Faith Model" className="h-6 w-auto filter brightness-0 invert" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075e54] rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-base leading-tight text-white">{title}</h3>
                  <p className="text-xs text-white/80 mt-0.5 font-inter">Faith Model Admissions Team</p>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-5 bg-[#efeae2]/30 space-y-4 max-h-[360px] overflow-y-auto">
              {/* Welcome Speech Bubble */}
              <div className="bg-white p-4 rounded-xl rounded-tl-none shadow-sm border border-gray-100/80 text-xs text-gray-700 leading-relaxed font-inter relative">
                <div className="flex items-center gap-1.5 font-semibold text-[#075e54] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Welcome to Faith Model School!</span>
                </div>
                {subtitle}
                <div className="text-[10px] text-gray-400 text-right mt-2">Just now</div>
              </div>

              {/* Quick Prompts */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-1">Quick Inquiries:</div>
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOpenWhatsApp(prompt)}
                    className="w-full text-left px-3 py-2 bg-white hover:bg-[#25D366]/10 hover:border-[#25D366]/40 text-xs text-gray-700 font-medium rounded-lg border border-gray-200 transition-all flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#075e54] transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input 
                type="text" 
                value={userMsg} 
                onChange={e => setUserMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleOpenWhatsApp()}
                placeholder="Type your question..."
                className="flex-1 text-xs px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#25D366] transition-colors"
              />
              <button 
                onClick={() => handleOpenWhatsApp()}
                className="p-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg transition-colors shrink-0 shadow-sm"
                title="Start WhatsApp Chat"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          aria-label="Open WhatsApp Chat"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#25D366] animate-pulse"></span>
          </div>

          <span className="hidden sm:inline font-poppins text-xs font-semibold tracking-wide">
            Chat on WhatsApp
          </span>
        </button>
      </div>
    </>
  );
}
