import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  className: string;
  classCode: string;
  section: string;
  classTeacher?: string;
  capacity: number;
  description?: string;
  createdAt: Date;
}

const ClassSchema: Schema = new Schema(
  {
    className: { type: String, required: true, trim: true },
    classCode: { type: String, required: true, trim: true },
    section: { type: String, required: true, trim: true, default: "A" },
    classTeacher: { type: String, default: "নির্ধারিত নয়" },
    capacity: { type: Number, required: true, default: 40 },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Class ||
  mongoose.model<IClass>("Class", ClassSchema);