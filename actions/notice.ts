"use server";

import connectDB from "@/lib/db";
import Notice from "@/models/Notice";
import { revalidatePath } from "next/cache";

// ১. নতুন নোটিশ তৈরি করা
export async function createNotice(data: {
  title: string;
  content: string;
  category: string;
}) {
  try {
    await connectDB();

    if (!data.title || !data.content) {
      return { success: false, message: "শিরোনাম এবং বিবরণ আবশ্যক।" };
    }

    const newNotice = await Notice.create(data);

    revalidatePath("/notices");
    revalidatePath("/admin/notices");

    return {
      success: true,
      message: "আলহামদুলিল্লাহ! নোটিশটি সফলভাবে প্রকাশ করা হয়েছে।",
      id: newNotice._id.toString(),
    };
  } catch (error) {
    console.error("Create Notice Error:", error);
    return { success: false, message: "নোটিশ তৈরি করতে সমস্যা হয়েছে।" };
  }
}

// ২. ডাটাবেস থেকে সব নোটিশ নিয়ে আসা
export async function getNotices(onlyPublished = true) {
  try {
    await connectDB();
    const filter = onlyPublished ? { isPublished: true } : {};
    const notices = await Notice.find(filter).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(notices)),
    };
  } catch (error) {
    console.error("Get Notices Error:", error);
    return { success: false, data: [] };
  }
}

// ৩. নোটিশ ডিলিট করা
export async function deleteNotice(id: string) {
  try {
    await connectDB();
    await Notice.findByIdAndDelete(id);

    revalidatePath("/notices");
    revalidatePath("/admin/notices");

    return { success: true, message: "নোটিশটি ডিলিট করা হয়েছে।" };
  } catch (error) {
    console.error("Delete Notice Error:", error);
    return { success: false, message: "নোটিশ ডিলিট করতে সমস্যা হয়েছে।" };
  }
}