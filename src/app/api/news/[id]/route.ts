import { NextRequest, NextResponse } from "next/server";
import { NewsService } from "@/src/services/news.service";
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
      item = NewsService.getById(numericId);
    }
    if (!item) {
      item = NewsService.getBySlug(id);
    }

    if (!item) {
      return NextResponse.json(
        { success: false, error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("GET /api/news/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news article" },
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
        { success: false, error: "Unauthorized: Admin access required" },
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
    const updated = NewsService.update(numericId, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "News article updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PUT /api/news/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update news article" },
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
        { success: false, error: "Unauthorized: Admin access required" },
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

    const deleted = NewsService.delete(numericId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "News article deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/news/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete news article" },
      { status: 500 }
    );
  }
}
