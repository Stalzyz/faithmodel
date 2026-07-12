"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown, Save } from "lucide-react";
import ImageUploader from "./ImageUploader";

export type BlockType = "HERO" | "TEXT_BLOCK" | "IMAGE_GRID" | "CTA_SECTION" | "PHILOSOPHY_SPLIT" | "CURRICULUM_OVERVIEW" | "SIGNATURE_PROGRAMS" | "ASSESSMENT_SYSTEM" | "TIMELINE_BLOCK" | "ICON_GRID_BLOCK" | "STEPS_BLOCK" | "TABLE_BLOCK" | "PROFILE_GRID" | "CONTACT_BLOCK" | "ACCORDION_BLOCK" | "POSTS_BLOCK" | "GALLERY_BLOCK" | "SKETCHBOOK_HERO" | "MOODBOARD_HERO" | "GOLDEN_HERO";

export interface PageBlock {
  id: string;
  type: BlockType;
  data: any;
}

interface PageBuilderProps {
  initialTitle?: string;
  initialSlug?: string;
  initialBlocks?: PageBlock[];
  initialSeo?: { title?: string; description?: string; image?: string };
  isPublished?: boolean;
  onSave: (data: { title: string; slug: string; blocks: PageBlock[]; seo: any; isPublished: boolean }) => Promise<void>;
}

