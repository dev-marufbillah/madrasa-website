"use server";

import connectDB from "@/lib/db";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export interface TeacherInput {
  name: string;
  designation: string;
  department: string;
  phone: string;
  email?: string;
  qualification: string;
  photo?: string;
}

// ১. নতুন শিক্ষক যোগ করা
export async function createTeacher(data: TeacherInput) {
  try {
    await connectDB();

    if (!data.name || !data.designation || !data.phone || !data.qualification) {
      return { success: false, message: "আবশ্যকীয় তথ্য প্রদান করুন।" };
    }

    await Teacher.create(data);

    if (data.email) {
      const existingUser = await User.findOne({ email: data.email.toLowerCase() });
      if (!existingUser) {
        await User.create({
          name: data.name,
          email: data.email.toLowerCase(),
          password: "teacher123",
          role: "teacher",
          phone: data.phone,
        });
      }
    }

    revalidatePath("/teachers");
    revalidatePath("/admin/teachers");

    return {
      success: true,
      message: "শিক্ষক যোগ করা হয়েছে এবং লগইন অ্যাকাউন্ট তৈরি হয়েছে!",
    };
  } catch (err) {
    console.error("Create Teacher Error:", err);
    return { success: false, message: "সমস্যা হয়েছে।" };
  }
}

// ২. শিক্ষকের তথ্য এডিট/আপডেট করা
export async function updateTeacher(id: string, data: Partial<TeacherInput>) {
  try {
    await connectDB();
    await Teacher.findByIdAndUpdate(id, data);
    revalidatePath("/teachers");
    revalidatePath("/admin/teachers");
    return { success: true, message: "আপডেট হয়েছে।" };
  } catch (err) {
    console.error("Update Teacher Error:", err);
    return { success: false, message: "সমস্যা হয়েছে।" };
  }
}

// ৩. সকল শিক্ষক নিয়ে আসা
export async function getTeachers() {
  try {
    await connectDB();
    const teachers = await Teacher.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(teachers)) };
  } catch (err) {
    console.error("Get Teachers Error:", err);
    return { success: false, data: [] };
  }
}

// ৪. শিক্ষক ডিলিট করা
export async function deleteTeacher(id: string) {
  try {
    await connectDB();
    await Teacher.findByIdAndDelete(id);
    revalidatePath("/teachers");
    revalidatePath("/admin/teachers");
    return { success: true, message: "ডিলিট হয়েছে।" };
  } catch (err) {
    console.error("Delete Teacher Error:", err);
    return { success: false, message: "সমস্যা হয়েছে।" };
  }
}