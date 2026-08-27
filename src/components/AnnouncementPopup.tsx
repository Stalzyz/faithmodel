"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { PopupConfig } from "@/app/admin/settings/popup/PopupSettingsEditor";

export default function AnnouncementPopup({ popupConfig }: { popupConfig?: PopupConfig }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!popupConfig || !popupConfig.enabled) return;

    if (popupConfig.frequency === "once_per_session") {
      const seen = sessionStorage.getItem("faithmodel_popup_seen");
      if (seen) return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, (popupConfig.delaySeconds || 2) * 1000);

    return () => clearTimeout(timer);
  }, [popupConfig]);

  const handleClose = () => {
    setVisible(false);
    if (popupConfig?.frequency === "once_per_session") {
      sessionStorage.setItem("faithmodel_popup_seen", "true");
    }
  };

  if (!visible || !popupConfig || !popupConfig.enabled) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-md transition-colors"
          aria-label="Close Announcement"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media Banner */}
        {popupConfig.imageUrl ? (
          <div className="relative h-52 w-full bg-gray-100">
            <img 
              src={popupConfig.imageUrl} 
              alt={popupConfig.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#FB7F05] p-6 text-white flex items-center gap-3">
            <Sparkles className="w-8 h-8 shrink-0 text-amber-300 animate-pulse" />
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-200 font-semibold">Special Announcement</span>
              <h4 className="font-bold text-lg leading-tight">{popupConfig.title}</h4>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {popupConfig.imageUrl && (
            <h3 className="font-poppins font-bold text-gray-900 text-xl leading-tight">
              {popupConfig.title}
            </h3>
          )}

          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {popupConfig.subtitle}
          </p>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
            <button 
              onClick={handleClose}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Dismiss
            </button>
            {popupConfig.ctaLabel && popupConfig.ctaHref && (
              <Link 
                href={popupConfig.ctaHref}
                onClick={handleClose}
                className="bg-[#FB7F05] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1a1a2e] transition-colors shadow-md flex items-center gap-2"
              >
                {popupConfig.ctaLabel}
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
