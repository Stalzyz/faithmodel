import { getEmailSettings } from "@/lib/mail";
import EmailSettingsClient from "./EmailSettingsClient";

export const dynamic = "force-dynamic";

export default async function EmailSettingsPage() {
  const initialSettings = await getEmailSettings();
  return <EmailSettingsClient initialSettings={initialSettings} />;
}
