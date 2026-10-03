"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-[#f8faf8] min-h-screen py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block text-[#0b3b2c] text-xs font-bold uppercase tracking-widest bg-[#0b3b2c]/10 px-4 py-1.5 rounded-full mb-3">
            Contact Us
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b3b2c] mb-2">
            যোগাযোগ করুন
          </h1>
          <p className="text-gray-600 text-sm">
            যেকোনো তথ্য, পরামর্শ বা অনুসন্ধানের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Info (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-[#0b3b2c] text-white p-8 md:p-10 rounded-3xl shadow-lg flex flex-col justify-between space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">আমাদের সাথে যোগাযোগ ইনফো</h2>
              <p className="text-xs text-gray-200 leading-relaxed mb-8">
                মাদ্রাসার সময়সূচীর মধ্যে আপনি সরাসরি এসে অথবা নিচে দেওয়া তথ্যাদির মাধ্যমে আমাদের অফিস কক্ষে যোগাযোগ করতে পারেন।
              </p>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[#4ade80]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100 text-xs">ঠিকানা:</h4>
                    <p className="text-xs text-gray-300 mt-0.5">১২৩ মাদ্রাসা রোড, ঢাকা-১২০০, বাংলাদেশ</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-[#4ade80]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100 text-xs">ফোন নম্বর:</h4>
                    <p className="text-xs text-gray-300 mt-0.5">+৮৮০ ১৭১২ ৩৪NT৭৮</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-[#4ade80]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100 text-xs">ইমেইল:</h4>
                    <p className="text-xs text-gray-300 mt-0.5">info@aliamadrasa.edu.bd</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-[#4ade80]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100 text-xs">অফিস সময়:</h4>
                    <p className="text-xs text-gray-300 mt-0.5">শনিবার - বৃহস্পতিবার: সকাল ৮:০০ - বিকাল ৪:০০</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-gray-300">
              জরুরি মুহূর্তে কল করুন: <b>+৮৮০ ১৭০০ ০০০০০</b>
            </div>
          </div>

          {/* Contact Message Form (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#0b3b2c] mb-2">বার্তা পাঠান (Send Message)</h2>
            <p className="text-xs text-gray-500 mb-6">নিচের ফর্মে আপনার তথ্য টাইপ করে আমাদের ইমেইল বার্তা পাঠাতে পারেন।</p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-semibold">
                <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                <span>আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! শীঘ্রই উত্তর দেওয়া হবে।</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="পুরো নাম"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0b3b2c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">আপনার ইমেইল *</label>
                    <input
                      type="email"
                      required
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0b3b2c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">বিষয় (Subject) *</label>
                  <input
                    type="text"
                    required
                    placeholder="বার্তার বিষয়"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">বার্তার বিষয়বস্তু *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0b3b2c]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0b3b2c] text-white font-bold text-xs rounded-xl hover:bg-[#082a1f] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send size={16} />
                  <span>বার্তা পাঠান</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}