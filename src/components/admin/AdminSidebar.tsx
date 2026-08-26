"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  PenTool
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Page Builder", href: "/admin/pages", icon: PenTool },
  { name: "Blog Posts", href: "/admin/posts", icon: FileText },
  { name: "Gallery Media", href: "/admin/media", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="w-64 bg-[#1a1a2e] text-[#fefcf3] flex flex-col h-full border-r border-[#1a1a2e]">
      <div className="p-6 border-b border-[rgba(254,252,243,0.1)]">
        <Link href="/admin" className="block w-full">
          <img src="/Faith_model_logo.svg" alt="Faith Model" className="h-10 w-auto filter brightness-0 invert opacity-90" />
        </Link>
        <div className="font-caveat text-sm text-[#fefcf3]/60 mt-2">Campus Platform</div>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors text-sm font-medium ${
                isActive 
                  ? "bg-[#FB7F05] text-[#1a1a2e]" 
                  : "text-[#fefcf3]/70 hover:bg-[rgba(254,252,243,0.05)] hover:text-[#fefcf3]"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[rgba(254,252,243,0.1)]">
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-[#fefcf3]/70 mb-2">
           <div className="w-8 h-8 rounded-full bg-[rgba(254,252,243,0.1)] flex items-center justify-center font-bold text-xs uppercase">
              {session?.user?.name?.charAt(0) || "A"}
           </div>
           <div className="overflow-hidden">
              <div className="font-semibold text-[#fefcf3] truncate">{session?.user?.name}</div>
              <div className="text-xs text-[#fefcf3]/50 truncate">{session?.user?.email}</div>
           </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-[#fefcf3]/70 hover:bg-[rgba(254,252,243,0.05)] hover:text-red-400 rounded-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
