"use server";

import connectDB from "@/lib/db";
import Gallery from "@/models/Gallery";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

export interface GalleryInput {
  title: string;
  category: "Campus" | "Event" | "Sports" | "Classroom" | "General";
  imageUrl: string; // base64 from client OR already a URL
}

export async function addGalleryImage(data: GalleryInput) {
  try {
    await connectDB();

    if (!data.title || !data.imageUrl) {
      return { success: false, message: "ছবি এবং শিরোনাম আবশ্যক।" };
    }

    let finalUrl = data.imageUrl;

    // যদি base64 হয় → Cloudinary তে আপলোড
    if (data.imageUrl.startsWith("data:image")) {
      const upload = await uploadToCloudinary(data.imageUrl, "gallery");
      if (!upload.success || !upload.url) {
        // Cloudinary না থাকলে base64 ফallback (ডেভেলপমেন্ট)
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
          finalUrl = data.imageUrl;
        } else {
          return {
            success: false,
            message: upload.message || "ছবি আপলোড ব্যর্থ।",
          };
        }
      } else {
        finalUrl = upload.url;
      }
    }

    await Gallery.create({
      title: data.title,
      category: data.category,
      imageUrl: finalUrl,
    });

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return {
      success: true,
      message: "আলহামদুলিল্লাহ! ছবি গ্যালারিতে যোগ হয়েছে।",
    };
  } catch (err) {
    console.error("Add Gallery Error:", err);
    return { success: false, message: "ছবি সেভ করতে সমস্যা হয়েছে।" };
  }
}

export async function getGalleryImages(category?: string) {
  try {
    await connectDB();
    const query = category && category !== "All" ? { category } : {};
    const images = await Gallery.find(query).sort({ createdAt: -1 }).lean();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(images)),
    };
  } catch (err) {
    console.error("Get Gallery Error:", err);
    return { success: false, data: [] };
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await connectDB();
    await Gallery.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true, message: "ছবি ডিলিট হয়েছে।" };
  } catch (err) {
    console.error("Delete Gallery Error:", err);
    return { success: false, message: "ডিলিট ব্যর্থ।" };
  }
}