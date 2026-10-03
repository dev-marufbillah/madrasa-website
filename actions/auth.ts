"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";

// ১. লগইন হ্যান্ডলার
export async function loginUser(data: { email: string; password: string }) {
  try {
    await connectDB();

    const { email, password } = data;

    if (!email || !password) {
      return { success: false, message: "ইমেইল এবং পাসওয়ার্ড প্রদান করা আবশ্যক।" };
    }

    // প্রথমবার ডেমো অ্যাডমিন অ্যাকাউন্ট অটো তৈরি (যদি ডাটাবেসে ইউজার না থাকে)
    const totalUsers = await User.countDocuments();
    if (totalUsers === 0) {
      await User.create({
        name: "মাদ্রাসা অ্যাডমিন",
        email: "admin@aliamadrasa.edu.bd",
        password: "admin12345", // ডেমো পাসওয়ার্ড
        role: "admin",
      });
    }

    // ইউজার খোঁজা
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return { success: false, message: "ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে।" };
    }

    // পাসওয়ার্ড ভ্যালিডেশন
    if (user.password !== password) {
      return { success: false, message: "পাসওয়ার্ড সঠিক নয়।" };
    }

    // কুকিতে সেশন সেভ করা
    const cookieStore = await cookies();
    cookieStore.set(
      "session_user",
      JSON.stringify({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // ৭ দিন
        path: "/",
      }
    );

    return {
      success: true,
      message: "লগইন সফল হয়েছে!",
      role: user.role as "admin" | "teacher" | "student",
    };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "লগইন করতে সমস্যা হয়েছে।" };
  }
}

// ২. লগআউট হ্যান্ডলার
export async function logoutUser() {
  try {

    const cookieStore = await cookies();
    cookieStore.delete("session_user");
    return { success: true };
  } catch (error) {
    console.error("Logout Error:", error);
    return { success: false };
  }
}

// ৩. বর্তমান সেশন ইউজার নিয়ে আসা
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_user");

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    return JSON.parse(sessionCookie.value);
  } catch (error) {
    console.error("Get Current User Error:", error);
    return null;
  }
}