import { NextRequest, NextResponse } from "next/server";
import { uploadImageBuffer } from "@/src/lib/cloudinary";
import { getAdminFromRequest } from "@/src/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required to upload media" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided in request" },
        { status: 400 }
      );
    }

    // Validate mime type
    const validMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif",
    ];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file format. Please upload JPG, PNG, WEBP, or GIF." },
        { status: 400 }
      );
    }

    // 10MB file limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 10MB limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageBuffer(buffer, file.name, "viralnews_articles");

    return NextResponse.json({
      success: true,
      message: result.isCloudinary
        ? "Image uploaded successfully to Cloudinary"
        : "Image stored locally (configure Cloudinary keys in .env.local for full cloud CDN)",
      url: result.url,
      publicId: result.publicId,
      isCloudinary: result.isCloudinary,
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
