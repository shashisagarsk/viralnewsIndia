import { NextRequest, NextResponse } from "next/server";
import { NewsService } from "@/src/services/news.service";
import { getAdminFromRequest } from "@/src/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const featuredParam = searchParams.get("featured");
    const breakingParam = searchParams.get("breaking");
    const limitParam = searchParams.get("limit");

    const featured =
      featuredParam !== null ? featuredParam === "true" : undefined;
    const breaking =
      breakingParam !== null ? breakingParam === "true" : undefined;
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const news = NewsService.getAll({
      category,
      search,
      featured,
      breaking,
      limit,
    });

    return NextResponse.json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    console.error("GET /api/news error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );
    }

    if (!body.category || !body.category.trim()) {
      return NextResponse.json(
        { success: false, error: "Category is required" },
        { status: 400 }
      );
    }

    const created = NewsService.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "News article created successfully",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/news error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create news article" },
      { status: 500 }
    );
  }
}
