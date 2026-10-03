"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarCheck,
  Award,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  studentId?: string;
}

export default function TeacherDashboardPage() {
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
        শিক্ষক ড্যাশবোর্ড লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="bg-[#f8faf8] min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#0b3b2c] to-[#115a44] rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full mb-3 border border-white/10">
              Teacher Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
              আসসালামু আলাইকুম, {user?.name || "সম্মানিত শিক্ষক"}! 👋
            </h1>
            <p className="text-xs md:text-sm text-gray-200 mt-2 max-w-xl leading-relaxed">
              আপনার ক্লাসের উপস্থিতি গ্রহণ, পরীক্ষার নম্বর ইনপুট ও প্রাতিষ্ঠানিক নোটিশ দেখুন।
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md self-start md:self-auto cursor-pointer"
          >
            <LogOut size={16} />
            <span>লগআউট করুন</span>
          </button>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Attendance */}
          <Link
            href="/admin/attendance"
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CalendarCheck size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0b3b2c] transition-colors mb-1">
              উপস্থিতি রেজিস্টার
            </h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              আজকের ক্লাসের শিক্ষার্থীদের ডিজিটালি উপস্থিতি/অনুপস্থিতি মার্ক করুন।
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-[#0b3b2c]">
              <span>হাজিরা নিন</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Exams & Marks */}
          <Link
            href="/admin/exams"
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Award size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0b3b2c] transition-colors mb-1">
              পরীক্ষার নম্বর ইনপুট
            </h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              পরীক্ষার বিষয়ভিত্তিক প্রাপ্ত নম্বর এন্ট্রি দিন, জিপিএ স্বয়ংক্রিয় গণিত হবে।
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-[#0b3b2c]">
              <span>নম্বর ইনপুট দিন</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Notice Board */}
          <Link
            href="/notices"
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Bell size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0b3b2c] transition-colors mb-1">
              মাদ্রাসা নোটিশ বোর্ড
            </h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              মাদ্রাসার সকল প্রাতিষ্ঠানিক, একাডেমিক ও ছুটির নোটিশমালা দেখুন।
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-[#0b3b2c]">
              <span>নোটিশসমূহ দেখুন</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}