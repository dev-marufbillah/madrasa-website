"use server";

import connectDB from "@/lib/db";
import ClassModel from "@/models/Class";
import { revalidatePath } from "next/cache";

// ১. নতুন শ্রেণি তৈরি
export async function createClass(data: {
  className: string;
  classCode: string;
  section: string;
  classTeacher?: string;
  capacity: number;
  description?: string;
}) {
  try {
    await connectDB();

    if (!data.className || !data.classCode || !data.section) {
      return { success: false, message: "শ্রেণির নাম, কোড এবং সেকশন প্রদান করা আবশ্যক।" };
    }

    const newClass = await ClassModel.create(data);

    revalidatePath("/admin/classes");

    return {
      success: true,
      message: "আলহামদুলিল্লাহ! নতুন শ্রেণি সফলভাবে তৈরি করা হয়েছে।",
      id: newClass._id.toString(),
    };
  } catch (error) {
    console.error("Create Class Error:", error);
    return { success: false, message: "শ্রেণি তৈরি করতে সমস্যা হয়েছে।" };
  }
}

// ২. ডাটাবেস থেকে সকল শ্রেণি নিয়ে আসা
export async function getClasses() {
  try {
    await connectDB();
    const classes = await ClassModel.find().sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(classes)),
    };
  } catch (error) {
    console.error("Get Classes Error:", error);
    return { success: false, data: [] };
  }
}

// ৩. শ্রেণির তথ্য আপডেট করা
export async function updateClass(
  id: string,
  data: {
    className: string;
    classCode: string;
    section: string;
    classTeacher?: string;
    capacity: number;
    description?: string;
  }
) {
  try {
    await connectDB();
    await ClassModel.findByIdAndUpdate(id, data);

    revalidatePath("/admin/classes");

    return {
      success: true,
      message: "শ্রেণির তথ্য সফলভাবে আপডেট করা হয়েছে।",
    };
  } catch (error) {
    console.error("Update Class Error:", error);
    return { success: false, message: "শ্রেণি আপডেট করতে সমস্যা হয়েছে।" };
  }
}

// ৪. শ্রেণি ডিলিট করা
export async function deleteClass(id: string) {
  try {
    await connectDB();
    await ClassModel.findByIdAndDelete(id);

    revalidatePath("/admin/classes");

    return { success: true, message: "শ্রেণিটি ডিলিট করা হয়েছে।" };
  } catch (error) {
    console.error("Delete Class Error:", error);
    return { success: false, message: "শ্রেণি ডিলিট করতে সমস্যা হয়েছে।" };
  }
}