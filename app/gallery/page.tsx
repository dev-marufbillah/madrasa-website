"use client";

import { useEffect, useState } from "react";
import { getGalleryImages } from "@/actions/gallery";
import { Image as ImageIcon, Filter } from "lucide-react";

interface GalleryItemType {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchCategoryImages = async (cat: string) => {
    setLoading(true);
    const res = await getGalleryImages(cat);
    if (res.success && res.data) {
      setImages(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const res = await getGalleryImages("All");
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

  const categories = [
    { label: "সব ছবি", value: "All" },
    { label: "ক্যাম্পাস", value: "Campus" },
    { label: "অনুষ্ঠান", value: "Event" },
    { label: "খেলাধুলা", value: "Sports" },
    { label: "শ্রেণিকক্ষ", value: "Classroom" },
  ];

  return (
    <div className="bg-[#f8faf8] min-h-screen py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-[#0b3b2c] text-xs font-bold uppercase tracking-widest bg-[#0b3b2c]/10 px-4 py-1.5 rounded-full mb-3">
            <ImageIcon size={14} />
            Photo Gallery
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b3b2c] mb-2">
            আমাদের মনোরম ফটো গ্যালারি
          </h1>
          <p className="text-gray-600 text-sm">
            আলিয়া মাদ্রাসার মনোরম ক্যাম্পাস, শিক্ষা কাযক্রম ও স্মরণীয় বিভিন্ন মুহূর্ত।
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                fetchCategoryImages(cat.value);
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-[#0b3b2c] text-white shadow-md scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Image Grid */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-400 text-sm border border-gray-100 shadow-sm">
            গ্যালারির ছবি লোড হচ্ছে...
          </div>
        ) : images.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-500 text-sm border border-gray-100 shadow-sm">
            এই ক্যাটাগরিতে কোনো ছবি পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-52 relative overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-xs font-bold drop-shadow-md">
                      {item.title}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0b3b2c] bg-[#0b3b2c]/10 px-3 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}