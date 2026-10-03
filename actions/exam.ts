"use server";

import connectDB from "@/lib/db";
import Exam from "@/models/Exam";
import { revalidatePath } from "next/cache";

// Type Definitions
interface StudentMarkItem {
  studentId: string;
  studentName: string;
  rollNumber: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  gpa: number;
  status: "Pass" | "Fail";
}

interface ExamDocument {
  _id: string;
  examName: string;
  className: string;
  section: string;
  subject: string;
  totalMarks: number;
  passMarks: number;
  examDate: string;
  marks: StudentMarkItem[];
  isPublished: boolean;
}

interface StudentInfoType {
  studentId: string;
  studentName: string;
  rollNumber: string;
  className: string;
  section: string;
  examName: string;
}

interface StudentResultItem {
  subject: string;
  totalMarks: number;
  marksObtained: number;
  grade: string;
  gpa: number;
  status: "Pass" | "Fail";
}

// গ্রেড ও জিপিএ গণনার হেল্পার ফাংশন
function calculateGradeAndGPA(marks: number, totalMarks = 100, passMarks = 33) {
  const percentage = (marks / totalMarks) * 100;

  if (marks < passMarks) return { grade: "F", gpa: 0.0, status: "Fail" as const };
  if (percentage >= 80) return { grade: "A+", gpa: 5.0, status: "Pass" as const };
  if (percentage >= 70) return { grade: "A", gpa: 4.0, status: "Pass" as const };
  if (percentage >= 60) return { grade: "A-", gpa: 3.5, status: "Pass" as const };
  if (percentage >= 50) return { grade: "B", gpa: 3.0, status: "Pass" as const };
  if (percentage >= 40) return { grade: "C", gpa: 2.0, status: "Pass" as const };
  if (percentage >= 33) return { grade: "D", gpa: 1.0, status: "Pass" as const };
  return { grade: "F", gpa: 0.0, status: "Fail" as const };
}

// ১. পরীক্ষার নম্বর সেভ বা আপডেট করা
export async function saveExamMarks(data: {
  examName: string;
  className: string;
  section: string;
  subject: string;
  totalMarks: number;
  passMarks: number;
  examDate: string;
  marks: {
    studentId: string;
    studentName: string;
    rollNumber: string;
    marksObtained: number;
  }[];
}) {
  try {
    await connectDB();

    if (!data.examName || !data.className || !data.subject || !data.marks) {
      return { success: false, message: "পরীক্ষার তথ্য অসম্পূর্ণ।" };
    }

    const calculatedMarks = data.marks.map((m) => {
      const { grade, gpa, status } = calculateGradeAndGPA(
        m.marksObtained,
        data.totalMarks,
        data.passMarks
      );

      return {
        studentId: m.studentId,
        studentName: m.studentName,
        rollNumber: m.rollNumber,
        subject: data.subject,
        marksObtained: m.marksObtained,
        totalMarks: data.totalMarks,
        grade,
        gpa,
        status,
      };
    });

    await Exam.findOneAndUpdate(
      {
        examName: data.examName,
        className: data.className,
        section: data.section,
        subject: data.subject,
      },
      {
        ...data,
        marks: calculatedMarks,
      },
      { upsert: true, new: true }
    );

    revalidatePath("/admin/exams");
    revalidatePath("/results");

    return {
      success: true,
      message: "আলহামদুলিল্লাহ! পরীক্ষার ফলাফল ও নম্বর সফলভাবে সংরক্ষিত হয়েছে।",
    };
  } catch (error) {
    console.error("Save Exam Marks Error:", error);
    return { success: false, message: "পরীক্ষার নম্বর সংরক্ষণ করতে সমস্যা হয়েছে।" };
  }
}

// ২. নির্দিষ্ট পরীক্ষা ও ক্লাসের তথ্য নিয়ে আসা
export async function getExamData(
  examName: string,
  className: string,
  section: string,
  subject: string
) {
  try {
    await connectDB();
    const exam = await Exam.findOne({
      examName,
      className,
      section,
      subject,
    }).lean();

    if (!exam) return { success: true, data: null };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(exam)),
    };
  } catch (error) {
    console.error("Get Exam Error:", error);
    return { success: false, data: null };
  }
}

// ৩. পাবলিক রেজাল্ট সার্চ (Student ID দিয়ে মার্কশীট খোঁজা)
export async function searchStudentResult(studentId: string, examName: string) {
  try {
    await connectDB();

    if (!studentId) return { success: false, message: "স্টুডেন্ট আইডি প্রদান করুন।" };

    const rawExams = await Exam.find({
      isPublished: true,
      ...(examName && examName !== "All" ? { examName } : {}),
      "marks.studentId": studentId,
    }).lean();

    const exams = JSON.parse(JSON.stringify(rawExams)) as ExamDocument[];

    if (!exams || exams.length === 0) {
      return { success: false, message: "প্রদানকৃত স্টুডেন্ট আইডিতে কোনো ফলাফল পাওয়া যায়নি।" };
    }

    const studentResults: StudentResultItem[] = [];
    let studentInfo: StudentInfoType | null = null;

    exams.forEach((ex) => {
      const markRecord = ex.marks.find((m) => m.studentId === studentId);
      if (markRecord) {
        if (!studentInfo) {
          studentInfo = {
            studentId: markRecord.studentId,
            studentName: markRecord.studentName,
            rollNumber: markRecord.rollNumber,
            className: ex.className,
            section: ex.section,
            examName: ex.examName,
          };
        }

        studentResults.push({
          subject: ex.subject,
          totalMarks: ex.totalMarks,
          marksObtained: markRecord.marksObtained,
          grade: markRecord.grade,
          gpa: markRecord.gpa,
          status: markRecord.status,
        });
      }
    });

    return {
      success: true,
      studentInfo,
      results: studentResults,
    };
  } catch (error) {
    console.error("Search Result Error:", error);
    return { success: false, message: "ফলাফল খুঁজতে সমস্যা হয়েছে।" };
  }
}