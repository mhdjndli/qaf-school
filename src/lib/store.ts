import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type InquirySource =
  | "Google Search"
  | "Word of Mouth"
  | "Instagram"
  | "Other";

export type Inquiry = {
  id: string;
  createdAt: string;
  parentFirstName: string;
  parentLastName: string;
  email: string;
  phone: string;
  childFirstName: string;
  childLastName: string;
  childDob: string;
  expectedStartDate: string;
  wantsTour: boolean;
  notes: string | null;
  source: InquirySource;
  waitlistedAt: string | null;
};

export type NewInquiryInput = Omit<
  Inquiry,
  "id" | "createdAt" | "waitlistedAt"
>;

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(INQUIRIES_FILE);
  } catch {
    await fs.writeFile(INQUIRIES_FILE, "[]", "utf8");
  }
}

export async function listInquiries(): Promise<Inquiry[]> {
  await ensureFile();
  const text = await fs.readFile(INQUIRIES_FILE, "utf8");
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(list: Inquiry[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function addInquiry(input: NewInquiryInput): Promise<Inquiry> {
  const inquiry: Inquiry = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    waitlistedAt: null,
  };
  const all = await listInquiries();
  all.unshift(inquiry);
  await writeAll(all);
  return inquiry;
}

export async function setWaitlisted(
  id: string,
  waitlisted: boolean,
): Promise<Inquiry | null> {
  const all = await listInquiries();
  const idx = all.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  all[idx] = {
    ...all[idx],
    waitlistedAt: waitlisted ? new Date().toISOString() : null,
  };
  await writeAll(all);
  return all[idx];
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const all = await listInquiries();
  const next = all.filter((i) => i.id !== id);
  if (next.length === all.length) return false;
  await writeAll(next);
  return true;
}
