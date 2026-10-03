"use client";

import { useEffect, useState } from "react";
import { getAdmissions, updateAdmissionStatus } from "@/actions/admission";
import { CheckCircle, XCircle, Clock, RefreshCw, User, Phone, MapPin, School } from "lucide-react";

interface AdmissionType {
  _id: string;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  desiredClass: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  previousInstitution?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<AdmissionType[]>([]);
  const [loading, setLoading] = useState(true);

  // ম্যানুয়াল রিফ্রেশ বা স্ট্যাটাস আপডেটের জন্য
  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const res = await getAdmissions();
      if (res.success && res.data) {
        setAdmissions(res.data);
      }
    } catch (error) {
      console.error("Failed to load admissions:", error);
    } finally {
      setLoading(false);
    }
  };

  // প্রথমবার পেজ লোডের জন্য (Warning-free approach)
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const res = await getAdmissions();
        if (isMounted && res.success && res.data) {
          setAdmissions(res.data);
        }
      } catch (error) {
        console.error("Initial load error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (id: string, newStatus: "approved" | "rejected") => {
    const res = await updateAdmissionStatus(id, newStatus);
    if (res.success) {
      fetchAdmissions();
    }
  };

  return (
    <div className="bg-[#f8faf8] min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#0b3b2c] uppercase tracking-wider bg-[#0b3b2c]/10 px-3 py-1 rounded-full">
              Admin Dashboard
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0b3b2c] mt-2">
              ভর্তি আবেদনসমূহ (Admission Applications)
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              ওয়েবসাইট থেকে জমা হওয়া সকল ভর্তি আবেদনপত্রের তালিকা।
            </p>
          </div>

          <button
            onClick={() => fetchAdmissions()}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors shadow-sm self-start md:self-auto cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            রিফ্রেশ করুন
          </button>
        </div>

        {/* Admissions Table / List */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 text-sm border border-gray-100 shadow-sm">
            ডাটাবেস থেকে তথ্য লোড হচ্ছে...
          </div>
        ) : admissions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500 text-sm border border-gray-100 shadow-sm">
            এখনো কোনো ভর্তি আবেদন জমা হয়নি।
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {admissions.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Info Area */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.studentName}
                    </h3>

                    {/* Class Badge */}
                    <span className="text-xs font-bold bg-[#0b3b2c]/10 text-[#0b3b2c] px-3 py-0.5 rounded-full">
                      {item.desiredClass}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1 ${
                        item.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status === "approved" && <CheckCircle size={12} />}
                      {item.status === "rejected" && <XCircle size={12} />}
                      {item.status === "pending" && <Clock size={12} />}
                      <span className="capitalize">{item.status}</span>
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span>অভিভাবক: <b>{item.guardianName}</b></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <span>ফোন: <b>{item.guardianPhone}</b></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span>ঠিকানা: <b>{item.address}</b></span>
                    </div>

                    {item.previousInstitution && (
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <School size={14} className="text-gray-400" />
                        <span>পূর্ববর্তী প্রতিষ্ঠান: <b>{item.previousInstitution}</b></span>
                      </div>
                    )}

                    <div className="text-gray-400">
                      জমা দান: {new Date(item.createdAt).toLocaleDateString("bn-BD")}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                  {item.status !== "approved" && (
                    <button
                      onClick={() => handleStatusChange(item._id, "approved")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle size={14} />
                      Approve
                    </button>
                  )}

                  {item.status !== "rejected" && (
                    <button
                      onClick={() => handleStatusChange(item._id, "rejected")}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <XCircle size={14} />
                      Reject
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}