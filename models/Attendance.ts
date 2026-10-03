import mongoose, { Schema, Document } from "mongoose";

export interface IAttendanceRecord {
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: "Present" | "Absent" | "Late";
}

export interface IAttendance extends Document {
  className: string;
  section: string;
  date: string; // YYYY-MM-DD
  records: IAttendanceRecord[];
  createdAt: Date;
}

const AttendanceSchema: Schema = new Schema(
  {
    className: { type: String, required: true },
    section: { type: String, required: true, default: "A" },
    date: { type: String, required: true },
    records: [
      {
        studentId: { type: String, required: true },
        studentName: { type: String, required: true },
        rollNumber: { type: String, required: true },
        status: {
          type: String,
          enum: ["Present", "Absent", "Late"],
          default: "Present",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Attendance ||
  mongoose.model<IAttendance>("Attendance", AttendanceSchema);