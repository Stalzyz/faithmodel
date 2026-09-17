import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const homePage = await prisma.page.findFirst({
    where: { slug: { in: ["", "home"] } }
  });

  if (!homePage) {
    console.log("No home page found.");
    return;
  }

  let payload: any = {};
  try {
    payload = JSON.parse(homePage.content);
  } catch (e) {
    payload = { blocks: [] };
  }

  let blocks: any[] = Array.isArray(payload) ? payload : (payload.blocks || []);

  const exists = blocks.some(b => b.type === "ADMISSIONS_SPOTLIGHT_BLOCK");
  if (!exists) {
    const admissionsBlock = {
      id: "admissions-spotlight-" + Math.random().toString(36).substr(2, 6),
      type: "ADMISSIONS_SPOTLIGHT_BLOCK",
      data: {
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
      }
    };

    // Insert right after HOMEPAGE_HERO_BLOCK if present, else at beginning
    const heroIdx = blocks.findIndex(b => b.type === "HOMEPAGE_HERO_BLOCK");
    if (heroIdx !== -1) {
      blocks.splice(heroIdx + 1, 0, admissionsBlock);
    } else {
      blocks.unshift(admissionsBlock);
    }

    const updatedContent = Array.isArray(payload) ? JSON.stringify(blocks) : JSON.stringify({ ...payload, blocks });

    await prisma.page.update({
      where: { id: homePage.id },
      data: { content: updatedContent }
    });

    console.log("Successfully injected ADMISSIONS_SPOTLIGHT_BLOCK into Home page content.");
  } else {
    console.log("ADMISSIONS_SPOTLIGHT_BLOCK already present in Home page.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
