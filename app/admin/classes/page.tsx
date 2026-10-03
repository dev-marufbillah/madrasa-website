"use client";

import { useEffect, useState } from "react";
import { createClass, getClasses, updateClass, deleteClass } from "@/actions/class";
import { getTeachers } from "@/actions/teacher";
import { School, Plus, Edit, Trash2, Users, UserCheck, BookOpen, X } from "lucide-react";

interface ClassType {
  _id: string;
  className: string;
  classCode: string;
  section: string;
  classTeacher?: string;
  capacity: number;
  description?: string;
}

interface TeacherType {
  _id: string;
  name: string;
}

export default function AdminClassesPage() {
  const [classesList, setClassesList] = useState<ClassType[]>([]);
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    className: "প্রথম শ্রেণি",
    classCode: "CLS-01",
    section: "A",
    classTeacher: "নির্ধারিত নয়",
    capacity: 40,
    description: "",
  });

  const fetchData = async () => {
    setLoading(true);
    const classRes = await getClasses();
    const teacherRes = await getTeachers();

    if (classRes.success && classRes.data) {
      setClassesList(classRes.data);
    }
    if (teacherRes.success && teacherRes.data) {
      setTeachers(teacherRes.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const classRes = await getClasses();
        const teacherRes = await getTeachers();

        if (isMounted) {
          if (classRes.success && classRes.data) setClassesList(classRes.data);
          if (teacherRes.success && teacherRes.data) setTeachers(teacherRes.data);
        }
      } catch (e) {
        console.error(e);
      } fontFinally: {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let res;
    if (editingId) {
      res = await updateClass(editingId, formData);
    } else {
      res = await createClass(formData);
    }

    setSubmitting(false);

    if (res.success) {
      resetForm();
      fetchData();
    }
  };

  const handleEdit = (item: ClassType) => {
    setEditingId(item._id);
    setFormData({
      className: item.className,
      classCode: item.classCode,
      section: item.section,
      classTeacher: item.classTeacher || "নির্ধারিত নয়",
      capacity: item.capacity,
      description: item.description || "",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      className: "প্রথম শ্রেণি",
      classCode: "CLS-01",
      section: "A",
      classTeacher: "নির্ধারিত নয়",
      capacity: 40,
      description: "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই শ্রেণিটি ডিলিট করতে চান?")) {
      const res = await deleteClass(id);
      if (res.success) {
        fetchData();
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
            শ্রেণি ও সেকশন ব্যবস্থাপনা (Class & Section Management)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            মাদ্রাসার শ্রেণি, সেকশন, ধারণক্ষমতা ও শ্রেণি শিক্ষক নির্ধারণ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add / Edit Form (Left) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#0b3b2c] flex items-center gap-2">
                {editingId ? <Edit size={18} /> : <Plus size={18} />}
                {editingId ? "শ্রেণির তথ্য এডিট করুন" : "নতুন শ্রেণি যোগ করুন"}
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    শ্রেণির নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: দাখিল ৬ষ্ঠ"
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    শ্রেণি কোড (Code) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: CLS-06"
                    value={formData.classCode}
                    onChange={(e) => setFormData({ ...formData, classCode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    সেকশন (Section) *
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  >
                    <option value="A">সেকশন A (ক)</option>
                    <option value="B">সেকশন B (খ)</option>
                    <option value="C">সেকশন C (গ)</option>
                    <option value="Combined">সম্মিলিত (Combined)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    ধারণক্ষমতা (Capacity) *
                  </label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={200}
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  শ্রেণি শিক্ষক (Class Teacher)
                </label>
                <select
                  value={formData.classTeacher}
                  onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                >
                  <option value="নির্ধারিত নয়">-- শ্রেণি শিক্ষক সিলেক্ট করুন --</option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  বিবরণ (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  placeholder="শ্রেণি সংক্রান্ত অতিরিক্ত তথ্য..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#0b3b2c] text-white font-bold text-sm rounded-xl hover:bg-[#082a1f] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
              >
                {editingId ? <Edit size={16} /> : <Plus size={16} />}
                <span>
                  {submitting
                    ? "সংরক্ষণ হচ্ছে..."
                    : editingId
                    ? "তথ্য আপডেট করুন"
                    : "শ্রেণি তৈরি করুন"}
                </span>
              </button>
            </form>
          </div>

          {/* Classes List (Right) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-[#0b3b2c] mb-2 flex items-center gap-2">
              <School size={18} />
              তৈরিকৃত শ্রেণিসমূহ ({classesList.length})
            </h2>

            {loading ? (
              <div className="bg-white p-8 text-center text-gray-400 text-sm rounded-2xl border border-gray-100">
                শ্রেণির তথ্য লোড হচ্ছে...
              </div>
            ) : classesList.length === 0 ? (
              <div className="bg-white p-8 text-center text-gray-500 text-sm rounded-2xl border border-gray-100">
                এখনো কোনো শ্রেণি তৈরি করা হয়নি।
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classesList.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-3 relative"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 text-base">
                              {item.className}
                            </h3>
                            <span className="text-[10px] font-bold text-[#0b3b2c] bg-[#0b3b2c]/10 px-2 py-0.5 rounded-full">
                              {item.classCode}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            সেকশন: <b>{item.section}</b>
                          </p>
                        </div>

                        {/* Actions */}
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
                          <UserCheck size={14} className="text-gray-400" />
                          <span>শ্রেণি শিক্ষক: <b>{item.classTeacher}</b></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-gray-400" />
                          <span>ধারণক্ষমতা: <b>{item.capacity} জন শিক্ষার্থী</b></span>
                        </div>
                        {item.description && (
                          <div className="flex items-center gap-2">
                            <BookOpen size={14} className="text-gray-400" />
                            <span>বিবরণ: <b>{item.description}</b></span>
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