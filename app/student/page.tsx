"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  IdCard,
  Award,
  Bell,
  LogOut,
  User,
  BookOpen,
  ArrowRight,
} from "lucide-react";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  studentId?: string;
}

export default function StudentDashboardPage() {
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
        শিক্ষার্থী প্যানেল লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="bg-[#f8faf8] min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#0b3b2c] to-[#115a44] rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <User size={32} />
            </div>
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full mb-1">
                Student Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
                {user?.name || "শিক্ষার্থী"}
              </h1>
              <p className="text-xs text-gray-200 mt-0.5">
                ইমেইল: {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md self-start sm:self-auto cursor-pointer"
          >
            <LogOut size={15} />
            <span>লগআউট</span>
          </button>
        </div>

        {/* Digital Student Card & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Card Left: Digital ID Card */}
          <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-[#0b3b2c] uppercase tracking-wider flex items-center gap-1">
                  <IdCard size={16} />
                  ডিজিটাল আইডি কার্ড
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Active Student
                </span>
              </div>

              <div className="space-y-3 text-xs text-gray-700">
                <div>
                  <p className="text-gray-400 font-medium text-[11px]">শিক্ষার্থীর নাম:</p>
                  <p className="font-bold text-gray-900 text-sm">{user?.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-[11px]">স্টুডেন্ট আইডি (ID):</p>
                  <p className="font-mono font-bold text-[#0b3b2c] text-sm">{user?.studentId || "STD-2025-01"}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-[11px]">মাদ্রাসা নাম:</p>
                  <p className="font-bold text-gray-900">আলিয়া মাদ্রাসা, ঢাকা</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 text-center">
              আলিয়া মাদ্রাসা ডিজিটাল আইডি সিস্টেম
            </div>
          </div>

          {/* Quick Access Menu (Right 7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-[#0b3b2c] flex items-center gap-2">
              <BookOpen size={18} />
              আপনার পোর্টাল সেবা
            </h2>

            <div className="space-y-3">
              <Link
                href="/results"
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#0b3b2c]/30 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">অনলাইন রেজাল্ট ও মার্কশীট</h4>
                    <p className="text-[11px] text-gray-400">পরীক্ষার নম্বর ও ডিজিটাল মার্কশীট ডাউনলোড</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-[#0b3b2c] group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/notices"
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#0b3b2c]/30 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">নোটিশ বোর্ড</h4>
                    <p className="text-[11px] text-gray-400">সর্বশেষ প্রাতিষ্ঠানিক ঘোষণা ও ছুটির তালিকা</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-[#0b3b2c] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}