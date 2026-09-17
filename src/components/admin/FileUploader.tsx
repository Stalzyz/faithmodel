"use client";
import { useState } from "react";
import { Upload, Loader2, FileText } from "lucide-react";

export default function FileUploader({
  value,
  onChange,
  accept = "*",
  placeholder = "File URL or click upload ➔"
}: {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  placeholder?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(res.status === 413 ? "File too large (max 50MB)" : `Upload failed (Status ${res.status})`);
      }
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center flex-1">
      <div className="relative flex-1">
        <input 
          type="text" 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          className="admin-input w-full pr-8" 
          placeholder={placeholder} 
        />
        {value && value.endsWith('.pdf') && (
          <FileText className="w-4 h-4 text-red-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}
      </div>
      <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-600 px-3 py-2 rounded shadow-xs flex items-center justify-center transition-colors">
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        <input type="file" accept={accept} className="hidden" onChange={handleFileChange} disabled={uploading} />
      </label>
    </div>
  );
}
