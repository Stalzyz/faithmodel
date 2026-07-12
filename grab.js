const fs = require('fs');
const rl = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('/Users/stalinkumar/.gemini/antigravity-ide/brain/80c6b799-e9cb-449e-b501-a6f0c719743a/.system_generated/logs/transcript_full.jsonl');
  const reader = rl.createInterface({ input: fileStream });

  let best = "";

  for await (const line of reader) {
    try {
      const parsed = JSON.parse(line);
      if (parsed.tool_calls) {
        for (const tc of parsed.tool_calls) {
          if (tc.name === 'write_to_file' || tc.name === 'replace_file_content') {
            if (tc.args.TargetFile === '/Users/stalinkumar/Documents/Faith_model/src/app/(public)/page.tsx' || tc.args.TargetFile === '"/Users/stalinkumar/Documents/Faith_model/src/app/(public)/page.tsx"') {
              let content = tc.args.CodeContent;
              if (!content) continue;
              // If it's a JSON string, it might be escaped.
              if (content.includes('SketchbookHero')) {
                best = content;
              }
            }
          }
        }
      }
    } catch (e) {}
  }
  
  // If we found it, write it. If it starts with quotes, parse it.
  try {
     if (best.startsWith('"')) {
       best = JSON.parse(best);
     }
  } catch(e) {}
  fs.writeFileSync('restored-page.tsx', best);
}
processLineByLine();
