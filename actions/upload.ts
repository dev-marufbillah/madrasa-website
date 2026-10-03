"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";

export async function uploadSingleImage(base64: string, folder: string = "settings") {
  try {
    if (!base64 || !base64.startsWith("data:image")) {
      return { success: false, message: "সঠিক ছবি সিলেক্ট করুন।" };
    }

    const res = await uploadToCloudinary(base64, folder);
    return res;
  } catch (err) {
    console.error("Upload error:", err);
    return { success: false, message: "ছবি আপলোড ব্যর্থ হয়েছে।" };
  }
}