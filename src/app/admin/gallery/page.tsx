import { getAlbums } from "@/actions/media";
import { Folder, MoreVertical, Search, Plus, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default async function GalleryManagerPage() {
  const { albums } = await getAlbums();

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto h-full">
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Media & Gallery</h1>
        {/* We can build a modal for this, but for now they can just navigate to a new category via the URL or we use a client component wrapper. For simplicity we will add a small client component next. */}
      </div>

      {/* Albums Grid */}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Folder className="w-5 h-5 text-slate-400" /> Existing Albums
        </h2>
        
        {albums?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-slate-600 font-medium">No albums created yet.</h3>
            <p className="text-sm text-slate-400 mt-1">Navigate to <code className="bg-slate-100 px-1 rounded">/admin/gallery/Album-Name</code> to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {albums?.map((album: any, i: number) => (
              <Link href={`/admin/gallery/${encodeURIComponent(album.title)}`} key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group block">
                <div className="relative h-48 overflow-hidden bg-slate-100 flex items-center justify-center">
                  {album.cover ? (
                    <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Folder className="w-12 h-12 text-slate-300" />
                  )}
                </div>
                <div className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1 truncate pr-2">{album.title}</h3>
                    <p className="text-xs text-slate-500">{album.count} items • {new Date(album.latestDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
