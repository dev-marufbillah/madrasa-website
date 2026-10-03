import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

export async function uploadToCloudinary(
  fileBase64: string,
  folder: string = "madrasa"
): Promise<{ success: boolean; url?: string; message?: string }> {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return {
        success: false,
        message: "Cloudinary কনফিগার করা নেই। .env.local চেক করুন।",
      };
    }

    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: `alia-madrasa/${folder}`,
      resource_type: "image",
      transformation: [
        { width: 1200, height: 1200, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    return {
      success: true,
      url: result.secure_url,
    };
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return {
      success: false,
      message: "ছবি আপলোড ব্যর্থ হয়েছে।",
    };
  }
}