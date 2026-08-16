import { NextRequest, NextResponse } from "next/server";
import { StoryService } from "@/src/services/story.service";
import { getAdminFromRequest } from "@/src/lib/auth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    let item = null;
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      item = StoryService.getById(numericId);
    }
    if (!item) {
      item = StoryService.getBySlug(id);
    }

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Web Story not found" },
        { status: 404 }
      );
    }

    // Increment view count
    StoryService.incrementViews(item.id);

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("GET /api/stories/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch web story" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { success: false, error: "Invalid numeric ID parameter" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const updated = StoryService.update(numericId, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Web Story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Web Story updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PUT /api/stories/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update web story" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { success: false, error: "Invalid numeric ID parameter" },
        { status: 400 }
      );
    }

    const deleted = StoryService.delete(numericId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Web Story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Web Story deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/stories/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete web story" },
      { status: 500 }
    );
  }
}
