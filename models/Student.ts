import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  studentId: string;
  name: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  className: string;
  section: string;
  rollNumber: string;
  address: string;
  photo?: string;
  status: "active" | "inactive";
  createdAt: Date;
}

const StudentSchema: Schema = new Schema(
  {
    studentId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    fatherName: { type: String, required: true, trim: true },
    motherName: { type: String, required: true, trim: true },
    guardianPhone: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    className: { type: String, required: true },
    section: { type: String, required: true, default: "A" },
    rollNumber: { type: String, required: true },
    address: { type: String, required: true },
    photo: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.models.Student ||
  mongoose.model<IStudent>("Student", StudentSchema);