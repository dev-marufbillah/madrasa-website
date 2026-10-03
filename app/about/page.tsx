import { Target, Eye, Gem } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#f8faf8] min-h-screen py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[#0b3b2c] text-xs font-bold uppercase tracking-widest bg-[#0b3b2c]/10 px-4 py-1.5 rounded-full mb-3">
            About Alia Madrasa
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0b3b2c] leading-tight mb-4">
            আমাদের পরিচিতি ও ঐতিহ্য
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            ইসলামী ও আধুনিক শিক্ষার সমন্বয়ে একটি আদর্শ ও নৈতিক জাতি গঠনে নিরলস কাজ করে যাচ্ছে আলিয়া মাদ্রাসা।
          </p>
        </div>

        {/* Principal Message Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#0b3b2c]/10 mx-auto overflow-hidden border-4 border-[#0b3b2c]/20 shadow-md mb-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
                alt="Principal"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900">মাওলানা অধ্যক্ষ মোঃ ইব্রাহিম খান</h3>
            <p className="text-xs text-[#0b3b2c] font-bold">অধ্যক্ষ, আলিয়া মাদ্রাসা, ঢাকা</p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-[#0b3b2c] uppercase tracking-wider bg-[#0b3b2c]/10 px-3 py-1 rounded-full">
              Principal&apos;s Message
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0b3b2c] leading-snug">
              অধ্যক্ষের বাণী
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed italic">
              &quot;বিসমিল্লাহির রাহমানির রাহিম। সকল প্রশংসা মহান আল্লাহ তাআলার যিনি আমাদের জ্ঞানের আলো দান করেছেন। আলিয়া মাদ্রাসা কেবল একটি শিক্ষা প্রতিষ্ঠান নয়, এটি সৎ, যোগ্য ও দেশপ্রেমিক মানুষ গড়ার এক আলোকবর্তিকা। আমরা শিক্ষার্থীদের পবিত্র কুরআন ও সুন্নাহর পাশাপাশি যুগের সাথে তাল মিলিয়ে আধুনিক বিজ্ঞানের শিক্ষায় শিক্ষিত করে গড়ে তুলছি। মহান আল্লাহ আমাদের সহায় হোন। আমিন।&quot;
            </p>
          </div>
        </div>

        {/* Mission, Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#0b3b2c]/10 text-[#0b3b2c] flex items-center justify-center mb-4">
              <Target size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">আমাদের লক্ষ্য (Mission)</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              গুণগত মানসম্পন্ন ইসলামী শিক্ষা ও আধুনিক জ্ঞানের সমন্বয়ে প্রতিটি শিক্ষার্থীকে নৈতিক চরিত্রবান নাগরিক হিসেবে গড়ে তোলা।
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
              <Eye size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">আমাদের ভিশন (Vision)</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              আন্তর্জাতিক মানের একটি ইসলামী শিক্ষা প্রতিষ্ঠান হিসেবে আত্মপ্রকাশ করা এবং বিশ্বমঞ্চে সত্যের বার্তা ছড়িয়ে দেওয়া।
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Gem size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">আমাদের মূল্যবোধ (Values)</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              ঈমান, জ্ঞান, শৃঙ্খলাই জীবন, মানবসেবা, সততা এবং আনুগত্য বজায় রেখে পথ চলা।
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}