import { NextRequest, NextResponse } from "next/server";
import { StoryService } from "@/src/services/story.service";
import { getAdminFromRequest } from "@/src/lib/auth";

export async function GET() {
  try {
    const stories = StoryService.getAll();
    return NextResponse.json({
      success: true,
      count: stories.length,
      data: stories,
    });
  } catch (error) {
    console.error("GET /api/stories error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "Story title is required" },
        { status: 400 }
      );
    }

    const created = StoryService.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Web Story published successfully",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/stories error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create web story" },
      { status: 500 }
    );
  }
}
