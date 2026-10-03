"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, MapPin, Phone, Mail, Clock, ArrowRight, Globe } from "lucide-react";
import { getWebsiteSettings } from "@/actions/settings";

interface SettingsType {
  madrasaName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export default function Footer() {
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

  const name = settings?.madrasaName || "Alia Madrasa";
  const tagline = settings?.tagline || "Islamic & Modern Education";
  const phone = settings?.phone || "+880 1712 345678";
  const email = settings?.email || "info@aliamadrasa.edu.bd";
  const address = settings?.address || "123 Madrasa Road, Dhaka, Bangladesh";

  return (
    <footer className="bg-[#072e22] text-gray-300 pt-14 pb-6 border-t border-[#115a44]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1 */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="bg-white/10 p-2 rounded-xl text-white group-hover:bg-white/20 transition-colors">
                <BookOpen size={24} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-tight">{name}</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">
                  {tagline}
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed mb-6 max-w-xs">
              Building a generation of knowledgeable, ethical and responsible individuals.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={settings?.facebookUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#4ade80] hover:text-[#072e22] flex items-center justify-center transition-all"
              >
                <Globe size={15} />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              <Link href="/" className="hover:text-white transition-colors">- Home</Link>
              <Link href="/campus" className="hover:text-white transition-colors">- Campus</Link>
              <Link href="/about" className="hover:text-white transition-colors">- About Us</Link>
              <Link href="/notices" className="hover:text-white transition-colors">- News & Events</Link>
              <Link href="/academic" className="hover:text-white transition-colors">- Academic</Link>
              <Link href="/gallery" className="hover:text-white transition-colors">- Gallery</Link>
              <Link href="/admission" className="hover:text-white transition-colors">- Admission</Link>
              <Link href="/contact" className="hover:text-white transition-colors">- Contact</Link>
              <Link href="/students" className="hover:text-white transition-colors">- Students</Link>
              <Link href="/results" className="hover:text-white transition-colors">- Results</Link>
            </div>
          </div>

          {/* Column 3 */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#4ade80] shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#4ade80] shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#4ade80] shrink-0" />
                <span>{email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={15} className="text-[#4ade80] shrink-0" />
                <span>Sat - Thu: 8:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Stay Connected</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/15 rounded-full py-2.5 pl-4 pr-11 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4ade80] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0b3b2c] hover:bg-[#115a44] border border-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}