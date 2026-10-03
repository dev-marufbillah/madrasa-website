"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu, User } from "lucide-react";

interface UserType {
  name: string;
  email: string;
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      const currUser = await getCurrentUser();
      if (isMounted) {
        if (!currUser || currUser.role !== "admin") {
          router.push("/login");
        } else {
          setUser(currUser as UserType);
        }
        setLoading(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center text-sm font-semibold text-gray-500">
        অ্যাডমিন সিকিউরিটি ভ্যালিডেশন হচ্ছে...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] flex">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <span className="hidden sm:inline-block text-xs font-bold text-gray-400 uppercase tracking-widest">
              Madrasa Management System
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-900 leading-tight">
                {user?.name || "অ্যাডমিন"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0b3b2c] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <User size={20} />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}