const DEFAULT_BLOCKS: Record<BlockType, any> = {
  HERO: { headline: "New Page Headline", subheadline: "Add a subtitle here", bgImage: "" },
  TEXT_BLOCK: { content: "<p>Write your content here...</p>" },
  IMAGE_GRID: { images: ["", "", ""] },
  CTA_SECTION: { title: "Ready to join?", buttonText: "Apply Now", buttonLink: "/admissions" },
  PHILOSOPHY_SPLIT: { annotation: "Our Philosophy", title: "Beyond the Textbook", subtitle: "We follow the curriculum.", contentHtml: "<p>Core principles here</p>", imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80" },
  CURRICULUM_OVERVIEW: { annotation: "Grade-Wise", title: "Curriculum Overview", levels: [] },
  SIGNATURE_PROGRAMS: { annotation: "Beyond the Syllabus", title: "Signature Academic Programs", programs: [] },
  ASSESSMENT_SYSTEM: { annotation: "Evaluation", title: "Assessment System", subtitle: "Our assessment philosophy", assessments: [] },
  TIMELINE_BLOCK: { annotation: "Our Story", title: "Milestones", subtitle: "The journey so far.", events: [] },
  ICON_GRID_BLOCK: { annotation: "Core Values", title: "Our Principles", subtitle: "", items: [] },
  STEPS_BLOCK: { annotation: "Process", title: "How it works", subtitle: "Follow these steps", steps: [] },
  TABLE_BLOCK: { annotation: "Details", title: "Information Table", subtitle: "", headers: ["Col 1", "Col 2"], rows: [["Data 1", "Data 2"]] },
  PROFILE_GRID: { annotation: "Leadership", title: "Meet the Team", subtitle: "", profiles: [] },
  CONTACT_BLOCK: { annotation: "Reach Out", title: "Get in Touch", subtitle: "", details: [], mapIframe: "" },
  ACCORDION_BLOCK: { annotation: "FAQs", title: "Frequently Asked Questions", subtitle: "", items: [] },
  POSTS_BLOCK: { annotation: "Latest", title: "News & Announcements", subtitle: "", limit: 6 },
  SKETCHBOOK_HERO: { type: "SKETCHBOOK_HERO", data: {} },
  GALLERY_BLOCK: { annotation: "Gallery", title: "Our Media", subtitle: "Glimpses of life on campus" },
  MOODBOARD_HERO: { headline: "Empowering the Next Generation", subheadline: "A legacy of excellence since 1989", primaryCtaLabel: "Apply Now", primaryCtaHref: "/admissions", images: ["", "", "", ""] },
  GOLDEN_HERO: { headline: "Faith Model School", subheadline: "Empowering minds, shaping futures since 1989.", quote: "Education is the most powerful weapon which you can use to change the world.", primaryCtaLabel: "Admissions", primaryCtaHref: "/admissions", mediaUrl: "", secondaryImageUrl: "" }
};

export default function PageBuilder({
  initialTitle = "",
  initialSlug = "",
  initialBlocks = [],
  initialSeo = {},
  isPublished = false,
  onSave
}: PageBuilderProps) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [published, setPublished] = useState(isPublished);
  const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks);
  const [seo, setSeo] = useState<{title?: string; description?: string; image?: string}>(initialSeo);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"blocks" | "seo">("blocks");

  const addBlock = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: { ...DEFAULT_BLOCKS[type] }
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const updateBlockData = (id: string, newData: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, data: { ...b.data, ...newData } } : b));
  };

  const handleSave = async () => {
    if (!title || !slug) return alert("Title and Slug are required.");
    setSaving(true);
    await onSave({ title, slug, blocks, seo, isPublished: published });
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-32">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-20 flex justify-between items-center mb-8 shadow-sm">
         <div className="flex items-center gap-4">
            <h1 className="font-poppins font-semibold text-gray-900 text-lg">Page Builder</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
               <input 
                  type="checkbox" 
                  id="published" 
                  checked={published} 
                  onChange={e => setPublished(e.target.checked)}
                  className="rounded border-gray-300 text-[#1a1a2e] focus:ring-[#1a1a2e]"
               />
               <label htmlFor="published">Publish Page</label>
            </div>
         </div>
         <button 
            onClick={handleSave} 
            disabled={saving}
            className="admin-btn-primary flex items-center gap-2"
         >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Page"}
         </button>
      </div>

      {/* Page Meta */}
      <div className="admin-card mb-8">
         <div className="grid md:grid-cols-2 gap-6">
            <div>
               <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Page Title</label>
               <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="admin-input" 
                  placeholder="e.g. About Our Campus"
               />
            </div>
            <div>
               <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">URL Slug</label>
               <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                     /
                  </span>
                  <input 
                     type="text" 
                     value={slug}
                     onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                     className="admin-input rounded-l-none" 
                     placeholder="e.g. about-campus"
                  />
               </div>
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
         <button onClick={() => setActiveTab("blocks")} className={`py-3 px-6 text-sm font-semibold border-b-2 transition-colors ${activeTab === "blocks" ? "border-[#1a1a2e] text-[#1a1a2e]" : "border-transparent text-gray-500 hover:text-gray-900"}`}>
            Page Blocks
         </button>
         <button onClick={() => setActiveTab("seo")} className={`py-3 px-6 text-sm font-semibold border-b-2 transition-colors ${activeTab === "seo" ? "border-[#1a1a2e] text-[#1a1a2e]" : "border-transparent text-gray-500 hover:text-gray-900"}`}>
            SEO Settings
         </button>
      </div>

      {activeTab === "seo" ? (
         <div className="admin-card space-y-6">
            <div>
               <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Meta Title</label>
               <input type="text" value={seo.title || ""} onChange={e => setSeo({ ...seo, title: e.target.value })} className="admin-input" placeholder="Custom SEO Title (defaults to Page Title)" />
               <p className="text-xs text-gray-500 mt-1">Leave blank to use the main Page Title.</p>
            </div>
            <div>
               <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Meta Description</label>
               <textarea value={seo.description || ""} onChange={e => setSeo({ ...seo, description: e.target.value })} className="admin-input h-24" placeholder="Brief summary of the page for search engines..." />
            </div>
            <div>
               <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Social Share Image (OpenGraph)</label>
               <ImageUploader value={seo.image || ""} onChange={url => setSeo({ ...seo, image: url })} />
               <p className="text-xs text-gray-500 mt-1">Recommended size: 1200 x 630 pixels.</p>
            </div>
         </div>
      ) : (
      <>
      {/* Blocks Area */}
      <div className="space-y-6">
         {blocks.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-500">
               <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-gray-400" />
               </div>
               <p className="font-medium text-gray-900 mb-1">No blocks yet</p>
               <p className="text-sm">Start building your page by adding a block below.</p>
            </div>
         ) : (
            blocks.map((block, index) => (
               <div key={block.id} className="admin-card relative group border-l-4 border-l-[#FB7F05]">
                  {/* Block Controls */}
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => moveBlock(index, 'up')} className="p-1.5 bg-white border border-gray-200 rounded shadow-sm text-gray-500 hover:text-blue-600"><ChevronUp className="w-4 h-4" /></button>
                     <button className="p-1.5 bg-white border border-gray-200 rounded shadow-sm text-gray-400 cursor-grab"><GripVertical className="w-4 h-4" /></button>
                     <button onClick={() => moveBlock(index, 'down')} className="p-1.5 bg-white border border-gray-200 rounded shadow-sm text-gray-500 hover:text-blue-600"><ChevronDown className="w-4 h-4" /></button>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                     <span className="font-poppins text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded">
                        {block.type} BLOCK
                     </span>
                     <button onClick={() => removeBlock(block.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>

                  {/* Block Editor UI based on type */}
                  <div className="space-y-4">
                     {block.type === 'HERO' && (
                        <>
                           <input type="text" value={block.data.headline} onChange={e => updateBlockData(block.id, { headline: e.target.value })} className="admin-input font-semibold text-lg" placeholder="Headline" />
                           <input type="text" value={block.data.subheadline} onChange={e => updateBlockData(block.id, { subheadline: e.target.value })} className="admin-input" placeholder="Subheadline" />
                        </>
                     )}
                     {block.type === 'TEXT_BLOCK' && (
                        <textarea value={block.data.content} onChange={e => updateBlockData(block.id, { content: e.target.value })} className="admin-input h-32 font-mono text-sm" placeholder="<p>HTML Content</p>" />
                     )}
                     {block.type === 'IMAGE_GRID' && (
                        <div className="space-y-3">
                           {block.data.images?.map((img: string, i: number) => (
                              <div key={i} className="flex gap-2">
                                 <ImageUploader 
                                    value={img} 
                                    onChange={(url) => {
                                       const newImages = [...block.data.images];
                                       newImages[i] = url;
                                       updateBlockData(block.id, { images: newImages });
                                    }} 
                                 />
                                 <button 
                                    onClick={() => {
                                       const newImages = block.data.images.filter((_: string, idx: number) => idx !== i);
                                       updateBlockData(block.id, { images: newImages });
                                    }}
                                    className="text-red-400 hover:text-red-600 px-2"
                                 >
                                    ✕
                                 </button>
                              </div>
                           ))}
                           <button 
                              onClick={() => updateBlockData(block.id, { images: [...(block.data.images || []), ""] })}
                              className="text-xs font-semibold text-[#FB7F05] hover:text-[#c17b5a] transition-colors"
                           >
                              + Add another image
                           </button>
                        </div>
                     )}
                     {block.type === 'CTA_SECTION' && (
                        <div className="grid grid-cols-2 gap-4">
                           <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input col-span-2" placeholder="CTA Title" />
                           <input type="text" value={block.data.buttonText} onChange={e => updateBlockData(block.id, { buttonText: e.target.value })} className="admin-input" placeholder="Button Text" />
                           <input type="text" value={block.data.buttonLink} onChange={e => updateBlockData(block.id, { buttonLink: e.target.value })} className="admin-input" placeholder="Button Link URL" />
                        </div>
                     )}
                     {block.type === 'PHILOSOPHY_SPLIT' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation (e.g. Our Philosophy)" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Main Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <textarea value={block.data.contentHtml} onChange={e => updateBlockData(block.id, { contentHtml: e.target.value })} className="admin-input h-32 font-mono text-sm" placeholder="<p>HTML Content</p>" />
                           <ImageUploader value={block.data.imageUrl} onChange={url => updateBlockData(block.id, { imageUrl: url })} />
                        </div>
                     )}
                     {block.type === 'CURRICULUM_OVERVIEW' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                           </div>
                           <div className="space-y-2">
                              {block.data.levels?.map((lvl: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-4 rounded bg-gray-50 space-y-3">
                                    <div className="flex gap-2">
                                       <input type="text" value={lvl.level} onChange={e => { const newL = [...block.data.levels]; newL[i].level = e.target.value; updateBlockData(block.id, { levels: newL }); }} className="admin-input flex-1" placeholder="Level (e.g. Primary)" />
                                       <input type="text" value={lvl.grades} onChange={e => { const newL = [...block.data.levels]; newL[i].grades = e.target.value; updateBlockData(block.id, { levels: newL }); }} className="admin-input flex-1" placeholder="Grades (e.g. 1-5)" />
                                       <button onClick={() => updateBlockData(block.id, { levels: block.data.levels.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                    </div>
                                    <ImageUploader value={lvl.img} onChange={url => { const newL = [...block.data.levels]; newL[i].img = url; updateBlockData(block.id, { levels: newL }); }} />
                                    <input type="text" value={lvl.subjects?.join(", ")} onChange={e => { const newL = [...block.data.levels]; newL[i].subjects = e.target.value.split(",").map(s => s.trim()); updateBlockData(block.id, { levels: newL }); }} className="admin-input text-xs" placeholder="Subjects (comma separated)" />
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { levels: [...(block.data.levels || []), { level: "New Level", grades: "Grades X-Y", subjects: [], img: "" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Level</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'SIGNATURE_PROGRAMS' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                           </div>
                           <div className="grid grid-cols-1 gap-2">
                              {block.data.programs?.map((p: any, i: number) => (
                                 <div key={i} className="flex gap-2 items-start border border-gray-200 p-2 rounded">
                                    <div className="flex-1 space-y-2">
                                       <div className="flex gap-2">
                                          <input type="text" value={p.title} onChange={e => { const newP = [...block.data.programs]; newP[i].title = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs" placeholder="Program Title" />
                                          <input type="text" value={p.tag} onChange={e => { const newP = [...block.data.programs]; newP[i].tag = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs w-1/3" placeholder="Tag" />
                                       </div>
                                       <textarea value={p.desc} onChange={e => { const newP = [...block.data.programs]; newP[i].desc = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs h-16" placeholder="Description" />
                                    </div>
                                    <button onClick={() => updateBlockData(block.id, { programs: block.data.programs.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 p-2 mt-1">✕</button>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { programs: [...(block.data.programs || []), { title: "New Program", tag: "Grades X-Y", desc: "Desc" }] })} className="text-xs font-semibold text-[#FB7F05] text-left mt-2">+ Add Program</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'ASSESSMENT_SYSTEM' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.assessments?.map((a: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-3 rounded space-y-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={a.label} onChange={e => { const newA = [...block.data.assessments]; newA[i].label = e.target.value; updateBlockData(block.id, { assessments: newA }); }} className="admin-input text-xs flex-1" placeholder="Label" />
                                       <input type="text" value={a.pct} onChange={e => { const newA = [...block.data.assessments]; newA[i].pct = e.target.value; updateBlockData(block.id, { assessments: newA }); }} className="admin-input text-xs w-16" placeholder="%" />
                                       <button onClick={() => updateBlockData(block.id, { assessments: block.data.assessments.filter((_: any, idx: number) => idx !== i) })} className="text-red-400">✕</button>
                                    </div>
                                    <textarea value={a.desc} onChange={e => { const newA = [...block.data.assessments]; newA[i].desc = e.target.value; updateBlockData(block.id, { assessments: newA }); }} className="admin-input text-xs h-12" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { assessments: [...(block.data.assessments || []), { label: "New Assessment", pct: "20%", desc: "Desc" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Assessment</button>
                        </div>
                     )}
                     {block.type === 'TIMELINE_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-2">
                              {block.data.events?.map((ev: any, i: number) => (
                                 <div key={i} className="flex gap-2 items-start border border-gray-200 p-2 rounded">
                                    <input type="text" value={ev.year} onChange={e => { const newE = [...block.data.events]; newE[i].year = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input w-24 text-xs" placeholder="Year" />
                                    <textarea value={ev.event} onChange={e => { const newE = [...block.data.events]; newE[i].event = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input flex-1 text-xs h-16" placeholder="Event Description" />
                                    <button onClick={() => updateBlockData(block.id, { events: block.data.events.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 p-2">✕</button>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { events: [...(block.data.events || []), { year: "2026", event: "New Event" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Event</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'ICON_GRID_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.items?.map((item: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-3 rounded space-y-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={item.icon} onChange={e => { const newI = [...block.data.items]; newI[i].icon = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-xs w-16" placeholder="Icon" />
                                       <input type="text" value={item.title} onChange={e => { const newI = [...block.data.items]; newI[i].title = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-xs flex-1" placeholder="Title" />
                                       <button onClick={() => updateBlockData(block.id, { items: block.data.items.filter((_: any, idx: number) => idx !== i) })} className="text-red-400">✕</button>
                                    </div>
                                    <textarea value={item.desc} onChange={e => { const newI = [...block.data.items]; newI[i].desc = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-xs h-12" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { items: [...(block.data.items || []), { icon: "★", title: "New Item", desc: "Description" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Item</button>
                        </div>
                     )}
                     {block.type === 'STEPS_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.steps?.map((step: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-3 rounded space-y-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={step.num} onChange={e => { const newS = [...block.data.steps]; newS[i].num = e.target.value; updateBlockData(block.id, { steps: newS }); }} className="admin-input text-xs w-16" placeholder="Num" />
                                       <input type="text" value={step.title} onChange={e => { const newS = [...block.data.steps]; newS[i].title = e.target.value; updateBlockData(block.id, { steps: newS }); }} className="admin-input text-xs flex-1" placeholder="Title" />
                                       <button onClick={() => updateBlockData(block.id, { steps: block.data.steps.filter((_: any, idx: number) => idx !== i) })} className="text-red-400">✕</button>
                                    </div>
                                    <textarea value={step.desc} onChange={e => { const newS = [...block.data.steps]; newS[i].desc = e.target.value; updateBlockData(block.id, { steps: newS }); }} className="admin-input text-xs h-16" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { steps: [...(block.data.steps || []), { num: "01", title: "New Step", desc: "Description" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Step</button>
                        </div>
                     )}
                     {block.type === 'TABLE_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-2 border border-gray-200 p-4 rounded bg-gray-50">
                              <p className="text-xs font-semibold text-gray-700">Columns (comma separated)</p>
                              <input type="text" value={block.data.headers?.join(", ")} onChange={e => updateBlockData(block.id, { headers: e.target.value.split(",").map(s => s.trim()) })} className="admin-input mb-4" />
                              
                              <p className="text-xs font-semibold text-gray-700 mt-4">Rows</p>
                              {block.data.rows?.map((row: string[], i: number) => (
                                 <div key={i} className="flex gap-2">
                                    {row.map((cell: string, j: number) => (
                                       <input key={j} type="text" value={cell} onChange={e => { const newR = [...block.data.rows]; newR[i][j] = e.target.value; updateBlockData(block.id, { rows: newR }); }} className="admin-input text-xs flex-1" />
                                    ))}
                                    <button onClick={() => updateBlockData(block.id, { rows: block.data.rows.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { rows: [...(block.data.rows || []), new Array(block.data.headers?.length || 2).fill("New Data")] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Row</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'PROFILE_GRID' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.profiles?.map((prof: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-3 rounded space-y-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={prof.name} onChange={e => { const newP = [...block.data.profiles]; newP[i].name = e.target.value; updateBlockData(block.id, { profiles: newP }); }} className="admin-input text-xs flex-1" placeholder="Name" />
                                       <input type="text" value={prof.role} onChange={e => { const newP = [...block.data.profiles]; newP[i].role = e.target.value; updateBlockData(block.id, { profiles: newP }); }} className="admin-input text-xs flex-1" placeholder="Role" />
                                       <button onClick={() => updateBlockData(block.id, { profiles: block.data.profiles.filter((_: any, idx: number) => idx !== i) })} className="text-red-400">✕</button>
                                    </div>
                                    <ImageUploader value={prof.image} onChange={url => { const newP = [...block.data.profiles]; newP[i].image = url; updateBlockData(block.id, { profiles: newP }); }} />
                                    <textarea value={prof.desc} onChange={e => { const newP = [...block.data.profiles]; newP[i].desc = e.target.value; updateBlockData(block.id, { profiles: newP }); }} className="admin-input text-xs h-12" placeholder="Bio/Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { profiles: [...(block.data.profiles || []), { name: "New Person", role: "Role", image: "", desc: "Bio" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Profile</button>
                        </div>
                     )}
                     {block.type === 'CONTACT_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-2 border border-gray-200 p-4 rounded bg-gray-50">
                              <p className="text-xs font-semibold text-gray-700">Contact Details</p>
                              {block.data.details?.map((det: any, i: number) => (
                                 <div key={i} className="flex gap-2">
                                    <input type="text" value={det.label} onChange={e => { const newD = [...block.data.details]; newD[i].label = e.target.value; updateBlockData(block.id, { details: newD }); }} className="admin-input text-xs w-1/3" placeholder="Label (e.g. Phone)" />
                                    <input type="text" value={det.value} onChange={e => { const newD = [...block.data.details]; newD[i].value = e.target.value; updateBlockData(block.id, { details: newD }); }} className="admin-input text-xs flex-1" placeholder="Value" />
                                    <button onClick={() => updateBlockData(block.id, { details: block.data.details.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { details: [...(block.data.details || []), { label: "New Detail", value: "Information" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Detail</button>
                           </div>
                           <textarea value={block.data.mapIframe} onChange={e => updateBlockData(block.id, { mapIframe: e.target.value })} className="admin-input font-mono text-xs h-24" placeholder='<iframe src="https://maps.google.com/..." />' />
                        </div>
                     )}
                     {block.type === 'ACCORDION_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-3">
                              {block.data.items?.map((item: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-3 rounded bg-white">
                                    <div className="flex justify-between mb-2">
                                       <input type="text" value={item.question} onChange={e => { const newI = [...block.data.items]; newI[i].question = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-sm font-semibold flex-1" placeholder="Question / Heading" />
                                       <button onClick={() => updateBlockData(block.id, { items: block.data.items.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2 ml-2">✕</button>
                                    </div>
                                    <textarea value={item.answer} onChange={e => { const newI = [...block.data.items]; newI[i].answer = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-sm h-24" placeholder="Answer / Content" />
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { items: [...(block.data.items || []), { question: "New Question", answer: "Answer text" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Item</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'POSTS_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation (e.g. Latest)" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="flex gap-4 items-center border border-gray-200 p-4 rounded bg-gray-50">
                              <label className="text-xs font-semibold text-gray-700 uppercase">Number of posts to show:</label>
                              <input type="number" value={block.data.limit} onChange={e => updateBlockData(block.id, { limit: parseInt(e.target.value) || 6 })} className="admin-input w-24" />
                           </div>
                        </div>
                     )}
                     {block.type === 'GALLERY_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <p className="text-xs text-gray-500 bg-gray-50 p-4 rounded border border-gray-200">
                             This block will automatically fetch and display all albums created in the Gallery Manager.
                           </p>
                        </div>
                     )}
                     {block.type === 'MOODBOARD_HERO' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.headline} onChange={e => updateBlockData(block.id, { headline: e.target.value })} className="admin-input" placeholder="Main Headline" />
                              <input type="text" value={block.data.subheadline} onChange={e => updateBlockData(block.id, { subheadline: e.target.value })} className="admin-input" placeholder="Subheadline" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.primaryCtaLabel} onChange={e => updateBlockData(block.id, { primaryCtaLabel: e.target.value })} className="admin-input" placeholder="CTA Button Label" />
                              <input type="text" value={block.data.primaryCtaHref} onChange={e => updateBlockData(block.id, { primaryCtaHref: e.target.value })} className="admin-input" placeholder="CTA Button Link" />
                           </div>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                             {[0, 1, 2, 3].map(index => (
                               <div key={index}>
                                 <label className="block text-xs font-semibold text-gray-600 mb-2">Image {index + 1}</label>
                                 <ImageUploader 
                                   value={block.data.images?.[index] || ""} 
                                   onChange={url => {
                                     const newImages = [...(block.data.images || ["", "", "", ""])];
                                     newImages[index] = url;
                                     updateBlockData(block.id, { images: newImages });
                                   }} 
                                 />
                               </div>
                             ))}
                           </div>
                        </div>
                     )}
                     {block.type === 'GOLDEN_HERO' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.headline} onChange={e => updateBlockData(block.id, { headline: e.target.value })} className="admin-input" placeholder="Main Headline" />
                              <input type="text" value={block.data.subheadline} onChange={e => updateBlockData(block.id, { subheadline: e.target.value })} className="admin-input" placeholder="Subheadline" />
                           </div>
                           <textarea value={block.data.quote} onChange={e => updateBlockData(block.id, { quote: e.target.value })} className="admin-input h-20" placeholder="A powerful quote or statement..." />
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.primaryCtaLabel} onChange={e => updateBlockData(block.id, { primaryCtaLabel: e.target.value })} className="admin-input" placeholder="CTA Button Label" />
                              <input type="text" value={block.data.primaryCtaHref} onChange={e => updateBlockData(block.id, { primaryCtaHref: e.target.value })} className="admin-input" placeholder="CTA Button Link" />
                           </div>
                           <div className="grid grid-cols-2 gap-4 mt-4">
                             <div>
                               <label className="block text-xs font-semibold text-gray-600 mb-2">Main Image/Video (61.8%)</label>
                               <ImageUploader 
                                 value={block.data.mediaUrl || ""} 
                                 onChange={url => updateBlockData(block.id, { mediaUrl: url })} 
                               />
                             </div>
                             <div>
                               <label className="block text-xs font-semibold text-gray-600 mb-2">Secondary Image (38.2%)</label>
                               <ImageUploader 
                                 value={block.data.secondaryImageUrl || ""} 
                                 onChange={url => updateBlockData(block.id, { secondaryImageUrl: url })} 
                               />
                             </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            ))
         )}
      </div>

      {/* Add Block Menu */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
         <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider text-center">Add a new block</h3>
         <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(DEFAULT_BLOCKS) as BlockType[]).map(type => (
               <button 
                  key={type}
                  onClick={() => addBlock(type)}
                  className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-[#1a1a2e] hover:bg-gray-50 transition-colors"
               >
                  + {type.replace('_', ' ')}
               </button>
            ))}
         </div>
      </div>
      </>
      )}
    </div>
  );
}
