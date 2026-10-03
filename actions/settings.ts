"use server";

import connectDB from "@/lib/db";
import WebsiteSettings from "@/models/WebsiteSettings";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

export interface SettingsInput {
  madrasaName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  statYears?: string;
  statStudents?: string;
  statTeachers?: string;
  statPrograms?: string;
  principalName: string;
  principalMessage: string;
  principalPhoto?: string;
  loginPageNotice: string;
  loginPageRules: string;
  madrasaHistory: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export async function getWebsiteSettings() {
  try {
    await connectDB();
    let settings = await WebsiteSettings.findOne().lean();

    if (!settings) {
      const created = await WebsiteSettings.create({});
      settings = created.toObject();
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(settings)),
    };
  } catch (err) {
    console.error("Get Settings Error:", err);
    return { success: false, data: null };
  }
}

export async function updateWebsiteSettings(data: SettingsInput) {
  try {
    await connectDB();

    let finalHeroImage = data.heroImage;
    let finalPrincipalPhoto = data.principalPhoto;

    // ১. হিরো ইমেজ Base64 হলে ক্লাউডিনারিতে আপলোড
    if (data.heroImage && data.heroImage.startsWith("data:image")) {
      const upload = await uploadToCloudinary(data.heroImage, "settings");
      if (upload.success && upload.url) {
        finalHeroImage = upload.url;
      }
    }

    // ২. অধ্যক্ষ সাহেবের ছবি Base64 হলে ক্লাউডিনারিতে আপলোড
    if (data.principalPhoto && data.principalPhoto.startsWith("data:image")) {
      const upload = await uploadToCloudinary(data.principalPhoto, "settings");
      if (upload.success && upload.url) {
        finalPrincipalPhoto = upload.url;
      }
    }

    // ৩. ডাটাবেসে হালকা ছোট লিংক সেভ
    const cleanData = {
      ...data,
      heroImage: finalHeroImage,
      principalPhoto: finalPrincipalPhoto,
    };

    await WebsiteSettings.findOneAndUpdate({}, cleanData, {
      upsert: true,
      new: true,
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/login");
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "আলহামদুলিল্লাহ! তথ্য ও ছবি সফলভাবে ক্লাউডে সেভ হয়েছে।",
    };
  } catch (err: unknown) {
    const errorDetails = err instanceof Error ? err.message : "Unknown DB error";
    console.error("Update Settings Error:", errorDetails);
    return {
      success: false,
      message: `সেভ করা সম্ভব হয়নি। কারণ: ${errorDetails}`,
    };
  }
}