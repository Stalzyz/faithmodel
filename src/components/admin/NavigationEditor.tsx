"use client";

import { useState } from "react";
import { saveNavSettings } from "@/actions/settings";
import { Save, Plus, Trash2 } from "lucide-react";

export default function NavigationEditor({ initialTopNav, initialFooterNav }: { initialTopNav: any, initialFooterNav: any }) {
  const [topNav, setTopNav] = useState<any[]>(initialTopNav || []);
  const [footerNav, setFooterNav] = useState<any[]>(initialFooterNav || []);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res = await saveNavSettings(topNav, footerNav);
    setSaving(false);
    if (res.success) {
      alert("Navigation settings saved successfully!");
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-32 space-y-12">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="font-poppins font-semibold text-gray-900 text-lg">Menu Builder</h1>
          <p className="text-gray-500 text-sm">Configure the top and footer navigation links.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Menus"}
        </button>
      </div>

      <div className="admin-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">Top Navigation</h2>
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
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">Footer Navigation</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {footerNav.map((col, colIdx) => (
            <div key={colIdx} className="border border-gray-200 rounded p-4 bg-gray-50">
              <input 
                type="text" 
                value={col.title} 
                onChange={e => {
                  const newNav = [...footerNav];
                  newNav[colIdx].title = e.target.value;
                  setFooterNav(newNav);
                }}
                className="admin-input font-bold mb-4" 
                placeholder="Column Title"
              />
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
          {footerNav.length < 2 && (
             <button onClick={() => setFooterNav([...footerNav, { title: "New Column", items: [] }])} className="admin-btn-secondary flex items-center justify-center gap-2 border-dashed h-full min-h-[200px]">
               <Plus className="w-4 h-4" /> Add Footer Column
             </button>
          )}
        </div>
      </div>
    </div>
  );
}
