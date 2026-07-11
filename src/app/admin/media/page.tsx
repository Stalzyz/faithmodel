import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { deleteMedia } from "@/actions/media";

export default async function AdminMediaList() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 font-poppins">Gallery Media</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage images for your campus gallery.</p>
        </div>
        <Link href="/admin/media/new" className="admin-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Media
        </Link>
      </div>

      <div className="admin-card">
        {media.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">
            No media assets found. Click "Add Media" to upload images.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {media.map((item) => (
              <div key={item.id} className="group relative rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                <div className="aspect-square w-full">
                  <img src={item.url} alt={item.altText || "Gallery Image"} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <form action={async () => {
                       "use server";
                       await deleteMedia(item.id);
                    }}>
                       <button type="submit" className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </form>
                  </div>
                  <div>
                     <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-sm uppercase tracking-wider mb-1">
                        {item.category}
                     </span>
                     {item.altText && (
                        <p className="text-xs text-white/80 line-clamp-2">{item.altText}</p>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
