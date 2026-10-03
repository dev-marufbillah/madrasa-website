"use client";

import { useEffect, useState } from "react";
import { addGalleryImage, getGalleryImages, deleteGalleryImage } from "@/actions/gallery";
import { Image as ImageIcon, Upload, Trash2, Plus } from "lucide-react";

interface GalleryItemType {
  _id: string;
  title: string;
  category: "Campus" | "Event" | "Sports" | "Classroom" | "General";
  imageUrl: string;
  createdAt: string;
}

type CategoryType = "Campus" | "Event" | "Sports" | "Classroom" | "General";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Campus" as CategoryType,
    imageUrl: "",
  });

  const fetchImages = async () => {
    setLoading(true);
    const res = await getGalleryImages();
    if (res.success && res.data) {
      setImages(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const res = await getGalleryImages();
        if (isMounted && res.success && res.data) {
          setImages(res.data);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("ছবিটির সাইজ ৩ মেগাবাইটের (3MB) এর চেয়ে ছোট হতে হবে।");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert("অনুগ্রহ করে একটি ছবি নির্বাচন করুন।");
      return;
    }

    setSubmitting(true);
    const res = await addGalleryImage(formData);
    setSubmitting(false);

    if (res.success) {
      setFormData({
        title: "",
        category: "Campus",
        imageUrl: "",
      });
      fetchImages();
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই ছবিটি ডিলিট করতে চান?")) {
      const res = await deleteGalleryImage(id);
      if (res.success) {
        fetchImages();
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
            গ্যালারি ফটো ম্যানেজমেন্ট (Gallery Management)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            মাদ্রাসার ক্যাম্পাস, অনুষ্ঠান ও স্পোর্টসের ছবি যোগ ও পরিচালনা করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add Image Form (Left) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-[#0b3b2c] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Plus size={18} />
              নতুন ছবি আপলোড করুন
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Photo Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  ছবি নির্বাচন করুন *
                </label>
                <div className="space-y-3">
                  <div className="w-full h-44 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden flex flex-col items-center justify-center relative group">
                    {formData.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon size={36} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 font-medium">কম্পিউটার থেকে ছবি বাছুন</p>
                      </div>
                    )}
                  </div>

                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#0b3b2c] text-white hover:bg-[#082a1f] w-full py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
                    <Upload size={14} />
                    <span>ছবি আপলোড করুন (Choose Image)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ছবি বা অনুষ্ঠানের নাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৫"
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as CategoryType,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                >
                  <option value="Campus">ক্যাম্পাস (Campus)</option>
                  <option value="Event">অনুষ্ঠান (Event)</option>
                  <option value="Sports">খেলাধুলা (Sports)</option>
                  <option value="Classroom">শ্রেণিকক্ষ (Classroom)</option>
                  <option value="General">সাধারণ (General)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#0b3b2c] text-white font-bold text-sm rounded-xl hover:bg-[#082a1f] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Upload size={16} />
                <span>{submitting ? "সেভ হচ্ছে..." : "গ্যালারিতে যোগ করুন"}</span>
              </button>
            </form>
          </div>

          {/* Gallery Grid List (Right) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-[#0b3b2c] mb-2 flex items-center gap-2">
              <ImageIcon size={18} />
              গ্যালারির ছবিসমূহ ({images.length})
            </h2>

            {loading ? (
              <div className="bg-white p-8 text-center text-gray-400 text-sm rounded-2xl border border-gray-100">
                ছবি লোড হচ্ছে...
              </div>
            ) : images.length === 0 ? (
              <div className="bg-white p-8 text-center text-gray-500 text-sm rounded-2xl border border-gray-100">
                গ্যালারিতে এখনো কোনো ছবি আপলোড করা হয়নি।
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group relative flex flex-col justify-between"
                  >
                    <div className="h-32 sm:h-36 relative overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors cursor-pointer"
                        title="ডিলিট করুন"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="p-3">
                      <span className="inline-block text-[9px] font-bold text-[#0b3b2c] bg-[#0b3b2c]/10 px-2 py-0.5 rounded-full mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-gray-900 text-xs truncate">
                        {item.title}
                      </h4>
                    </div>
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