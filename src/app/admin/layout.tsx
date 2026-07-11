import { AdminProviders } from "@/components/AdminProviders";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Panel | Faith Model School",
  description: "Digital Campus Platform Administration",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AdminProviders>
      <div className="flex h-screen bg-[#f8f9fa] font-inter">
        {session && <AdminSidebar />}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminProviders>
  );
}
