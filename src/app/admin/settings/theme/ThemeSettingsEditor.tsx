"use client";

import { useState } from "react";
import { saveSiteSettings } from "@/actions/settings";
import ImageUploader from "@/components/admin/ImageUploader";
import { Save, Palette, Image as ImageIcon, ShieldCheck, Sparkles, RefreshCw } from "lucide-react";

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string;
  faviconUrl: string;
  headerBgMode: "dark" | "light" | "glass";
}

const DEFAULT_THEME: ThemeConfig = {
  primaryColor: "#1a1a2e",
  secondaryColor: "#FB7F05",
  accentColor: "#f39c12",
  logoUrl: "",
  faviconUrl: "",
  headerBgMode: "light",
};

export default function ThemeSettingsEditor({ initialTheme }: { initialTheme?: Partial<ThemeConfig> }) {
  const [theme, setTheme] = useState<ThemeConfig>({
    ...DEFAULT_THEME,
    ...initialTheme,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSiteSettings("THEME_CONFIG", theme);
    setSaving(false);
    if (res.success) {
      alert("Theme & Branding settings saved successfully!");
    } else {
      alert(res.error || "Failed to save theme settings.");
    }
  };

  const handleReset = () => {
    if (confirm("Reset theme colors to Faith Model default palette?")) {
      setTheme(DEFAULT_THEME);
    }
  };

  return (
    <div className="w-full pb-20 space-y-10">
      {/* Action Bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 px-2 sticky -top-6 z-20 flex justify-between items-center shadow-xs">
        <div>
          <h1 className="font-poppins font-semibold text-gray-900 text-lg flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#FB7F05]" />
            Theme & Branding Control Panel
          </h1>
          <p className="text-gray-500 text-sm">Customize school brand colors, logo, favicon, and header aesthetic.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} type="button" className="admin-btn-secondary text-xs flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Theme Settings"}
          </button>
        </div>
      </div>

      {/* Brand Color Pickers */}
      <div className="admin-card">
        <h2 className="text-base font-semibold text-gray-900 mb-6 flex items-center gap-2 border-b pb-3">
          <Sparkles className="w-4 h-4 text-[#FB7F05]" />
          Brand Color Palette
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Primary Color */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer p-1"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                className="admin-input flex-1 uppercase font-mono text-sm"
              />
            </div>
            <p className="text-xs text-gray-500">Main header, headings, and primary buttons.</p>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Secondary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer p-1"
              />
              <input
                type="text"
                value={theme.secondaryColor}
                onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                className="admin-input flex-1 uppercase font-mono text-sm"
              />
            </div>
            <p className="text-xs text-gray-500">CTA buttons, badges, highlights & highlights.</p>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer p-1"
              />
              <input
                type="text"
                value={theme.accentColor}
                onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                className="admin-input flex-1 uppercase font-mono text-sm"
              />
            </div>
            <p className="text-xs text-gray-500">Hover states, icons, and navigation indicators.</p>
          </div>
        </div>
      </div>

      {/* Logo & Favicon Upload */}
      <div className="admin-card">
        <h2 className="text-base font-semibold text-gray-900 mb-6 flex items-center gap-2 border-b pb-3">
          <ImageIcon className="w-4 h-4 text-blue-600" />
          Logo & Favicon Media Upload
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Logo Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">School Header Logo</label>
            <p className="text-xs text-gray-500">Recommended: PNG or SVG with transparent background (Height ~60px).</p>
            <ImageUploader
              value={theme.logoUrl}
              onChange={(url) => setTheme({ ...theme, logoUrl: url })}
            />
          </div>

          {/* Favicon Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">Browser Favicon</label>
            <p className="text-xs text-gray-500">Recommended: Square PNG or ICO icon (32x32px or 64x64px).</p>
            <ImageUploader
              value={theme.faviconUrl}
              onChange={(url) => setTheme({ ...theme, faviconUrl: url })}
            />
          </div>
        </div>
      </div>

      {/* Live Brand Preview */}
      <div className="admin-card">
        <h2 className="text-base font-semibold text-gray-900 mb-4 border-b pb-3">Live Theme Preview</h2>
        <div className="p-6 rounded-xl border border-gray-200 bg-gray-50 space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-xs border border-gray-100">
            <div className="flex items-center gap-3">
              {theme.logoUrl ? (
                <img src={theme.logoUrl} alt="Logo" className="h-10 object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-xs" style={{ backgroundColor: theme.primaryColor }}>
                  FM
                </div>
              )}
              <div>
                <div className="font-bold text-sm" style={{ color: theme.primaryColor }}>FAITH MODEL SCHOOL</div>
                <div className="text-xs text-gray-500">Excellence in Education</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium px-3 py-1.5 rounded-full text-white shadow-xs" style={{ backgroundColor: theme.accentColor }}>
                Academic Badge
              </span>
              <button className="text-xs font-semibold px-4 py-2 rounded-lg text-white shadow-xs transition-transform hover:scale-105" style={{ backgroundColor: theme.secondaryColor }}>
                Admissions Open
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
