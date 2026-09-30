"use client";

import { useState } from "react";
import { saveEmailSettingsAction, testSmtpConnectionAction } from "@/actions/settings";
import { Mail, Save, Loader2, Send, CheckCircle2, AlertCircle, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function EmailSettingsClient({ initialSettings }: { initialSettings: any }) {
  const [settings, setSettings] = useState({
    smtpHost: initialSettings?.smtpHost || "",
    smtpPort: initialSettings?.smtpPort || 587,
    smtpSecure: initialSettings?.smtpSecure || false,
    smtpUser: initialSettings?.smtpUser || "",
    smtpPass: initialSettings?.smtpPass || "",
    fromName: initialSettings?.fromName || "Faith Model School Admissions",
    fromEmail: initialSettings?.fromEmail || "",
    recipientEmail: initialSettings?.recipientEmail || "Admissions@faithmodelschool.com",
    ccEmails: initialSettings?.ccEmails || "",
    enabled: initialSettings?.enabled ?? true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [testEmail, setTestEmail] = useState("");
  const [testing, setTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSaveStatus(null);

    const res = await saveEmailSettingsAction(settings);
    setSaving(false);

    if (res.success) {
      setSaveStatus({ type: "success", message: "Email and SMTP settings saved successfully!" });
      setTimeout(() => setSaveStatus(null), 4000);
    } else {
      setSaveStatus({ type: "error", message: res.error || "Failed to save settings." });
    }
  };

  const handleTestEmail = async () => {
    if (!settings.smtpHost || !settings.smtpUser) {
      alert("Please fill in SMTP Host and Username first.");
      return;
    }

    setTesting(true);
    setTestStatus(null);

    const target = testEmail || settings.recipientEmail || settings.smtpUser;
    const res = await testSmtpConnectionAction(settings, target);
    setTesting(false);

    if (res.success) {
      setTestStatus({
        type: "success",
        message: `Success! Test email was successfully sent to ${target}. Your SMTP configuration is verified.`,
      });
    } else {
      setTestStatus({
        type: "error",
        message: `SMTP Test Failed: ${res.error || "Unable to connect or authenticate. Check your credentials."}`,
      });
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Email & SMTP Settings</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Configure SMTP details to automatically deliver admissions enquiries and new leads.
          </p>
        </div>
        <button
          onClick={() => handleSave()}
          disabled={saving}
          className="admin-btn-primary flex items-center gap-2 self-start sm:self-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {saveStatus && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm ${
            saveStatus.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {saveStatus.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Enable Toggle */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-8 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">Lead Email Notifications</h4>
          <p className="text-xs text-gray-600 mt-0.5">
            When enabled, every new admissions inquiry automatically triggers an email to admissions & CC emails.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="space-y-8">
        {/* Lead & CC Recipients Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
          <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            Lead Notification Recipients & CC
          </h3>
          <p className="text-xs text-gray-500 mb-5">
            Specify where admissions leads should be delivered.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                Primary Lead Recipient Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={settings.recipientEmail}
                onChange={(e) => setSettings({ ...settings, recipientEmail: e.target.value })}
                className="admin-input text-sm"
                placeholder="Admissions@faithmodelschool.com"
              />
              <p className="text-[11px] text-gray-500 mt-1">Main inbox that receives all admissions form inquiries.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                From Display Name
              </label>
              <input
                type="text"
                value={settings.fromName}
                onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
                className="admin-input text-sm"
                placeholder="Faith Model School Admissions"
              />
              <p className="text-[11px] text-gray-500 mt-1">Sender name displayed in the recipient's email client.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
              CC Emails (Separate multiple emails with commas)
            </label>
            <input
              type="text"
              value={settings.ccEmails}
              onChange={(e) => setSettings({ ...settings, ccEmails: e.target.value })}
              className="admin-input text-sm font-mono"
              placeholder="principal@faithmodelschool.com, chairman@faithmodelschool.com, admin@faithmodelschool.com"
            />
            <p className="text-[11px] text-gray-500 mt-1.5">
              Every lead submission will automatically be CC'd to each of these email addresses. Separate them by commas.
            </p>
          </div>
        </div>

        {/* SMTP Configuration Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
          <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            SMTP Server Credentials
          </h3>
          <p className="text-xs text-gray-500 mb-5">
            Configure your mail host (e.g. Google Workspace / Gmail App Password, Microsoft 365, Zoho, or cPanel SMTP).
          </p>

          <div className="grid md:grid-cols-3 gap-5 mb-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                SMTP Host <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                className="admin-input text-sm"
                placeholder="e.g. smtp.gmail.com or mail.faithmodelschool.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase">
                  SMTP Port <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, smtpPort: 587, smtpSecure: false })}
                    className={`px-2 py-0.5 rounded cursor-pointer ${settings.smtpPort === 587 ? 'bg-blue-600 text-white font-bold' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    587 (TLS)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, smtpPort: 465, smtpSecure: true })}
                    className={`px-2 py-0.5 rounded cursor-pointer ${settings.smtpPort === 465 ? 'bg-blue-600 text-white font-bold' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    465 (SSL)
                  </button>
                </div>
              </div>
              <input
                type="number"
                value={settings.smtpPort}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 587;
                  setSettings({ 
                    ...settings, 
                    smtpPort: val,
                    smtpSecure: val === 465
                  });
                }}
                className="admin-input text-sm"
                placeholder="587 or 465"
              />
            </div>
          </div>

          <div className="mb-5 p-3.5 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3">
            <input
              type="checkbox"
              id="smtpSecure"
              checked={settings.smtpSecure}
              onChange={(e) => setSettings({ ...settings, smtpSecure: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="smtpSecure" className="text-xs text-gray-700 cursor-pointer select-none">
              <span className="font-semibold text-gray-900">Direct SSL / TLS Encryption</span>
              <span className="block text-[11px] text-gray-500 mt-0.5">
                Enable for <strong>Port 465</strong>. For <strong>Port 587</strong> (standard for Gmail, Google Workspace, Outlook, Zoho), keep unchecked (STARTTLS will be used automatically).
              </span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                SMTP Username / Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={settings.smtpUser}
                onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                className="admin-input text-sm"
                placeholder="e.g. admissions@faithmodelschool.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                SMTP Password / App Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={settings.smtpPass}
                  onChange={(e) => setSettings({ ...settings, smtpPass: e.target.value })}
                  className="admin-input text-sm pr-10"
                  placeholder="••••••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">For Gmail, generate an 16-character "App Password".</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
              From Email Address (Optional override)
            </label>
            <input
              type="email"
              value={settings.fromEmail}
              onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
              className="admin-input text-sm"
              placeholder="Leave blank to use SMTP Username"
            />
          </div>
        </div>

        {/* Test Connection Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-600" />
            Send Test Email & Verify Connection
          </h4>
          <p className="text-xs text-gray-500 mb-4">
            Verify that your SMTP credentials work properly and that emails arrive without delivery errors.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="admin-input text-sm flex-1 bg-white"
              placeholder={`Send test to: ${settings.recipientEmail || "your-email@example.com"}`}
            />
            <button
              onClick={handleTestEmail}
              disabled={testing}
              className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {testing ? "Testing Connection..." : "Send Test Email"}
            </button>
          </div>

          {testStatus && (
            <div
              className={`mt-4 p-4 rounded-xl flex items-start gap-3 text-xs ${
                testStatus.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {testStatus.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="font-medium">{testStatus.message}</div>
            </div>
          )}
        </div>

        {/* Save Bar */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="admin-btn-primary flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md font-semibold text-sm"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Email Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
