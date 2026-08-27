"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, PhoneCall, Navigation, MessageCircle } from "lucide-react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { label: "General", href: "/admin/settings", icon: Settings },
    { label: "Contact & Socials", href: "/admin/settings/contact", icon: PhoneCall },
    { label: "Navigation Menus", href: "/admin/settings/navigation", icon: Navigation },
    { label: "WhatsApp & Grafty", href: "/admin/settings/whatsapp", icon: MessageCircle },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        <nav className="space-y-1">
          {tabs.map(tab => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link 
                key={tab.href} 
                href={tab.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[600px]">
        {children}
      </div>
    </div>
  );
}
