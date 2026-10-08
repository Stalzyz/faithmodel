"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deletePost } from "@/actions/posts";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    const res = await deletePost(id);
    setLoading(false);

    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || "Failed to delete post.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50 disabled:opacity-50"
      title="Delete Post"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin text-red-500" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
