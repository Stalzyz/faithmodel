import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Users, FileText, ImageIcon, Settings } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  // Fetch some quick stats
  const leadsCount = await prisma.lead.count();
  const pagesCount = await prisma.page.count();
  const postsCount = await prisma.post.count();
  const mediaCount = await prisma.media.count();

  const recentLeads = await prisma.lead.findMany({
     take: 5,
     orderBy: { createdAt: 'desc' }
  });

  const stats = [
    { name: "Total Enquiries", value: leadsCount, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Published Pages", value: pagesCount, icon: FileText, color: "text-green-600", bg: "bg-green-50" },
    { name: "Blog Posts", value: postsCount, icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Media Assets", value: mediaCount, icon: ImageIcon, color: "text-orange-600", bg: "bg-orange-50" },
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
            <h2 className="text-lg font-semibold text-gray-900 mb-6 font-poppins border-b border-gray-100 pb-4">Recent Enquiries</h2>
            
            {recentLeads.length === 0 ? (
               <div className="text-center py-8 text-gray-500 text-sm">
                  No enquiries yet.
               </div>
            ) : (
               <div className="divide-y divide-gray-100">
                  {recentLeads.map((lead) => (
                     <div key={lead.id} className="py-4 flex justify-between items-center">
                        <div>
                           <div className="font-medium text-gray-900 text-sm">{lead.name}</div>
                           <div className="text-xs text-gray-500 mt-0.5">{lead.email || lead.phone || 'No contact info'}</div>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {lead.status}
                           </span>
                           <span className="text-xs text-gray-400">
                              {new Date(lead.createdAt).toLocaleDateString()}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>

         <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 font-poppins border-b border-gray-100 pb-4">Quick Actions</h2>
            <div className="space-y-3">
               <button className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200">
                  + Add New Page
               </button>
               <button className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200">
                  + Write a Blog Post
               </button>
               <button className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200">
                  + Upload Gallery Images
               </button>
               <button className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200">
                  ⚙️ Update Footer Settings
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
