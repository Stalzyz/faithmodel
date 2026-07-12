const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('/Users/stalinkumar/.gemini/antigravity-ide/brain/80c6b799-e9cb-449e-b501-a6f0c719743a/.system_generated/logs/transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let best = "";

  for await (const line of rl) {
    try {
      const parsed = JSON.parse(line);
      if (parsed.tool_calls) {
        for (const tc of parsed.tool_calls) {
          if (tc.name === 'write_to_file' || tc.name === 'replace_file_content') {
            if (tc.args.TargetFile === '/Users/stalinkumar/Documents/Faith_model/src/app/(public)/page.tsx' || tc.args.TargetFile === '"/Users/stalinkumar/Documents/Faith_model/src/app/(public)/page.tsx"') {
              let content = tc.args.CodeContent || tc.args.ReplacementContent;
              if (!content) continue;
              if (content.includes('School strokeWidth={1}')) {
                best = content;
              }
            }
          }
        }
      }
    } catch (e) {}
  }

  try {
     if (best.startsWith('"')) {
       best = JSON.parse(best);
     }
  } catch(e) {}
  fs.writeFileSync('sketchbook-page.tsx', best);
  console.log("Written sketchbook-page.tsx");
}
processLineByLine();
