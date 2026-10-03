"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { getGalleryImages } from "@/actions/gallery";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await getGalleryImages();
        if (isMounted && res.success && res.data) {
          setImages(res.data.slice(0, 6)); // হোমপেজে সর্বোচ্চ ৬টি
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[#0b3b2c] text-sm font-medium mb-1">Our Gallery</p>
            <h2 className="text-3xl md:text-[38px] font-bold text-[#0b3b2c] leading-tight mb-2">
              Moments of Learning & Growth
            </h2>
            <p className="text-gray-500 text-[14px]">
              Explore our campus, activities and memorable moments.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-[#0b3b2c] text-white px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold hover:bg-[#082a1f] hover:scale-105 transition-all duration-300 whitespace-nowrap self-start sm:self-auto shadow-sm"
          >
            View All Gallery
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 sm:h-44 md:h-48 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="bg-[#f8faf8] rounded-3xl p-12 text-center text-gray-400 text-sm border border-gray-100">
            <ImageIcon size={32} className="mx-auto mb-3 opacity-40" />
            এখনো কোনো ছবি আপলোড করা হয়নি। অ্যাডমিন প্যানেল থেকে ছবি যোগ করুন।
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {images.map((image) => (
              <div
                key={image._id}
                className="group relative h-40 sm:h-44 md:h-48 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-semibold leading-tight drop-shadow-sm">
                    {image.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}