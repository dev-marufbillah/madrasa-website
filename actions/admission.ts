"use server";

import connectDB from "@/lib/db";
import Admission from "@/models/Admission";
import { revalidatePath } from "next/cache";

// ১. নতুন আবেদন জমা দেওয়া
export async function submitAdmission(formData: {
  studentName: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  desiredClass: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  previousInstitution?: string;
}) {
  try {
    await connectDB();

    if (
      !formData.studentName ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.desiredClass ||
      !formData.guardianName ||
      !formData.guardianPhone ||
      !formData.address
    ) {
      return { success: false, message: "অনুগ্রহ করে সবকটি আবশ্যকীয় ঘর পূরণ করুন।" };
    }

    const newAdmission = await Admission.create(formData);

    return {
      success: true,
      message: "আলহামদুলিল্লাহ! আপনার ভর্তি আবেদন সফলভাবে ডাটাবেসে জমা হয়েছে।",
      id: newAdmission._id.toString(),
    };
  } catch (error: unknown) {
    console.error("Admission Error:", error);
    return {
      success: false,
      message: "আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
    };
  }
}

// ২. ডাটাবেস থেকে সব আবেদন নিয়ে আসা (অ্যাডমিনের জন্য)
export async function getAdmissions() {
  try {
    await connectDB();
    const admissions = await Admission.find().sort({ createdAt: -1 }).lean();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(admissions)),
    };
  } catch (error) {
    console.error("Fetch Admissions Error:", error);
    return { success: false, data: [] };
  }
}

// ৩. আবেদনের স্টেটাস আপডেট করা (Approve / Reject)
export async function updateAdmissionStatus(id: string, status: "approved" | "rejected") {
  try {
    await connectDB();
    await Admission.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/admissions");
    return { success: true, message: `আবেদনটি ${status === 'approved' ? 'অনুমোদন' : 'বাতিল'} করা হয়েছে।` };
  } catch (error) {
    console.error("Update Status Error:", error);
    return { success: false, message: "স্টেটাস আপডেট করা সম্ভব হয়নি।" };
  }
}