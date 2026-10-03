"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/actions/auth";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  CalendarCheck,
  Award,
  Bell,
  FileEdit,
  Globe,
  LogOut,
  X,
  BookOpen,
  Settings,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  const navItems = [
    { name: "ওভারভিউ (Overview)", href: "/admin", icon: LayoutDashboard },
    { name: "ভর্তি আবেদনসমূহ", href: "/admin/admissions", icon: FileEdit },
    { name: "শিক্ষার্থী ব্যবস্থাপনা", href: "/admin/students", icon: Users },
    { name: "শিক্ষক পরিচিতি", href: "/admin/teachers", icon: GraduationCap },
    { name: "শ্রেণি ও সেকশন", href: "/admin/classes", icon: School },
    { name: "উপস্থিতি রেজিস্টার", href: "/admin/attendance", icon: CalendarCheck },
    { name: "পরীক্ষা ও ফলাফল", href: "/admin/exams", icon: Award },
    { name: "নোটিশ বোর্ড", href: "/admin/notices", icon: Bell },
    { name: "ফটো গ্যালারি", href: "/admin/gallery", icon: ImageIcon },
    { name: "ওয়েবসাইট সেটিংস", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#072e22] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo Brand */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-[#115a44]">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="bg-white/10 p-2 rounded-xl text-white">
                <BookOpen size={22} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white leading-tight">
                  Alia Madrasa
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">
                  Admin Panel
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#4ade80] text-[#072e22] shadow-md"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#115a44] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Globe size={16} />
            <span>পাবলিক ওয়েবসাইট</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>লগআউট</span>
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        ></div>
      )}
    </>
  );
}