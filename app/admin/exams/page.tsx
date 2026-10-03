"use client";

import { useEffect, useState } from "react";
import { getClasses } from "@/actions/class";
import { getStudents } from "@/actions/student";
import { saveExamMarks, getExamData } from "@/actions/exam";
import { Award, Save, CheckCircle2, AlertCircle } from "lucide-react";

interface ClassType {
  _id: string;
  className: string;
  section: string;
}

interface StudentItem {
  _id: string;
  studentId: string;
  name: string;
  rollNumber: string;
}

interface SavedMarkItem {
  studentId: string;
  studentName: string;
  rollNumber: string;
  marksObtained: number;
}

interface MarkInput {
  studentId: string;
  studentName: string;
  rollNumber: string;
  marksObtained: number;
}

export default function AdminExamsPage() {
  const [classList, setClassList] = useState<ClassType[]>([]);
  const [examName, setExamName] = useState("১ম সাময়িক পরীক্ষা ২০২৫");
  const [selectedClass, setSelectedClass] = useState("ইবতেদায়ী ১ম");
  const [selectedSection, setSelectedSection] = useState("A");
  const [subject, setSubject] = useState("আল-কুরআন ও তাজবিদ");
  const [totalMarks, setTotalMarks] = useState(100);
  const [passMarks, setPassMarks] = useState(33);

  const [studentMarks, setStudentMarks] = useState<MarkInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadExamAndStudents = async (
    exName: string,
    cName: string,
    sec: string,
    sub: string
  ) => {
    setLoading(true);
    setMessage(null);

    const studentRes = await getStudents(cName);
    const examRes = await getExamData(exName, cName, sec, sub);

    if (studentRes.success && studentRes.data) {
      const studentList: StudentItem[] = studentRes.data;

      if (examRes.success && examRes.data && examRes.data.marks) {
        const savedMarks: SavedMarkItem[] = examRes.data.marks;
        setStudentMarks(
          savedMarks.map((m) => ({
            studentId: m.studentId,
            studentName: m.studentName,
            rollNumber: m.rollNumber,
            marksObtained: m.marksObtained,
          }))
        );
      } else {
        const initialMarks: MarkInput[] = studentList.map((s) => ({
          studentId: s.studentId,
          studentName: s.name,
          rollNumber: s.rollNumber,
          marksObtained: 0,
        }));
        setStudentMarks(initialMarks);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function initPage() {
      try {
        const classRes = await getClasses();
        if (isMounted && classRes.success && classRes.data && classRes.data.length > 0) {
          setClassList(classRes.data);
          const firstClass = classRes.data[0].className;
          const firstSec = classRes.data[0].section || "A";
          setSelectedClass(firstClass);
          setSelectedSection(firstSec);

          const studentRes = await getStudents(firstClass);
          const examRes = await getExamData(
            "১ম সাময়িক পরীক্ষা ২০২৫",
            firstClass,
            firstSec,
            "আল-কুরআন ও তাজবিদ"
          );

          if (studentRes.success && studentRes.data) {
            if (examRes.success && examRes.data && examRes.data.marks) {
              const savedMarks: SavedMarkItem[] = examRes.data.marks;
              setStudentMarks(
                savedMarks.map((m) => ({
                  studentId: m.studentId,
                  studentName: m.studentName,
                  rollNumber: m.rollNumber,
                  marksObtained: m.marksObtained,
                }))
              );
            } else {
              const studentList: StudentItem[] = studentRes.data;
              setStudentMarks(
                studentList.map((s) => ({
                  studentId: s.studentId,
                  studentName: s.name,
                  rollNumber: s.rollNumber,
                  marksObtained: 0,
                }))
              );
            }
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMarkChange = (index: number, val: number) => {
    const updated = [...studentMarks];
    updated[index].marksObtained = Math.min(totalMarks, Math.max(0, val));
    setStudentMarks(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const res = await saveExamMarks({
      examName,
      className: selectedClass,
      section: selectedSection,
      subject,
      totalMarks,
      passMarks,
      examDate: new Date().toISOString().split("T")[0],
      marks: studentMarks,
    });

    setSaving(false);
    if (res.success) {
      setMessage({ type: "success", text: res.message });
    } else {
      setMessage({ type: "error", text: res.message });
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
            পরীক্ষার নম্বর এন্ট্রি ও ফলাফল (Exam & Marks Entry)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            শ্রেণি ও বিষয় ভিত্তিক পরীক্ষার প্রাপ্ত নম্বর ইনপুট দিন, সিস্টেম স্বয়ংক্রিয়ভাবে গ্রেড হিসাব করবে।
          </p>
        </div>

        {/* Config Bar */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">পরীক্ষার নাম *</label>
            <input
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="যেমন: ১ম সাময়িক পরীক্ষা ২০২৫"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0b3b2c]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">শ্রেণি ও সেকশন *</label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                loadExamAndStudents(examName, e.target.value, selectedSection, subject);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0b3b2c]"
            >
              {classList.length === 0 ? (
                <option value="ইবতেদায়ী ১ম">ইবতেদায়ী ১ম</option>
              ) : (
                classList.map((c) => (
                  <option key={c._id} value={c.className}>
                    {c.className} ({c.section})
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">বিষয়ের নাম *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="যেমন: আল-কুরআন"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0b3b2c]"
            />
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-xs font-bold text-gray-700 mb-1">মোট নম্বর</label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0b3b2c]"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs font-bold text-gray-700 mb-1">পাস নম্বর</label>
              <input
                type="number"
                value={passMarks}
                onChange={(e) => setPassMarks(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0b3b2c]"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-2xl text-sm font-semibold border flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0b3b2c] flex items-center gap-2">
              <Award size={18} />
              নম্বর ইনপুট রেজিস্টার: {examName} — {selectedClass} ({subject})
            </h2>

            <button
              onClick={handleSave}
              disabled={saving || studentMarks.length === 0}
              className="py-2.5 px-6 bg-[#0b3b2c] text-white font-bold text-xs rounded-xl hover:bg-[#082a1f] transition-all flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Save size={16} />
              <span>{saving ? "সংরক্ষণ হচ্ছে..." : "নম্বর সেভ করুন"}</span>
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              শিক্ষার্থীদের তালিকা লোড হচ্ছে...
            </div>
          ) : studentMarks.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">
              এই শ্রেণির জন্য কোনো শিক্ষার্থী পাওয়া যায়নি।
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {studentMarks.map((item, index) => (
                <div
                  key={item.studentId}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#0b3b2c]/10 text-[#0b3b2c] font-bold text-xs flex items-center justify-center shrink-0">
                      {item.rollNumber}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.studentName}</h4>
                      <p className="text-[11px] text-gray-400">ID: {item.studentId}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-gray-600">প্রাপ্ত নম্বর:</label>
                    <input
                      type="number"
                      min={0}
                      max={totalMarks}
                      value={item.marksObtained}
                      onChange={(e) => handleMarkChange(index, Number(e.target.value))}
                      className="w-24 px-3 py-2 text-center font-bold text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b3b2c] bg-gray-50"
                    />
                    <span className="text-xs font-semibold text-gray-400">/ {totalMarks}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}