"use client";

import Link from "next/link";
import { ChevronDown, Menu, BookOpen, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "About Us", href: "/about", hasDropdown: true },
    { name: "Academic", href: "/academic", hasDropdown: true },
    { name: "Admission", href: "/admission", hasDropdown: true },
    { name: "Students", href: "/students", hasDropdown: true },
    { name: "Campus", href: "/campus", hasDropdown: true },
    { name: "News & Events", href: "/notices", hasDropdown: true },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[76px]">
          
          {/* Left Side: Logo */}
          <Link href="/home" className="flex items-center gap-2.5 group min-w-max">
            <div className="bg-[#0b3b2c] p-2 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <BookOpen size={22} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[19px] font-extrabold tracking-tight text-gray-900 leading-none mb-0.5">
                Alia<span className="text-[#0b3b2c] font-semibold">Madrasa</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-gray-500 font-bold whitespace-nowrap">
                Islamic & Modern Education
              </span>
            </div>
          </Link>

          {/* Middle: Desktop Menu */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href}
                className="group relative flex items-center gap-1 text-[12px] xl:text-[13px] font-medium text-gray-600 hover:text-[#0b3b2c] hover:scale-110 transition-all duration-300 ease-out whitespace-nowrap px-1.5 py-1"
              >
                <span>{link.name}</span>
                {link.hasDropdown && (
                  <ChevronDown 
                    size={12} 
                    className="text-gray-400 group-hover:text-[#0b3b2c] group-hover:rotate-180 transition-all duration-300" 
                  />
                )}
                {/* Underline Effect */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#0b3b2c] transition-all duration-300 group-hover:w-4/5 rounded-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Side: Apply Now + Mobile Toggle */}
          <div className="flex items-center gap-3 min-w-max">
            <Link 
              href="/admission" 
              className="hidden lg:flex items-center justify-center px-5 py-2 text-[12px] xl:text-[13px] font-semibold text-white bg-[#0b3b2c] rounded-full hover:bg-[#082a1f] hover:scale-105 hover:shadow-[0_6px_20px_-4px_rgba(11,59,44,0.4)] transition-all duration-300 whitespace-nowrap"
            >
              Apply Now
            </Link>

            {/* Mobile Menu Icon */}
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#0b3b2c] hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-[#0b3b2c]/5 hover:text-[#0b3b2c] rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admission"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-3 px-4 py-3 text-sm font-bold text-center text-white bg-[#0b3b2c] rounded-xl hover:bg-[#082a1f] transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}