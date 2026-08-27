import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_TOP_NAV = [
  {
    title: "About",
    items: [
      { label: "Our Story", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Disclosures", href: "/mandatory-disclosure" },
    ]
  },
  {
    title: "Academics",
    items: [
      { label: "Approach", href: "/academics" },
      { label: "School Levels", href: "/school-levels" },
      { label: "Teachers", href: "/teachers" },
      { label: "Innovation", href: "/innovation" },
    ]
  },
  {
    title: "Campus",
    items: [
      { label: "The Campus", href: "/campus" },
      { label: "Facilities", href: "/facilities" },
      { label: "Sports", href: "/sports" },
      { label: "Arts", href: "/arts" },
      { label: "Student Life", href: "/student-life" },
      { label: "Safety", href: "/safety" },
    ]
  },
  {
    title: "Community",
    items: [
      { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
      { label: "Students", href: "/students" },
      { label: "Parents", href: "/parents" },
      { label: "Alumni", href: "/alumni" },
    ]
  },
  {
    title: "Admissions",
    items: [
      { label: "Admissions", href: "/admissions" },
      { label: "Portals", href: "/portals" },
      { label: "Downloads", href: "/downloads" },
      { label: "Contact Us", href: "/contact" },
    ]
  }
];

const DEFAULT_FOOTER_NAV = [
  {
    title: "Quick Links",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Academics", href: "/academics" },
      { label: "Admissions", href: "/admissions" },
      { label: "Campus", href: "/campus" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Students & Parents",
    items: [
      { label: "Parent Portal", href: "/parents" },
      { label: "Student Portal", href: "/students" },
      { label: "Fee Payment", href: "/parents#fees" },
      { label: "Downloads", href: "/downloads" },
      { label: "Mandatory Disclosure", href: "/mandatory-disclosure" }
    ]
  }
];

async function main() {
  await prisma.setting.upsert({
    where: { key: "TOP_NAV" },
    update: { value: JSON.stringify(DEFAULT_TOP_NAV) },
    create: { key: "TOP_NAV", value: JSON.stringify(DEFAULT_TOP_NAV) }
  });

  await prisma.setting.upsert({
    where: { key: "FOOTER_NAV" },
    update: { value: JSON.stringify(DEFAULT_FOOTER_NAV) },
    create: { key: "FOOTER_NAV", value: JSON.stringify(DEFAULT_FOOTER_NAV) }
  });

  console.log("RESTORED_DETAILED_NAVIGATION_IN_DB_SUCCESSFULLY");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
