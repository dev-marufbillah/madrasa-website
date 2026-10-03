"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/dashboard";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  School,
  FileEdit,
  Bell,
  CalendarCheck,
  Award,
  ArrowRight,
  Clock,
  CheckCircle2,
  ChevronRight,
  UserPlus,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

// Recharts ইমপোর্ট
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RecentAdmissionItem {
  _id: string;
  studentName: string;
  desiredClass: string;
  guardianPhone: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface ChartDataItem {
  name: string;
  উপস্থিতি: number;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    studentCount: 0,
    teacherCount: 0,
    classCount: 0,
    pendingAdmissionCount: 0,
    noticeCount: 0,
    recentAdmissions: [] as RecentAdmissionItem[],
    chartData: [] as ChartDataItem[],
  });

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const res = await getDashboardStats();
        if (isMounted && res.success && res.data) {
          setStats(res.data);
        }
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const statCards = [
    {
      title: "মোট শিক্ষার্থী",
      value: stats.studentCount,
      icon: Users,
      href: "/admin/students",
      light: "bg-[#0b3b2c]/10 text-[#0b3b2c]",
    },
    {
      title: "মোট শিক্ষক",
      value: stats.teacherCount,
      icon: GraduationCap,
      href: "/admin/teachers",
      light: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "মোট শ্রেণি",
      value: stats.classCount,
      icon: School,
      href: "/admin/classes",
      light: "bg-teal-50 text-teal-700",
    },
    {
      title: "পেন্ডিং আবেদন",
      value: stats.pendingAdmissionCount,
      icon: FileEdit,
      href: "/admin/admissions",
      light: "bg-amber-50 text-amber-700",
    },
    {
      title: "প্রকাশিত নোটিশ",
      value: stats.noticeCount,
      icon: Bell,
      href: "/admin/notices",
      light: "bg-rose-50 text-rose-700",
    },
  ];

  const quickLinks = [
    {
      title: "নতুন শিক্ষার্থী ভর্তি",
      desc: "শিক্ষার্থী যোগ ও প্রোফাইল তৈরি",
      href: "/admin/students",
      icon: UserPlus,
      color: "bg-[#0b3b2c]/10 text-[#0b3b2c]",
    },
    {
      title: "আজকের উপস্থিতি",
      desc: "ডিজিটাল হাজিরা রেজিস্টার",
      href: "/admin/attendance",
      icon: CalendarCheck,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "নম্বর ইনপুট",
      desc: "পরীক্ষার মার্ক ও গ্রেড",
      href: "/admin/exams",
      icon: Award,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "নোটিশ প্রকাশ",
      desc: "জরুরি ঘোষণা পাবলিশ করুন",
      href: "/admin/notices",
      icon: Bell,
      color: "bg-rose-100 text-rose-700",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f3]">
      <div className="max-w-7xl mx-auto p-5 md:p-8 space-y-7">

        {/* ===== Welcome Banner ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0b3b2c] via-[#0d4a38] to-[#115a44] rounded-[28px] p-7 md:p-9 text-white shadow-xl">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full mb-4 border border-white/10">
                <Activity size={12} className="text-[#4ade80]" />
                Live Dashboard
              </div>
              <h1 className="text-2xl md:text-[32px] font-black leading-tight mb-2">
                আসসালামু আলাইকুম, অ্যাডমিন! 👋
              </h1>
              <p className="text-sm text-white/70 max-w-md leading-relaxed">
                আলিয়া মাদ্রাসার সম্পূর্ণ ম্যানেজমেন্ট সিস্টেম — শিক্ষার্থী, শিক্ষক, উপস্থিতি ও ফলাফল এক জায়গায়।
              </p>
            </div>

            <Link
              href="/admin/students"
              className="inline-flex items-center gap-2.5 bg-white text-[#0b3b2c] hover:bg-[#4ade80] hover:text-[#072e22] px-6 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-lg self-start md:self-auto shrink-0"
            >
              <UserPlus size={18} />
              নতুন শিক্ষার্থী ভর্তি
            </Link>
          </div>
        </div>

        {/* ===== Stat Cards ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={i}
                href={card.href}
                className="group bg-white rounded-[22px] p-5 border border-gray-100/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-2xl ${card.light} flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
                <p className="text-[11px] font-semibold text-gray-400 mb-1">{card.title}</p>
                <p className="text-2xl font-black text-gray-900 tracking-tight">
                  {loading ? (
                    <span className="inline-block w-10 h-7 bg-gray-100 rounded-lg animate-pulse"></span>
                  ) : (
                    card.value
                  )}
                </p>
              </Link>
            );
          })}
        </div>

        {/* ===== Main Content Grid ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Area (Chart + Quick Links) - 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Professional Chart Section */}
            <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-[#0b3b2c]" />
                  <h2 className="text-base font-bold text-[#0b3b2c]">সাম্প্রতিক উপস্থিতির হার (%)</h2>
                </div>
                <span className="text-[10px] font-bold bg-[#0b3b2c]/10 text-[#0b3b2c] px-2.5 py-1 rounded-full">
                  গত ৭ দিনের রিপোর্ট
                </span>
              </div>

              <div className="h-[220px] w-full">
                {loading ? (
                  <div className="w-full h-full bg-gray-50 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400">
                    গ্রাফ লোড হচ্ছে...
                  </div>
                ) : stats.chartData.length === 0 ? (
                   <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200">
                    পর্যাপ্ত উপস্থিতির ডাটা নেই
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ade80" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                        itemStyle={{ color: '#0b3b2c', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="উপস্থিতি" stroke="#0b3b2c" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={18} className="text-[#0b3b2c]" />
                <h2 className="text-base font-bold text-[#0b3b2c]">কুইক অ্যাকশন (Quick Actions)</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {quickLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={i}
                      href={link.href}
                      className="group bg-white rounded-[20px] p-4.5 border border-gray-100 shadow-sm hover:border-[#0b3b2c]/25 hover:shadow-md transition-all flex items-center gap-3.5"
                    >
                      <div className={`w-11 h-11 rounded-2xl ${link.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-[13px] group-hover:text-[#0b3b2c] transition-colors truncate">
                          {link.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 truncate">{link.desc}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0b3b2c] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Area (Recent Admissions) - 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <FileEdit size={18} className="text-[#0b3b2c]" />
                <h2 className="text-base font-bold text-[#0b3b2c]">সাম্প্রতিক আবেদন</h2>
              </div>
              <Link
                href="/admin/admissions"
                className="text-[11px] font-bold text-[#0b3b2c] hover:underline flex items-center gap-1"
              >
                সব দেখুন <ArrowRight size={12} />
              </Link>
            </div>

            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-10 text-center text-xs text-gray-400">লোড হচ্ছে...</div>
              ) : stats.recentAdmissions.length === 0 ? (
                <div className="p-10 text-center text-xs text-gray-400">
                  এখনো কোনো আবেদন আসেনি
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {stats.recentAdmissions.map((item) => (
                    <div
                      key={item._id}
                      className="px-5 py-4 flex items-center justify-between gap-3 hover:bg-gray-50/70 transition-colors"
                    >
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 text-[13px] truncate">
                          {item.studentName}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                          {item.desiredClass} · {item.guardianPhone}
                        </p>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 ${
                          item.status === "approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.status === "rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status === "approved" && <CheckCircle2 size={10} />}
                        {item.status === "pending" && <Clock size={10} />}
                        <span className="capitalize">{item.status}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}