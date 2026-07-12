const fs = require('fs');
let code = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// Replace AchievementsTicker
code = code.replace(
  /const items = \["🏆 National Science Olympiad Champions 2025".*\];/,
  `const items = [
    { icon: <Trophy className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" />, text: "National Science Olympiad Champions 2025" },
    { icon: <Medal className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" />, text: "CBSE Cluster Athletics Gold Medal" },
    { icon: <Theater className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" />, text: "State Drama Festival Best Production" },
    { icon: <Monitor className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" />, text: "NASSCOM Young Coder Award" },
    { icon: <Leaf className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" />, text: "Green School National Award" },
    { icon: <BookOpen className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" />, text: "100% Board Pass Rate — 10 consecutive years" },
    { icon: <Bot className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" />, text: "FIRST Robotics Qualifier 2025" },
    { icon: <Music className="w-5 h-5 text-[#FB7F05] inline-block mr-2 -mt-1" />, text: "National Music Talent Award" }
  ];`
);

// Fix the map rendering for items
code = code.replace(
  /<span key={i} className="font-caveat text-lg text-\[\#4a4a5e\] shrink-0">{item}<\/span>/g,
  '<span key={i} className="font-caveat text-lg text-[#4a4a5e] shrink-0">{item.icon}{item.text}</span>'
);

fs.writeFileSync('src/app/(public)/page.tsx', code);
console.log('Achievements ticker fixed');
