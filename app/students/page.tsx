import Link from "next/link";
import { GraduationCap, Award, FileEdit, BookOpen } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#0b3b2c]/10 flex items-center justify-center mx-auto mb-6">
          <GraduationCap size={40} className="text-[#0b3b2c]" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b3b2c] mb-4">
          শিক্ষার্থী কর্নার
        </h1>
        <p className="text-gray-600 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
          বর্তমান ও ভবিষ্যৎ শিক্ষার্থীদের জন্য সকল প্রয়োজনীয় লিংক ও সেবা নিচে দেওয়া হলো।
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/admission" 
            className="px-6 py-3.5 bg-[#0b3b2c] text-white rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-[#082a1f] hover:scale-105 transition-all shadow-md"
          >
            <FileEdit size={18} />
            নতুন ভর্তি আবেদন
          </Link>
          
          <Link 
            href="/results" 
            className="px-6 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-700 hover:scale-105 transition-all shadow-md"
          >
            <Award size={18} />
            ফলাফল ও মার্কশীট
          </Link>
          
          <Link 
            href="/notices" 
            className="px-6 py-3.5 bg-white text-[#0b3b2c] border border-[#0b3b2c]/20 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-[#0b3b2c]/5 hover:scale-105 transition-all shadow-sm"
          >
            <BookOpen size={18} />
            নোটিশ বোর্ড
          </Link>
        </div>
      </div>
    </div>
  );
}