"use client";

import { useEffect, useState } from "react";
import { getNotices } from "@/actions/notice";
import { Bell, Calendar, Tag, FileText } from "lucide-react";

interface NoticeType {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function PublicNoticesPage() {
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchNotices() {
      try {
        const res = await getNotices(true);
        if (isMounted && res.success && res.data) {
          setNotices(res.data);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchNotices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-[#f8faf8] min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-[#0b3b2c] text-xs font-bold uppercase tracking-widest bg-[#0b3b2c]/10 px-4 py-1.5 rounded-full mb-3">
            <Bell size={14} />
            Notice Board
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0b3b2c] mb-2">
            সর্বশেষ নোটিশ ও ঘোষণা
          </h1>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            আলিয়া মাদ্রাসার প্রাতিষ্ঠানিক, একাডেমিক ও পরীক্ষা সংক্রান্ত সকল নোটিশ দেখুন।
          </p>
        </div>

        {/* Notices List */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-400 text-sm border border-gray-100 shadow-sm">
            নোটিশ লোড হচ্ছে...
          </div>
        ) : notices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-500 text-sm border border-gray-100 shadow-sm">
            বর্তমানে কোনো নোটিশ প্রকাশিত হয়নি।
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {/* Category Badge */}
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#0b3b2c]/10 text-[#0b3b2c] px-3 py-1 rounded-full">
                    <Tag size={12} />
                    {item.category}
                  </span>

                  {/* Date */}
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={12} />
                    {new Date(item.createdAt).toLocaleDateString("bn-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}