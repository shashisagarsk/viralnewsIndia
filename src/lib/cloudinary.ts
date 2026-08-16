import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import path from "path";
import fs from "fs";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

export { cloudinary };

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  isCloudinary: boolean;
}

export async function uploadImageBuffer(
  buffer: Buffer,
  filename: string,
  folder: string = "viralnews_articles"
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const hasCloudinaryCredentials = Boolean(
    cloudName && apiKey && apiSecret && cloudName !== "your_cloud_name"
  );

  if (hasCloudinaryCredentials) {
    // Upload directly to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            console.error("Cloudinary upload error:", error);
            reject(error || new Error("Cloudinary upload failed"));
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              isCloudinary: true,
            });
          }
        }
      );

      uploadStream.end(buffer);
    });
  }

  // Fallback: If Cloudinary keys are not yet provided in .env, save locally to public/uploads
  console.log("Cloudinary credentials not configured. Using local public/uploads storage fallback.");
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filePath = path.join(uploadsDir, safeName);
  fs.writeFileSync(filePath, buffer);

  return {
    url: `/uploads/${safeName}`,
    publicId: safeName,
    isCloudinary: false,
  };
}
