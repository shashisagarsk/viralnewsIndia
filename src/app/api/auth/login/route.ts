import { NextRequest, NextResponse } from "next/server";
import {
  signAdminToken,
  getAdminCredentials,
  AUTH_COOKIE_NAME,
} from "@/src/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const credentials = getAdminCredentials();

    if (
      email.trim().toLowerCase() !== credentials.email ||
      password !== credentials.password
    ) {
      return NextResponse.json(
        { error: "Invalid email or password credentials" },
        { status: 401 }
      );
    }

    const payload = {
      email: credentials.email,
      role: "admin" as const,
      name: "Super Admin",
    };

    const token = await signAdminToken(payload);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: payload,
      token,
    });

    // Set HTTP-only cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
