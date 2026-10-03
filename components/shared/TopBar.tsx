"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Mail, Globe, Search } from "lucide-react";
import Script from "next/script";

// Facebook SVG Icon
const FacebookIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3 h-3"
  >
    <path d="M24 12.073c0-6.627-4.873-12-10.875-12S2.25 5.446 2.25 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H9.703v-3.47h2.672V9.43c0-2.641 1.571-4.102 3.98-4.102 1.155 0 2.362.207 2.362.207v2.598h-1.331c-1.308 0-1.716.813-1.716 1.649v1.979h2.928l-.468 3.47h-2.46V23.927C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// YouTube SVG Icon
const YoutubeIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3.5 h-3.5"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function TopBar() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<"bn" | "en">("bn");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // কুকি চেক
    const match = document.cookie.match(/googtrans=\/bn\/(en|bn)/);
    if (match && match[1] === "en") {
      setCurrentLang("en");
    } else {
      setCurrentLang("bn");
    }
  }, []);

  const changeLanguage = (lang: "bn" | "en") => {
    setCurrentLang(lang);

    // ব্যাকগ্রাউন্ডে গুগলের ড্রপডাউন সিলেক্ট করা
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    } else {
      // ব্যাকআপ পদ্ধতি
      const hostname = window.location.hostname;
      if (lang === "bn") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=/bn/bn; path=/; domain=${hostname};`;
      } else {
        document.cookie = `googtrans=/bn/en; path=/; domain=${hostname};`;
      }
      window.location.reload();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/notices?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-[#0b3b2c] text-gray-200 text-xs py-2.5 hidden md:block border-b border-[#115a44] relative z-50">
      
      {/* Off-screen Google Translate Container (যা DOM-এ থাকবে কিন্তু চোখে দেখা যাবে না) */}
      <div
        id="google_translate_element"
        className="absolute -top-[9999px] -left-[9999px] opacity-0 pointer-events-none"
      />

      {/* Google Translate Scripts */}
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            if (window.google && window.google.translate) {
              new window.google.translate.TranslateElement({
                pageLanguage: 'bn',
                includedLanguages: 'en,bn',
                autoDisplay: false
              }, 'google_translate_element');
            }
          }
        `}
      </Script>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        
        {/* ===== LEFT: Contact Info ===== */}
        <div className="flex items-center gap-5 lg:gap-6">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
            <MapPin size={13} className="text-[#4ade80]" />
            <span>123 Madrasa Road, Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
            <Phone size={13} className="text-[#4ade80]" />
            <span>+880 1712 345678</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
            <Mail size={13} className="text-[#4ade80]" />
            <span>info@aliamadrasa.edu.bd</span>
          </div>
        </div>

        {/* ===== RIGHT: Search + Language Pill + Social Icons ===== */}
        <div className="flex items-center gap-3">

          {/* Search Toggle */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="খুঁজুন..."
                  className="w-36 lg:w-44 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] placeholder:text-gray-400 focus:outline-none focus:border-[#4ade80]"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-1.5 text-gray-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                title="সার্চ"
              >
                <Search size={13} />
              </button>
            )}
          </div>

          {/* Language Pill (বাংলা | English) */}
          <div className="flex items-center bg-white/10 border border-white/15 rounded-full p-0.5">
            <button
              type="button"
              onClick={() => changeLanguage("bn")}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                mounted && currentLang === "bn"
                  ? "bg-[#4ade80] text-[#0b3b2c] shadow-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                mounted && currentLang === "en"
                  ? "bg-[#4ade80] text-[#0b3b2c] shadow-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              English
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-white/15 ml-1">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#1877f2] flex items-center justify-center transition-all hover:scale-110"
              title="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#ff0000] flex items-center justify-center transition-all hover:scale-110"
              title="YouTube"
            >
              <YoutubeIcon />
            </a>
            <Link
              href="/"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all hover:scale-110"
              title="Home"
            >
              <Globe size={12} />
            </Link>
          </div>

        </div>
      </div>

      {/* Hide Google Top Banners */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body { top: 0 !important; position: static !important; }
            .goog-te-banner-frame { display: none !important; }
            .skiptranslate { display: none !important; }
            #goog-gt-tt { display: none !important; }
            .goog-text-highlight { background: transparent !important; box-shadow: none !important; }
          `,
        }}
      />
    </div>
  );
}