"use client";

import { useEffect, useState } from "react";
import { getClasses } from "@/actions/class";
import { getStudents } from "@/actions/student";
import { saveAttendance, getAttendanceByDateAndClass } from "@/actions/attendance";
import { CalendarCheck, CheckCircle2, XCircle, Clock, Save, Users, Percent } from "lucide-react";

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

interface StudentAttendanceRecord {
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: "Present" | "Absent" | "Late";
}

export default function AdminAttendancePage() {
  const [classList, setClassList] = useState<ClassType[]>([]);
  const [selectedClass, setSelectedClass] = useState("ইবতেদায়ী ১ম");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [records, setRecords] = useState<StudentAttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadAttendanceData = async (cName: string, sec: string, date: string) => {
    setLoading(true);
    setMessage(null);

    const studentRes = await getStudents(cName);
    const attendanceRes = await getAttendanceByDateAndClass(cName, sec, date);

    if (studentRes.success && studentRes.data) {
      const studentList: StudentItem[] = studentRes.data;

      if (attendanceRes.success && attendanceRes.data && attendanceRes.data.records) {
        setRecords(attendanceRes.data.records);
      } else {
        const initialRecords: StudentAttendanceRecord[] = studentList.map((s) => ({
          studentId: s.studentId,
          studentName: s.name,
          rollNumber: s.rollNumber,
          status: "Present",
        }));
        setRecords(initialRecords);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    async function initPage() {
      try {
        const classRes = await getClasses();
        const today = new Date().toISOString().split("T")[0];

        if (isMounted && classRes.success && classRes.data && classRes.data.length > 0) {
          setClassList(classRes.data);
          const firstClass = classRes.data[0].className;
          const firstSec = classRes.data[0].section || "A";
          setSelectedClass(firstClass);
          setSelectedSection(firstSec);
          
          // Data Load
          const studentRes = await getStudents(firstClass);
          const attendanceRes = await getAttendanceByDateAndClass(firstClass, firstSec, today);

          if (studentRes.success && studentRes.data) {
            if (attendanceRes.success && attendanceRes.data && attendanceRes.data.records) {
              setRecords(attendanceRes.data.records);
            } else {
              const studentList: StudentItem[] = studentRes.data;
              setRecords(
                studentList.map((s) => ({
                  studentId: s.studentId,
                  studentName: s.name,
                  rollNumber: s.rollNumber,
                  status: "Present",
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

  const handleStatusChange = (index: number, newStatus: "Present" | "Absent" | "Late") => {
    const updated = [...records];
    updated[index].status = newStatus;
    setRecords(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const res = await saveAttendance({
      className: selectedClass,
      section: selectedSection,
      date: selectedDate,
      records,
    });

    setSaving(false);
    if (res.success) {
      setMessage({ type: "success", text: res.message });
    } else {
      setMessage({ type: "error", text: res.message });
    }
  };

  const totalStudents = records.length;
  const totalPresent = records.filter((r) => r.status === "Present").length;
  const totalAbsent = records.filter((r) => r.status === "Absent").length;
  const totalLate = records.filter((r) => r.status === "Late").length;
  const attendancePercentage =
    totalStudents > 0 ? Math.round(((totalPresent + totalLate) / totalStudents) * 100) : 0;

  return (
    <div className="bg-[#f8faf8] min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold text-[#0b3b2c] uppercase tracking-wider bg-[#0b3b2c]/10 px-3 py-1 rounded-full">
            Admin Dashboard
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0b3b2c] mt-2">
            উপস্থিতি রেজিস্টার (Attendance Management)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            প্রতিদিনের উপস্থিতি গ্রহণ করুন এবং পূর্বের উপস্থিতির খাতা পর্যবেক্ষণ করুন।
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              শ্রেণি সিলেক্ট করুন
            </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                loadAttendanceData(e.target.value, selectedSection, selectedDate);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0b3b2c]"
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
            <label className="block text-xs font-bold text-gray-700 mb-1">
              সেকশন (Section)
            </label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                loadAttendanceData(selectedClass, e.target.value, selectedDate);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0b3b2c]"
            >
              <option value="A">সেকশন A (ক)</option>
              <option value="B">সেকশন B (খ)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              তারিখ সিলেক্ট করুন
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                loadAttendanceData(selectedClass, selectedSection, e.target.value);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0b3b2c]"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b3b2c]/10 text-[#0b3b2c] flex items-center justify-center font-bold">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">মোট শিক্ষার্থী</p>
              <p className="text-lg font-bold text-gray-900">{totalStudents} জন</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">উপস্থিত (Present)</p>
              <p className="text-lg font-bold text-emerald-700">{totalPresent} জন</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <XCircle size={20} />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">অনুপস্থিত (Absent)</p>
              <p className="text-lg font-bold text-red-700">{totalAbsent} জন</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Percent size={20} />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">উপস্থিতির হার</p>
              <p className="text-lg font-bold text-amber-700">{attendancePercentage}%</p>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-2xl text-sm font-semibold border ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {message.type === "success" ? "✅ " : "❌ "}
            {message.text}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0b3b2c] flex items-center gap-2">
              <CalendarCheck size={18} />
              উপস্থিতি খাতা: {selectedClass} ({selectedSection}) — {new Date(selectedDate).toLocaleDateString("bn-BD")}
            </h2>

            <button
              onClick={handleSave}
              disabled={saving || records.length === 0}
              className="py-2.5 px-6 bg-[#0b3b2c] text-[#ffffff] font-bold text-xs rounded-xl hover:bg-[#082a1f] transition-all flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Save size={16} />
              <span>{saving ? "সেভ হচ্ছে..." : "উপস্থিতি সেভ করুন"}</span>
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              উপস্থিতির ডাটা লোড হচ্ছে...
            </div>
          ) : records.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">
              এই শ্রেণিতে কোনো ভর্তিভুক্ত শিক্ষার্থী পাওয়া যায়নি। প্রথমে শিক্ষার্থী যুক্ত করুন।
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {records.map((item, index) => (
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

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(index, "Present")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        item.status === "Present"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      উপস্থিত (Present)
                    </button>

                    <button
                      onClick={() => handleStatusChange(index, "Absent")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        item.status === "Absent"
                          ? "bg-red-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700"
                      }`}
                    >
                      <XCircle size={14} />
                      অনুপস্থিত (Absent)
                    </button>

                    <button
                      onClick={() => handleStatusChange(index, "Late")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        item.status === "Late"
                          ? "bg-amber-500 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    >
                      <Clock size={14} />
                      বিলম্ব (Late)
                    </button>
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