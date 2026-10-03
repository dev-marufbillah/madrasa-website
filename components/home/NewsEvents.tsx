"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, Calendar, Tag, FileText } from "lucide-react";
import { getNotices } from "@/actions/notice";

interface NoticeItem {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function NewsEvents() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPublicNotices() {
      try {
        const res = await getNotices(true); // শুধুমাত্র প্রকাশিত নোটিশসমূহ আনবে
        if (isMounted && res.success && res.data) {
          setNotices(res.data.slice(0, 3)); // প্রথম ৩টি নোটিশ হোমপেজে দেখাবে
        }
      } catch (error) {
        console.error("Home notices error:", error);
      } fontFinally: {
        if (isMounted) setLoading(false);
      }
    }

    loadPublicNotices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16 md:py-20 bg-[#f8faf8]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ===== 1. LEFT COLUMN: Header Info ===== */}
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-1.5 text-[#0b3b2c] text-xs font-bold uppercase tracking-widest bg-[#0b3b2c]/10 px-3 py-1 rounded-full mb-3">
              <Bell size={13} />
              Latest News & Notices
            </span>
            <h2 className="text-3xl md:text-[38px] font-bold text-[#0b3b2c] leading-tight mb-3">
              সর্বশেষ আপডেট ও ঘোষণা
            </h2>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-8 max-w-sm">
              আলিয়া মাদ্রাসার সকল প্রাতিষ্ঠানিক সংবাদ, পরীক্ষার সময়সূচী ও ছুটির নোটিশসমূহ এক নজরে দেখুন।
            </p>

            <Link
              href="/notices"
              className="inline-flex items-center gap-2 bg-[#0b3b2c] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#082a1f] hover:scale-105 transition-all duration-300 shadow-sm"
            >
              সকল নোটিশ দেখুন
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* ===== 2. MIDDLE & RIGHT COLUMN: Live Notices Grid (8 Cols) ===== */}
          <div className="lg:col-span-8 lg:border-l border-gray-200 lg:pl-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[17px] font-bold text-[#0b3b2c] flex items-center gap-2">
                <FileText size={18} />
                সম্প্রতি প্রকাশিত নোটিশসমূহ
              </h3>
              <Link href="/notices" className="text-xs font-bold text-[#0b3b2c] hover:underline">
                সব দেখুন →
              </Link>
            </div>

            {loading ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-xs text-gray-400">
                নোটিশ লোড হচ্ছে...
              </div>
            ) : notices.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-xs text-gray-500">
                বর্তমানে কোনো প্রকাশিত নোটিশ নেই।
              </div>
            ) : (
              <div className="space-y-3">
                {notices.map((item) => (
                  <Link
                    key={item._id}
                    href="/notices"
                    className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0b3b2c]/20 transition-all flex items-start justify-between gap-4 block"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#0b3b2c]/10 text-[#0b3b2c] px-2.5 py-0.5 rounded-full">
                          <Tag size={10} />
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                          <Calendar size={11} />
                          {new Date(item.createdAt).toLocaleDateString("bn-BD", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#0b3b2c] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {item.content}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-gray-400 group-hover:text-[#0b3b2c] group-hover:translate-x-1.5 transition-all shrink-0 mt-1"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}