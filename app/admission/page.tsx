"use client";

import { useState } from "react";
import { submitAdmission } from "@/actions/admission";
import { Send, CheckCircle2, User, Phone } from "lucide-react";

export default function AdmissionPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success?: boolean; message?: string } | null>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    gender: "Male" as "Male" | "Female",
    desiredClass: "Ebtedayee (Class 1-5)",
    guardianName: "",
    guardianPhone: "",
    address: "",
    previousInstitution: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const res = await submitAdmission(formData);
    setLoading(false);
    setResponse(res);

    if (res.success) {
      setFormData({
        studentName: "",
        dateOfBirth: "",
        gender: "Male",
        desiredClass: "Ebtedayee (Class 1-5)",
        guardianName: "",
        guardianPhone: "",
        address: "",
        previousInstitution: "",
      });
    }
  };

  return (
    <div className="bg-[#f8faf8] min-h-screen py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-[#0b3b2c] text-xs font-bold uppercase tracking-widest bg-[#0b3b2c]/10 px-4 py-1.5 rounded-full mb-3">
            Online Admission Form
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0b3b2c] mb-2">
            অনলাইন ভর্তি আবেদন ফরম
          </h1>
          <p className="text-gray-600 text-sm">
            আলিয়া মাদ্রাসায় আপনার সন্তানের ভর্তির জন্য নিচের সঠিক তথ্যগুলো পূরণ করুন।
          </p>
        </div>

        {/* Success Alert */}
        {response && response.success && (
          <div className="mb-6 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-emerald-800 shadow-sm">
            <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base mb-1">আবেদন সফল হয়েছে!</h4>
              <p className="text-sm">{response.message}</p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {response && !response.success && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
            ❌ {response.message}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Student Info */}
            <div>
              <h3 className="text-base font-bold text-[#0b3b2c] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <User size={18} />
                শিক্ষার্থীর তথ্য (Student Information)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">শিক্ষার্থীর পুরো নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ আব্দুল্লাহ"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">জন্ম তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">লিঙ্গ (Gender) *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as "Male" | "Female" })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  >
                    <option value="Male">ছাত্র (Male)</option>
                    <option value="Female">ছাত্রী (Female)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ভর্তির কাঙ্ক্ষিত শ্রেণি *</label>
                  <select
                    value={formData.desiredClass}
                    onChange={(e) => setFormData({ ...formData, desiredClass: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  >
                    <option value="Ebtedayee (Class 1-5)">ইবতেদায়ী (১ম - ৫ম শ্রেণি)</option>
                    <option value="Dakhil (Class 6-10)">দাখিল (৬ষ্ঠ - ১০ম শ্রেণি)</option>
                    <option value="Alim (Class 11-12)">আলিম (একাদশ - দ্বাদশ)</option>
                    <option value="Fazil (Bachelor)">ফাজিল (ডিগ্রী/অনার্স)</option>
                    <option value="Kamil (Master)">কামিল (মাস্টার্স)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Guardian Info */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-[#0b3b2c] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Phone size={18} />
                অভিভাবকের তথ্য (Guardian Information)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">অভিভাবকের নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="পিতা / মাতার নাম"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1">বর্তমান ঠিকানা *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="গ্রাম/রাস্তা, ডাকঘর, থানা, জেলা"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                ></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1">পূর্ববর্তী শিক্ষা প্রতিষ্ঠান (যদি থাকে)</label>
                <input
                  type="text"
                  placeholder="পূর্বে যে স্কুলে/মাদ্রাসায় পড়েছে"
                  value={formData.previousInstitution}
                  onChange={(e) => setFormData({ ...formData, previousInstitution: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0b3b2c] text-white font-bold rounded-2xl hover:bg-[#082a1f] transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <span>ডাটাবেসে সেভ হচ্ছে...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>আবেদন পাঠান (Submit Application)</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}