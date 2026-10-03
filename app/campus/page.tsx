import { Building, BookOpen, Users, Trophy } from "lucide-react";

export default function CampusPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b3b2c] mb-4">আমাদের ক্যাম্পাস ও সুবিধা</h1>
          <p className="text-gray-600">শিক্ষার্থীদের জন্য একটি সুন্দর, নিরাপদ ও আধুনিক শিক্ষার পরিবেশ।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
            <Building className="text-[#0b3b2c] w-12 h-12 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">আধুনিক হোস্টেল</h3>
              <p className="text-sm text-gray-500">নিরাপদ, পরিষ্কার-পরিচ্ছন্ন ও সার্বক্ষণিক তদারকি সম্পন্ন উন্নতমানের ছাত্রাবাস ব্যবস্থা।</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
            <BookOpen className="text-[#0b3b2c] w-12 h-12 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">সমৃদ্ধ লাইব্রেরি</h3>
              <p className="text-sm text-gray-500">হাজারো ইসলামিক ও আধুনিক বইয়ে সমৃদ্ধ আমাদের সেন্ট্রাল লাইব্রেরি, যা জ্ঞান অর্জনের সেরা স্থান।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}