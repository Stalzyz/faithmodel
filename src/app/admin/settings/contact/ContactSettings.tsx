"use client";

import { useState } from "react";
import { saveSiteSettings } from "@/actions/settings";
import { Save, Loader2 } from "lucide-react";

export default function ContactSettings({ 
  initialContact, 
  initialSocials 
}: { 
  initialContact: any, 
  initialSocials: any 
}) {
  const [contact, setContact] = useState(initialContact || { 
    address: "123 Education Lane, Chennai, Tamil Nadu 600001", 
    phone: "+91 44 1234 5678", 
    email: "info@faithmodelschool.edu.in",
    mapIframe: ""
  });
  
  const [socials, setSocials] = useState(initialSocials || {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: ""
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res1 = await saveSiteSettings("SITE_CONTACT", contact);
    const res2 = await saveSiteSettings("SITE_SOCIALS", socials);
    setSaving(false);
    
    if (res1.success && res2.success) {
      alert("Contact & Social settings saved successfully!");
    } else {
      alert("Failed to save settings.");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contact & Socials</h2>
          <p className="text-sm text-gray-500">Manage how people contact you and find you online.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-900 border-b pb-2">Contact Details</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input 
              type="text" 
              value={contact.phone}
              onChange={e => setContact({ ...contact, phone: e.target.value })}
              className="admin-input" 
              placeholder="+91 44 1234 5678"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              value={contact.email}
              onChange={e => setContact({ ...contact, email: e.target.value })}
              className="admin-input" 
              placeholder="info@school.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Physical Address</label>
            <textarea 
              value={contact.address}
              onChange={e => setContact({ ...contact, address: e.target.value })}
              className="admin-input h-24" 
              placeholder="123 Education Lane..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Google Maps Embed URL</label>
            <textarea 
              value={contact.mapIframe}
              onChange={e => setContact({ ...contact, mapIframe: e.target.value })}
              className="admin-input h-24" 
              placeholder="<iframe src='...' />"
            />
            <p className="text-xs text-gray-500 mt-1">Paste the full iframe code from Google Maps here.</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-900 border-b pb-2">Social Media Profiles</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook URL</label>
            <input 
              type="url" 
              value={socials.facebook}
              onChange={e => setSocials({ ...socials, facebook: e.target.value })}
              className="admin-input" 
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter / X URL</label>
            <input 
              type="url" 
              value={socials.twitter}
              onChange={e => setSocials({ ...socials, twitter: e.target.value })}
              className="admin-input" 
              placeholder="https://twitter.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram URL</label>
            <input 
              type="url" 
              value={socials.instagram}
              onChange={e => setSocials({ ...socials, instagram: e.target.value })}
              className="admin-input" 
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
            <input 
              type="url" 
              value={socials.linkedin}
              onChange={e => setSocials({ ...socials, linkedin: e.target.value })}
              className="admin-input" 
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">YouTube URL</label>
            <input 
              type="url" 
              value={socials.youtube}
              onChange={e => setSocials({ ...socials, youtube: e.target.value })}
              className="admin-input" 
              placeholder="https://youtube.com/..."
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Leave a field blank to hide that social icon from the footer.</p>
        </div>
      </div>
    </div>
  );
}
