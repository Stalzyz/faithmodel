"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveMedia(data: {
  url: string;
  altText?: string;
  category: string;
}) {
  try {
    await prisma.media.create({
      data: {
        url: data.url,
        altText: data.altText,
        category: data.category,
      }
    });

    revalidatePath("/admin/media");
    revalidatePath("/gallery");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save media:", error);
    return { success: false, error: "Failed to save media asset." };
  }
}

export async function deleteMedia(id: string) {
  try {
    await prisma.media.delete({ where: { id } });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete media asset." };
  }
}

// Get all unique categories (albums) with their count and latest image
export async function getAlbums() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const albumsMap = new Map<string, { count: number, cover: string, latestDate: Date }>();

    for (const item of media) {
      const album = albumsMap.get(item.category);
      if (album) {
        album.count += 1;
      } else {
        albumsMap.set(item.category, {
          count: 1,
          cover: item.url,
          latestDate: item.createdAt
        });
      }
    }

    const albums = Array.from(albumsMap.entries()).map(([title, data]) => ({
      title,
      ...data
    }));

    return { success: true, albums };
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    return { success: false, error: "Failed to fetch albums." };
  }
}

// Get all media for a specific album
export async function getAlbumMedia(category: string) {
  try {
    const media = await prisma.media.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, media };
  } catch (error) {
    console.error("Failed to fetch album media:", error);
    return { success: false, error: "Failed to fetch media." };
  }
}

// Add multiple images to an album
export async function addMediaToAlbum(category: string, urls: string[]) {
  try {
    await prisma.media.createMany({
      data: urls.map(url => ({
        url,
        category,
        altText: category
      }))
    });

    revalidatePath("/admin/gallery");
    revalidatePath(`/admin/gallery/${category}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to add media:", error);
    return { success: false, error: "Failed to add media." };
  }
}

// Delete an entire album
export async function deleteAlbum(category: string) {
  try {
    await prisma.media.deleteMany({
      where: { category }
    });
    
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete album:", error);
    return { success: false, error: "Failed to delete album." };
  }
}
