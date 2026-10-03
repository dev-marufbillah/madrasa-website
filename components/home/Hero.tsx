"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getWebsiteSettings } from "@/actions/settings";

interface SettingsType {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  madrasaName?: string;
  statYears?: string;
  statStudents?: string;
  statTeachers?: string;
  statPrograms?: string;
}

export default function Hero() {
  const [settings, setSettings] = useState<SettingsType | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await getWebsiteSettings();
        if (isMounted && res.success && res.data) {
          setSettings(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const title = settings?.heroTitle || "Empowering Minds, Inspiring Faith";
  const subtitle =
    settings?.heroSubtitle ||
    "Alia Madrasa is committed to providing quality Islamic and modern education, nurturing righteous character and preparing students for a brighter future.";
  const welcome = settings?.madrasaName
    ? `Welcome to ${settings.madrasaName}`
    : "Welcome to Alia Madrasa";

  const heroImg =
    settings?.heroImage ||
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop";

  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-[#f8faf8]">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImg}
          alt="Campus Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 w-full py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="text-[#0b3b2c] font-medium text-sm md:text-base mb-3 tracking-wide">
            {welcome}
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#0b3b2c] leading-[1.15] mb-5">
            {title}
          </h1>

          <p className="text-gray-600 text-[15px] md:text-base leading-relaxed mb-8 max-w-lg">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="/academic"
              className="inline-flex items-center gap-2 bg-[#0b3b2c] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#082a1f] hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Explore Academics
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/admission"
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#0b3b2c] border border-[#0b3b2c]/30 px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              Admission Information
            </Link>
          </div>

          {/* Dynamic Stats Row */}
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-[#0b3b2c]">
                {settings?.statYears || "50+"}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">Years of Excellence</span>
            </div>

            <div className="hidden sm:block w-px h-10 bg-gray-300"></div>

            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-[#0b3b2c]">
                {settings?.statStudents || "1200+"}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">Students</span>
            </div>

            <div className="hidden sm:block w-px h-10 bg-gray-300"></div>

            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-[#0b3b2c]">
                {settings?.statTeachers || "100+"}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">Teachers & Staff</span>
            </div>

            <div className="hidden sm:block w-px h-10 bg-gray-300"></div>

            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-[#0b3b2c]">
                {settings?.statPrograms || "20+"}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">Programs</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}