"use client";

import { useState } from "react";
import { Folder, Plus, Image as ImageIcon, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteAlbum } from "@/actions/media";

export default function GalleryAlbumList({ initialAlbums }: { initialAlbums: any[] }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [deletingAlbum, setDeletingAlbum] = useState<string | null>(null);

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newAlbumName.trim();
    if (!cleanName) return;
    router.push(`/admin/gallery/${encodeURIComponent(cleanName)}`);
  };

  const handleDeleteAlbum = async (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm(`Are you sure you want to delete the entire "${title}" album and all of its photos?`)) {
      return;
    }

    setDeletingAlbum(title);
    const res = await deleteAlbum(title);
    setDeletingAlbum(null);

    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || "Failed to delete album.");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto h-full pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">Media & Photo Albums</h1>
          <p className="text-gray-500 text-sm mt-1">Organize your school photos into albums and upload media.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="admin-btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Album
          </button>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="mt-2">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Folder className="w-4 h-4 text-gray-400" /> Existing Albums ({initialAlbums?.length || 0})
        </h2>

        {(!initialAlbums || initialAlbums.length === 0) ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-800 font-semibold text-lg">No albums created yet</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Create your first album (e.g. Campus, Sports Day, Annual Function) and start uploading high-resolution photos.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-4 py-2.5 bg-[#FB7F05] text-white rounded-lg text-sm font-semibold hover:bg-[#e06f00] transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create Your First Album
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {initialAlbums.map((album: any, i: number) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col relative"
              >
                <Link
                  href={`/admin/gallery/${encodeURIComponent(album.title)}`}
                  className="block relative h-48 overflow-hidden bg-gray-100"
                >
                  {album.cover ? (
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                      <Folder className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-xs font-semibold text-white flex items-center gap-1">
                      Manage Photos <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>

                <div className="p-4 flex justify-between items-start flex-1">
                  <Link
                    href={`/admin/gallery/${encodeURIComponent(album.title)}`}
                    className="flex-1 min-w-0 pr-2"
                  >
                    <h3 className="font-semibold text-gray-900 text-base mb-0.5 truncate hover:text-[#FB7F05] transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {album.count} photos • {album.latestDate ? new Date(album.latestDate).toLocaleDateString() : ""}
                    </p>
                  </Link>

                  <button
                    onClick={(e) => handleDeleteAlbum(e, album.title)}
                    disabled={deletingAlbum === album.title}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors shrink-0"
                    title="Delete entire album"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Album Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Create New Photo Album</h3>
            <p className="text-xs text-gray-500 mb-4">
              Enter an album title (e.g. "Science Expo 2026", "Campus Life", "Sports Meet"). You will be redirected to upload photos.
            </p>

            <form onSubmit={handleCreateAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Album Title</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newAlbumName}
                  onChange={(e) => setNewAlbumName(e.target.value)}
                  className="admin-input text-sm"
                  placeholder="e.g. Sports Day 2026"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newAlbumName.trim()}
                  className="px-4 py-2 bg-[#FB7F05] text-white rounded-lg text-xs font-semibold hover:bg-[#e06f00] disabled:opacity-50"
                >
                  Continue to Upload ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
