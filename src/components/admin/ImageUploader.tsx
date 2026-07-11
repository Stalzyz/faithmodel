"use client";
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

export default function ImageUploader({ value, onChange }: { value: string, onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center flex-1">
      <input 
        type="text" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="admin-input flex-1" 
        placeholder="Image URL or click upload ➔" 
      />
      <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-600 px-3 py-2 rounded shadow-sm flex items-center justify-center transition-colors mb-2">
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
      </label>
    </div>
  );
}
