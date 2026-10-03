"use server";

import connectDB from "@/lib/db";
import Attendance from "@/models/Attendance";
import { revalidatePath } from "next/cache";

// ১. উপস্থিতি সেভ বা আপডেট করা
export async function saveAttendance(data: {
  className: string;
  section: string;
  date: string;
  records: {
    studentId: string;
    studentName: string;
    rollNumber: string;
    status: "Present" | "Absent" | "Late";
  }[];
}) {
  try {
    await connectDB();

    if (!data.className || !data.date || !data.records || data.records.length === 0) {
      return { success: false, message: "উপস্থিতি তথ্য অসম্পূর্ণ।" };
    }

    // নির্দিষ্ট শ্রেণি, সেকশন ও তারিখের উপস্থিতি থাকলে আপডেট, না থাকলে নতুন তৈরি
    await Attendance.findOneAndUpdate(
      { className: data.className, section: data.section, date: data.date },
      data,
      { upsert: true, new: true }
    );

    revalidatePath("/admin/attendance");

    return {
      success: true,
      message: "আলহামদুলিল্লাহ! আজকের উপস্থিতি সফলতা ও নির্ভুলতার সাথে সংরক্ষিত হয়েছে।",
    };
  } catch (error) {
    console.error("Save Attendance Error:", error);
    return { success: false, message: "উপস্থিতি সংরক্ষণ করতে সমস্যা হয়েছে।" };
  }
}

// ২. নির্দিষ্ট তারিখ ও শ্রেণির উপস্থিতি নিয়ে আসা
export async function getAttendanceByDateAndClass(
  className: string,
  section: string,
  date: string
) {
  try {
    await connectDB();
    const attendance = await Attendance.findOne({
      className,
      section,
      date,
    }).lean();

    if (!attendance) {
      return { success: true, data: null };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(attendance)),
    };
  } catch (error) {
    console.error("Get Attendance Error:", error);
    return { success: false, data: null };
  }
}