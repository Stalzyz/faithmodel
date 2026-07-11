import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditPageClient from "./EditPageClient";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const page = await prisma.page.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!page) {
    notFound();
  }

  // Parse the stored JSON blocks
  let initialBlocks = [];
  let initialSeo = {};
  
  try {
    const payload = page.content ? JSON.parse(page.content) : [];
    if (Array.isArray(payload)) {
       initialBlocks = payload;
    } else {
       initialBlocks = payload.blocks || [];
       initialSeo = payload.seo || {};
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <EditPageClient 
      pageId={page.id} 
      initialTitle={page.title} 
      initialSlug={page.slug} 
      initialBlocks={initialBlocks}
      initialSeo={initialSeo} 
      isPublished={page.isPublished} 
    />
  );
}
