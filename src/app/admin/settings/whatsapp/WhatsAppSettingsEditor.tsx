"use client";

import { useState } from "react";
import { saveSiteSettings } from "@/actions/settings";
import { Save, MessageCircle, Bot, Link as LinkIcon, Sparkles } from "lucide-react";

export default function WhatsAppSettingsEditor({ initialSettings }: { initialSettings?: any }) {
  const [settings, setSettings] = useState<any>(initialSettings || {
    enabled: true,
    phoneNumber: "+91 98765 43210",
    defaultMessage: "Hello Faith Model School! I would like to inquire about admissions for 2026-27.",
    greetingTitle: "Need Admissions Guidance?",
    greetingMessage: "Chat live with our Faith Model admissions team on WhatsApp!",
    graftyScriptUrl: "",
    graftyWebhookUrl: "",
    position: "bottom-right"
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSiteSettings("SITE_WHATSAPP", settings);
    setSaving(false);
    if (res.success) {
      alert("WhatsApp & Grafty automation settings saved successfully!");
    } else {
      alert(res.error || "Failed to save settings");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-poppins flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-600" />
            WhatsApp & Grafty Automation
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure live WhatsApp chat widgets, Grafty chatbot automation, and instant admission enquiries.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Enable Toggle */}
      <div className="admin-card bg-gray-50 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Enable Floating WhatsApp Widget</h3>
            <p className="text-xs text-gray-500">Display the floating WhatsApp / Grafty chat button on all public website pages.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.enabled} 
              onChange={e => setSettings({ ...settings, enabled: e.target.checked })} 
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>

      {/* WhatsApp Main Settings */}
      <div className="admin-card space-y-6">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-green-600" />
          WhatsApp Contact & Message Options
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">WhatsApp Phone Number</label>
            <input 
              type="text" 
              value={settings.phoneNumber} 
              onChange={e => setSettings({ ...settings, phoneNumber: e.target.value })}
              className="admin-input" 
              placeholder="e.g. +919876543210"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Include country code without spaces or dashes (e.g. +919876543210).</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Widget Position</label>
            <select
              value={settings.position}
              onChange={e => setSettings({ ...settings, position: e.target.value })}
              className="admin-input"
            >
              <option value="bottom-right">Bottom Right corner</option>
              <option value="bottom-left">Bottom Left corner</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Default Pre-filled Message</label>
          <textarea 
            value={settings.defaultMessage} 
            onChange={e => setSettings({ ...settings, defaultMessage: e.target.value })}
            className="admin-input h-20" 
            placeholder="e.g. Hello Faith Model School! I would like to inquire about admissions."
          />
        </div>
      </div>

      {/* Greeting Card Popup Options */}
      <div className="admin-card space-y-6">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Widget Greeting Popup Card
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Popup Header Title</label>
            <input 
              type="text" 
              value={settings.greetingTitle} 
              onChange={e => setSettings({ ...settings, greetingTitle: e.target.value })}
              className="admin-input" 
              placeholder="e.g. Need Admissions Guidance?"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Popup Subtitle / Message</label>
            <input 
              type="text" 
              value={settings.greetingMessage} 
              onChange={e => setSettings({ ...settings, greetingMessage: e.target.value })}
              className="admin-input" 
              placeholder="e.g. Chat live with our Faith Model team!"
            />
          </div>
        </div>
      </div>

      {/* Grafty Automation & Script Integration */}
      <div className="admin-card space-y-6 border-l-4 border-l-purple-600">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-600" />
          Grafty Chatbot & API Webhook Integration
        </h2>

        <p className="text-xs text-gray-600 leading-relaxed">
          Grafty provides automated AI chatbot response flows, lead routing, and WhatsApp message dispatches for educational institutions. Paste your Grafty embed widget URL or Webhook endpoint below to activate full Grafty automation.
        </p>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 flex items-center gap-1">
            <LinkIcon className="w-3.5 h-3.5 text-purple-600" />
            Grafty Widget Script URL / Account Key (Optional)
          </label>
          <input 
            type="text" 
            value={settings.graftyScriptUrl} 
            onChange={e => setSettings({ ...settings, graftyScriptUrl: e.target.value })}
            className="admin-input font-mono text-xs" 
            placeholder="e.g. https://cdn.grafty.ai/widget.js?appId=your_grafty_app_id"
          />
          <span className="text-[11px] text-gray-400 mt-1 block">If provided, the Grafty automated chatbot script will load automatically across the site.</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 flex items-center gap-1">
            <LinkIcon className="w-3.5 h-3.5 text-purple-600" />
            Grafty Lead Automation Webhook URL (Optional)
          </label>
          <input 
            type="text" 
            value={settings.graftyWebhookUrl} 
            onChange={e => setSettings({ ...settings, graftyWebhookUrl: e.target.value })}
            className="admin-input font-mono text-xs" 
            placeholder="e.g. https://api.grafty.ai/v1/webhooks/enquiry"
          />
          <span className="text-[11px] text-gray-400 mt-1 block">Form submissions on the website will be forwarded to Grafty to trigger automated WhatsApp welcome templates.</span>
        </div>
      </div>
    </div>
  );
}
