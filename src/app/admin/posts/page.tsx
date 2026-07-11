import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default async function AdminPostsList() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 font-poppins">Blog & News</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage announcements, news, and blog articles.</p>
        </div>
        <Link href="/admin/posts/new" className="admin-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Write Post
        </Link>
      </div>

      <div className="admin-card overflow-hidden p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="p-4 pl-6">Title</th>
              <th className="p-4">Tag</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 text-sm">
                  No posts yet. Click "Write Post" to get started.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 pl-6 font-medium text-gray-900 text-sm">{post.title}</td>
                  <td className="p-4 text-gray-500 text-sm">
                    {post.tag && <span className="bg-gray-100 px-2 py-1 rounded text-xs">{post.tag}</span>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${post.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 pr-6 flex justify-end gap-3">
                    <Link href={`/admin/posts/${post.id}`} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
