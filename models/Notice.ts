import mongoose, { Schema, Document } from "mongoose";

export interface INotice extends Document {
  title: string;
  content: string;
  category: "Academic" | "Admission" | "Exam" | "General" | "Holiday";
  isPublished: boolean;
  createdAt: Date;
}

const NoticeSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["Academic", "Admission", "Exam", "General", "Holiday"],
      default: "General",
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Notice ||
  mongoose.model<INotice>("Notice", NoticeSchema);