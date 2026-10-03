import Link from "next/link";
import { Home, ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#f8faf8] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-[#0b3b2c]/10 flex items-center justify-center mx-auto mb-6">
          <BookOpen size={40} className="text-[#0b3b2c]" />
        </div>

        <h1 className="text-7xl font-black text-[#0b3b2c] mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          পেজটি পাওয়া যায়নি
        </h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, মুছে ফেলা হয়েছে অথবা কখনোই তৈরি হয়নি।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b3b2c] text-white text-sm font-bold rounded-2xl hover:bg-[#082a1f] transition-all shadow-md"
          >
            <Home size={16} />
            হোমপেজে ফিরে যান
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0b3b2c] border border-[#0b3b2c]/20 text-sm font-bold rounded-2xl hover:bg-[#0b3b2c]/5 transition-all"
          >
            <ArrowLeft size={16} />
            যোগাযোগ করুন
          </Link>
        </div>
      </div>
    </div>
  );
}