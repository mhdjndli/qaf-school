import { cookies, headers } from "next/headers";
import crypto from "crypto";
import {
  findStudentByLogin,
  getDawraStudent,
  listFamilyEnrolments,
  type DawraStudent,
} from "./dawrat";

// Parent sessions for /dawrat. The cookie holds the student id plus an HMAC
// over the id and the student's current access code, so regenerating a code
// in the admin panel signs that parent out everywhere.

const COOKIE_NAME = "qaf_dawra";

function secret(): string {
  return (
    process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "qafadmin"
  );
}

function sign(studentId: string, accessCode: string): string {
  return crypto
    .createHmac("sha256", secret())
    .update(`qaf-dawra-v1:${studentId}:${accessCode}`)
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function getParentStudent(): Promise<DawraStudent | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const [studentId, sig] = raw.split(".");
  if (!studentId || !sig || !/^[0-9a-f-]{36}$/i.test(studentId)) return null;
  const student = await getDawraStudent(studentId);
  if (!student) return null;
  return safeEqual(sig, sign(student.id, student.accessCode)) ? student : null;
}

/**
 * The signed-in parent's child in every Dawra they're in (one row each).
 * Empty when nobody is signed in.
 */
export async function getParentEnrolments(): Promise<
  Awaited<ReturnType<typeof listFamilyEnrolments>>
> {
  const student = await getParentStudent();
  return student ? listFamilyEnrolments(student.familyId) : [];
}

// Simple in-memory throttle against guessing codes: 10 failed tries per
// IP per 15 minutes. Resets on deploy, which is fine for this purpose.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 10;
const failures = new Map<string, { count: number; since: number }>();

async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export type ParentSignInResult = "ok" | "invalid" | "throttled";

export async function parentSignIn(
  firstName: string,
  accessCode: string,
): Promise<ParentSignInResult> {
  const ip = await clientIp();
  const now = Date.now();
  const entry = failures.get(ip);
  if (entry && now - entry.since > WINDOW_MS) failures.delete(ip);
  if ((failures.get(ip)?.count ?? 0) >= MAX_FAILURES) return "throttled";

  const student = await findStudentByLogin(firstName, accessCode);
  if (!student) {
    const cur = failures.get(ip);
    failures.set(ip, { count: (cur?.count ?? 0) + 1, since: cur?.since ?? now });
    return "invalid";
  }
  failures.delete(ip);

  const store = await cookies();
  store.set(COOKIE_NAME, `${student.id}.${sign(student.id, student.accessCode)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
  });
  return "ok";
}

export async function parentSignOut(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
