"use client";

import { useState, useEffect } from "react";
import { loginUser } from "@/actions/auth";
import { getWebsiteSettings } from "@/actions/settings";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  LogIn,
  BookOpen,
  AlertCircle,
  X,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  User,
  Landmark,
} from "lucide-react";

interface SettingsType {
  madrasaName?: string;
  principalName?: string;
  principalPhoto?: string;
  loginPageNotice?: string;
  loginPageRules?: string;
  madrasaHistory?: string;
}

export default function AuthPortalPage() {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<"none" | "signin" | "signup">("none");
  const [signupRole, setSignupRole] = useState<"student" | "teacher">("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [settings, setSettings] = useState<SettingsType | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadSettings() {
      try {
        const res = await getWebsiteSettings();
        if (isMounted && res.success && res.data) {
          setSettings(res.data);
        }
      } catch (error) {
        console.error("Failed to load settings in login:", error);
      }
    }
    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (activeModal !== "none") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  const closeModal = () => {
    setActiveModal("none");
    setErrorMsg("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await loginUser({ email, password });
    setLoading(false);

    if (res.success) {
      if (res.role === "admin") router.push("/admin");
      else if (res.role === "teacher") router.push("/teacher");
      else if (res.role === "student") router.push("/student");
      else if (res.role === "parent") router.push("/parent");
      else router.push("/");
    } else {
      setErrorMsg(res.message || "লগইন করা সম্ভব হয়নি।");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setErrorMsg("অনলাইন রেজিস্ট্রেশন বর্তমানে বন্ধ আছে। অনুগ্রহ করে অ্যাডমিন অফিসে যোগাযোগ করুন।");
    }, 1200);
  };

  const defaultRules = [
    "সকাল ৮ টার মধ্যে উপস্থিত হতে হবে।",
    "নির্ধারিত সুন্নতি পোশাক পরতে হবে।",
    "ক্যাম্পাসে মোবাইল ব্যবহার সম্পূর্ণ নিষিদ্ধ।",
    "শিক্ষক ও সহপাঠীদের সাথে উত্তম ব্যবহার করতে হবে।",
  ];

  const rulesList = settings?.loginPageRules
    ? settings.loginPageRules.split("\n").filter((r) => r.trim() !== "")
    : defaultRules;

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      
      {/* HERO SECTION */}
      <div className="bg-[#0b3b2c] pt-12 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-[#4ade80]/10 rounded-full blur-2xl"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto mb-6 shadow-xl backdrop-blur-md">
            <BookOpen size={40} strokeWidth={1.5} />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            {settings?.madrasaName || "আলিয়া মাদ্রাসা"} পোর্টাল
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            শিক্ষার্থী, শিক্ষক এবং অভিভাবকদের জন্য একটি সমন্বিত ডিজিটাল প্ল্যাটফর্ম।
          </p>

          {/* Clean Fixed Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={() => setActiveModal("signin")}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#4ade80] text-[#0b3b2c] font-extrabold rounded-full hover:bg-white hover:scale-105 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <LogIn size={18} />
              <span>পোর্টালে প্রবেশ করুন (Sign In)</span>
            </button>
            
            <button
              type="button"
              onClick={() => setActiveModal("signup")}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <UserPlus size={18} />
              <span>নতুন অ্যাকাউন্ট (Sign Up)</span>
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 pb-20 relative z-20 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Principal Message */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40">
            <h2 className="text-lg font-bold text-[#0b3b2c] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#4ade80]" />
              অধ্যক্ষের নির্দেশনা
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed italic mb-6 whitespace-pre-line">
              &quot;{settings?.loginPageNotice || "ডিজিটাল এই পোর্টালে আপনাদের স্বাগতম। এই পোর্টালটি আপনাদের একাডেমিক তথ্য দ্রুত ও সহজে পাওয়ার জন্য তৈরি করা হয়েছে।"}&quot;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 shrink-0">
                {settings?.principalPhoto ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={settings.principalPhoto} alt="Principal" className="w-full h-full object-cover" />
                ) : (
                  <User size={20} className="text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{settings?.principalName || "অধ্যক্ষ মহোদয়"}</p>
                <p className="text-[11px] text-gray-500">অধ্যক্ষ, {settings?.madrasaName || "আলিয়া মাদ্রাসা"}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Rules & Regulations */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 h-fit">
            <h2 className="text-lg font-bold text-[#0b3b2c] mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
              <BookOpen size={20} className="text-[#4ade80]" />
              পোর্টালে ব্যবহার ও আচরণবিধি
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {rulesList.map((rule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Width Article: Madrasa History */}
        {settings?.madrasaHistory && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/40 mt-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-[#0b3b2c]/10 flex items-center justify-center text-[#0b3b2c]">
                <Landmark size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0b3b2c]">ঐতিহ্য ও ইতিহাস (Our Legacy)</h2>
                <p className="text-xs text-gray-500 mt-1">{settings?.madrasaName || "আলিয়া মাদ্রাসা"} এর এক নজরে পরিচিতি</p>
              </div>
            </div>
            
            <div className="prose prose-sm md:prose-base max-w-none text-gray-600 leading-loose whitespace-pre-line text-justify">
              {settings.madrasaHistory}
            </div>
          </div>
        )}

      </div>

      {/* MODALS SECTION */}
      {activeModal !== "none" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-md rounded-[28px] shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="p-8">
              {/* SIGN IN MODAL */}
              {activeModal === "signin" && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-black text-[#0b3b2c] mb-1">স্বাগতম!</h2>
                    <p className="text-xs text-gray-500">আপনার ইমেইল ও পাসওয়ার্ড দিয়ে প্রবেশ করুন</p>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-semibold flex items-start gap-2 mb-5">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase tracking-wider">
                        ইমেইল এড্রেস
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          placeholder="আপনার ইমেইল..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4ade80] bg-gray-50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase tracking-wider">
                        পাসওয়ার্ড
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4ade80] bg-gray-50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 mt-2 bg-[#0b3b2c] text-white font-bold text-sm rounded-xl hover:bg-[#082a1f] shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "প্রবেশ করা হচ্ছে..." : "লগইন করুন"}
                    </button>
                  </form>

                  <div className="mt-6 pt-4 border-t border-gray-100 text-center text-[10px] text-gray-400 space-y-1">
                    <p><b>Admin:</b> admin@aliamadrasa.edu.bd / admin12345</p>
                  </div>
                </>
              )}

              {/* SIGN UP MODAL */}
              {activeModal === "signup" && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-black text-[#0b3b2c] mb-1">অ্যাকাউন্ট তৈরি করুন</h2>
                    <p className="text-xs text-gray-500">পোর্টালের সুবিধা পেতে রেজিস্ট্রেশন করুন</p>
                  </div>

                  <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                      type="button"
                      onClick={() => setSignupRole("student")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        signupRole === "student" ? "bg-white text-[#0b3b2c] shadow-sm" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      শিক্ষার্থী
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupRole("teacher")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        signupRole === "teacher" ? "bg-white text-[#0b3b2c] shadow-sm" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      শিক্ষক
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 p-3 rounded-xl text-xs font-semibold flex items-start gap-2 mb-5">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase tracking-wider">
                        আপনার নাম
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="আপনার পুরো নাম"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4ade80] bg-gray-50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 mt-2 bg-[#4ade80] text-[#0b3b2c] font-extrabold text-sm rounded-xl hover:bg-[#34d399] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                    >
                      <UserPlus size={18} />
                      <span>{loading ? "অপেক্ষা করুন..." : "রেজিস্ট্রেশন আবেদন করুন"}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}