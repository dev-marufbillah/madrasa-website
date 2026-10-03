"use server";

import connectDB from "@/lib/db";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import ClassModel from "@/models/Class";
import Admission from "@/models/Admission";
import Notice from "@/models/Notice";
import Attendance from "@/models/Attendance";

// TypeScript এর জন্য ইন্টারফেস তৈরি করা হলো (যাতে any এরর না আসে)
interface AttendanceRecord {
  status: string;
}

interface AttendanceDoc {
  className: string;
  date: string;
  records: AttendanceRecord[];
}

export async function getDashboardStats() {
  try {
    await connectDB();

    const [
      studentCount,
      teacherCount,
      classCount,
      pendingAdmissionCount,
      noticeCount,
      recentAdmissions,
      attendanceDataRaw,
    ] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      ClassModel.countDocuments(),
      Admission.countDocuments({ status: "pending" }),
      Notice.countDocuments(),
      Admission.find().sort({ createdAt: -1 }).limit(5).lean(),
      Attendance.find().sort({ date: -1 }).limit(10).lean(),
    ]);

    // Raw ডাটাকে সঠিক টাইপে কনভার্ট করা হলো
    const attendanceData = attendanceDataRaw as unknown as AttendanceDoc[];

    const chartData = attendanceData
      .map((att) => {
        const total = att.records.length;
        const present = att.records.filter((r) => r.status === "Present").length;
        const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

        return {
          name: `${att.className} (${att.date.slice(-2)})`,
          উপস্থিতি: percentage,
        };
      })
      .reverse();

    return {
      success: true,
      data: {
        studentCount,
        teacherCount,
        classCount,
        pendingAdmissionCount,
        noticeCount,
        recentAdmissions: JSON.parse(JSON.stringify(recentAdmissions)),
        chartData,
      },
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return {
      success: false,
      data: {
        studentCount: 0,
        teacherCount: 0,
        classCount: 0,
        pendingAdmissionCount: 0,
        noticeCount: 0,
        recentAdmissions: [],
        chartData: [],
      },
    };
  }
}