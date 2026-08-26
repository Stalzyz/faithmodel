"use client";

import { useState } from "react";
import { saveMedia } from "@/actions/media";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function MediaForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [category, setCategory] = useState("GALLERY");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return alert("Image URL is required.");
    
    setSaving(true);
    const res = await saveMedia({ url, altText, category });
    setSaving(false);
    
    if (res.success) {
      router.push("/admin/media");
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-4xl mx-auto pb-32">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-20 flex justify-between items-center mb-8 shadow-sm">
         <h1 className="font-poppins font-semibold text-gray-900 text-lg">Add Media Asset</h1>
         <button 
            type="submit"
            disabled={saving}
            className="admin-btn-primary flex items-center gap-2"
         >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Add to Gallery"}
         </button>
      </div>

      <div className="admin-card space-y-4">
         <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Image</label>
            <ImageUploader value={url} onChange={setUrl} />
            <p className="text-xs text-gray-400 mt-1">Paste a valid image URL or click the upload icon to select an image from your device.</p>
         </div>
         <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Alt Text (Optional)</label>
            <input type="text" value={altText} onChange={e => setAltText(e.target.value)} className="admin-input" placeholder="Describe the image for accessibility" />
         </div>
         <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="admin-input">
               <option value="GALLERY">General Gallery</option>
               <option value="CAMPUS">Campus & Facilities</option>
               <option value="SPORTS">Sports & Athletics</option>
               <option value="EVENTS">Events & Activities</option>
            </select>
         </div>

         {url && (
            <div className="mt-8 border border-gray-200 p-4 rounded bg-gray-50">
               <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Preview</label>
               <div className="aspect-video w-full max-w-md overflow-hidden rounded bg-gray-200">
                  <img src={url} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%23cccccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23333333">Invalid Image URL</text></svg>' }} />
               </div>
            </div>
         )}
      </div>
    </form>
  );
}
