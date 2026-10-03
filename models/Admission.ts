import mongoose, { Schema, Document } from "mongoose";

export interface IAdmission extends Document {
  studentName: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  desiredClass: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  previousInstitution?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const AdmissionSchema: Schema = new Schema(
  {
    studentName: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    desiredClass: { type: String, required: true },
    guardianName: { type: String, required: true, trim: true },
    guardianPhone: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    previousInstitution: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admission ||
  mongoose.model<IAdmission>("Admission", AdmissionSchema);