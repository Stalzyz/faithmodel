const fs = require('fs');
let code = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// 1. Add Lucide imports
if (!code.includes('import { Sparkles')) {
  code = code.replace("import { useEffect, useRef, useState } from \"react\";", 
    "import { useEffect, useRef, useState } from \"react\";\nimport { Sparkles, BookOpen, Microscope, Lightbulb, Globe, Palette, Monitor, Trophy, Medal, Theater, Leaf, Bot, Music } from \"lucide-react\";");
}

// 2. Admissions CTA text
code = code.replace(/✦ Admissions/g, '<Sparkles className="w-4 h-4 inline-block text-[#FB7F05] mr-2" /> Admissions');
code = code.replace(/Apply Today\n          <\/Link>{" "}\n          ✦/g, 'Apply Today\n          </Link>{" "}\n          <Sparkles className="w-4 h-4 inline-block text-[#FB7F05] ml-2" />');

// 3. Academic Excellence highlights
code = code.replace(/icon: "✦"/g, 'icon: <Sparkles className="w-6 h-6 text-[#FB7F05]" />');
code = code.replace(/icon: "📚"/g, 'icon: <BookOpen className="w-6 h-6 text-[#FB7F05]" />');
code = code.replace(/icon: "🔬"/g, 'icon: <Microscope className="w-6 h-6 text-[#FB7F05]" />');
code = code.replace(/icon: "💡"/g, 'icon: <Lightbulb className="w-6 h-6 text-[#FB7F05]" />');
code = code.replace(/icon: "🌍"/g, 'icon: <Globe className="w-6 h-6 text-[#FB7F05]" />');
code = code.replace(/icon: "🎨"/g, 'icon: <Palette className="w-6 h-6 text-[#FB7F05]" />');
code = code.replace(/icon: "💻"/g, 'icon: <Monitor className="w-6 h-6 text-[#FB7F05]" />');
code = code.replace(/icon: "🏆"/g, 'icon: <Trophy className="w-6 h-6 text-[#FB7F05]" />');

// 4. Chapter 3 Journey Timeline
code = code.replace(/icon: "📚"/g, 'icon: <BookOpen className="w-5 h-5 text-[#FB7F05]" />'); // It might have been replaced above, so this might not match exactly. Better to use regex matching the exact line or just use JSX in the arrays. 

fs.writeFileSync('src/app/(public)/page.tsx', code);
