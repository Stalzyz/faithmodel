"use client";

import { useState } from "react";
import { ArrowLeft, Trash2, UploadCloud, Loader2 } from "lucide-react";
import Link from "next/link";
import { addMediaToAlbum, deleteMedia } from "@/actions/media";
import { useRouter } from "next/navigation";

export default function AlbumManager({ 
  category, 
  initialMedia 
}: { 
  category: string, 
  initialMedia: any[] 
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) urls.push(data.url);
      } catch (err) {
        console.error("Failed to upload file", file.name);
      }
    }

    if (urls.length > 0) {
      await addMediaToAlbum(category, urls);
      router.refresh();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteMedia(id, category);
      router.refresh();
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/gallery" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category}</h1>
          <p className="text-sm text-gray-500">{initialMedia.length} Photos in Album</p>
        </div>
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden mb-8">
        <input 
          type="file" 
          multiple 
          accept="image/*"
          onChange={handleUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={uploading}
        />
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500">
          {uploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <UploadCloud className="w-8 h-8" />}
        </div>
        <h3 className="font-semibold text-gray-900">{uploading ? "Uploading images..." : "Click or Drag to Upload"}</h3>
        <p className="text-sm text-gray-500">You can select multiple images to bulk upload.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {initialMedia.map(item => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-square">
            <img src={item.url} alt={item.altText || category} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button onClick={() => handleDelete(item.id)} className="p-2 bg-white text-red-500 rounded-full hover:bg-red-50">
                 <Trash2 className="w-5 h-5" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
