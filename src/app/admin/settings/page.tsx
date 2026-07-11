import { prisma } from "@/lib/prisma";
import GeneralSettings from "./GeneralSettings";

export default async function SettingsPage() {
  const setting = await prisma.setting.findUnique({ where: { key: "SITE_GENERAL" } });
  const data = setting ? JSON.parse(setting.value) : undefined;

  return <GeneralSettings initialData={data} />;
}
