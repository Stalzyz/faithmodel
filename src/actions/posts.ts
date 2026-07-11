"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePost(data: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  tag?: string;
  isPublished: boolean;
  postId?: string;
}) {
  try {
    if (data.postId) {
      await prisma.post.update({
        where: { id: data.postId },
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          coverImage: data.coverImage,
          tag: data.tag,
          isPublished: data.isPublished,
        }
      });
    } else {
      await prisma.post.create({
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          coverImage: data.coverImage,
          tag: data.tag,
          isPublished: data.isPublished,
        }
      });
    }

    revalidatePath("/admin/posts");
    revalidatePath("/news");
    revalidatePath(`/news/${data.slug}`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save post:", error);
    return { success: false, error: "Failed to save post." };
  }
}
