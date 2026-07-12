"use client";

import { useState } from "react";
import { savePost } from "@/actions/posts";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

export default function PostForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [tag, setTag] = useState(initialData?.tag || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [published, setPublished] = useState(initialData?.isPublished || false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) return alert("Title, slug, and content are required.");
    
    setSaving(true);
    const res = await savePost({ 
      title, slug, content, excerpt, tag, coverImage, isPublished: published, 
      postId: initialData?.id 
    });
    setSaving(false);
    
    if (res.success) {
      router.push("/admin/posts");
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-4xl mx-auto pb-32">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-20 flex justify-between items-center mb-8 shadow-sm">
         <div className="flex items-center gap-4">
            <h1 className="font-poppins font-semibold text-gray-900 text-lg">Write Post</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
               <input 
                  type="checkbox" 
                  id="published" 
                  checked={published} 
                  onChange={e => setPublished(e.target.checked)}
                  className="rounded border-gray-300 text-[#1a1a2e] focus:ring-[#1a1a2e]"
               />
               <label htmlFor="published">Publish immediately</label>
            </div>
         </div>
         <button 
            type="submit"
            disabled={saving}
            className="admin-btn-primary flex items-center gap-2"
         >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Post"}
         </button>
      </div>

      <div className="space-y-6">
         <div className="admin-card">
            <div className="space-y-4">
               <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Title</label>
                  <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="admin-input" placeholder="Post Title" />
               </div>
               <div className="grid md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">URL Slug</label>
                     <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                           /news/
                        </span>
                        <input type="text" required value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="admin-input rounded-l-none" placeholder="url-slug" />
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Tag/Category</label>
                     <input type="text" value={tag} onChange={e => setTag(e.target.value)} className="admin-input" placeholder="e.g. Announcement, Sports, Academics" />
                  </div>
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Cover Image URL</label>
                  <input type="url" value={coverImage} onChange={e => setCoverImage(e.target.value)} className="admin-input" placeholder="https://..." />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Excerpt (Summary)</label>
                  <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} className="admin-input h-20" placeholder="A brief summary of the post..." />
               </div>
            </div>
         </div>

         <div className="admin-card">
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-4">Content (Markdown or HTML)</label>
            <textarea 
               required 
               value={content} 
               onChange={e => setContent(e.target.value)} 
               className="admin-input h-96 font-mono text-sm" 
               placeholder="Write your article content here..." 
            />
         </div>
      </div>
    </form>
  );
}
