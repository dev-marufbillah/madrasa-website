import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json(
      {
        success: true,
        status: "🟢 ONLINE & CONNECTED",
        message: "আলহামদুলিল্লাহ! আলিয়া মাদ্রাসা ডাটাবেস সফলভাবে কানেক্ট হয়েছে!",
        database: "MongoDB Atlas",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        status: "🔴 OFFLINE",
        error_message: message,
      },
      { status: 500 }
    );
  }
}