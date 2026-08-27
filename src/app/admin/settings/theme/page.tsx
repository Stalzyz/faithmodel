import { prisma } from "@/lib/prisma";
import ThemeSettingsEditor from "./ThemeSettingsEditor";

export default async function ThemeSettingsPage() {
  const themeSetting = await prisma.setting.findUnique({ where: { key: "THEME_CONFIG" } });
  const theme = themeSetting ? JSON.parse(themeSetting.value) : undefined;

  return (
    <div className="w-full">
      <ThemeSettingsEditor initialTheme={theme} />
    </div>
  );
}
