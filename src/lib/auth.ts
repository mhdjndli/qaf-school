import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

const COOKIE_NAME = "qaf_admin";
const TOKEN_PURPOSE = "qaf-admin-v1";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "qafadmin";
}

function deriveToken(password: string): string {
  return crypto
    .createHmac("sha256", password)
    .update(TOKEN_PURPOSE)
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return safeEqual(token, deriveToken(adminPassword()));
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function signIn(password: string): Promise<boolean> {
  if (!safeEqual(password, adminPassword())) return false;
  const store = await cookies();
  store.set(COOKIE_NAME, deriveToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
