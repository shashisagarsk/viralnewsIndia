import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

export const AUTH_COOKIE_NAME = "admin_token";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET ||
  "viralnews_super_secret_jwt_key_2026_secure_random_string_xyz789";

const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);

export interface AdminPayload {
  email: string;
  role: "admin";
  name: string;
  [key: string]: unknown;
}

export async function signAdminToken(payload: AdminPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  return token;
}

export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export async function getAdminFromRequest(
  req: NextRequest | Request
): Promise<AdminPayload | null> {
  let token: string | undefined;

  if ("cookies" in req && typeof req.cookies?.get === "function") {
    token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  } else {
    // Check cookie header manually
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith(`${AUTH_COOKIE_NAME}=`));
      if (match) {
        token = match.substring(`${AUTH_COOKIE_NAME}=`.length);
      }
    }
  }

  // Also check Authorization: Bearer <token>
  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    }
  }

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

export function getAdminCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || "admin@viralnewsindia.com").trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD || "admin@123",
  };
}
