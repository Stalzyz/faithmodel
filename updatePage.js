const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src/app/(public)/[...slug]/page.tsx');
const destPath = path.join(__dirname, 'src/app/(public)/page.tsx');

let content = fs.readFileSync(srcPath, 'utf8');

// We need to change the function name, remove the params arg, and hardcode the slug to "home".
content = content.replace(
  /export async function generateMetadata\(\{ params \}: \{ params: Promise<\{ slug: string\[\] \}> \}\): Promise<Metadata> \{[\s\S]*?const slugPath = resolvedParams.slug.join\("\/"\);/,
  \`export async function generateMetadata(): Promise<Metadata> {
  const slugPath = "home";\`
);

content = content.replace(
  /export default async function CustomDynamicPage\(\{ params \}: \{ params: Promise<\{ slug: string\[\] \}> \}\) \{[\s\S]*?const slugPath = resolvedParams.slug.join\("\/"\);/,
  \`export default async function Home() {
  const slugPath = "home";\`
);

fs.writeFileSync(destPath, content);
console.log('Replaced page.tsx with dynamic rendering logic');
