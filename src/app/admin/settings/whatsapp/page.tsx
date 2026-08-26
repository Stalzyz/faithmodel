import { prisma } from "@/lib/prisma";
import WhatsAppSettingsEditor from "./WhatsAppSettingsEditor";

export default async function WhatsAppSettingsPage() {
  const setting = await prisma.setting.findUnique({ where: { key: "SITE_WHATSAPP" } });
  const settings = setting ? JSON.parse(setting.value) : undefined;

  return (
    <div className="bg-[#f8f9fa] min-h-full py-8">
      <WhatsAppSettingsEditor initialSettings={settings} />
    </div>
  );
}
