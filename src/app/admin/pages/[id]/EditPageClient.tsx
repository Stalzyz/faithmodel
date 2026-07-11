"use client";

import PageBuilder, { PageBlock } from "@/components/admin/PageBuilder";
import { savePage } from "@/actions/cms";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditPageClient({
  pageId,
  initialTitle,
  initialSlug,
  initialBlocks,
  initialSeo,
  isPublished
}: {
  pageId: string;
  initialTitle: string;
  initialSlug: string;
  initialBlocks: PageBlock[];
  initialSeo: any;
  isPublished: boolean;
}) {
  const router = useRouter();

  const handleSave = async (data: { title: string; slug: string; blocks: PageBlock[]; seo: any; isPublished: boolean }) => {
    // Pass pageId so the server action updates instead of creates
    const res = await savePage({ ...data, pageId });
    if (res.success) {
      router.push("/admin/pages");
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-full">
      <div className="max-w-4xl mx-auto pt-8 pb-4 px-4 sm:px-0">
        <Link href="/admin/pages" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Pages
        </Link>
      </div>
      <PageBuilder 
        initialTitle={initialTitle}
        initialSlug={initialSlug}
        initialBlocks={initialBlocks}
        initialSeo={initialSeo}
        isPublished={isPublished}
        onSave={handleSave} 
      />
    </div>
  );
}
