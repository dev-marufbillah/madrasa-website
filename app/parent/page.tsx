"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Award,
  Bell,
  LogOut,
  User,
  BookOpen,
  ArrowRight,
  Phone,
  IdCard,
} from "lucide-react";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  childrenIds?: string[];
}

export default function ParentDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      const currUser = await getCurrentUser();
      if (isMounted) {
        if (!currUser) {
          router.push("/login");
        } else if (currUser.role !== "parent" && currUser.role !== "admin") {
          router.push("/login");
        } else {
          setUser(currUser as UserType);
        }
        setLoading(false);
      }
    }

    loadUser();
    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center text-sm text-gray-500">
        অভিভাবক পোর্টাল লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="bg-[#f8faf8] min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#0b3b2c] to-[#115a44] rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Users size={32} />
            </div>
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full mb-1">
                Parent Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
                {user?.name || "সম্মানিত অভিভাবক"}
              </h1>
              <p className="text-xs text-gray-200 mt-0.5 flex items-center gap-1">
                <Phone size={12} /> {user?.phone || user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md self-start sm:self-auto cursor-pointer"
          >
            <LogOut size={15} />
            লগআউট
          </button>
        </div>

        {/* Children Info */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-base font-bold text-[#0b3b2c] mb-4 flex items-center gap-2">
            <IdCard size={18} />
            আপনার সন্তানদের তথ্য
          </h2>

          {user?.childrenIds && user.childrenIds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.childrenIds.map((childId) => (
                <div
                  key={childId}
                  className="p-5 rounded-2xl bg-[#0b3b2c]/5 border border-[#0b3b2c]/10 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0b3b2c] text-white flex items-center justify-center font-bold">
                    <User size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Student ID</p>
                    <p className="font-bold text-[#0b3b2c] text-sm font-mono">{childId}</p>
                    <Link
                      href={`/results?id=${childId}`}
                      className="text-[11px] text-[#0b3b2c] font-semibold hover:underline mt-1 inline-block"
                    >
                      রেজাল্ট দেখুন →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-6">
              এখনো কোনো সন্তানের তথ্য যুক্ত নেই। অ্যাডমিন শিক্ষার্থী ভর্তি করলে এখানে দেখা যাবে।
            </p>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/results"
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#0b3b2c]/30 hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Award size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">রেজাল্ট ও মার্কশীট</h4>
                <p className="text-[11px] text-gray-400">সন্তানের পরীক্ষার ফলাফল</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-gray-400 group-hover:text-[#0b3b2c] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/notices"
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#0b3b2c]/30 hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">নোটিশ বোর্ড</h4>
                <p className="text-[11px] text-gray-400">মাদ্রাসার সকল ঘোষণা</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-gray-400 group-hover:text-[#0b3b2c] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

      </div>
    </div>
  );
}