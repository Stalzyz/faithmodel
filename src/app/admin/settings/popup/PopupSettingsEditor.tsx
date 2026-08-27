"use client";

import { useState } from "react";
import { saveSiteSettings } from "@/actions/settings";
import ImageUploader from "@/components/admin/ImageUploader";
import { Save, Megaphone, Clock, Eye, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";

export interface PopupConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
  delaySeconds: number;
  frequency: "once_per_session" | "always";
}

const DEFAULT_POPUP: PopupConfig = {
  enabled: false,
  title: "Admissions Open for Academic Year 2026–27",
  subtitle: "Join Faith Model School — Where Curiosity Meets Character. Limited seats available for Pre-KG to Grade 11.",
  imageUrl: "",
  ctaLabel: "Apply Online Now",
  ctaHref: "/admissions",
  delaySeconds: 2,
  frequency: "once_per_session",
};

export default function PopupSettingsEditor({ initialPopup }: { initialPopup?: Partial<PopupConfig> }) {
  const [popup, setPopup] = useState<PopupConfig>({
    ...DEFAULT_POPUP,
    ...initialPopup,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSiteSettings("POPUP_CONFIG", popup);
    setSaving(false);
    if (res.success) {
      alert("Announcement Popup settings saved successfully!");
    } else {
      alert(res.error || "Failed to save popup settings.");
    }
  };

  return (
    <div className="w-full pb-20 space-y-10">
      {/* Action Bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 px-2 sticky -top-6 z-20 flex justify-between items-center shadow-xs">
        <div>
          <h1 className="font-poppins font-semibold text-gray-900 text-lg flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-amber-500" />
            Announcement Popup Manager
          </h1>
          <p className="text-gray-500 text-sm">Create and manage modal popups for admissions, announcements, or events.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Popup Settings"}
        </button>
      </div>

      {/* Enable Toggle & Trigger Settings */}
      <div className="admin-card">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div>
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Popup Activation State
            </h2>
            <p className="text-xs text-gray-500">Enable or disable the popup banner on public website pages.</p>
          </div>
          <button
            type="button"
            onClick={() => setPopup({ ...popup, enabled: !popup.enabled })}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              popup.enabled ? "bg-emerald-600 text-white shadow-xs" : "bg-gray-100 text-gray-600"
            }`}
          >
            {popup.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
            {popup.enabled ? "Popup ACTIVE" : "Popup DISABLED"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Display Delay (Seconds)</label>
            <input
              type="number"
              min="0"
              max="15"
              value={popup.delaySeconds}
              onChange={(e) => setPopup({ ...popup, delaySeconds: parseInt(e.target.value) || 0 })}
              className="admin-input"
            />
            <p className="text-xs text-gray-500 mt-1">Number of seconds to wait after page load before showing popup.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Display Frequency</label>
            <select
              value={popup.frequency}
              onChange={(e) => setPopup({ ...popup, frequency: e.target.value as any })}
              className="admin-input"
            >
              <option value="once_per_session">Once Per Browsing Session (Recommended)</option>
              <option value="always">Show On Every Page Visit</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Controls how frequently visitors see the announcement.</p>
          </div>
        </div>
      </div>

      {/* Content & Banner Upload */}
      <div className="admin-card">
        <h2 className="text-base font-semibold text-gray-900 mb-6 border-b pb-3">Popup Content & Media Banner</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Headline Title</label>
            <input
              type="text"
              value={popup.title}
              onChange={(e) => setPopup({ ...popup, title: e.target.value })}
              className="admin-input font-medium"
              placeholder="e.g. Admissions Open 2026-27"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Subtitle / Message</label>
            <textarea
              rows={3}
              value={popup.subtitle}
              onChange={(e) => setPopup({ ...popup, subtitle: e.target.value })}
              className="admin-input"
              placeholder="Detailed announcement text..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">CTA Button Label</label>
              <input
                type="text"
                value={popup.ctaLabel}
                onChange={(e) => setPopup({ ...popup, ctaLabel: e.target.value })}
                className="admin-input"
                placeholder="e.g. Apply Now"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">CTA Destination Link</label>
              <input
                type="text"
                value={popup.ctaHref}
                onChange={(e) => setPopup({ ...popup, ctaHref: e.target.value })}
                className="admin-input"
                placeholder="e.g. /admissions"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Popup Banner Image (Optional)</label>
            <ImageUploader
              value={popup.imageUrl}
              onChange={(url) => setPopup({ ...popup, imageUrl: url })}
            />
          </div>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="admin-card">
        <h2 className="text-base font-semibold text-gray-900 mb-4 border-b pb-3 flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-600" />
          Live Modal Popup Preview
        </h2>

        <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center min-h-[300px]">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 p-6 space-y-4">
            {popup.imageUrl && (
              <img src={popup.imageUrl} alt="Banner" className="w-full h-40 object-cover rounded-xl" />
            )}
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{popup.title || "Announcement Title"}</h3>
              <p className="text-gray-600 text-xs mt-2 leading-relaxed">{popup.subtitle || "Announcement message..."}</p>
            </div>
            <div className="pt-2 flex justify-end gap-3">
              <span className="text-xs text-gray-400 self-center">Close [x]</span>
              <button className="bg-[#FB7F05] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm">
                {popup.ctaLabel || "Learn More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
