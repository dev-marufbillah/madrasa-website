"use client";

import { useEffect, useState } from "react";
import { getTeachers } from "@/actions/teacher";
import { Users, Phone, Mail, Award, BookOpen, GraduationCap } from "lucide-react";

interface TeacherType {
  _id: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  email?: string;
  qualification: string;
  photo?: string;
}

export default function PublicTeachersPage() {
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTeachers() {
      try {
        const res = await getTeachers();
        if (isMounted && res.success && res.data) {
          setTeachers(res.data);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadTeachers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-[#f8faf8] min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-[#0b3b2c] text-xs font-bold uppercase tracking-widest bg-[#0b3b2c]/10 px-4 py-1.5 rounded-full mb-3">
            <Users size={14} />
            Our Teachers
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0b3b2c] mb-2">
            আমাদের সম্মানিত শিক্ষকমণ্ডলী
          </h1>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            যোগ্য ও অভিজ্ঞ শিক্ষকমণ্ডলীর তত্ত্বাবধানে আলিয়া মাদ্রাসা পরিচালিত হচ্ছে।
          </p>
        </div>

        {/* Teachers Grid */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-400 text-sm border border-gray-100 shadow-sm">
            শিক্ষকমণ্ডলীর তথ্য লোড হচ্ছে...
          </div>
        ) : teachers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-500 text-sm border border-gray-100 shadow-sm">
            শিক্ষকদের তালিকা শীঘ্রই প্রকাশ করা হবে।
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo or Fallback Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-[#0b3b2c]/10 overflow-hidden flex items-center justify-center text-[#0b3b2c] mb-4 border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                    {item.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <GraduationCap size={36} />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0b3b2c] transition-colors mb-1">
                    {item.name}
                  </h3>

                  <span className="inline-block text-xs font-bold text-[#0b3b2c] bg-[#0b3b2c]/10 px-3 py-1 rounded-full mb-4">
                    {item.designation}
                  </span>

                  <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2">
                      <BookOpen size={14} className="text-gray-400" />
                      <span>বিভাগ: <b>{item.department}</b></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={14} className="text-gray-400" />
                      <span>যোগ্যতা: <b>{item.qualification}</b></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <span>ফোন: <b>{item.phone}</b></span>
                    </div>
                    {item.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span>ইমেইল: <b>{item.email}</b></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}