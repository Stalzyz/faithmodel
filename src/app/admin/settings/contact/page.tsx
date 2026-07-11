import { prisma } from "@/lib/prisma";
import ContactSettings from "./ContactSettings";

export default async function ContactSettingsPage() {
  const contactSetting = await prisma.setting.findUnique({ where: { key: "SITE_CONTACT" } });
  const socialsSetting = await prisma.setting.findUnique({ where: { key: "SITE_SOCIALS" } });

  const contactData = contactSetting ? JSON.parse(contactSetting.value) : undefined;
  const socialsData = socialsSetting ? JSON.parse(socialsSetting.value) : undefined;

  return <ContactSettings initialContact={contactData} initialSocials={socialsData} />;
}
