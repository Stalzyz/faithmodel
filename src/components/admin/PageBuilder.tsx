"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown, Save, FileText, Search, Sparkles, LayoutGrid, Users, Quote as QuoteIcon } from "lucide-react";
import ImageUploader from "./ImageUploader";
import FileUploader from "./FileUploader";

export type BlockType = "HERO" | "TEXT_BLOCK" | "IMAGE_GRID" | "CTA_SECTION" | "PHILOSOPHY_SPLIT" | "CURRICULUM_OVERVIEW" | "SIGNATURE_PROGRAMS" | "ASSESSMENT_SYSTEM" | "TIMELINE_BLOCK" | "ICON_GRID_BLOCK" | "STEPS_BLOCK" | "TABLE_BLOCK" | "PROFILE_GRID" | "CONTACT_BLOCK" | "ACCORDION_BLOCK" | "POSTS_BLOCK" | "GALLERY_BLOCK" | "SKETCHBOOK_HERO" | "MOODBOARD_HERO" | "GOLDEN_HERO" | "WELCOME_BLOCK" | "STATS_BLOCK" | "WHY_CHOOSE_US_BLOCK" | "PHILOSOPHY_SECTION_BLOCK" | "ACADEMIC_EXCELLENCE_BLOCK" | "STUDENT_JOURNEY_BLOCK" | "CAMPUS_EXPERIENCE_BLOCK" | "FACILITIES_OVERVIEW_BLOCK" | "FEATURED_PROGRAMS_BLOCK" | "ACHIEVEMENTS_TICKER_BLOCK" | "UPCOMING_EVENTS_BLOCK" | "TESTIMONIALS_BLOCK" | "CUSTOM_HTML_BLOCK" | "HOMEPAGE_HERO_BLOCK" | "FAQ_BLOCK" | "VIDEO_BLOCK" | "MOSAIC_GALLERY_BLOCK" | "ADMISSIONS_SPOTLIGHT_BLOCK" | "SHOWREEL_HERO_BLOCK" | "INSTITUTIONAL_QUOTES_BLOCK" | "FOUNDER_CHAIRMAN_BLOCK";

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
  GOLDEN_HERO: { headline: "Faith Model School", subheadline: "Empowering minds, shaping futures since 1989.", quote: "Education is the most powerful weapon which you can use to change the world.", primaryCtaLabel: "Admissions", primaryCtaHref: "/admissions", mediaUrl: "", secondaryImageUrl: "" },
  WELCOME_BLOCK: { logoText: "FM", title: "Welcome to Faith Model", quote: "At Faith Model School, we believe that education is not merely the transmission of knowledge, but the ignition of curiosity. Every child who walks through our gate carries within them the seeds of something extraordinary.", author: "Amina M., M.A., B.Ed.", role: "Principal, Faith Model School" },
  STATS_BLOCK: { annotation: "School at a Glance", title: "By the Numbers", stats: [{ num: "35+", label: "Years of Excellence", note: "Est. 1989" }] },
  WHY_CHOOSE_US_BLOCK: { annotation: "Why Faith Model?", title: "Our Educational Promise", subtitle: "We go beyond traditional schooling...", pillars: [{ icon: "Star", title: "Academic Excellence", desc: "Rigorous curriculum." }] },
  PHILOSOPHY_SECTION_BLOCK: { annotation: "Our Philosophy", title: "Where Curiosity Meets Character", subtitle: "Faith Model School follows the belief...", items: ["Inquiry-Based Learning"], imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80", imageCaption: "igniting curiosity →" },
  ACADEMIC_EXCELLENCE_BLOCK: { annotation: "Academics", title: "A Journey of Learning", subtitle: "From first steps to board exams...", programs: [{ title: "Primary", age: "Ages 5-10", desc: "Core basics", href: "/primary" }] },
  STUDENT_JOURNEY_BLOCK: { annotation: "The Journey", title: "Your Child's Story at Faith Model", stages: [{ year: "Age 3", label: "Pre-KG", icon: "BookOpen" }] },
  CAMPUS_EXPERIENCE_BLOCK: { annotation: "Campus Life", title: "A World of Possibilities", subtitle: "Our 15-acre campus...", image1: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80", image2: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80", features: ["Smart Classrooms"], ctaText: "Explore the Campus →", ctaLink: "/campus" },
  FACILITIES_OVERVIEW_BLOCK: { annotation: "Infrastructure", title: "World-Class Facilities", subtitle: "Every space is designed...", facilities: [{ icon: "Microscope", label: "Science Labs", sub: "Physics · Chemistry · Biology" }], ctaText: "View All 28 Facilities →", ctaLink: "/facilities" },
  FEATURED_PROGRAMS_BLOCK: { annotation: "Signature Programs", title: "Featured Programs", subtitle: "Beyond the classroom...", programs: [{ title: "STEM", tag: "Academics", desc: "Science...", href: "#" }] },
  ACHIEVEMENTS_TICKER_BLOCK: { items: [{ icon: "Trophy", text: "National Champions" }] },
  UPCOMING_EVENTS_BLOCK: { annotation: "Mark the Calendar", title: "Upcoming Events", ctaText: "View Full Calendar →", ctaLink: "/news#events", events: [{ date: "Aug 15", title: "Independence Day", type: "Celebration", desc: "Flag hoisting." }] },
  TESTIMONIALS_BLOCK: { annotation: "What Our Parents Say", testimonials: [{ name: "Parent", child: "Grade 1", quote: "Amazing school." }] },
  CUSTOM_HTML_BLOCK: { html: "<p>Custom HTML goes here...</p>" },
  HOMEPAGE_HERO_BLOCK: {
    annotation: "Faith Model School — Est. 2014",
    headlineLine1: "Every Great Future",
    headlineLine2: "Begins With A",
    highlightWord: "Single Sketch.",
    subtitle: "Every child begins with a blank page. Through curiosity, creativity, and confidence, those pages become a story worth telling.",
    ribbonText: "Admissions for 2026–27 are now open",
    ribbonCtaText: "Apply Today",
    primaryCtaLabel: "Begin the Story",
    primaryCtaHref: "/admissions",
    secondaryCtaLabel: "Virtual Tour ↗",
    secondaryCtaHref: "/campus"
  },
  FAQ_BLOCK: { annotation: "Got Questions?", title: "Frequently Asked Questions", subtitle: "Instant answers to common queries.", faqs: [{ question: "What are the school hours?", answer: "8:30 AM to 3:30 PM", category: "General" }] },
  VIDEO_BLOCK: { annotation: "Campus Video", title: "Experience Faith Model School", subtitle: "Watch our campus walkthrough video.", videoSource: "youtube", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", posterImage: "" },
  MOSAIC_GALLERY_BLOCK: { annotation: "Photo Gallery", title: "Life at Faith Model School", subtitle: "Explore campus moments.", layoutMode: "mosaic", items: [{ url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80", title: "Campus Architecture", category: "Campus", span: "big" }] },
  ADMISSIONS_SPOTLIGHT_BLOCK: {
    annotation: "A Progressive Learning Village",
    title: "Admissions Open for Academic Year 2026–27",
    subtitle: "We nurture young minds through inquiry, play, and conceptual understanding. Join a warm, vibrant community focused on holistic growth.",
    ctaLabel: "Apply for Admission",
    ctaHref: "/admissions",
    bgImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    bannerHeadline: "ADMISSIONS OPEN",
    bannerText: "Applications for 2026–27 are now being accepted",
    bannerCta: "Apply",
    features: [
      "CBSE Curriculum with Future-Ready Pedagogy",
      "15-Acre Eco-Friendly Green Campus",
      "Holistic Arts, Sports & AI STEM Labs"
    ]
  },
  SHOWREEL_HERO_BLOCK: {
    headerLogoText: "SHOW REEL",
    autoPlayInterval: 6000,
    overlayOpacity: 30,
    imageBrightness: 100,
    slides: [
      {
        imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80",
        tag: "A PROGRESSIVE LEARNING VILLAGE",
        titleLine1: "Empowering",
        titleLine2: "Future Minds",
        subtitle: "Nurturing young innovators through inquiry-based CBSE curriculum and 15-acre green campus.",
        ctaLabel: "APPLY FOR ADMISSION",
        ctaHref: "/admissions"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
        tag: "WORLD-CLASS INFRASTRUCTURE",
        titleLine1: "Inquiry &",
        titleLine2: "Discovery",
        subtitle: "State-of-the-art AI STEM labs, sports arenas, and creative arts studios built for holistic growth.",
        ctaLabel: "EXPLORE CAMPUS",
        ctaHref: "/campus"
      }
    ]
  },
  INSTITUTIONAL_QUOTES_BLOCK: {
    annotation: "Guiding Philosophy",
    title: "Words That Guide Our Vision",
    subtitle: "The foundational beliefs that inspire our educational journey every day.",
    quotes: [
      {
        tag: "FOUNDATION BELIEF",
        quote: "IF FAITH CAN MOVE MOUNTAINS, YOUR CHILD CAN DO WONDERS, AS YOU TAKE THE FIRST STEP IN CHOOSING FAITH MODEL SCHOOL, THE FOUNDATION STONE FOR YOUR CHILD'S GREAT FUTURE",
        source: "Faith Model School Prospectus",
        author: "School Creed"
      },
      {
        tag: "OUR COMMITMENT",
        quote: "WE as an EDUCATIONAL institution, aim to recognize your CHILD'S SKILLS, HARNESS THEIR TALENTS, and nurture them towards positive growth into little individuals capable of brandishing his or her own UNIQUE POTENTIAL OF FAITH.",
        source: "Institutional Mission",
        author: "Educational Charter"
      }
    ]
  },
  FOUNDER_CHAIRMAN_BLOCK: {
    annotation: "Founding Pillars",
    title: "Founder & Chairman",
    subtitle: "The visionary leadership fostering excellence, health, and 21st-century entrepreneurial mindset.",
    leaders: [
      {
        role: "FOUNDER",
        name: "Dr. S.A. Fazlulla",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
        bio: "Dr. S.A. Fazlulla is a child specialist with over four decades of experience in the medical field. In his capacity as a doctor, he not only treats children with medical issues but also deals with their psychological aspects such as behavior and development.\n\nFaith Model School (FMS) is his brainchild and Dr. Fazlulla currently mentors children to grow into healthy individuals both mentally and physically.",
        messageTitle: "Founder's Message:",
        message: "I believe children should not stop building castles in the air. And with groundwork from Faith Model School, their dreams are bound to come true.",
        theme: "amber"
      },
      {
        role: "CHAIRMAN",
        name: "Mr. K.S. Kader Batcha",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        bio: "Mr. K.S. Kader Batcha, is an industrialist, currently training and running businesses in China. He holds a degree in textile engineering. He owns and runs textiles business and mainly exports the products to US and European markets. The other company in the name of AMD Overseas Impex India Company in Tiruppur manufactures, exports and imports a vast range of Window Frames, UPVC doors and windows. Mr. Batcha is actively involved in children's education and as an entrepreneur, he is looked up to by his peers and subordinates alike.",
        messageTitle: "Chairman's Message:",
        message: "No one is born an entrepreneur. But there's no minimum age to begin training to be one. Faith Model School offers 21st century education focusing on entrepreneurship skills from a tender age.",
        theme: "blue"
      }
    ]
  }
};

export interface SectionMeta {
  type: BlockType;
  title: string;
  category: "Leadership & Quotes" | "Heros & Banners" | "Philosophy & Story" | "Academics" | "Campus & Media" | "Forms & Admissions";
  desc: string;
  badge?: string;
}

export const SECTIONS_CATALOG: SectionMeta[] = [
  // Leadership & Quotes
  {
    type: "FOUNDER_CHAIRMAN_BLOCK",
    title: "Founder & Chairman Messages",
    category: "Leadership & Quotes",
    desc: "Feature founder and chairman bios, profile portraits, and their inspiring message quote boxes.",
    badge: "Official Prospectus"
  },
  {
    type: "INSTITUTIONAL_QUOTES_BLOCK",
    title: "Institutional Quotes",
    category: "Leadership & Quotes",
    desc: "Clean, professional double/single quote showcases for school motto, creeds, and foundation beliefs.",
    badge: "Clean Style"
  },
  {
    type: "PROFILE_GRID",
    title: "Team & Leadership Grid",
    category: "Leadership & Quotes",
    desc: "Staff, teachers, or advisory board photo grid with roles and short bios."
  },
  {
    type: "WELCOME_BLOCK",
    title: "Principal / Welcome Letter",
    category: "Leadership & Quotes",
    desc: "Formal welcome message from the head of school with signature & photo."
  },
  {
    type: "TESTIMONIALS_BLOCK",
    title: "Parent & Student Testimonials",
    category: "Leadership & Quotes",
    desc: "Interactive review slider showcasing words from parents and alumni."
  },

  // Heros & Banners
  {
    type: "SHOWREEL_HERO_BLOCK",
    title: "Showreel Hero Slider",
    category: "Heros & Banners",
    desc: "Full-width dynamic image carousel with badge tags, double-line typography, and CTA buttons."
  },
  {
    type: "HOMEPAGE_HERO_BLOCK",
    title: "Sketchbook Homepage Hero",
    category: "Heros & Banners",
    desc: "Editorial homepage hero with ribbon announcement, orange highlight word, and virtual tour link."
  },
  {
    type: "GOLDEN_HERO",
    title: "Golden Ratio Hero",
    category: "Heros & Banners",
    desc: "Artistic asymmetrical grid layout with quote box, primary CTA, and dual media frames."
  },
  {
    type: "MOODBOARD_HERO",
    title: "Moodboard Hero",
    category: "Heros & Banners",
    desc: "Multi-photo collage layout with headline and admission buttons."
  },
  {
    type: "HERO",
    title: "Classic Clean Hero",
    category: "Heros & Banners",
    desc: "Minimalist header with cursive eyebrow text and bold cormorant heading."
  },

  // Philosophy & Story
  {
    type: "PHILOSOPHY_SECTION_BLOCK",
    title: "Curiosity Meets Character",
    category: "Philosophy & Story",
    desc: "Philosophy pillars list paired with a captioned campus photograph."
  },
  {
    type: "PHILOSOPHY_SPLIT",
    title: "Philosophy Split",
    category: "Philosophy & Story",
    desc: "Two-column editorial split with rich HTML text and image."
  },
  {
    type: "WHY_CHOOSE_US_BLOCK",
    title: "Educational Promise / Pillars",
    category: "Philosophy & Story",
    desc: "Three or four core pillars highlighting key school differentiators."
  },
  {
    type: "TIMELINE_BLOCK",
    title: "Milestones & Journey",
    category: "Philosophy & Story",
    desc: "Year-by-year chronological timeline showcasing school history and achievements."
  },
  {
    type: "ICON_GRID_BLOCK",
    title: "Core Values & Principles",
    category: "Philosophy & Story",
    desc: "Grid of icon-backed cards describing institutional values like Integrity and Excellence."
  },
  {
    type: "TEXT_BLOCK",
    title: "Rich Text / HTML Section",
    category: "Philosophy & Story",
    desc: "Standard content section supporting paragraphs, headings, and formatting."
  },

  // Academics
  {
    type: "ACADEMIC_EXCELLENCE_BLOCK",
    title: "Academic Levels & Journey",
    category: "Academics",
    desc: "Multi-grade progression cards (Kindergarten, Primary, Middle, Secondary)."
  },
  {
    type: "CURRICULUM_OVERVIEW",
    title: "Curriculum Overview",
    category: "Academics",
    desc: "Structured breakdown of CBSE syllabus, teaching methodologies, and subjects."
  },
  {
    type: "SIGNATURE_PROGRAMS",
    title: "Signature Academic Programs",
    category: "Academics",
    desc: "Spotlight on specialized offerings like Robotics, Vedic Math, and Language Labs."
  },
  {
    type: "STUDENT_JOURNEY_BLOCK",
    title: "Student Growth Stages",
    category: "Academics",
    desc: "Step-by-step visual path from Pre-KG to higher secondary graduation."
  },
  {
    type: "ASSESSMENT_SYSTEM",
    title: "Evaluation & Assessment",
    category: "Academics",
    desc: "Grading criteria, continuous evaluation methods, and parent reporting schedules."
  },

  // Campus & Media
  {
    type: "CAMPUS_EXPERIENCE_BLOCK",
    title: "Campus Life & Experience",
    category: "Campus & Media",
    desc: "Two-photo presentation with bulleted feature checklist and campus tour link."
  },
  {
    type: "FACILITIES_OVERVIEW_BLOCK",
    title: "Facilities & Infrastructure",
    category: "Campus & Media",
    desc: "Showcase labs, libraries, smart classrooms, and sports arenas."
  },
  {
    type: "MOSAIC_GALLERY_BLOCK",
    title: "Mosaic Photo Gallery",
    category: "Campus & Media",
    desc: "Modern asymmetric grid of student life and campus moments."
  },
  {
    type: "VIDEO_BLOCK",
    title: "Campus Video Tour",
    category: "Campus & Media",
    desc: "Embedded YouTube or video player with custom poster thumbnail."
  },
  {
    type: "IMAGE_GRID",
    title: "3-Column Photo Grid",
    category: "Campus & Media",
    desc: "Simple responsive triple-image showcase."
  },
  {
    type: "GALLERY_BLOCK",
    title: "Media Album Strip",
    category: "Campus & Media",
    desc: "Campus photo gallery with title and subtitle."
  },

  // Forms & Admissions
  {
    type: "ADMISSIONS_SPOTLIGHT_BLOCK",
    title: "Admissions Spotlight Banner",
    category: "Forms & Admissions",
    desc: "Highlighted banner with open academic year, key features, and Apply button."
  },
  {
    type: "STEPS_BLOCK",
    title: "How to Apply & Admissions Form",
    category: "Forms & Admissions",
    desc: "Step-by-step application instructions integrated with the Admissions Callback Form."
  },
  {
    type: "CTA_SECTION",
    title: "Call-to-Action Banner",
    category: "Forms & Admissions",
    desc: "High-contrast action banner prompting visitors to apply or visit."
  },
  {
    type: "CONTACT_BLOCK",
    title: "Contact Details & Map",
    category: "Forms & Admissions",
    desc: "School address, phone numbers, email, visiting hours, and Google Map embed."
  },
  {
    type: "FAQ_BLOCK",
    title: "Frequently Asked Questions",
    category: "Forms & Admissions",
    desc: "Categorized collapsible accordions answering admissions and campus questions."
  },
  {
    type: "ACHIEVEMENTS_TICKER_BLOCK",
    title: "Achievements Ticker",
    category: "Forms & Admissions",
    desc: "Scrolling awards, sports victories, and academic trophies banner."
  },
  {
    type: "UPCOMING_EVENTS_BLOCK",
    title: "Upcoming Events Calendar",
    category: "Forms & Admissions",
    desc: "Date-stamped event listing with descriptions and links."
  },
  {
    type: "TABLE_BLOCK",
    title: "Fee / Information Table",
    category: "Forms & Admissions",
    desc: "Custom tabular data for fee schedules, age criteria, or uniforms."
  }
];

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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sectionSearch, setSectionSearch] = useState<string>("");


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
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input font-medium" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input font-semibold" placeholder="Title" />
                           </div>
                           <div className="grid grid-cols-1 gap-3">
                              {block.data.programs?.map((p: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50/50 space-y-3">
                                    <div className="flex gap-3 items-center">
                                       <input type="text" value={p.title} onChange={e => { const newP = [...block.data.programs]; newP[i].title = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input font-semibold flex-1" placeholder="Program Title" />
                                       <input type="text" value={p.tag} onChange={e => { const newP = [...block.data.programs]; newP[i].tag = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input w-48" placeholder="Tag (e.g. Academics)" />
                                       <button onClick={() => updateBlockData(block.id, { programs: block.data.programs.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <textarea value={p.desc} onChange={e => { const newP = [...block.data.programs]; newP[i].desc = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input h-24" placeholder="Description" />
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { programs: [...(block.data.programs || []), { title: "New Program", tag: "Academics", desc: "Description" }] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all shadow-2xs w-fit">+ Add Program</button>
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
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {block.data.assessments?.map((a: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50/50 space-y-3">
                                    <div className="flex gap-3 items-center">
                                       <input type="text" value={a.label} onChange={e => { const newA = [...block.data.assessments]; newA[i].label = e.target.value; updateBlockData(block.id, { assessments: newA }); }} className="admin-input font-semibold flex-1" placeholder="Label" />
                                       <input type="text" value={a.pct} onChange={e => { const newA = [...block.data.assessments]; newA[i].pct = e.target.value; updateBlockData(block.id, { assessments: newA }); }} className="admin-input w-24 text-center font-bold text-[#FB7F05]" placeholder="%" />
                                       <button onClick={() => updateBlockData(block.id, { assessments: block.data.assessments.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <textarea value={a.desc} onChange={e => { const newA = [...block.data.assessments]; newA[i].desc = e.target.value; updateBlockData(block.id, { assessments: newA }); }} className="admin-input h-20" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { assessments: [...(block.data.assessments || []), { label: "New Assessment", pct: "20%", desc: "Description" }] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all shadow-2xs">+ Add Assessment</button>
                        </div>
                     )}
                     {block.type === 'TIMELINE_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-3">
                              {block.data.events?.map((ev: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-4 rounded-lg space-y-3 bg-gray-50/50">
                                    <div className="flex gap-3 items-center">
                                       <input type="text" value={ev.year} onChange={e => { const newE = [...block.data.events]; newE[i].year = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input w-36 font-bold text-[#FB7F05]" placeholder="Year (e.g. 2026)" />
                                       <span className="text-xs text-gray-500 font-semibold uppercase">Milestone Event</span>
                                       <button onClick={() => updateBlockData(block.id, { events: block.data.events.filter((_: any, idx: number) => idx !== i) })} className="text-red-500 text-xs font-semibold hover:text-red-700 ml-auto px-3 py-1.5 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1">
                                          <Trash2 className="w-3.5 h-3.5" /> Delete
                                       </button>
                                    </div>
                                    <textarea value={ev.event} onChange={e => { const newE = [...block.data.events]; newE[i].event = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input w-full h-24" placeholder="Milestone Description" />
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { events: [...(block.data.events || []), { year: "2026", event: "New Event description" }] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all shadow-2xs">+ Add Event</button>
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
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {block.data.items?.map((item: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-4 rounded-lg space-y-3 bg-gray-50/50">
                                    <div className="flex gap-3 items-center">
                                       <input type="text" value={item.icon} onChange={e => { const newI = [...block.data.items]; newI[i].icon = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input w-28 text-center" placeholder="Icon / Emoji" />
                                       <input type="text" value={item.title} onChange={e => { const newI = [...block.data.items]; newI[i].title = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input font-semibold flex-1" placeholder="Title" />
                                       <button onClick={() => updateBlockData(block.id, { items: block.data.items.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <textarea value={item.desc} onChange={e => { const newI = [...block.data.items]; newI[i].desc = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input h-20" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { items: [...(block.data.items || []), { icon: "Trophy", title: "New Item", desc: "Description" }] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all shadow-2xs">+ Add Item</button>
                        </div>
                     )}
                     {block.type === 'STEPS_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {block.data.steps?.map((step: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-4 rounded-lg space-y-3 bg-gray-50/50">
                                    <div className="flex gap-3 items-center">
                                       <input type="text" value={step.num} onChange={e => { const newS = [...block.data.steps]; newS[i].num = e.target.value; updateBlockData(block.id, { steps: newS }); }} className="admin-input w-24 text-center font-bold text-[#FB7F05]" placeholder="01" />
                                       <input type="text" value={step.title} onChange={e => { const newS = [...block.data.steps]; newS[i].title = e.target.value; updateBlockData(block.id, { steps: newS }); }} className="admin-input font-semibold flex-1" placeholder="Title" />
                                       <button onClick={() => updateBlockData(block.id, { steps: block.data.steps.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <textarea value={step.desc} onChange={e => { const newS = [...block.data.steps]; newS[i].desc = e.target.value; updateBlockData(block.id, { steps: newS }); }} className="admin-input h-20" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { steps: [...(block.data.steps || []), { num: "01", title: "New Step", desc: "Description" }] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all shadow-2xs">+ Add Step</button>
                        </div>
                     )}
                     {block.type === 'TABLE_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-3 border border-gray-200 p-5 rounded-lg bg-gray-50/70">
                              <p className="text-xs font-bold text-gray-700 uppercase">Columns (comma separated)</p>
                              <input type="text" value={block.data.headers?.join(", ")} onChange={e => updateBlockData(block.id, { headers: e.target.value.split(",").map(s => s.trim()) })} className="admin-input mb-4" />
                              
                              <p className="text-xs font-bold text-gray-700 uppercase mt-4">Rows (Edit cell values or upload downloadable file/PDF)</p>
                              {block.data.rows?.map((row: string[], i: number) => (
                                 <div key={i} className="flex flex-col gap-2 bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
                                    <div className="flex gap-3 items-center">
                                       {row.map((cell: string, j: number) => (
                                          <input key={j} type="text" value={cell} onChange={e => { const newR = [...block.data.rows]; newR[i][j] = e.target.value; updateBlockData(block.id, { rows: newR }); }} className="admin-input flex-1 text-xs" placeholder={`Col ${j + 1}`} />
                                       ))}
                                       <button onClick={() => updateBlockData(block.id, { rows: block.data.rows.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <div className="flex items-center gap-2 pt-1 border-t border-gray-100 text-xs">
                                       <span className="text-gray-500 font-semibold whitespace-nowrap">Attach PDF/File to last column:</span>
                                       <FileUploader 
                                          value={row[row.length - 1] && row[row.length - 1].startsWith('/') ? row[row.length - 1] : ""} 
                                          onChange={(url) => {
                                             const newR = [...block.data.rows];
                                             newR[i][newR[i].length - 1] = url;
                                             updateBlockData(block.id, { rows: newR });
                                          }} 
                                          accept=".pdf,.doc,.docx,image/*" 
                                          placeholder="Upload document or enter file URL..." 
                                       />
                                    </div>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { rows: [...(block.data.rows || []), new Array(block.data.headers?.length || 2).fill("New Data")] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all shadow-2xs">+ Add Row</button>
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
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {block.data.profiles?.map((prof: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-4 rounded-lg space-y-3 bg-gray-50/50">
                                    <div className="flex gap-3 items-center">
                                       <input type="text" value={prof.name} onChange={e => { const newP = [...block.data.profiles]; newP[i].name = e.target.value; updateBlockData(block.id, { profiles: newP }); }} className="admin-input font-semibold flex-1" placeholder="Name" />
                                       <input type="text" value={prof.role} onChange={e => { const newP = [...block.data.profiles]; newP[i].role = e.target.value; updateBlockData(block.id, { profiles: newP }); }} className="admin-input flex-1" placeholder="Role" />
                                       <button onClick={() => updateBlockData(block.id, { profiles: block.data.profiles.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <ImageUploader value={prof.image} onChange={url => { const newP = [...block.data.profiles]; newP[i].image = url; updateBlockData(block.id, { profiles: newP }); }} />
                                    <textarea value={prof.desc} onChange={e => { const newP = [...block.data.profiles]; newP[i].desc = e.target.value; updateBlockData(block.id, { profiles: newP }); }} className="admin-input h-20" placeholder="Bio/Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { profiles: [...(block.data.profiles || []), { name: "New Person", role: "Role", image: "", desc: "Bio" }] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all shadow-2xs">+ Add Profile</button>
                        </div>
                     )}
                     {block.type === 'CONTACT_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Annotation</label>
                                 <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation (e.g. Reach Out)" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Title</label>
                                 <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title (e.g. Get in Touch)" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subtitle</label>
                                 <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                              </div>
                           </div>
                           <div className="space-y-3 border border-gray-200 p-5 rounded-lg bg-gray-50/70">
                              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Contact Details & Address Info</h4>
                              {block.data.details?.map((det: any, i: number) => (
                                 <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
                                    <div className="md:col-span-4">
                                       <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Field Label</label>
                                       <input type="text" value={det.label} onChange={e => { const newD = [...block.data.details]; newD[i].label = e.target.value; updateBlockData(block.id, { details: newD }); }} className="admin-input font-semibold" placeholder="e.g. Email / Phone / Address" />
                                    </div>
                                    <div className="md:col-span-7">
                                       <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Field Value / Content</label>
                                       <input type="text" value={det.value} onChange={e => { const newD = [...block.data.details]; newD[i].value = e.target.value; updateBlockData(block.id, { details: newD }); }} className="admin-input" placeholder="e.g. info@faithmodelschool.edu" />
                                    </div>
                                    <div className="md:col-span-1 flex justify-end pt-5">
                                       <button onClick={() => updateBlockData(block.id, { details: block.data.details.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete Row">
                                          <Trash2 className="w-4 h-4" />
                                       </button>
                                    </div>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { details: [...(block.data.details || []), { label: "New Detail", value: "Information text" }] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all shadow-2xs">
                                 + Add Detail Row
                              </button>
                           </div>
                           <div className="space-y-2">
                              <label className="block text-xs font-bold text-gray-800 uppercase">Google Maps iFrame Embed Code</label>
                              <textarea value={block.data.mapIframe} onChange={e => updateBlockData(block.id, { mapIframe: e.target.value })} className="admin-input font-mono text-xs h-32 leading-relaxed" placeholder='<iframe src="https://maps.google.com/..." />' />
                           </div>
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
                                 <div key={i} className="border border-gray-200 p-3 rounded bg-white space-y-2">
                                    <div className="flex justify-between mb-1">
                                       <input type="text" value={item.question} onChange={e => { const newI = [...block.data.items]; newI[i].question = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-sm font-semibold flex-1" placeholder="Question / Document Name" />
                                       <button onClick={() => updateBlockData(block.id, { items: block.data.items.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2 ml-2">✕</button>
                                    </div>
                                    <textarea value={item.answer} onChange={e => { const newI = [...block.data.items]; newI[i].answer = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-sm h-16" placeholder="Answer / Document details" />
                                    <div>
                                       <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Downloadable Document (Optional PDF/Doc)</label>
                                       <FileUploader 
                                          value={item.fileUrl || item.file || ""} 
                                          onChange={(url) => {
                                             const newI = [...block.data.items];
                                             newI[i].fileUrl = url;
                                             updateBlockData(block.id, { items: newI });
                                          }}
                                          accept=".pdf,.doc,.docx,image/*"
                                          placeholder="Upload PDF or file URL..."
                                       />
                                    </div>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { items: [...(block.data.items || []), { question: "New Question", answer: "Answer text" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Item</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'ADMISSIONS_SPOTLIGHT_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Annotation</label>
                                 <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Title</label>
                                 <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              </div>
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subtitle</label>
                              <textarea value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input h-20" placeholder="Subtitle" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Key Highlights / Features (Checkmark List)</label>
                              <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                 {(block.data.features || [
                                    "CBSE Curriculum with Future-Ready Pedagogy",
                                    "15-Acre Eco-Friendly Green Campus",
                                    "Holistic Arts, Sports & AI STEM Labs"
                                 ]).map((feat: string, fIdx: number) => (
                                    <div key={fIdx} className="flex items-center gap-2">
                                       <span className="text-[#FB7F05] text-sm">✓</span>
                                       <input 
                                          type="text" 
                                          value={feat} 
                                          onChange={e => {
                                             const currentFeats = block.data.features || [
                                                "CBSE Curriculum with Future-Ready Pedagogy",
                                                "15-Acre Eco-Friendly Green Campus",
                                                "Holistic Arts, Sports & AI STEM Labs"
                                             ];
                                             const updated = [...currentFeats];
                                             updated[fIdx] = e.target.value;
                                             updateBlockData(block.id, { features: updated });
                                          }} 
                                          className="admin-input text-xs flex-1 bg-white" 
                                          placeholder="Feature text..." 
                                       />
                                       <button 
                                          type="button"
                                          onClick={() => {
                                             const currentFeats = block.data.features || [
                                                "CBSE Curriculum with Future-Ready Pedagogy",
                                                "15-Acre Eco-Friendly Green Campus",
                                                "Holistic Arts, Sports & AI STEM Labs"
                                             ];
                                             const updated = currentFeats.filter((_: any, i: number) => i !== fIdx);
                                             updateBlockData(block.id, { features: updated });
                                          }}
                                          className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1"
                                       >
                                          Remove
                                       </button>
                                    </div>
                                 ))}
                                 <button 
                                    type="button"
                                    onClick={() => {
                                       const currentFeats = block.data.features || [
                                          "CBSE Curriculum with Future-Ready Pedagogy",
                                          "15-Acre Eco-Friendly Green Campus",
                                          "Holistic Arts, Sports & AI STEM Labs"
                                       ];
                                       updateBlockData(block.id, { features: [...currentFeats, ""] });
                                    }} 
                                    className="text-xs font-semibold text-[#FB7F05] hover:underline pt-1 inline-block"
                                 >
                                    + Add Feature Bullet
                                 </button>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">CTA Label</label>
                                 <input type="text" value={block.data.ctaLabel} onChange={e => updateBlockData(block.id, { ctaLabel: e.target.value })} className="admin-input" placeholder="CTA Label" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">CTA Link</label>
                                 <input type="text" value={block.data.ctaHref} onChange={e => updateBlockData(block.id, { ctaHref: e.target.value })} className="admin-input" placeholder="CTA Link" />
                              </div>
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Right-Side Campus Image</label>
                              <ImageUploader value={block.data.bgImage} onChange={url => updateBlockData(block.id, { bgImage: url })} />
                           </div>
                           <div className="border-t border-gray-200 pt-3 space-y-3">
                              <p className="text-xs font-bold text-gray-800 uppercase">Floating Overlay Card Settings</p>
                              <div className="grid grid-cols-3 gap-3">
                                 <input type="text" value={block.data.bannerHeadline} onChange={e => updateBlockData(block.id, { bannerHeadline: e.target.value })} className="admin-input text-xs" placeholder="Banner Headline" />
                                 <input type="text" value={block.data.bannerText} onChange={e => updateBlockData(block.id, { bannerText: e.target.value })} className="admin-input text-xs" placeholder="Banner Text" />
                                 <input type="text" value={block.data.bannerCta} onChange={e => updateBlockData(block.id, { bannerCta: e.target.value })} className="admin-input text-xs" placeholder="Banner Button Text" />
                              </div>
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

                     {block.type === 'HOMEPAGE_HERO_BLOCK' && (
                        <div className="space-y-4">
                           <div className="border border-orange-200 bg-orange-50/30 p-4 rounded space-y-3">
                              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Top Banner Ribbon</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                 <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Ribbon Text</label>
                                    <input type="text" value={block.data.ribbonText ?? "Admissions for 2026–27 are now open"} onChange={e => updateBlockData(block.id, { ribbonText: e.target.value })} className="admin-input" placeholder="Ribbon Text" />
                                 </div>
                                 <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Ribbon Link Text</label>
                                    <input type="text" value={block.data.ribbonCtaText ?? "Apply Today"} onChange={e => updateBlockData(block.id, { ribbonCtaText: e.target.value })} className="admin-input" placeholder="Ribbon Link Text" />
                                 </div>
                              </div>
                           </div>

                           <div className="border border-gray-200 p-4 rounded space-y-3 bg-white">
                              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Hero Headline & Subtitle</h4>
                              <div>
                                 <label className="block text-xs font-medium text-gray-600 mb-1">Top Annotation / Sub-tag</label>
                                 <input type="text" value={block.data.annotation ?? "Faith Model School — Est. 2014"} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input font-medium" placeholder="Annotation" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                 <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Headline Line 1</label>
                                    <input type="text" value={block.data.headlineLine1 ?? "Every Great Future"} onChange={e => updateBlockData(block.id, { headlineLine1: e.target.value })} className="admin-input font-semibold" placeholder="Every Great Future" />
                                 </div>
                                 <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Headline Line 2</label>
                                    <input type="text" value={block.data.headlineLine2 ?? "Begins With A"} onChange={e => updateBlockData(block.id, { headlineLine2: e.target.value })} className="admin-input font-semibold" placeholder="Begins With A" />
                                 </div>
                                 <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Highlight Word (Orange)</label>
                                    <input type="text" value={block.data.highlightWord ?? "Single Sketch."} onChange={e => updateBlockData(block.id, { highlightWord: e.target.value })} className="admin-input font-semibold text-[#FB7F05]" placeholder="Single Sketch." />
                                 </div>
                              </div>
                              <div>
                                 <label className="block text-xs font-medium text-gray-600 mb-1">Hero Subtitle Paragraph</label>
                                 <textarea value={block.data.subtitle ?? "Every child begins with a blank page. Through curiosity, creativity, and confidence, those pages become a story worth telling."} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input h-20 text-xs" placeholder="Subtitle Paragraph" />
                              </div>
                           </div>

                           <div className="border border-gray-200 p-4 rounded space-y-3 bg-white">
                              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Call To Action Buttons</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                 <div className="space-y-2 border p-3 rounded bg-gray-50/50">
                                    <label className="block text-xs font-bold text-gray-700">Primary Button</label>
                                    <input type="text" value={block.data.primaryCtaLabel ?? "Begin the Story"} onChange={e => updateBlockData(block.id, { primaryCtaLabel: e.target.value })} className="admin-input text-xs mb-1" placeholder="Button Text" />
                                    <input type="text" value={block.data.primaryCtaHref ?? "/admissions"} onChange={e => updateBlockData(block.id, { primaryCtaHref: e.target.value })} className="admin-input text-xs" placeholder="URL Path (/admissions)" />
                                 </div>
                                 <div className="space-y-2 border p-3 rounded bg-gray-50/50">
                                    <label className="block text-xs font-bold text-gray-700">Secondary Button</label>
                                    <input type="text" value={block.data.secondaryCtaLabel ?? "Virtual Tour ↗"} onChange={e => updateBlockData(block.id, { secondaryCtaLabel: e.target.value })} className="admin-input text-xs mb-1" placeholder="Button Text" />
                                    <input type="text" value={block.data.secondaryCtaHref ?? "/campus"} onChange={e => updateBlockData(block.id, { secondaryCtaHref: e.target.value })} className="admin-input text-xs" placeholder="URL Path (/campus)" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                     {block.type === 'WELCOME_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.logoText} onChange={e => updateBlockData(block.id, { logoText: e.target.value })} className="admin-input w-24" placeholder="Logo Text (FM)" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input flex-1" placeholder="Title" />
                           </div>
                           <textarea value={block.data.quote} onChange={e => updateBlockData(block.id, { quote: e.target.value })} className="admin-input h-24" placeholder="Quote Content" />
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.author} onChange={e => updateBlockData(block.id, { author: e.target.value })} className="admin-input" placeholder="Author Name" />
                              <input type="text" value={block.data.role} onChange={e => updateBlockData(block.id, { role: e.target.value })} className="admin-input" placeholder="Author Role" />
                           </div>
                        </div>
                     )}
                     {block.type === 'STATS_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.stats?.map((stat: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-3 rounded space-y-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={stat.num} onChange={e => { const newS = [...block.data.stats]; newS[i].num = e.target.value; updateBlockData(block.id, { stats: newS }); }} className="admin-input text-xs w-20" placeholder="Number" />
                                       <button onClick={() => updateBlockData(block.id, { stats: block.data.stats.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2 ml-auto">✕</button>
                                    </div>
                                    <input type="text" value={stat.label} onChange={e => { const newS = [...block.data.stats]; newS[i].label = e.target.value; updateBlockData(block.id, { stats: newS }); }} className="admin-input text-xs" placeholder="Label" />
                                    <input type="text" value={stat.note} onChange={e => { const newS = [...block.data.stats]; newS[i].note = e.target.value; updateBlockData(block.id, { stats: newS }); }} className="admin-input text-xs" placeholder="Note" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { stats: [...(block.data.stats || []), { num: "100", label: "New Stat", note: "Note" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Stat</button>
                        </div>
                     )}
                     {block.type === 'WHY_CHOOSE_US_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {block.data.pillars?.map((p: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-4 rounded-lg space-y-3 bg-gray-50/50">
                                    <div className="flex gap-3 items-center">
                                       <input type="text" value={p.icon} onChange={e => { const newP = [...block.data.pillars]; newP[i].icon = e.target.value; updateBlockData(block.id, { pillars: newP }); }} className="admin-input w-28 text-center" placeholder="Icon / Emoji" />
                                       <input type="text" value={p.title} onChange={e => { const newP = [...block.data.pillars]; newP[i].title = e.target.value; updateBlockData(block.id, { pillars: newP }); }} className="admin-input font-semibold flex-1" placeholder="Title" />
                                       <button onClick={() => updateBlockData(block.id, { pillars: block.data.pillars.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <textarea value={p.desc} onChange={e => { const newP = [...block.data.pillars]; newP[i].desc = e.target.value; updateBlockData(block.id, { pillars: newP }); }} className="admin-input h-24" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { pillars: [...(block.data.pillars || []), { icon: "Star", title: "New Pillar", desc: "Description" }] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all shadow-2xs">+ Add Pillar</button>
                        </div>
                     )}
                     {block.type === 'PHILOSOPHY_SECTION_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-3 border border-gray-200 p-4 rounded-lg bg-gray-50/50">
                                 <p className="text-xs font-bold uppercase text-gray-700">List Items</p>
                                 {block.data.items?.map((item: string, i: number) => (
                                    <div key={i} className="flex gap-3 items-center">
                                       <input type="text" value={item} onChange={e => { const newI = [...block.data.items]; newI[i] = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input flex-1" placeholder="Item" />
                                       <button onClick={() => updateBlockData(block.id, { items: block.data.items.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                 ))}
                                 <button onClick={() => updateBlockData(block.id, { items: [...(block.data.items || []), "New Item"] })} className="px-3 py-1.5 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-md text-xs font-semibold">+ Add Item</button>
                              </div>
                              <div className="space-y-3">
                                 <ImageUploader value={block.data.imageUrl} onChange={url => updateBlockData(block.id, { imageUrl: url })} />
                                 <input type="text" value={block.data.imageCaption} onChange={e => updateBlockData(block.id, { imageCaption: e.target.value })} className="admin-input" placeholder="Image Caption" />
                              </div>
                           </div>
                        </div>
                     )}
                     {block.type === 'ACADEMIC_EXCELLENCE_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-2">
                              {block.data.programs?.map((p: any, i: number) => (
                                 <div key={i} className="flex gap-2 items-start border border-gray-200 p-2 rounded">
                                    <div className="flex-1 space-y-2">
                                       <div className="flex gap-2">
                                          <input type="text" value={p.title} onChange={e => { const newP = [...block.data.programs]; newP[i].title = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs" placeholder="Program Title" />
                                          <input type="text" value={p.age} onChange={e => { const newP = [...block.data.programs]; newP[i].age = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs w-32" placeholder="Age Group" />
                                          <input type="text" value={p.href} onChange={e => { const newP = [...block.data.programs]; newP[i].href = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs w-32" placeholder="Link (Optional)" />
                                       </div>
                                       <textarea value={p.desc} onChange={e => { const newP = [...block.data.programs]; newP[i].desc = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs h-12" placeholder="Description" />
                                    </div>
                                    <button onClick={() => updateBlockData(block.id, { programs: block.data.programs.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 p-2 mt-1">✕</button>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { programs: [...(block.data.programs || []), { title: "New Program", age: "Age X-Y", desc: "Desc" }] })} className="text-xs font-semibold text-[#FB7F05] mt-2">+ Add Program</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'STUDENT_JOURNEY_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.stages?.map((s: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex gap-2">
                                    <input type="text" value={s.year} onChange={e => { const newS = [...block.data.stages]; newS[i].year = e.target.value; updateBlockData(block.id, { stages: newS }); }} className="admin-input text-xs w-20" placeholder="Year/Age" />
                                    <input type="text" value={s.label} onChange={e => { const newS = [...block.data.stages]; newS[i].label = e.target.value; updateBlockData(block.id, { stages: newS }); }} className="admin-input text-xs flex-1" placeholder="Label" />
                                    <input type="text" value={s.icon} onChange={e => { const newS = [...block.data.stages]; newS[i].icon = e.target.value; updateBlockData(block.id, { stages: newS }); }} className="admin-input text-xs w-16" placeholder="Icon" />
                                    <button onClick={() => updateBlockData(block.id, { stages: block.data.stages.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-1">✕</button>
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { stages: [...(block.data.stages || []), { year: "Age X", label: "New Stage", icon: "Star" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Stage</button>
                        </div>
                     )}
                     {block.type === 'CAMPUS_EXPERIENCE_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-4">
                                 <div>
                                    <label className="block text-xs mb-1 font-semibold">Image 1</label>
                                    <ImageUploader value={block.data.image1} onChange={url => updateBlockData(block.id, { image1: url })} />
                                 </div>
                                 <div>
                                    <label className="block text-xs mb-1 font-semibold">Image 2</label>
                                    <ImageUploader value={block.data.image2} onChange={url => updateBlockData(block.id, { image2: url })} />
                                 </div>
                              </div>
                              <div className="space-y-2 border border-gray-200 p-3 rounded bg-gray-50">
                                 <p className="text-xs font-semibold">Features</p>
                                 {block.data.features?.map((f: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                       <input type="text" value={f} onChange={e => { const newF = [...block.data.features]; newF[i] = e.target.value; updateBlockData(block.id, { features: newF }); }} className="admin-input text-xs flex-1" placeholder="Feature" />
                                       <button onClick={() => updateBlockData(block.id, { features: block.data.features.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                    </div>
                                 ))}
                                 <button onClick={() => updateBlockData(block.id, { features: [...(block.data.features || []), "New Feature"] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Feature</button>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.ctaText} onChange={e => updateBlockData(block.id, { ctaText: e.target.value })} className="admin-input" placeholder="CTA Button Text" />
                              <input type="text" value={block.data.ctaLink} onChange={e => updateBlockData(block.id, { ctaLink: e.target.value })} className="admin-input" placeholder="CTA Button Link" />
                           </div>
                        </div>
                     )}
                     {block.type === 'FACILITIES_OVERVIEW_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.facilities?.map((f: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex flex-col gap-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={f.icon} onChange={e => { const newF = [...block.data.facilities]; newF[i].icon = e.target.value; updateBlockData(block.id, { facilities: newF }); }} className="admin-input text-xs w-16" placeholder="Icon" />
                                       <input type="text" value={f.label} onChange={e => { const newF = [...block.data.facilities]; newF[i].label = e.target.value; updateBlockData(block.id, { facilities: newF }); }} className="admin-input text-xs flex-1" placeholder="Label" />
                                       <button onClick={() => updateBlockData(block.id, { facilities: block.data.facilities.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-1">✕</button>
                                    </div>
                                    <input type="text" value={f.sub} onChange={e => { const newF = [...block.data.facilities]; newF[i].sub = e.target.value; updateBlockData(block.id, { facilities: newF }); }} className="admin-input text-xs" placeholder="Sub-label (e.g. Physics)" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { facilities: [...(block.data.facilities || []), { icon: "Star", label: "New Facility", sub: "Details" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Facility</button>
                           <div className="grid grid-cols-2 gap-4 pt-2">
                              <input type="text" value={block.data.ctaText} onChange={e => updateBlockData(block.id, { ctaText: e.target.value })} className="admin-input" placeholder="CTA Button Text" />
                              <input type="text" value={block.data.ctaLink} onChange={e => updateBlockData(block.id, { ctaLink: e.target.value })} className="admin-input" placeholder="CTA Button Link" />
                           </div>
                        </div>
                     )}
                     {block.type === 'FEATURED_PROGRAMS_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-2">
                              {block.data.programs?.map((p: any, i: number) => (
                                 <div key={i} className="flex gap-2 items-start border border-gray-200 p-2 rounded">
                                    <div className="flex-1 space-y-2">
                                       <div className="flex gap-2">
                                          <input type="text" value={p.title} onChange={e => { const newP = [...block.data.programs]; newP[i].title = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs" placeholder="Program Title" />
                                          <input type="text" value={p.tag} onChange={e => { const newP = [...block.data.programs]; newP[i].tag = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs w-32" placeholder="Tag" />
                                          <input type="text" value={p.href} onChange={e => { const newP = [...block.data.programs]; newP[i].href = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs w-32" placeholder="Link (Optional)" />
                                       </div>
                                       <textarea value={p.desc} onChange={e => { const newP = [...block.data.programs]; newP[i].desc = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs h-12" placeholder="Description" />
                                    </div>
                                    <button onClick={() => updateBlockData(block.id, { programs: block.data.programs.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 p-2 mt-1">✕</button>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { programs: [...(block.data.programs || []), { title: "New Program", tag: "Tag", desc: "Desc" }] })} className="text-xs font-semibold text-[#FB7F05] mt-2">+ Add Program</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'ACHIEVEMENTS_TICKER_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.items?.map((item: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex gap-2">
                                    <input type="text" value={item.icon} onChange={e => { const newI = [...block.data.items]; newI[i].icon = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-xs w-20" placeholder="Icon" />
                                    <input type="text" value={item.text} onChange={e => { const newI = [...block.data.items]; newI[i].text = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-xs flex-1" placeholder="Achievement Text" />
                                    <button onClick={() => updateBlockData(block.id, { items: block.data.items.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-1">✕</button>
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { items: [...(block.data.items || []), { icon: "Star", text: "New Achievement" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Achievement</button>
                        </div>
                     )}
                     {block.type === 'UPCOMING_EVENTS_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                           </div>
                           <div className="space-y-2">
                              {block.data.events?.map((ev: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex flex-col gap-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={ev.date} onChange={e => { const newE = [...block.data.events]; newE[i].date = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input text-xs w-24" placeholder="Date (Aug 15)" />
                                       <input type="text" value={ev.title} onChange={e => { const newE = [...block.data.events]; newE[i].title = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input text-xs flex-1" placeholder="Event Title" />
                                       <input type="text" value={ev.type} onChange={e => { const newE = [...block.data.events]; newE[i].type = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input text-xs w-32" placeholder="Type" />
                                       <button onClick={() => updateBlockData(block.id, { events: block.data.events.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                    </div>
                                    <textarea value={ev.desc} onChange={e => { const newE = [...block.data.events]; newE[i].desc = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input text-xs h-12" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { events: [...(block.data.events || []), { date: "Jan 1", title: "New Event", type: "Event", desc: "" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Event</button>
                           <div className="grid grid-cols-2 gap-4 pt-2">
                              <input type="text" value={block.data.ctaText} onChange={e => updateBlockData(block.id, { ctaText: e.target.value })} className="admin-input" placeholder="CTA Button Text" />
                              <input type="text" value={block.data.ctaLink} onChange={e => updateBlockData(block.id, { ctaLink: e.target.value })} className="admin-input" placeholder="CTA Button Link" />
                           </div>
                        </div>
                     )}
                     {block.type === 'TESTIMONIALS_BLOCK' && (
                        <div className="space-y-4">
                           <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                           <div className="space-y-2">
                              {block.data.testimonials?.map((t: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex flex-col gap-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={t.name} onChange={e => { const newT = [...block.data.testimonials]; newT[i].name = e.target.value; updateBlockData(block.id, { testimonials: newT }); }} className="admin-input text-xs flex-1" placeholder="Parent Name" />
                                       <input type="text" value={t.child} onChange={e => { const newT = [...block.data.testimonials]; newT[i].child = e.target.value; updateBlockData(block.id, { testimonials: newT }); }} className="admin-input text-xs flex-1" placeholder="Child details" />
                                       <button onClick={() => updateBlockData(block.id, { testimonials: block.data.testimonials.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                    </div>
                                    <textarea value={t.quote} onChange={e => { const newT = [...block.data.testimonials]; newT[i].quote = e.target.value; updateBlockData(block.id, { testimonials: newT }); }} className="admin-input text-xs h-16" placeholder="Quote" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { testimonials: [...(block.data.testimonials || []), { name: "Name", child: "Child Info", quote: "Review..." }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Testimonial</button>
                        </div>
                     )}
                     {block.type === 'CUSTOM_HTML_BLOCK' && (
                        <div className="space-y-4">
                           <textarea value={block.data.html} onChange={e => updateBlockData(block.id, { html: e.target.value })} className="admin-input font-mono text-sm h-64" placeholder="<div class='custom-styles'>
  <p>Your raw HTML goes here...</p>
</div>" />
                        </div>
                     )}
                     {block.type === 'SHOWREEL_HERO_BLOCK' && (
                        <div className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Top Bar Header Logo / Text</label>
                                 <input 
                                    type="text" 
                                    value={block.data.headerLogoText || "SHOW REEL"} 
                                    onChange={e => updateBlockData(block.id, { headerLogoText: e.target.value })} 
                                    className="admin-input text-xs" 
                                    placeholder="SHOW REEL" 
                                 />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Autoplay Interval (ms)</label>
                                 <input 
                                    type="number" 
                                    value={block.data.autoPlayInterval || 6000} 
                                    onChange={e => updateBlockData(block.id, { autoPlayInterval: parseInt(e.target.value) || 6000 })} 
                                    className="admin-input text-xs" 
                                    placeholder="6000" 
                                 />
                              </div>
                           </div>

                           {/* Hero Image Visibility & Opacity Controls */}
                           <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 space-y-4">
                              <div>
                                 <div className="flex items-center gap-2">
                                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                                       Hero Image Visibility & Dark Overlay
                                    </h4>
                                    <span className="text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded font-mono font-bold">
                                       Live Setting
                                    </span>
                                 </div>
                                 <p className="text-[11px] text-gray-600 mt-1">
                                    Fine-tune overlay darkness so your campus photos are vivid and clearly visible instead of dark or shadowy.
                                 </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                 {/* Dark Overlay Opacity */}
                                 <div className="bg-white p-3.5 rounded-lg border border-amber-100 shadow-xs space-y-2">
                                    <div className="flex justify-between items-center">
                                       <label className="text-xs font-semibold text-gray-800">
                                          Dark Overlay Opacity
                                       </label>
                                       <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100/70 text-amber-900 border border-amber-200">
                                          {typeof block.data.overlayOpacity === 'number' ? block.data.overlayOpacity : 30}%
                                       </span>
                                    </div>
                                    <input 
                                       type="range" 
                                       min="0" 
                                       max="100" 
                                       step="5" 
                                       value={typeof block.data.overlayOpacity === 'number' ? block.data.overlayOpacity : 30} 
                                       onChange={e => updateBlockData(block.id, { overlayOpacity: parseInt(e.target.value) })} 
                                       className="w-full accent-[#FB7F05] cursor-pointer"
                                    />
                                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                                       <span>0% (Raw Image)</span>
                                       <span className="text-[#FB7F05] font-bold">30% (Recommended)</span>
                                       <span>100% (Dark)</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                       {[
                                          { label: '15% Crystal Clear', val: 15 },
                                          { label: '30% Vibrant', val: 30 },
                                          { label: '50% Medium', val: 50 },
                                          { label: '75% Deep', val: 75 }
                                       ].map(preset => (
                                          <button
                                             key={preset.val}
                                             type="button"
                                             onClick={() => updateBlockData(block.id, { overlayOpacity: preset.val })}
                                             className={`text-[10px] px-2 py-1 rounded border font-medium transition-colors ${
                                                (typeof block.data.overlayOpacity === 'number' ? block.data.overlayOpacity : 30) === preset.val
                                                   ? 'bg-[#FB7F05] text-white border-[#FB7F05]'
                                                   : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                             }`}
                                          >
                                             {preset.label}
                                          </button>
                                       ))}
                                    </div>
                                 </div>

                                 {/* Image Brightness */}
                                 <div className="bg-white p-3.5 rounded-lg border border-amber-100 shadow-xs space-y-2">
                                    <div className="flex justify-between items-center">
                                       <label className="text-xs font-semibold text-gray-800">
                                          Image Brightness
                                       </label>
                                       <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200">
                                          {typeof block.data.imageBrightness === 'number' ? block.data.imageBrightness : 100}%
                                       </span>
                                    </div>
                                    <input 
                                       type="range" 
                                       min="70" 
                                       max="130" 
                                       step="5" 
                                       value={typeof block.data.imageBrightness === 'number' ? block.data.imageBrightness : 100} 
                                       onChange={e => updateBlockData(block.id, { imageBrightness: parseInt(e.target.value) })} 
                                       className="w-full accent-[#FB7F05] cursor-pointer"
                                    />
                                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                                       <span>70% (Dimmed)</span>
                                       <span className="text-gray-700 font-bold">100% (Natural)</span>
                                       <span>130% (Boosted)</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                       {[
                                          { label: '90%', val: 90 },
                                          { label: '100% Natural', val: 100 },
                                          { label: '110% Boosted', val: 110 },
                                          { label: '120% Sunlit', val: 120 }
                                       ].map(preset => (
                                          <button
                                             key={preset.val}
                                             type="button"
                                             onClick={() => updateBlockData(block.id, { imageBrightness: preset.val })}
                                             className={`text-[10px] px-2 py-1 rounded border font-medium transition-colors ${
                                                (typeof block.data.imageBrightness === 'number' ? block.data.imageBrightness : 100) === preset.val
                                                   ? 'bg-[#FB7F05] text-white border-[#FB7F05]'
                                                   : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                             }`}
                                          >
                                             {preset.label}
                                          </button>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>


                           <div>
                              <div className="flex justify-between items-center mb-3">
                                 <label className="text-xs font-bold text-gray-800 uppercase">Slides List ({(block.data.slides || []).length})</label>
                                 <button 
                                    type="button"
                                    onClick={() => {
                                       const currentSlides = block.data.slides || [];
                                       const newSlide = {
                                          id: Math.random().toString(36).substring(2, 9),
                                          imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80",
                                          tag: "NEW HIGHLIGHT",
                                          titleLine1: "New Slide",
                                          titleLine2: "Headline",
                                          subtitle: "Add descriptive text for this slide",
                                          ctaLabel: "EXPLORE NOW",
                                          ctaHref: "/admissions"
                                       };
                                       updateBlockData(block.id, { slides: [...currentSlides, newSlide] });
                                    }}
                                    className="text-xs font-bold text-[#FB7F05] hover:underline"
                                 >
                                    + Add New Slide
                                 </button>
                              </div>

                              <div className="space-y-4">
                                 {(block.data.slides || []).map((slide: any, sIdx: number) => (
                                    <div key={slide.id || sIdx} className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-3 relative">
                                       <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                          <span className="text-xs font-bold text-gray-700 uppercase">Slide #{sIdx + 1}</span>
                                          <div className="flex items-center gap-2">
                                             {sIdx > 0 && (
                                                <button 
                                                   type="button"
                                                   onClick={() => {
                                                      const slides = [...block.data.slides];
                                                      [slides[sIdx - 1], slides[sIdx]] = [slides[sIdx], slides[sIdx - 1]];
                                                      updateBlockData(block.id, { slides });
                                                   }}
                                                   className="text-xs text-gray-500 hover:text-gray-900"
                                                >
                                                   ↑ Move Up
                                                </button>
                                             )}
                                             {sIdx < (block.data.slides.length - 1) && (
                                                <button 
                                                   type="button"
                                                   onClick={() => {
                                                      const slides = [...block.data.slides];
                                                      [slides[sIdx + 1], slides[sIdx]] = [slides[sIdx], slides[sIdx + 1]];
                                                      updateBlockData(block.id, { slides });
                                                   }}
                                                   className="text-xs text-gray-500 hover:text-gray-900"
                                                >
                                                   ↓ Move Down
                                                </button>
                                             )}
                                             <button 
                                                type="button"
                                                onClick={() => {
                                                   const slides = block.data.slides.filter((_: any, i: number) => i !== sIdx);
                                                   updateBlockData(block.id, { slides });
                                                }}
                                                className="text-xs text-red-500 hover:text-red-700 font-semibold ml-2"
                                             >
                                                Remove Slide
                                             </button>
                                          </div>
                                       </div>

                                       <div>
                                          <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Slide Image</label>
                                          <ImageUploader 
                                             value={slide.imageUrl} 
                                             onChange={url => {
                                                const slides = [...block.data.slides];
                                                slides[sIdx] = { ...slides[sIdx], imageUrl: url };
                                                updateBlockData(block.id, { slides });
                                             }} 
                                          />
                                       </div>

                                       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                          <div>
                                             <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Category / Tag</label>
                                             <input 
                                                type="text" 
                                                value={slide.tag || ""} 
                                                onChange={e => {
                                                   const slides = [...block.data.slides];
                                                   slides[sIdx] = { ...slides[sIdx], tag: e.target.value };
                                                   updateBlockData(block.id, { slides });
                                                }} 
                                                className="admin-input text-xs bg-white" 
                                                placeholder="e.g. ACADEMIC EXCELLENCE" 
                                             />
                                          </div>
                                          <div>
                                             <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Title Line 1</label>
                                             <input 
                                                type="text" 
                                                value={slide.titleLine1 || ""} 
                                                onChange={e => {
                                                   const slides = [...block.data.slides];
                                                   slides[sIdx] = { ...slides[sIdx], titleLine1: e.target.value };
                                                   updateBlockData(block.id, { slides });
                                                }} 
                                                className="admin-input text-xs bg-white font-semibold" 
                                                placeholder="e.g. Empowering" 
                                             />
                                          </div>
                                          <div>
                                             <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Title Line 2 (Highlighted)</label>
                                             <input 
                                                type="text" 
                                                value={slide.titleLine2 || ""} 
                                                onChange={e => {
                                                   const slides = [...block.data.slides];
                                                   slides[sIdx] = { ...slides[sIdx], titleLine2: e.target.value };
                                                   updateBlockData(block.id, { slides });
                                                }} 
                                                className="admin-input text-xs bg-white font-semibold text-[#FB7F05]" 
                                                placeholder="e.g. Future Minds" 
                                             />
                                          </div>
                                       </div>

                                       <div>
                                          <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Subtitle / Description</label>
                                          <textarea 
                                             value={slide.subtitle || ""} 
                                             onChange={e => {
                                                const slides = [...block.data.slides];
                                                slides[sIdx] = { ...slides[sIdx], subtitle: e.target.value };
                                                updateBlockData(block.id, { slides });
                                             }} 
                                             className="admin-input text-xs bg-white h-16" 
                                             placeholder="Brief summary text..." 
                                          />
                                       </div>

                                       <div className="grid grid-cols-2 gap-3">
                                          <div>
                                             <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">CTA Button Text</label>
                                             <input 
                                                type="text" 
                                                value={slide.ctaLabel || ""} 
                                                onChange={e => {
                                                   const slides = [...block.data.slides];
                                                   slides[sIdx] = { ...slides[sIdx], ctaLabel: e.target.value };
                                                   updateBlockData(block.id, { slides });
                                                }} 
                                                className="admin-input text-xs bg-white" 
                                                placeholder="e.g. APPLY FOR ADMISSION" 
                                             />
                                          </div>
                                          <div>
                                             <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">CTA Button Link</label>
                                             <input 
                                                type="text" 
                                                value={slide.ctaHref || ""} 
                                                onChange={e => {
                                                   const slides = [...block.data.slides];
                                                   slides[sIdx] = { ...slides[sIdx], ctaHref: e.target.value };
                                                   updateBlockData(block.id, { slides });
                                                }} 
                                                className="admin-input text-xs bg-white" 
                                                placeholder="e.g. /admissions" 
                                             />
                                          </div>
                                       </div>

                                       {/* Optional Slide-specific overrides */}
                                       <div className="pt-2 border-t border-gray-200/80 grid grid-cols-1 md:grid-cols-2 gap-3">
                                          <div>
                                             <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">
                                                Slide Opacity Override (%) <span className="font-normal text-gray-400 font-mono">(Optional)</span>
                                             </label>
                                             <input 
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={typeof slide.overlayOpacity === 'number' ? slide.overlayOpacity : ""}
                                                onChange={e => {
                                                   const val = e.target.value === "" ? undefined : parseInt(e.target.value);
                                                   const slides = [...block.data.slides];
                                                   slides[sIdx] = { ...slides[sIdx], overlayOpacity: val };
                                                   updateBlockData(block.id, { slides });
                                                }}
                                                className="admin-input text-xs bg-white"
                                                placeholder={`Inherited (${typeof block.data.overlayOpacity === 'number' ? block.data.overlayOpacity : 30}%)`}
                                             />
                                          </div>
                                          <div>
                                             <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">
                                                Slide Brightness Override (%) <span className="font-normal text-gray-400 font-mono">(Optional)</span>
                                             </label>
                                             <input 
                                                type="number"
                                                min="70"
                                                max="130"
                                                value={typeof slide.imageBrightness === 'number' ? slide.imageBrightness : ""}
                                                onChange={e => {
                                                   const val = e.target.value === "" ? undefined : parseInt(e.target.value);
                                                   const slides = [...block.data.slides];
                                                   slides[sIdx] = { ...slides[sIdx], imageBrightness: val };
                                                   updateBlockData(block.id, { slides });
                                                }}
                                                className="admin-input text-xs bg-white"
                                                placeholder={`Inherited (${typeof block.data.imageBrightness === 'number' ? block.data.imageBrightness : 100}%)`}
                                             />
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     )}

                     {block.type === 'INSTITUTIONAL_QUOTES_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Annotation</label>
                                 <input type="text" value={block.data.annotation || ""} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="e.g. Guiding Philosophy" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Title</label>
                                 <input type="text" value={block.data.title || ""} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="e.g. Words That Guide Our Vision" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subtitle</label>
                                 <input type="text" value={block.data.subtitle || ""} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="e.g. The foundational beliefs..." />
                              </div>
                           </div>

                           <div className="space-y-4 pt-2">
                              <label className="block text-xs font-bold text-gray-700 uppercase">Quotes List</label>
                              {block.data.quotes?.map((q: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-4 rounded-xl space-y-3 bg-gray-50/70 relative">
                                    <div className="flex justify-between items-center">
                                       <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Quote #{i + 1}</span>
                                       <button onClick={() => {
                                          const newQ = block.data.quotes.filter((_: any, idx: number) => idx !== i);
                                          updateBlockData(block.id, { quotes: newQ });
                                       }} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <div>
                                       <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Tag / Category Badge</label>
                                       <input type="text" value={q.tag || ""} onChange={e => {
                                          const newQ = [...block.data.quotes];
                                          newQ[i] = { ...newQ[i], tag: e.target.value };
                                          updateBlockData(block.id, { quotes: newQ });
                                       }} className="admin-input text-xs" placeholder="e.g. FOUNDATION BELIEF or OUR COMMITMENT" />
                                    </div>
                                    <div>
                                       <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Quote Text</label>
                                       <textarea value={q.quote || ""} onChange={e => {
                                          const newQ = [...block.data.quotes];
                                          newQ[i] = { ...newQ[i], quote: e.target.value };
                                          updateBlockData(block.id, { quotes: newQ });
                                       }} className="admin-input text-xs font-medium h-24" placeholder="Quote wording..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                       <div>
                                          <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Author / Credit</label>
                                          <input type="text" value={q.author || ""} onChange={e => {
                                             const newQ = [...block.data.quotes];
                                             newQ[i] = { ...newQ[i], author: e.target.value };
                                             updateBlockData(block.id, { quotes: newQ });
                                          }} className="admin-input text-xs" placeholder="e.g. School Creed" />
                                       </div>
                                       <div>
                                          <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Source / Publication</label>
                                          <input type="text" value={q.source || ""} onChange={e => {
                                             const newQ = [...block.data.quotes];
                                             newQ[i] = { ...newQ[i], source: e.target.value };
                                             updateBlockData(block.id, { quotes: newQ });
                                          }} className="admin-input text-xs" placeholder="e.g. Faith Model School Prospectus" />
                                       </div>
                                    </div>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { quotes: [...(block.data.quotes || []), { tag: "QUOTE", quote: "New inspiring quote...", author: "Author", source: "Faith Model School" }] })} className="px-4 py-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-semibold transition-all">
                                 + Add Another Quote
                              </button>
                           </div>
                        </div>
                     )}

                     {block.type === 'FOUNDER_CHAIRMAN_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Annotation</label>
                                 <input type="text" value={block.data.annotation || ""} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="e.g. Founding Pillars" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Title</label>
                                 <input type="text" value={block.data.title || ""} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="e.g. Founder & Chairman" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subtitle</label>
                                 <input type="text" value={block.data.subtitle || ""} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="e.g. The visionary leadership..." />
                              </div>
                           </div>

                           <div className="space-y-6 pt-2">
                              <label className="block text-xs font-bold text-gray-700 uppercase">Leadership Profiles & Messages</label>
                              {block.data.leaders?.map((ldr: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-5 rounded-2xl space-y-4 bg-gray-50/70">
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                       <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">{ldr.role || `Leader #${i+1}`} Details</span>
                                       <button onClick={() => {
                                          const newL = block.data.leaders.filter((_: any, idx: number) => idx !== i);
                                          updateBlockData(block.id, { leaders: newL });
                                       }} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                       <div>
                                          <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Role / Badge</label>
                                          <input type="text" value={ldr.role || ""} onChange={e => {
                                             const newL = [...block.data.leaders];
                                             newL[i] = { ...newL[i], role: e.target.value };
                                             updateBlockData(block.id, { leaders: newL });
                                          }} className="admin-input text-xs font-semibold" placeholder="e.g. FOUNDER or CHAIRMAN" />
                                       </div>
                                       <div>
                                          <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Full Name & Title</label>
                                          <input type="text" value={ldr.name || ""} onChange={e => {
                                             const newL = [...block.data.leaders];
                                             newL[i] = { ...newL[i], name: e.target.value };
                                             updateBlockData(block.id, { leaders: newL });
                                          }} className="admin-input text-xs font-bold" placeholder="e.g. Dr. S.A. Fazlulla" />
                                       </div>
                                    </div>

                                    <div>
                                       <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Profile Picture</label>
                                       <ImageUploader value={ldr.image || ""} onChange={url => {
                                          const newL = [...block.data.leaders];
                                          newL[i] = { ...newL[i], image: url };
                                          updateBlockData(block.id, { leaders: newL });
                                       }} />
                                    </div>

                                    <div>
                                       <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Biography / Career Background</label>
                                       <textarea value={ldr.bio || ""} onChange={e => {
                                          const newL = [...block.data.leaders];
                                          newL[i] = { ...newL[i], bio: e.target.value };
                                          updateBlockData(block.id, { leaders: newL });
                                       }} className="admin-input text-xs h-28" placeholder="Detailed bio describing medical/business background..." />
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-3">
                                       <div className="md:col-span-2">
                                          <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Message Box Title</label>
                                          <input type="text" value={ldr.messageTitle || ""} onChange={e => {
                                             const newL = [...block.data.leaders];
                                             newL[i] = { ...newL[i], messageTitle: e.target.value };
                                             updateBlockData(block.id, { leaders: newL });
                                          }} className="admin-input text-xs" placeholder="e.g. Founder's Message: or Chairman's Message:" />
                                       </div>
                                       <div>
                                          <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Theme Accent</label>
                                          <select value={ldr.theme || "amber"} onChange={e => {
                                             const newL = [...block.data.leaders];
                                             newL[i] = { ...newL[i], theme: e.target.value };
                                             updateBlockData(block.id, { leaders: newL });
                                          }} className="admin-input text-xs">
                                             <option value="amber">Warm Amber / Gold</option>
                                             <option value="blue">Royal Blue</option>
                                          </select>
                                       </div>
                                    </div>

                                    <div>
                                       <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Message / Quote Text</label>
                                       <textarea value={ldr.message || ""} onChange={e => {
                                          const newL = [...block.data.leaders];
                                          newL[i] = { ...newL[i], message: e.target.value };
                                          updateBlockData(block.id, { leaders: newL });
                                       }} className="admin-input text-xs italic font-medium h-24" placeholder="Personal message or advice to children/parents..." />
                                    </div>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { leaders: [...(block.data.leaders || []), { role: "LEADERSHIP", name: "Name", image: "", bio: "Bio", messageTitle: "Message:", message: "Message...", theme: "blue" }] })} className="px-4 py-2 bg-white border border-[#FB7F05] text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white rounded-lg text-xs font-semibold transition-all">
                                 + Add Another Leader
                              </button>
                           </div>
                        </div>
                     )}

                  </div>
               </div>
            ))
         )}
      </div>

      {/* Sections Library & Add Block Menu */}
      <div id="add-sections-library" className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
            <div>
               <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Add Page Section</h3>
               </div>
               <p className="text-xs text-gray-500 mt-1">Browse categorized components or search by name to insert sections into your page.</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input 
                  type="text" 
                  value={sectionSearch}
                  onChange={e => setSectionSearch(e.target.value)}
                  placeholder="Search sections (e.g. quote, founder, hero)..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
               />
               {sectionSearch && (
                  <button onClick={() => setSectionSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
               )}
            </div>
         </div>

         {/* Category Tabs */}
         <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Leadership & Quotes", "Heros & Banners", "Philosophy & Story", "Academics", "Campus & Media", "Forms & Admissions"].map((cat) => (
               <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                     selectedCategory === cat 
                        ? "bg-[#1a1a2e] text-white shadow-xs" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
               >
                  {cat}
               </button>
            ))}
         </div>

         {/* Filtered Sections Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-1">
            {SECTIONS_CATALOG
               .filter(sec => {
                  const matchesCat = selectedCategory === "All" || sec.category === selectedCategory;
                  const matchesQuery = !sectionSearch || 
                     sec.title.toLowerCase().includes(sectionSearch.toLowerCase()) || 
                     sec.desc.toLowerCase().includes(sectionSearch.toLowerCase()) ||
                     sec.type.toLowerCase().includes(sectionSearch.toLowerCase());
                  return matchesCat && matchesQuery;
               })
               .map((sec) => (
                  <div 
                     key={sec.type}
                     className="group border border-gray-200 hover:border-blue-500 rounded-xl p-4 bg-gray-50/40 hover:bg-blue-50/20 transition-all flex flex-col justify-between"
                  >
                     <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-gray-200">
                              {sec.category}
                           </span>
                           {sec.badge && (
                              <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                                 {sec.badge}
                              </span>
                           )}
                        </div>
                        <h4 className="font-poppins font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                           {sec.title}
                        </h4>
                        <p className="font-inter text-xs text-gray-500 leading-relaxed mb-4">
                           {sec.desc}
                        </p>
                     </div>

                     <button
                        onClick={() => addBlock(sec.type)}
                        className="w-full mt-auto py-2 px-3 bg-white hover:bg-blue-600 border border-gray-300 hover:border-blue-600 text-gray-800 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs group-hover:shadow-sm cursor-pointer"
                     >
                        <Plus className="w-3.5 h-3.5" />
                        Add to Page
                     </button>
                  </div>
               ))}
         </div>
      </div>
      </>
      )}
    </div>
  );
}
