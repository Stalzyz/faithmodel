"use client";

import { useState } from "react";
import { saveNavSettings } from "@/actions/settings";
import { Save, Plus, Trash2 } from "lucide-react";

export default function NavigationEditor({ initialTopNav, initialFooterNav, initialHeaderConfig }: { initialTopNav: any, initialFooterNav: any, initialHeaderConfig?: any }) {
  const [topNav, setTopNav] = useState<any[]>(initialTopNav || []);
  const [footerNav, setFooterNav] = useState<any[]>(initialFooterNav || []);
  const [headerConfig, setHeaderConfig] = useState<any>(initialHeaderConfig || {
    affiliationText: "Affiliation No\n1931557",
    ctaLabel: "Admissions 2026",
    ctaHref: "/admissions"
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res = await saveNavSettings(topNav, footerNav, headerConfig);
    setSaving(false);
    if (res.success) {
      alert("Header & Footer settings saved successfully!");
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-32 space-y-12">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="font-poppins font-semibold text-gray-900 text-lg">Header & Footer Control Panel</h1>
          <p className="text-gray-500 text-sm">Configure navigation links, header CTA, affiliation badge, and footer columns.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Header & Footer"}
        </button>
      </div>

      {/* Header Options */}
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">Header Configuration</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Affiliation Badge / Text</label>
            <textarea 
              value={headerConfig.affiliationText} 
              onChange={e => setHeaderConfig({ ...headerConfig, affiliationText: e.target.value })}
              className="admin-input h-20" 
              placeholder="e.g. Affiliation No&#10;1931557"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Header CTA Button Text</label>
            <input 
              type="text" 
              value={headerConfig.ctaLabel} 
              onChange={e => setHeaderConfig({ ...headerConfig, ctaLabel: e.target.value })}
              className="admin-input" 
              placeholder="e.g. Admissions 2026"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Header CTA Button Link</label>
            <input 
              type="text" 
              value={headerConfig.ctaHref} 
              onChange={e => setHeaderConfig({ ...headerConfig, ctaHref: e.target.value })}
              className="admin-input" 
              placeholder="e.g. /admissions"
            />
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">Top Navigation Menus</h2>
        <div className="space-y-6">
          {topNav.map((category, catIdx) => (
            <div key={catIdx} className="border border-gray-200 rounded p-4 bg-gray-50">
              <div className="flex gap-4 items-center mb-4 border-b border-gray-200 pb-4">
                <input 
                  type="text" 
                  value={category.title} 
                  onChange={e => {
                    const newNav = [...topNav];
                    newNav[catIdx].title = e.target.value;
                    setTopNav(newNav);
                  }}
                  className="admin-input font-bold" 
                  placeholder="Category Name (e.g. About)"
                />
                <button onClick={() => setTopNav(topNav.filter((_, i) => i !== catIdx))} className="text-red-400 hover:text-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2 pl-4">
                {category.items?.map((item: any, itemIdx: number) => (
                  <div key={itemIdx} className="flex gap-2">
                    <input 
                      type="text" 
                      value={item.label} 
                      onChange={e => {
                        const newNav = [...topNav];
                        newNav[catIdx].items[itemIdx].label = e.target.value;
                        setTopNav(newNav);
                      }}
                      className="admin-input text-sm" 
                      placeholder="Label"
                    />
                    <input 
                      type="text" 
                      value={item.href} 
                      onChange={e => {
                        const newNav = [...topNav];
                        newNav[catIdx].items[itemIdx].href = e.target.value;
                        setTopNav(newNav);
                      }}
                      className="admin-input text-sm" 
                      placeholder="URL (e.g. /about)"
                    />
                    <button onClick={() => {
                        const newNav = [...topNav];
                        newNav[catIdx].items = newNav[catIdx].items.filter((_: any, i: number) => i !== itemIdx);
                        setTopNav(newNav);
                    }} className="text-red-400 px-2">✕</button>
                  </div>
                ))}
                <button onClick={() => {
                   const newNav = [...topNav];
                   newNav[catIdx].items.push({ label: "New Link", href: "/" });
                   setTopNav(newNav);
                }} className="text-xs font-semibold text-blue-600 mt-2">+ Add Link</button>
              </div>
            </div>
          ))}
          <button onClick={() => setTopNav([...topNav, { title: "New Category", items: [] }])} className="admin-btn-secondary w-full py-3 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Navigation Category
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">Footer Columns & Navigation</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {footerNav.map((col, colIdx) => (
            <div key={colIdx} className="border border-gray-200 rounded p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                <input 
                  type="text" 
                  value={col.title} 
                  onChange={e => {
                    const newNav = [...footerNav];
                    newNav[colIdx].title = e.target.value;
                    setFooterNav(newNav);
                  }}
                  className="admin-input font-bold" 
                  placeholder="Column Title"
                />
                <button onClick={() => setFooterNav(footerNav.filter((_, i) => i !== colIdx))} className="text-red-400 hover:text-red-600 pl-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {col.items?.map((item: any, itemIdx: number) => (
                  <div key={itemIdx} className="flex gap-2">
                    <input 
                      type="text" 
                      value={item.label} 
                      onChange={e => {
                        const newNav = [...footerNav];
                        newNav[colIdx].items[itemIdx].label = e.target.value;
                        setFooterNav(newNav);
                      }}
                      className="admin-input text-sm" 
                      placeholder="Label"
                    />
                    <input 
                      type="text" 
                      value={item.href} 
                      onChange={e => {
                        const newNav = [...footerNav];
                        newNav[colIdx].items[itemIdx].href = e.target.value;
                        setFooterNav(newNav);
                      }}
                      className="admin-input text-sm" 
                      placeholder="URL"
                    />
                    <button onClick={() => {
                        const newNav = [...footerNav];
                        newNav[colIdx].items = newNav[colIdx].items.filter((_: any, i: number) => i !== itemIdx);
                        setFooterNav(newNav);
                    }} className="text-red-400 px-2">✕</button>
                  </div>
                ))}
                <button onClick={() => {
                   const newNav = [...footerNav];
                   newNav[colIdx].items.push({ label: "New Link", href: "/" });
                   setFooterNav(newNav);
                }} className="text-xs font-semibold text-blue-600 mt-2">+ Add Link</button>
              </div>
            </div>
          ))}
          {footerNav.length < 4 && (
             <button onClick={() => setFooterNav([...footerNav, { title: "New Column", items: [] }])} className="admin-btn-secondary flex items-center justify-center gap-2 border-dashed h-full min-h-[200px]">
               <Plus className="w-4 h-4" /> Add Footer Column
             </button>
          )}
        </div>
      </div>
    </div>
  );
}
