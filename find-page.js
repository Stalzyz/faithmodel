const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('/Users/stalinkumar/.gemini/antigravity-ide/brain/80c6b799-e9cb-449e-b501-a6f0c719743a/.system_generated/logs/transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const parsed = JSON.parse(line);
      if (parsed.tool_calls) {
        for (const tc of parsed.tool_calls) {
          if (tc.name === 'write_to_file' || tc.name === 'replace_file_content') {
            if (tc.args.TargetFile && tc.args.TargetFile.includes('page.tsx') && !tc.args.TargetFile.includes('admin') && tc.args.TargetFile.endsWith('page.tsx')) {
              console.log("---- FOUND MATCH ----");
              console.log(tc.args.TargetFile);
              console.log(tc.args.CodeContent ? tc.args.CodeContent.substring(0, 200) : tc.args.ReplacementContent?.substring(0, 200));
            }
          }
        }
      }
    } catch (e) {}
  }
}

processLineByLine();
