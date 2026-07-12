import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@faithmodel.com" },
    update: {},
    create: {
      email: "admin@faithmodel.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user created/verified:", admin.email);

  // 2. Create Home Page
  const newHero = {
    id: "moodboard-hero-seed",
    type: "MOODBOARD_HERO",
    data: {
      headline: "Empowering the Next Generation",
      subheadline: "A legacy of excellence since 1989",
      primaryCtaLabel: "Apply Now",
      primaryCtaHref: "/admissions",
      images: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1470&auto=format&fit=crop"
      ]
    }
  };
  
  const payload = {
    blocks: [newHero],
    seo: { title: "Home", description: "Faith Model School", keywords: "school, faith model" }
  };

  const home = await prisma.page.upsert({
    where: { slug: "" },
    update: {},
    create: {
      title: "Home",
      slug: "",
      content: JSON.stringify(payload),
      isPublished: true,
    },
  });
  console.log("Home page seeded successfully!");

  // 3. Create Navigation Setting
  const defaultNav = [
    { title: "Home", items: [{ label: "Welcome", href: "/" }] },
    { title: "About", items: [{ label: "Our Story", href: "/about" }] }
  ];
  
  await prisma.setting.upsert({
    where: { key: "NAVIGATION" },
    update: {},
    create: {
      key: "NAVIGATION",
      value: JSON.stringify(defaultNav),
    },
  });
  console.log("Navigation settings seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
