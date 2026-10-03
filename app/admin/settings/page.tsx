"use client";

import { useEffect, useState } from "react";
import { getWebsiteSettings, updateWebsiteSettings, SettingsInput } from "@/actions/settings";
import { uploadSingleImage } from "@/actions/upload";
import { Building, Globe, Save, CheckCircle2, AlertCircle, Upload, Image as ImageIcon, ShieldCheck, User, X, Loader2 } from "lucide-react";

// ছবি ছোট (Compress) করার ক্যানভাস ফাংশন
const compressImageFile = (file: File, maxWidth = 800, quality = 0.5): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingPrincipal, setUploadingPrincipal] = useState(false);

  const [formData, setFormData] = useState<SettingsInput>({
    madrasaName: "আলিয়া মাদ্রাসা",
    tagline: "Islamic & Modern Education",
    phone: "+৮৮০ ১৭১২ ৩৪৫৬৭৮",
    email: "info@aliamadrasa.edu.bd",
    address: "১২৩ মাদ্রাসা রোড, ঢাকা, বাংলাদেশ",
    heroTitle: "Empowering Minds, Inspiring Faith",
    heroSubtitle: "আলিয়া মাদ্রাসা ইসলামী ও আধুনিক শিক্ষার সমন্বয়ে কাজ করছে।",
    heroImage: "",
    statYears: "50+",
    statStudents: "1200+",
    statTeachers: "100+",
    statPrograms: "20+",
    principalName: "মাওলানা অধ্যক্ষ মোঃ ইব্রাহিম খান",
    principalMessage: "পবিত্র কুরআন ও সুন্নাহর শিক্ষায় আলোকিত সমাজ গড়াই আমাদের লক্ষ্য।",
    principalPhoto: "",
    loginPageNotice: "ডিজিটাল এই পোর্টালে আপনাদের স্বাগতম।",
    loginPageRules: "১. সকাল ৮ টার মধ্যে উপস্থিত হতে হবে।\n২. নির্ধারিত সুন্নতি পোশাক পরতে হবে।",
    madrasaHistory: "আলিয়া মাদ্রাসা একটি সুপ্রাচীন ও ঐতিহ্যবাহী ইসলামী শিক্ষাকেন্দ্র।",
    facebookUrl: "",
    youtubeUrl: "",
  });

  useEffect(() => {
    let isMounted = true;
    async function loadSettings() {
      try {
        const res = await getWebsiteSettings();
        if (isMounted && res.success && res.data) {
          setFormData({
            madrasaName: res.data.madrasaName || "আলিয়া মাদ্রাসা",
            tagline: res.data.tagline || "Islamic & Modern Education",
            phone: res.data.phone || "+৮৮০ ১৭১২ ৩৪৫৬৭৮",
            email: res.data.email || "info@aliamadrasa.edu.bd",
            address: res.data.address || "১২৩ মাদ্রাসা রোড, ঢাকা, বাংলাদেশ",
            heroTitle: res.data.heroTitle || "Empowering Minds, Inspiring Faith",
            heroSubtitle: res.data.heroSubtitle || "আলিয়া মাদ্রাসা ইসলামী ও আধুনিক শিক্ষার সমন্বয়ে কাজ করছে।",
            heroImage: res.data.heroImage || "",
            statYears: res.data.statYears || "50+",
            statStudents: res.data.statStudents || "1200+",
            statTeachers: res.data.statTeachers || "100+",
            statPrograms: res.data.statPrograms || "20+",
            principalName: res.data.principalName || "মাওলানা অধ্যক্ষ মোঃ ইব্রাহিম খান",
            principalMessage: res.data.principalMessage || "পবিত্র কুরআন ও সুন্নাহর শিক্ষায় আলোকিত সমাজ গড়াই আমাদের লক্ষ্য।",
            principalPhoto: res.data.principalPhoto || "",
            loginPageNotice: res.data.loginPageNotice || "ডিজিটাল এই পোর্টালে আপনাদের স্বাগতম।",
            loginPageRules: res.data.loginPageRules || "১. সকাল ৮ টার মধ্যে উপস্থিত হতে হবে।\n২. নির্ধারিত সুন্নতি পোশাক পরতে হবে।",
            madrasaHistory: res.data.madrasaHistory || "আলিয়া মাদ্রাসা একটি সুপ্রাচীন ও ঐতিহ্যবাহী ইসলামী শিক্ষাকেন্দ্র।",
            facebookUrl: res.data.facebookUrl || "",
            youtubeUrl: res.data.youtubeUrl || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadSettings();
    return () => { isMounted = false; };
  }, []);

  // স্মার্ট ছবি আপলোড হ্যান্ডলার (Hero)
  const handleHeroImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    try {
      const compressedBase64 = await compressImageFile(file, 800, 0.5);
      const res = await uploadSingleImage(compressedBase64, "settings");

      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, heroImage: res.url }));
        setMessage({ type: "success", text: "ছবি ক্লাউডে আপলোড হয়েছে! এবার সেভ করুন।" });
      } else {
        setFormData((prev) => ({ ...prev, heroImage: compressedBase64 }));
        setMessage({ type: "success", text: "ছবি প্রসেস হয়েছে। সেভ বাটনে চাপ দিন।" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "ছবি প্রসেস করতে সমস্যা হয়েছে।" });
    } finally {
      setUploadingHero(false);
    }
  };

  // স্মার্ট ছবি আপলোড হ্যান্ডলার (Principal Photo)
  const handlePrincipalPhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPrincipal(true);
    try {
      const compressedBase64 = await compressImageFile(file, 400, 0.5);
      const res = await uploadSingleImage(compressedBase64, "settings");

      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, principalPhoto: res.url }));
        setMessage({ type: "success", text: "ছবি ক্লাউডে আপলোড হয়েছে! এবার সেভ করুন।" });
      } else {
        setFormData((prev) => ({ ...prev, principalPhoto: compressedBase64 }));
        setMessage({ type: "success", text: "ছবি প্রসেস হয়েছে। সেভ বাটনে চাপ দিন।" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "ছবি প্রসেস করতে সমস্যা হয়েছে।" });
    } finally {
      setUploadingPrincipal(false);
    }
  };

  const handlePartialSubmit = async (e: React.FormEvent, sectionId: number) => {
    e.preventDefault();
    setSavingSection(sectionId);
    setMessage(null);

    const res = await updateWebsiteSettings(formData);
    setSavingSection(null);

    if (res.success) {
      setMessage({ type: "success", text: "আলহামদুলিল্লাহ! তথ্য সফলভাবে সেভ হয়েছে।" });
      setTimeout(() => setMessage(null), 4000);
    } else {
      setMessage({ type: "error", text: res.message || "সেভ করতে সমস্যা হয়েছে।" });
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center text-sm font-semibold">সেটিংস লোড হচ্ছে...</div>;
  }

  return (
    <div className="bg-[#f8faf8] min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div>
          <span className="text-xs font-bold text-[#0b3b2c] uppercase tracking-wider bg-[#0b3b2c]/10 px-3 py-1 rounded-full">Admin Dashboard</span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0b3b2c] mt-2">ওয়েবসাইট সেটিংস ও ব্র্যান্ডিং</h1>
        </div>

        {/* Global Toast Alert */}
        {message && (
          <div className={`fixed top-24 right-6 sm:right-10 z-50 p-4 rounded-2xl text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-5 max-w-md ${message.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}>
            {message.type === "success" ? <CheckCircle2 size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
            <span className="flex-1">{message.text}</span>
            <button onClick={() => setMessage(null)} className="cursor-pointer hover:opacity-80"><X size={16} /></button>
          </div>
        )}

        <div className="space-y-8">
          
          {/* ================= SECTION 1: Login Page Settings ================= */}
          <form onSubmit={(e) => handlePartialSubmit(e, 1)} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-[#0b3b2c] border-b border-gray-100 pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2"><ShieldCheck size={18} /> লগইন পেজ ও মাদ্রাসার ইতিহাস</span>
              <button type="submit" disabled={savingSection === 1 || uploadingPrincipal} className="px-4 py-2 bg-[#0b3b2c] text-white text-xs font-bold rounded-xl hover:bg-[#082a1f] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50">
                <Save size={14} /> {savingSection === 1 ? "সেভ হচ্ছে..." : "সেভ করুন"}
              </button>
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">মাদ্রাসার ইতিহাস ও ঐতিহ্য (দীর্ঘ আর্টিকেল) *</label>
              <textarea rows={6} required value={formData.madrasaHistory} onChange={(e) => setFormData({ ...formData, madrasaHistory: e.target.value })} placeholder="মাদ্রাসার জন্ম, ইতিহাস ও অর্জন সম্পর্কে লিখুন..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">লগইন পোর্টালে অধ্যক্ষের বার্তা *</label>
                <textarea rows={4} required value={formData.loginPageNotice} onChange={(e) => setFormData({ ...formData, loginPageNotice: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">পোর্টালে ব্যবহার ও আচরণবিধি (প্রতিটি নিয়ম নতুন লাইনে) *</label>
                <textarea rows={4} required value={formData.loginPageRules} onChange={(e) => setFormData({ ...formData, loginPageRules: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">অধ্যক্ষ সাহেবের ছবি (Principal Photo)</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {uploadingPrincipal ? (
                      <Loader2 size={24} className="animate-spin text-[#0b3b2c]" />
                    ) : formData.principalPhoto ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={formData.principalPhoto} alt="Principal" className="w-full h-full object-cover" />
                    ) : (
                      <User size={24} className="text-gray-400" />
                    )}
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-[#0b3b2c]/10 text-[#0b3b2c] hover:bg-[#0b3b2c] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm">
                    <Upload size={14} /> <span>{uploadingPrincipal ? "আপলোড হচ্ছে..." : "ছবি বাছুন"}</span>
                    <input type="file" accept="image/*" onChange={handlePrincipalPhotoSelect} className="hidden" disabled={uploadingPrincipal} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">অধ্যক্ষ সাহেবের নাম *</label>
                <input type="text" required value={formData.principalName} onChange={(e) => setFormData({ ...formData, principalName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]" />
              </div>
            </div>
          </form>

          {/* ================= SECTION 2: Hero Banner Settings ================= */}
          <form onSubmit={(e) => handlePartialSubmit(e, 2)} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-[#0b3b2c] border-b border-gray-100 pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2"><Globe size={18} /> হোমপেজ হিরো ব্যানার</span>
              <button type="submit" disabled={savingSection === 2 || uploadingHero} className="px-4 py-2 bg-[#0b3b2c] text-white text-xs font-bold rounded-xl hover:bg-[#082a1f] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50">
                <Save size={14} /> {savingSection === 2 ? "সেভ হচ্ছে..." : "সেভ করুন"}
              </button>
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">ক্যাম্পাস ব্যাকগ্রাউন্ড ছবি</label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-48 h-28 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {uploadingHero ? (
                    <Loader2 size={28} className="animate-spin text-[#0b3b2c]" />
                  ) : formData.heroImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={formData.heroImage} alt="Hero" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={28} className="text-gray-400" />
                  )}
                </div>
                <label className="cursor-pointer inline-flex items-center gap-2 bg-[#0b3b2c] text-white hover:bg-[#082a1f] px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm">
                  <Upload size={14} /> <span>{uploadingHero ? "আপলোড হচ্ছে..." : "নতুন ছবি বাছুন"}</span>
                  <input type="file" accept="image/*" onChange={handleHeroImageSelect} className="hidden" disabled={uploadingHero} />
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">মেইন হেডিং (Hero Title) *</label>
                <input type="text" required value={formData.heroTitle} onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">বিবরণী (Hero Subtitle) *</label>
                <textarea rows={2} required value={formData.heroSubtitle} onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"></textarea>
              </div>
            </div>
          </form>

          {/* ================= SECTION 3: Basic Info Settings ================= */}
          <form onSubmit={(e) => handlePartialSubmit(e, 3)} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-[#0b3b2c] border-b border-gray-100 pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2"><Building size={18} /> প্রতিষ্ঠান ও যোগাযোগের তথ্য</span>
              <button type="submit" disabled={savingSection === 3} className="px-4 py-2 bg-[#0b3b2c] text-white text-xs font-bold rounded-xl hover:bg-[#082a1f] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50">
                <Save size={14} /> {savingSection === 3 ? "সেভ হচ্ছে..." : "সেভ করুন"}
              </button>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">মাদ্রাসার নাম *</label>
                <input type="text" required value={formData.madrasaName} onChange={(e) => setFormData({ ...formData, madrasaName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">স্লোগান (Tagline) *</label>
                <input type="text" required value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ফোন নম্বর *</label>
                <input type="text" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ইমেইল *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">ঠিকানা *</label>
              <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]" />
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}