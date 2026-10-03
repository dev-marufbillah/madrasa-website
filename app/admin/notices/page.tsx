"use client";

import { useEffect, useState } from "react";
import { createNotice, getNotices, deleteNotice } from "@/actions/notice";
import { Plus, Trash2, Bell, Send } from "lucide-react";

interface NoticeType {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Academic",
  });

  const fetchNotices = async () => {
    setLoading(true);
    const res = await getNotices(false);
    if (res.success && res.data) {
      setNotices(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const res = await getNotices(false);
        if (isMounted && res.success && res.data) {
          setNotices(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await createNotice(formData);
    setSubmitting(false);

    if (res.success) {
      setFormData({ title: "", content: "", category: "Academic" });
      fetchNotices();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই নোটিশটি ডিলিট করতে চান?")) {
      const res = await deleteNotice(id);
      if (res.success) {
        fetchNotices();
      }
    }
  };

  return (
    <div className="bg-[#f8faf8] min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold text-[#0b3b2c] uppercase tracking-wider bg-[#0b3b2c]/10 px-3 py-1 rounded-full">
            Admin Dashboard
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0b3b2c] mt-2">
            নোটিশ বোর্ড ম্যানেজমেন্ট (Notice Management)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            নতুন নোটিশ প্রকাশ করুন এবং পূর্বের প্রকাশিত নোটিশসমূহ পরিচালনা করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Create Notice Form (Left) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-[#0b3b2c] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Plus size={18} />
              নতুন নোটিশ প্রকাশ করুন
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  নোটিশের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: বার্ষিক পরীক্ষার সময়সূচী প্রকাশ"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ক্যাটাগরি *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                >
                  <option value="Academic">একাডেমিক (Academic)</option>
                  <option value="Admission">ভর্তি সংক্রান্ত (Admission)</option>
                  <option value="Exam">পরীক্ষা (Exam)</option>
                  <option value="General">সাধারণ ঘোষণা (General)</option>
                  <option value="Holiday">ছুটির নোটিশ (Holiday)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  নোটিশের বিবরণ *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="নোটিশের বিস্তারিত লেখা এখানে দিন..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#0b3b2c] text-white font-bold text-sm rounded-xl hover:bg-[#082a1f] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Send size={16} />
                <span>{submitting ? "প্রকাশ হচ্ছে..." : "নোটিশ প্রকাশ করুন"}</span>
              </button>
            </form>
          </div>

          {/* Notices List (Right) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-[#0b3b2c] mb-2 flex items-center gap-2">
              <Bell size={18} />
              প্রকাশিত নোটিশসমূহ ({notices.length})
            </h2>

            {loading ? (
              <div className="bg-white p-8 text-center text-gray-400 text-sm rounded-2xl border border-gray-100">
                নোটিশ লোড হচ্ছে...
              </div>
            ) : notices.length === 0 ? (
              <div className="bg-white p-8 text-center text-gray-500 text-sm rounded-2xl border border-gray-100">
                কোনো নোটিশ পাওয়া যায়নি।
              </div>
            ) : (
              <div className="space-y-3">
                {notices.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold bg-[#0b3b2c]/10 text-[#0b3b2c] px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString("bn-BD")}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm md:text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {item.content}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="ডিলিট করুন"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}