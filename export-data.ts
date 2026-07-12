import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  console.log("Exporting local database...");

  const pages = await prisma.page.findMany();
  const posts = await prisma.post.findMany();
  const media = await prisma.media.findMany();
  const settings = await prisma.setting.findMany();
  const users = await prisma.user.findMany();
  const data = {
    pages,
    posts,
    media,
    settings,
    users
  };

  fs.writeFileSync("dump.json", JSON.stringify(data, null, 2));
  console.log("Export complete! Saved to dump.json.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
