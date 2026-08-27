import { prisma } from "@/lib/prisma";
import PopupSettingsEditor from "./PopupSettingsEditor";

export default async function PopupSettingsPage() {
  const popupSetting = await prisma.setting.findUnique({ where: { key: "POPUP_CONFIG" } });
  const popup = popupSetting ? JSON.parse(popupSetting.value) : undefined;

  return (
    <div className="w-full">
      <PopupSettingsEditor initialPopup={popup} />
    </div>
  );
}
