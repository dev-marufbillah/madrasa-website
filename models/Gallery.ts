import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  category: "Campus" | "Event" | "Sports" | "Classroom" | "General";
  imageUrl: string;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Campus", "Event", "Sports", "Classroom", "General"],
      default: "Campus",
    },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery ||
  mongoose.model<IGallery>("Gallery", GallerySchema);