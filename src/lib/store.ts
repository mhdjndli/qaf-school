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
  enrolledAt: string | null;
  paidSupplyAt: string | null;
};

export type NewInquiryInput = Omit<
  Inquiry,
  "id" | "createdAt" | "waitlistedAt" | "enrolledAt" | "paidSupplyAt"
>;

export type EmailTemplate = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const TEMPLATES_FILE = path.join(DATA_DIR, "templates.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(INQUIRIES_FILE);
  } catch {
    await fs.writeFile(INQUIRIES_FILE, "[]", "utf8");
  }
}

const SEED_TEMPLATES: Array<Pick<EmailTemplate, "title" | "body">> = [
  {
    title: "We received your inquiry — seat available",
    body: `Dear {parent},

Thank you for your inquiry with QAF School. We are delighted to let you know that we have an available seat for {child}.

To help you decide, we'd love to invite you for a tour. Please choose one of the following times:
- Option 1: {tour_time_1}
- Option 2: {tour_time_2}
- Option 3: {tour_time_3}

After the tour, if you decide to enrol {child}, the next steps are:

1. Submit the required documents.
2. Sign the enrolment agreement.
3. Receive the parent handbook and the year's calendar.
4. Pay the $190 resource fee to reserve the seat:
   https://buy.stripe.com/bJe7sM5CI86W1Y67tKefC0v
5. During the first week of August, set up your September payment. You may either:
   - Subscribe to monthly payments:
     https://buy.stripe.com/14AdRaaX2af4cCKdS8efC0w
   - Or pay for the full year and receive one month's fees waived:
     https://buy.stripe.com/6oU6oI4yE0Eu0U2dS8efC0x

We look forward to welcoming your family.

Warm regards,
QAF School Admissions`,
  },
  {
    title: "Parent handbook + year's calendar",
    body: `Dear {parent},

As promised, please find below the Parent Handbook and our Year's Calendar. Both are shared via Google Drive.

- Parent Handbook: {handbook_url}
- Year's Calendar: {calendar_url}

Please review both carefully and let us know if you have any questions.

Warm regards,
QAF School`,
  },
  {
    title: "We received your inquiry — added to waitlist",
    body: `Dear {parent},

Thank you for your inquiry with QAF School. We are currently at full capacity, so we've added {child} to our waiting list. We will reach out to you as soon as a spot becomes available.

In the meantime, please don't hesitate to contact us with any questions.

Warm regards,
QAF School Admissions`,
  },
];

async function ensureTemplatesFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(TEMPLATES_FILE);
  } catch {
    const now = new Date().toISOString();
    const seeded: EmailTemplate[] = SEED_TEMPLATES.map((t) => ({
      ...t,
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    }));
    await fs.writeFile(TEMPLATES_FILE, JSON.stringify(seeded, null, 2), "utf8");
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
    enrolledAt: null,
    paidSupplyAt: null,
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

export async function setEnrolled(
  id: string,
  enrolled: boolean,
): Promise<Inquiry | null> {
  const all = await listInquiries();
  const idx = all.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  all[idx] = {
    ...all[idx],
    enrolledAt: enrolled ? new Date().toISOString() : null,
    waitlistedAt: enrolled ? null : all[idx].waitlistedAt,
    paidSupplyAt: enrolled ? all[idx].paidSupplyAt : null,
  };
  await writeAll(all);
  return all[idx];
}

export async function setPaidSupply(
  id: string,
  paid: boolean,
): Promise<Inquiry | null> {
  const all = await listInquiries();
  const idx = all.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  all[idx] = {
    ...all[idx],
    paidSupplyAt: paid ? new Date().toISOString() : null,
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

export async function listTemplates(): Promise<EmailTemplate[]> {
  await ensureTemplatesFile();
  const text = await fs.readFile(TEMPLATES_FILE, "utf8");
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? (parsed as EmailTemplate[]) : [];
  } catch {
    return [];
  }
}

async function writeTemplates(list: EmailTemplate[]): Promise<void> {
  await ensureTemplatesFile();
  await fs.writeFile(TEMPLATES_FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function addTemplate(
  input: Pick<EmailTemplate, "title" | "body">,
): Promise<EmailTemplate> {
  const now = new Date().toISOString();
  const tpl: EmailTemplate = {
    id: randomUUID(),
    title: input.title,
    body: input.body,
    createdAt: now,
    updatedAt: now,
  };
  const all = await listTemplates();
  all.unshift(tpl);
  await writeTemplates(all);
  return tpl;
}

export async function updateTemplate(
  id: string,
  input: Pick<EmailTemplate, "title" | "body">,
): Promise<EmailTemplate | null> {
  const all = await listTemplates();
  const idx = all.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  all[idx] = {
    ...all[idx],
    title: input.title,
    body: input.body,
    updatedAt: new Date().toISOString(),
  };
  await writeTemplates(all);
  return all[idx];
}

export async function deleteTemplate(id: string): Promise<boolean> {
  const all = await listTemplates();
  const next = all.filter((t) => t.id !== id);
  if (next.length === all.length) return false;
  await writeTemplates(next);
  return true;
}
