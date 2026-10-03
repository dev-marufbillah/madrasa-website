"use server";

import connectDB from "@/lib/db";
import Student from "@/models/Student";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export interface StudentInput {
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

export async function createStudent(data: StudentInput) {
  try {
    await connectDB();

    const existing = await Student.findOne({ studentId: data.studentId });
    if (existing) {
      return { success: false, message: "স্টুডেন্ট আইডি ইতিমধ্যে আছে।" };
    }

    // ১. শিক্ষার্থী সেভ
    await Student.create(data);

    // ২. শিক্ষার্থীর লগইন অ্যাকাউন্ট
    const studentEmail = `${data.studentId.toLowerCase()}@student.aliamadrasa.com`;
    const existingStudentUser = await User.findOne({ email: studentEmail });
    if (!existingStudentUser) {
      await User.create({
        name: data.name,
        email: studentEmail,
        password: "student123",
        role: "student",
        studentId: data.studentId,
        phone: data.guardianPhone,
      });
    }

    // ৩. অভিভাবকের (Parent) লগইন অ্যাকাউন্ট অটো-তৈরি
    // ফোন নম্বর দিয়ে ইউনিক ইমেইল বানানো
    const parentEmail = `parent.${data.guardianPhone}@aliamadrasa.com`;
    const existingParent = await User.findOne({ email: parentEmail });

    if (!existingParent) {
      await User.create({
        name: data.fatherName || "অভিভাবক",
        email: parentEmail,
        password: "parent123",
        role: "parent",
        phone: data.guardianPhone,
        childrenIds: [data.studentId],
      });
    } else {
      // আগে থেকে প্যারেন্ট থাকলে নতুন সন্তান অ্যাড করা
      await User.findByIdAndUpdate(existingParent._id, {
        $addToSet: { childrenIds: data.studentId },
      });
    }

    revalidatePath("/admin/students");

    return {
      success: true,
      message: "শিক্ষার্থী + স্টুডেন্ট অ্যাকাউন্ট + প্যারেন্ট অ্যাকাউন্ট তৈরি হয়েছে!",
    };
  } catch (err) {
    console.error("Create Student Error:", err);
    return { success: false, message: "সমস্যা হয়েছে।" };
  }
}

export async function getStudents(className?: string) {
  try {
    await connectDB();
    const query = className && className !== "All" ? { className } : {};
    const students = await Student.find(query).sort({ rollNumber: 1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(students)) };
  } catch (err) {
    console.error("Get Students Error:", err);
    return { success: false, data: [] };
  }
}

export async function updateStudent(id: string, data: Partial<StudentInput>) {
  try {
    await connectDB();
    await Student.findByIdAndUpdate(id, data);
    revalidatePath("/admin/students");
    return { success: true, message: "আপডেট হয়েছে।" };
  } catch (err) {
    console.error("Update Student Error:", err);
    return { success: false, message: "সমস্যা হয়েছে।" };
  }
}

export async function deleteStudent(id: string) {
  try {
    await connectDB();
    await Student.findByIdAndDelete(id);
    revalidatePath("/admin/students");
    return { success: true, message: "ডিলিট হয়েছে।" };
  } catch (err) {
    console.error("Delete Student Error:", err);
    return { success: false, message: "সমস্যা হয়েছে।" };
  }
}