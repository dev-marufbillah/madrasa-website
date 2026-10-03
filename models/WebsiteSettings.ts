import mongoose, { Schema, Document } from "mongoose";

export interface IWebsiteSettings extends Document {
  madrasaName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  statYears: string;
  statStudents: string;
  statTeachers: string;
  statPrograms: string;
  principalName: string;
  principalMessage: string;
  principalPhoto: string; // নতুন: অধ্যক্ষের ছবি
  loginPageNotice: string;
  loginPageRules: string;
  madrasaHistory: string; // নতুন: মাদ্রাসার ইতিহাস/বিস্তারিত আর্টিকেল
  facebookUrl?: string;
  youtubeUrl?: string;
  updatedAt: Date;
}

const WebsiteSettingsSchema: Schema = new Schema(
  {
    madrasaName: { type: String, default: "আলিয়া মাদ্রাসা" },
    tagline: { type: String, default: "Islamic & Modern Education" },
    phone: { type: String, default: "+৮৮০ ১৭১২ ৩৪৫৬৭৮" },
    email: { type: String, default: "info@aliamadrasa.edu.bd" },
    address: { type: String, default: "১২৩ মাদ্রাসা রোড, ঢাকা, বাংলাদেশ" },
    heroTitle: { type: String, default: "Empowering Minds, Inspiring Faith" },
    heroSubtitle: { type: String, default: "আলিয়া মাদ্রাসা ইসলামী ও আধুনিক শিক্ষার সমন্বয়ে কাজ করছে।" },
    heroImage: { type: String, default: "" },
    statYears: { type: String, default: "50+" },
    statStudents: { type: String, default: "1200+" },
    statTeachers: { type: String, default: "100+" },
    statPrograms: { type: String, default: "20+" },
    principalName: { type: String, default: "মাওলানা অধ্যক্ষ মোঃ ইব্রাহিম খান" },
    principalMessage: { type: String, default: "পবিত্র কুরআন ও সুন্নাহর শিক্ষায় আলোকিত সমাজ গড়াই আমাদের মূল লক্ষ্য।" },
    principalPhoto: { type: String, default: "" },
    loginPageNotice: { type: String, default: "ডিজিটাল এই পোর্টালে আপনাদের স্বাগতম। এই পোর্টালটি আপনাদের একাডেমিক তথ্য দ্রুত পাওয়ার জন্য তৈরি করা হয়েছে।" },
    loginPageRules: { type: String, default: "১. সকাল ৮ টার মধ্যে উপস্থিত হতে হবে।\n২. নির্ধারিত সুন্নতি পোশাক পরতে হবে।" },
    madrasaHistory: { 
      type: String, 
      default: "আলিয়া মাদ্রাসা একটি সুপ্রাচীন ও ঐতিহ্যবাহী ইসলামী শিক্ষাকেন্দ্র। দীর্ঘ ৫০ বছরেরও বেশি সময় ধরে এই প্রতিষ্ঠানটি কোরআন ও সুন্নাহর আলোকে হাজারো আলেম, হাফেজ ও সুনাগরিক তৈরি করে আসছে। আমাদের লক্ষ্য হলো শিক্ষার্থীদেরকে ইসলামী মূল্যবোধের পাশাপাশি আধুনিক বিজ্ঞান ও প্রযুক্তিতে দক্ষ করে তোলা, যাতে তারা দেশ ও জাতির কল্যাণে গুরুত্বপূর্ণ ভূমিকা রাখতে পারে।" 
    },
    facebookUrl: { type: String, default: "" },
    youtubeUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.WebsiteSettings ||
  mongoose.model<IWebsiteSettings>("WebsiteSettings", WebsiteSettingsSchema);