import { NextResponse } from "next/server";
import { addInquiry, type InquirySource } from "@/lib/store";

const SOURCES: InquirySource[] = [
  "Google Search",
  "Word of Mouth",
  "Instagram",
  "Other",
];

function str(v: unknown, max = 200): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parentFirstName = str(body.parentFirstName, 80);
  const parentLastName = str(body.parentLastName, 80);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const childFirstName = str(body.childFirstName, 80);
  const childLastName = str(body.childLastName, 80);
  const childDob = str(body.childDob, 20);
  const expectedStartDate = str(body.expectedStartDate, 20);
  const wantsTour = body.wantsTour === true || body.wantsTour === "yes";
  const notesRaw = str(body.notes, 2000);
  const notes = notesRaw ? notesRaw : null;
  const sourceRaw = str(body.source, 40) as InquirySource;
  const source: InquirySource = SOURCES.includes(sourceRaw) ? sourceRaw : "Other";

  const missing: string[] = [];
  if (!parentFirstName) missing.push("parentFirstName");
  if (!parentLastName) missing.push("parentLastName");
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) missing.push("email");
  if (!phone) missing.push("phone");
  if (!childFirstName) missing.push("childFirstName");
  if (!childLastName) missing.push("childLastName");
  if (!childDob) missing.push("childDob");
  if (!expectedStartDate) missing.push("expectedStartDate");

  if (missing.length) {
    return NextResponse.json(
      { error: "Missing or invalid fields", fields: missing },
      { status: 400 },
    );
  }

  const inquiry = await addInquiry({
    parentFirstName,
    parentLastName,
    email,
    phone,
    childFirstName,
    childLastName,
    childDob,
    expectedStartDate,
    wantsTour,
    notes,
    source,
  });

  return NextResponse.json({ id: inquiry.id }, { status: 201 });
}
