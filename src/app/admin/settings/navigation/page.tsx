import { prisma } from "@/lib/prisma";
import NavigationEditor from "@/components/admin/NavigationEditor";

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

export default async function NavigationSettingsPage() {
  const topNavSetting = await prisma.setting.findUnique({ where: { key: "TOP_NAV" } });
  const footerNavSetting = await prisma.setting.findUnique({ where: { key: "FOOTER_NAV" } });
  const headerConfigSetting = await prisma.setting.findUnique({ where: { key: "HEADER_CONFIG" } });

  const parsedTopNav = topNavSetting ? JSON.parse(topNavSetting.value) : undefined;
  const parsedFooterNav = footerNavSetting ? JSON.parse(footerNavSetting.value) : undefined;
  const headerConfig = headerConfigSetting ? JSON.parse(headerConfigSetting.value) : undefined;

  const topNav = (Array.isArray(parsedTopNav) && parsedTopNav.length > 0) ? parsedTopNav : DEFAULT_TOP_NAV;
  const footerNav = (Array.isArray(parsedFooterNav) && parsedFooterNav.length > 0) ? parsedFooterNav : DEFAULT_FOOTER_NAV;

  return (
    <div className="w-full">
      <NavigationEditor initialTopNav={topNav} initialFooterNav={footerNav} initialHeaderConfig={headerConfig} />
    </div>
  );
}
