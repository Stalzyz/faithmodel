import { prisma } from "@/lib/prisma";
import NavigationEditor from "@/components/admin/NavigationEditor";

export default async function NavigationSettingsPage() {
  const topNavSetting = await prisma.setting.findUnique({ where: { key: "TOP_NAV" } });
  const footerNavSetting = await prisma.setting.findUnique({ where: { key: "FOOTER_NAV" } });
  const headerConfigSetting = await prisma.setting.findUnique({ where: { key: "HEADER_CONFIG" } });

  const topNav = topNavSetting ? JSON.parse(topNavSetting.value) : undefined;
  const footerNav = footerNavSetting ? JSON.parse(footerNavSetting.value) : undefined;
  const headerConfig = headerConfigSetting ? JSON.parse(headerConfigSetting.value) : undefined;

  return (
    <div className="bg-[#f8f9fa] min-h-full pt-8">
      <NavigationEditor initialTopNav={topNav} initialFooterNav={footerNav} initialHeaderConfig={headerConfig} />
    </div>
  );
}
