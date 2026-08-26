import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Users, FileText, ImageIcon, Settings } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  // Fetch quick stats
  const pagesCount = await prisma.page.count();
  const postsCount = await prisma.post.count();
  const mediaCount = await prisma.media.count();
  const usersCount = await prisma.user.count();

  const stats = [
    { name: "Published Pages", value: pagesCount, icon: FileText, color: "text-green-600", bg: "bg-green-50" },
    { name: "Blog Posts", value: postsCount, icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Media Assets", value: mediaCount, icon: ImageIcon, color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Admin Users", value: usersCount, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 font-poppins">Welcome back, {session.user?.name}</h1>
        <p className="text-gray-500 mt-1 text-sm">Here's what's happening on your campus platform today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="admin-card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">{stat.name}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 font-poppins border-b border-gray-100 pb-4">Platform Overview</h2>
            <div className="space-y-4 text-sm text-gray-600">
               <p>Welcome to the Faith Model School Management Portal. Use the navigation menu on the left to manage pages, custom content, blog posts, media assets, and header/footer configurations.</p>
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="p-4 bg-gray-50 rounded border border-gray-100">
                     <div className="font-semibold text-gray-900">Page Builder</div>
                     <div className="text-xs text-gray-500 mt-1">Create & edit custom pages using content blocks</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded border border-gray-100">
                     <div className="font-semibold text-gray-900">Header & Footer Control</div>
                     <div className="text-xs text-gray-500 mt-1">Configure site navigation, CTA buttons, and footer columns</div>
                  </div>
               </div>
            </div>
         </div>

         <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 font-poppins border-b border-gray-100 pb-4">Quick Actions</h2>
            <div className="space-y-3">
               <Link href="/admin/pages/new" className="block w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200">
                  + Add New Page
               </Link>
               <Link href="/admin/posts/new" className="block w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200">
                  + Write a Blog Post
               </Link>
               <Link href="/admin/media/new" className="block w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200">
                  + Upload Gallery Images
               </Link>
               <Link href="/admin/settings/navigation" className="block w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200">
                  ⚙️ Update Navigation Settings
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
