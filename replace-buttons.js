const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// Replace the specific Admissions button colors
content = content.replace(/text-\[\#1a1a2e\] px-8 py-4 border border-\[\#1a1a2e\] hover:bg-\[\#1a1a2e\]/g, 'text-[#FB7F05] px-8 py-4 border border-[#FB7F05] hover:bg-[#FB7F05]');

// And the Admissions CTA ribbon at the top:
content = content.replace(/bg-\[\#1a1a2e\] py-2.5/g, 'bg-[#FB7F05] py-2.5');

// Find other Link buttons with border-[#1a1a2e]
content = content.replace(/border-b border-\[\#1a1a2e\]/g, 'border-b border-[#FB7F05]');
// And text for those links?
content = content.replace(/text-\[\#1a1a2e\] border-b border-\[\#FB7F05\]/g, 'text-[#FB7F05] border-b border-[#FB7F05]');

fs.writeFileSync('src/app/(public)/page.tsx', content);
console.log('Button colors updated in page.tsx');
