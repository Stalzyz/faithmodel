"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveNavSettings(topNav: any, footerNav: any, headerConfig?: any) {
  try {
    await prisma.setting.upsert({
      where: { key: "TOP_NAV" },
      update: { value: JSON.stringify(topNav) },
      create: { key: "TOP_NAV", value: JSON.stringify(topNav) }
    });

    await prisma.setting.upsert({
      where: { key: "FOOTER_NAV" },
      update: { value: JSON.stringify(footerNav) },
      create: { key: "FOOTER_NAV", value: JSON.stringify(footerNav) }
    });

    if (headerConfig) {
      await prisma.setting.upsert({
        where: { key: "HEADER_CONFIG" },
        update: { value: JSON.stringify(headerConfig) },
        create: { key: "HEADER_CONFIG", value: JSON.stringify(headerConfig) }
      });
    }

    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save navigation:", error);
    return { success: false, error: "Failed to save settings." };
  }
}

export async function saveSiteSettings(key: string, value: any) {
  try {
    await prisma.setting.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) }
    });

    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
    return { success: false, error: "Failed to save setting." };
  }
}
