const fs = require('fs');
const path = require('path');

const pbPath = path.join(__dirname, 'src/components/admin/PageBuilder.tsx');
let content = fs.readFileSync(pbPath, 'utf8');

const newTypes = [
  'WELCOME_BLOCK',
  'STATS_BLOCK',
  'WHY_CHOOSE_US_BLOCK',
  'PHILOSOPHY_SECTION_BLOCK',
  'ACADEMIC_EXCELLENCE_BLOCK',
  'STUDENT_JOURNEY_BLOCK',
  'CAMPUS_EXPERIENCE_BLOCK',
  'FACILITIES_OVERVIEW_BLOCK',
  'FEATURED_PROGRAMS_BLOCK',
  'ACHIEVEMENTS_TICKER_BLOCK',
  'UPCOMING_EVENTS_BLOCK',
  'TESTIMONIALS_BLOCK',
  'CUSTOM_HTML_BLOCK'
];

// Add to BlockType
content = content.replace(
  /export type BlockType = (.*?);/,
  \`export type BlockType = $1 | "\${newTypes.join('" | "')}";\`
);

const newDefaults = \`
  WELCOME_BLOCK: { logoText: "FM", title: "Welcome to Faith Model", quote: "At Faith Model School, we believe...", author: "Amina M., M.A., B.Ed.", role: "Principal" },
  STATS_BLOCK: { annotation: "School at a Glance", title: "By the Numbers", stats: [{ num: "35+", label: "Years", note: "Est. 1989" }] },
  WHY_CHOOSE_US_BLOCK: { annotation: "Why Faith Model?", title: "Our Educational Promise", subtitle: "", pillars: [] },
  PHILOSOPHY_SECTION_BLOCK: { annotation: "Our Philosophy", title: "Where Curiosity Meets Character", subtitle: "", items: [], imageUrl: "", imageCaption: "" },
  ACADEMIC_EXCELLENCE_BLOCK: { annotation: "Academics", title: "A Journey of Learning", subtitle: "", programs: [] },
  STUDENT_JOURNEY_BLOCK: { annotation: "The Journey", title: "Your Child's Story", stages: [] },
  CAMPUS_EXPERIENCE_BLOCK: { annotation: "Campus Life", title: "A World of Possibilities", subtitle: "", image1: "", image2: "", features: [], ctaText: "", ctaLink: "" },
  FACILITIES_OVERVIEW_BLOCK: { annotation: "Infrastructure", title: "World-Class Facilities", subtitle: "", facilities: [], ctaText: "", ctaLink: "" },
  FEATURED_PROGRAMS_BLOCK: { annotation: "Signature Programs", title: "Featured Programs", subtitle: "", programs: [] },
  ACHIEVEMENTS_TICKER_BLOCK: { items: [] },
  UPCOMING_EVENTS_BLOCK: { annotation: "Mark the Calendar", title: "Upcoming Events", ctaText: "", ctaLink: "", events: [] },
  TESTIMONIALS_BLOCK: { annotation: "What Our Parents Say", testimonials: [] },
  CUSTOM_HTML_BLOCK: { html: "<p>Custom HTML here</p>" },\`;

// Add to DEFAULT_BLOCKS
content = content.replace(
  /const DEFAULT_BLOCKS: Record<BlockType, any> = {/,
  \`const DEFAULT_BLOCKS: Record<BlockType, any> = {\${newDefaults}\`
);

// We also need to add them to the select dropdown, but the select dropdown in PageBuilder might just iterate over keys or might be hardcoded.
// Let's check how it's rendered. If it's hardcoded, we need to add them. Let's assume we don't have to change it if it uses Object.keys.
// Wait, looking at PageBuilder.tsx, it might have a hardcoded list. Let's see.

fs.writeFileSync(pbPath, content);
console.log('Updated PageBuilder.tsx types and defaults');
