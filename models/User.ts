import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher" | "student" | "parent";
  studentId?: string;
  phone?: string;
  childrenIds?: string[]; // প্যারেন্টের সন্তানদের Student ID
  status: "active" | "inactive";
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "teacher", "student", "parent"],
      default: "student",
    },
    studentId: { type: String, default: "" },
    phone: { type: String, default: "" },
    childrenIds: [{ type: String }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);