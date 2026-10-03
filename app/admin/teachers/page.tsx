"use client";

import { useEffect, useState } from "react";
import { createTeacher, updateTeacher, getTeachers, deleteTeacher } from "@/actions/teacher";
import { UserPlus, Edit, Trash2, Users, GraduationCap, Phone, Mail, Award, BookOpen, Upload, X } from "lucide-react";

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

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "সহকারী শিক্ষক",
    department: "General",
    phone: "",
    email: "",
    qualification: "",
    photo: "",
  });

  const fetchTeachers = async () => {
    setLoading(true);
    const res = await getTeachers();
    if (res.success && res.data) {
      setTeachers(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const res = await getTeachers();
        if (isMounted && res.success && res.data) {
          setTeachers(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ফাইল সিলেক্ট করে ছবিতে কনভার্ট করা
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("ছবিটির সাইজ ২ মেগাবাইটের (2MB) এর চেয়ে ছোট হতে হবে।");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let res;
    if (editingId) {
      res = await updateTeacher(editingId, formData);
    } else {
      res = await createTeacher(formData);
    }

    setSubmitting(false);

    if (res.success) {
      resetForm();
      fetchTeachers();
    }
  };

  const handleEdit = (teacher: TeacherType) => {
    setEditingId(teacher._id);
    setFormData({
      name: teacher.name,
      designation: teacher.designation,
      department: teacher.department,
      phone: teacher.phone,
      email: teacher.email || "",
      qualification: teacher.qualification,
      photo: teacher.photo || "",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      designation: "সহকারী শিক্ষক",
      department: "General",
      phone: "",
      email: "",
      qualification: "",
      photo: "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই শিক্ষকের তথ্য ডিলিট করতে চান?")) {
      const res = await deleteTeacher(id);
      if (res.success) {
        fetchTeachers();
      }
    }
  };

  return (
    <div className="bg-[#f8faf8] min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold text-[#0b3b2c] uppercase tracking-wider bg-[#0b3b2c]/10 px-3 py-1 rounded-full">
            Admin Dashboard
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0b3b2c] mt-2">
            শিক্ষক পরিচিতি ও পরিচালনা (Teacher Management)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            মাদ্রাসার সম্মানিত শিক্ষকবৃন্দের তথ্য ও ছবি যোগ, এডিট ও পরিচালনা করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add / Edit Teacher Form (Left) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#0b3b2c] flex items-center gap-2">
                {editingId ? <Edit size={18} /> : <UserPlus size={18} />}
                {editingId ? "শিক্ষকের তথ্য এডিট করুন" : "নতুন শিক্ষক যোগ করুন"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <X size={14} /> বাতিল
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Photo Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  শিক্ষকের ছবি আপলোড করুন
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                    {formData.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <GraduationCap size={28} className="text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-2 bg-[#0b3b2c]/10 text-[#0b3b2c] hover:bg-[#0b3b2c] hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                      <Upload size={14} />
                      <span>ছবি বেছে নিন (Choose Photo)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {formData.photo && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, photo: "" })}
                        className="block text-[11px] text-red-500 hover:underline mt-1 font-medium"
                      >
                        ছবি মুছুন
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  শিক্ষকের নাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মাওলানা আব্দুল করিম"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    পদবী (Designation) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মুহাদ্দিস / সহকারী শিক্ষক"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    বিভাগ (Department) *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  >
                    <option value="General">সাধারণ (General)</option>
                    <option value="Quran & Hifz">কুরআন ও হিফজ</option>
                    <option value="Arabic & Hadith">আরবি ও হাদিস</option>
                    <option value="Science & Math">বিজ্ঞান ও গণিত</option>
                    <option value="English & Bangla">ইংরেজি ও বাংলা</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  মোবাইল নম্বর *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  শিক্ষাগত যোগ্যতা *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: কামিল (হাদিস), এম.এ (বাংলা)"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ইমেইল (ঐচ্ছিক)
                </label>
                <input
                  type="email"
                  placeholder="teacher@aliamadrasa.edu.bd"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#0b3b2c] text-white font-bold text-sm rounded-xl hover:bg-[#082a1f] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
              >
                {editingId ? <Edit size={16} /> : <UserPlus size={16} />}
                <span>
                  {submitting
                    ? "সংরক্ষণ হচ্ছে..."
                    : editingId
                    ? "তথ্য আপডেট করুন"
                    : "শিক্ষক যোগ করুন"}
                </span>
              </button>
            </form>
          </div>

          {/* Teachers List (Right) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-[#0b3b2c] mb-2 flex items-center gap-2">
              <Users size={18} />
              শিক্ষকমণ্ডলীর তালিকা ({teachers.length})
            </h2>

            {loading ? (
              <div className="bg-white p-8 text-center text-gray-400 text-sm rounded-2xl border border-gray-100">
                তথ্য লোড হচ্ছে...
              </div>
            ) : teachers.length === 0 ? (
              <div className="bg-white p-8 text-center text-gray-500 text-sm rounded-2xl border border-gray-100">
                কোনো শিক্ষকের তথ্য পাওয়া যায়নি।
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachers.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-3 relative group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Teacher Photo */}
                          <div className="w-12 h-12 rounded-full bg-[#0b3b2c]/10 overflow-hidden flex items-center justify-center shrink-0 border border-gray-100">
                            {item.photo ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={item.photo}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <GraduationCap size={22} className="text-[#0b3b2c]" />
                            )}
                          </div>

                          <div>
                            <h3 className="font-bold text-gray-900 text-sm leading-snug">
                              {item.name}
                            </h3>
                            <span className="inline-block text-[11px] font-semibold text-[#0b3b2c] bg-[#0b3b2c]/10 px-2 py-0.5 rounded-full mt-0.5">
                              {item.designation}
                            </span>
                          </div>
                        </div>

                        {/* Actions (Edit & Delete) */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 text-gray-400 hover:text-[#0b3b2c] hover:bg-[#0b3b2c]/10 rounded-lg transition-colors cursor-pointer"
                            title="এডিট করুন"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="ডিলিট করুন"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2">
                          <BookOpen size={13} className="text-gray-400" />
                          <span>বিভাগ: <b>{item.department}</b></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award size={13} className="text-gray-400" />
                          <span>যোগ্যতা: <b>{item.qualification}</b></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-gray-400" />
                          <span>ফোন: <b>{item.phone}</b></span>
                        </div>
                        {item.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={13} className="text-gray-400" />
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

      </div>
    </div>
  );
}