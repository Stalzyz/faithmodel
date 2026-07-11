"use client";

import { useState } from "react";
import { saveSiteSettings } from "@/actions/settings";
import { Save, Loader2 } from "lucide-react";

export default function GeneralSettings({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData || { name: "Faith Model School", description: "Empowering minds, shaping futures since 1989." });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSiteSettings("SITE_GENERAL", data);
    setSaving(false);
    if (res.success) {
      alert("General settings saved successfully!");
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
          <p className="text-sm text-gray-500">Manage the core identity of your website.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Website Name</label>
          <input 
            type="text" 
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
            className="admin-input" 
            placeholder="e.g. Faith Model School"
          />
          <p className="text-xs text-gray-500 mt-1">This appears in the header and footer.</p>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
          <textarea 
            value={data.description}
            onChange={e => setData({ ...data, description: e.target.value })}
            className="admin-input h-24" 
            placeholder="A short tagline or description"
          />
          <p className="text-xs text-gray-500 mt-1">This appears in the footer below the school name.</p>
        </div>
      </div>
    </div>
  );
}
