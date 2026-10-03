"use client";

import { useEffect, useState } from "react";
import { createStudent, updateStudent, getStudents, deleteStudent } from "@/actions/student";
import { getClasses } from "@/actions/class";
import { UserPlus, Edit, Trash2, Users, Search, Phone, MapPin, School, Upload, X, Filter, IdCard } from "lucide-react";

interface StudentType {
  _id: string;
  studentId: string;
  name: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  className: string;
  section: string;
  rollNumber: string;
  address: string;
  photo?: string;
}

interface ClassType {
  _id: string;
  className: string;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [classList, setClassList] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // ফিল্টার ও সার্চ স্টেট
  const [selectedClass, setSelectedClass] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
    dateOfBirth: "",
    gender: "Male" as "Male" | "Female",
    className: "ইবতেদায়ী ১ম",
    section: "A",
    rollNumber: "1",
    address: "",
    photo: "",
  });

  const fetchData = async (cName = selectedClass) => {
    setLoading(true);
    const studentRes = await getStudents(cName);
    const classRes = await getClasses();

    if (studentRes.success && studentRes.data) {
      setStudents(studentRes.data);
    }
    if (classRes.success && classRes.data) {
      setClassList(classRes.data);
      if (classRes.data.length > 0 && !editingId) {
        setFormData((prev) => ({ ...prev, className: classRes.data[0].className }));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const studentRes = await getStudents("All");
        const classRes = await getClasses();

        if (isMounted) {
          if (studentRes.success && studentRes.data) setStudents(studentRes.data);
          if (classRes.success && classRes.data) {
            setClassList(classRes.data);
            if (classRes.data.length > 0) {
              setFormData((prev) => ({ ...prev, className: classRes.data[0].className }));
            }
          }
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

  const handleClassFilterChange = (cName: string) => {
    setSelectedClass(cName);
    fetchData(cName);
  };

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
      res = await updateStudent(editingId, formData);
    } else {
      res = await createStudent(formData);
    }

    setSubmitting(false);

    if (res.success) {
      resetForm();
      fetchData(selectedClass);
    } else {
      alert(res.message);
    }
  };

  const handleEdit = (item: StudentType) => {
    setEditingId(item._id);
    setFormData({
      studentId: item.studentId,
      name: item.name,
      fatherName: item.fatherName,
      motherName: item.motherName,
      guardianPhone: item.guardianPhone,
      dateOfBirth: item.dateOfBirth,
      gender: item.gender,
      className: item.className,
      section: item.section,
      rollNumber: item.rollNumber,
      address: item.address,
      photo: item.photo || "",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      studentId: "",
      name: "",
      fatherName: "",
      motherName: "",
      guardianPhone: "",
      dateOfBirth: "",
      gender: "Male",
      className: classList.length > 0 ? classList[0].className : "ইবতেদায়ী ১ম",
      section: "A",
      rollNumber: "1",
      address: "",
      photo: "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই শিক্ষার্থীর তথ্য ডিলিট করতে চান?")) {
      const res = await deleteStudent(id);
      if (res.success) {
        fetchData(selectedClass);
      }
    }
  };

  // সার্চ অনুযায়ী ফিল্টার করা তালিকা
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.includes(searchQuery)
  );

  return (
    <div className="bg-[#f8faf8] min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold text-[#0b3b2c] uppercase tracking-wider bg-[#0b3b2c]/10 px-3 py-1 rounded-full">
            Admin Dashboard
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0b3b2c] mt-2">
            শিক্ষার্থী ব্যবস্থাপনা (Student Management)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            শিক্ষার্থী ভর্তি, রোল নম্বর, শ্রেণি ও অভিভাবকের তথ্য সং ক্ষেপণাস্ত্রের তালিকা।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add / Edit Form (Left) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#0b3b2c] flex items-center gap-2">
                {editingId ? <Edit size={18} /> : <UserPlus size={18} />}
                {editingId ? "শিক্ষার্থীর তথ্য এডিট করুন" : "নতুন শিক্ষার্থী ভর্তি করুন"}
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
              
              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  শিক্ষার্থীর ছবি
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                    {formData.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <IdCard size={28} className="text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-2 bg-[#0b3b2c]/10 text-[#0b3b2c] hover:bg-[#0b3b2c] hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                      <Upload size={14} />
                      <span>ছবি বাছুন</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    স্টুডেন্ট আইডি (Student ID) *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!!editingId}
                    placeholder="যেমন: STD-2025-01"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c] disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    শিক্ষার্থীর নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ আব্দুল্লাহ"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    পিতার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="পিতার পুরো নাম"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    মাতার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="মাতার পুরো নাম"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    শ্রেণি (Class) *
                  </label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  >
                    {classList.length === 0 ? (
                      <option value="ইবতেদায়ী ১ম">ইবতেদায়ী ১ম</option>
                    ) : (
                      classList.map((c) => (
                        <option key={c._id} value={c.className}>
                          {c.className}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    সেকশন ও রোল নম্বর *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-1/2 px-2 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                    >
                      <option value="A">A (ক)</option>
                      <option value="B">B (খ)</option>
                    </select>
                    <input
                      type="number"
                      required
                      placeholder="রোল"
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      className="w-1/2 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    অভিভাবকের মোবাইল *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    জন্ম তারিখ *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ঠিকানা *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="গ্রাম/রাস্তা, ডাকঘর, থানা, জেলা"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0b3b2c]"
                ></textarea>
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
                    : "ভর্তি সম্পন্ন করুন"}
                </span>
              </button>
            </form>
          </div>

          {/* Students List (Right) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Class Filter */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter size={16} className="text-[#0b3b2c]" />
                <select
                  value={selectedClass}
                  onChange={(e) => handleClassFilterChange(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#0b3b2c] bg-gray-50"
                >
                  <option value="All">সকল শ্রেণির শিক্ষার্থী</option>
                  {classList.map((c) => (
                    <option key={c._id} value={c.className}>
                      {c.className}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="নাম, রোল বা আইডি দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0b3b2c]"
                />
              </div>
            </div>

            {/* List Header */}
            <h2 className="text-lg font-bold text-[#0b3b2c] mb-2 flex items-center gap-2">
              <Users size={18} />
              শিক্ষার্থীদের তালিকা ({filteredStudents.length})
            </h2>

            {loading ? (
              <div className="bg-white p-8 text-center text-gray-400 text-sm rounded-2xl border border-gray-100">
                শিক্ষার্থীদের তথ্য লোড হচ্ছে...
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="bg-white p-8 text-center text-gray-500 text-sm rounded-2xl border border-gray-100">
                কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি।
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStudents.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-3 relative"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Photo */}
                          <div className="w-12 h-12 rounded-full bg-[#0b3b2c]/10 overflow-hidden flex items-center justify-center shrink-0 border border-gray-100">
                            {item.photo ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <IdCard size={22} className="text-[#0b3b2c]" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900 text-sm leading-snug">
                                {item.name}
                              </h3>
                              <span className="text-[10px] font-bold text-[#0b3b2c] bg-[#0b3b2c]/10 px-2 py-0.5 rounded-full">
                                রোল: {item.rollNumber}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              {item.className} ({item.section}) | ID: <b>{item.studentId}</b>
                            </p>
                          </div>
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

                      <div className="mt-4 space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-3">
                        <p>পিতা: <b>{item.fatherName}</b></p>
                        <p>মাতা: <b>{item.motherName}</b></p>
                        <div className="flex items-center gap-1.5 text-gray-500 pt-1">
                          <Phone size={12} />
                          <span><b>{item.guardianPhone}</b></span>
                        </div>
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