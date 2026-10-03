import mongoose, { Schema, Document } from "mongoose";

export interface IStudentMark {
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

export interface IExam extends Document {
  examName: string; // যেমন: "১ম সাময়িক পরীক্ষা ২০২৫"
  className: string;
  section: string;
  subject: string;
  totalMarks: number;
  passMarks: number;
  examDate: string;
  marks: IStudentMark[];
  isPublished: boolean;
  createdAt: Date;
}

const ExamSchema: Schema = new Schema(
  {
    examName: { type: String, required: true, trim: true },
    className: { type: String, required: true },
    section: { type: String, required: true, default: "A" },
    subject: { type: String, required: true, trim: true },
    totalMarks: { type: Number, required: true, default: 100 },
    passMarks: { type: Number, required: true, default: 33 },
    examDate: { type: String, required: true },
    marks: [
      {
        studentId: { type: String, required: true },
        studentName: { type: String, required: true },
        rollNumber: { type: String, required: true },
        subject: { type: String, required: true },
        marksObtained: { type: Number, required: true, default: 0 },
        totalMarks: { type: Number, required: true, default: 100 },
        grade: { type: String, required: true, default: "F" },
        gpa: { type: Number, required: true, default: 0.00 },
        status: { type: String, enum: ["Pass", "Fail"], default: "Fail" },
      },
    ],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Exam ||
  mongoose.model<IExam>("Exam", ExamSchema);