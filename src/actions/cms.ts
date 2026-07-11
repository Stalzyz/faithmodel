"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePage(data: {
  title: string;
  slug: string;
  blocks: any[];
  seo?: any;
  isPublished: boolean;
  pageId?: string;
}) {
  try {
    const content = JSON.stringify({ blocks: data.blocks, seo: data.seo || {} });
    
    if (data.pageId) {
      // Update existing
      await prisma.page.update({
        where: { id: data.pageId },
        data: {
          title: data.title,
          slug: data.slug,
          content,
          isPublished: data.isPublished,
        }
      });
    } else {
      // Create new
      await prisma.page.create({
        data: {
          title: data.title,
          slug: data.slug,
          content,
          isPublished: data.isPublished,
        }
      });
    }

    revalidatePath("/admin/pages");
    revalidatePath(`/${data.slug}`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save page:", error);
    return { success: false, error: "Failed to save page." };
  }
}
