import mongoose, { Schema, Document } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  designation: string;
  department: string;
  phone: string;
  email?: string;
  qualification: string;
  photo?: string;
  joinedDate?: string;
  status: "active" | "inactive";
  createdAt: Date;
}

const TeacherSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    qualification: { type: String, required: true, trim: true },
    photo: { type: String, default: "" },
    joinedDate: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.models.Teacher ||
  mongoose.model<ITeacher>("Teacher", TeacherSchema);