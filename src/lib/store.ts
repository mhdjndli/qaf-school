import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Pool, type QueryResultRow } from "pg";

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

// -------------------- backend selection --------------------
// Postgres is used whenever DATABASE_URL is set (Railway provides it
// automatically). Otherwise we fall back to a local JSON file so
// development without a database still works.

const DATABASE_URL = process.env.DATABASE_URL;
const USE_PG = Boolean(DATABASE_URL);

// -------------------- Postgres backend --------------------

type GlobalWithPool = typeof globalThis & { __qafPgPool?: Pool };

function getPool(): Pool {
  const g = globalThis as GlobalWithPool;
  if (!g.__qafPgPool) {
    g.__qafPgPool = new Pool({
      connectionString: DATABASE_URL,
      ssl:
        process.env.PGSSLMODE === "disable"
          ? undefined
          : { rejectUnauthorized: false },
    });
  }
  return g.__qafPgPool;
}

let pgReady: Promise<void> | null = null;

function ensurePg(): Promise<void> {
  if (!pgReady) {
    pgReady = (async () => {
      const pool = getPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id UUID PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          parent_first_name TEXT NOT NULL,
          parent_last_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          child_first_name TEXT NOT NULL,
          child_last_name TEXT NOT NULL,
          child_dob TEXT NOT NULL,
          expected_start_date TEXT NOT NULL,
          wants_tour BOOLEAN NOT NULL,
          notes TEXT,
          source TEXT NOT NULL,
          waitlisted_at TIMESTAMPTZ,
          enrolled_at TIMESTAMPTZ,
          paid_supply_at TIMESTAMPTZ
        );
      `);
      await pool.query(`
        CREATE TABLE IF NOT EXISTS templates (
          id UUID PRIMARY KEY,
          title TEXT NOT NULL,
          body TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      const { rows } = await pool.query<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM templates`,
      );
      if (rows[0] && Number(rows[0].count) === 0) {
        for (const t of SEED_TEMPLATES) {
          await pool.query(
            `INSERT INTO templates (id, title, body) VALUES ($1, $2, $3)`,
            [randomUUID(), t.title, t.body],
          );
        }
      }
    })().catch((err) => {
      pgReady = null;
      throw err;
    });
  }
  return pgReady;
}

type InquiryRow = {
  id: string;
  created_at: Date;
  parent_first_name: string;
  parent_last_name: string;
  email: string;
  phone: string;
  child_first_name: string;
  child_last_name: string;
  child_dob: string;
  expected_start_date: string;
  wants_tour: boolean;
  notes: string | null;
  source: string;
  waitlisted_at: Date | null;
  enrolled_at: Date | null;
  paid_supply_at: Date | null;
};

function rowToInquiry(r: InquiryRow): Inquiry {
  return {
    id: r.id,
    createdAt: r.created_at.toISOString(),
    parentFirstName: r.parent_first_name,
    parentLastName: r.parent_last_name,
    email: r.email,
    phone: r.phone,
    childFirstName: r.child_first_name,
    childLastName: r.child_last_name,
    childDob: r.child_dob,
    expectedStartDate: r.expected_start_date,
    wantsTour: r.wants_tour,
    notes: r.notes,
    source: r.source as InquirySource,
    waitlistedAt: r.waitlisted_at ? r.waitlisted_at.toISOString() : null,
    enrolledAt: r.enrolled_at ? r.enrolled_at.toISOString() : null,
    paidSupplyAt: r.paid_supply_at ? r.paid_supply_at.toISOString() : null,
  };
}

type TemplateRow = {
  id: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
};

function rowToTemplate(r: TemplateRow): EmailTemplate {
  return {
    id: r.id,
    title: r.title,
    body: r.body,
    createdAt: r.created_at.toISOString(),
    updatedAt: r.updated_at.toISOString(),
  };
}

async function pgQuery<R extends QueryResultRow>(
  sql: string,
  params: unknown[] = [],
) {
  await ensurePg();
  return getPool().query<R>(sql, params);
}

// -------------------- File backend (local dev fallback) --------------------

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const TEMPLATES_FILE = path.join(DATA_DIR, "templates.json");

async function ensureInquiriesFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(INQUIRIES_FILE);
  } catch {
    await fs.writeFile(INQUIRIES_FILE, "[]", "utf8");
  }
}

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

async function readInquiriesFile(): Promise<Inquiry[]> {
  await ensureInquiriesFile();
  const text = await fs.readFile(INQUIRIES_FILE, "utf8");
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    return [];
  }
}

async function writeInquiriesFile(list: Inquiry[]): Promise<void> {
  await ensureInquiriesFile();
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf8");
}

async function readTemplatesFile(): Promise<EmailTemplate[]> {
  await ensureTemplatesFile();
  const text = await fs.readFile(TEMPLATES_FILE, "utf8");
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? (parsed as EmailTemplate[]) : [];
  } catch {
    return [];
  }
}

async function writeTemplatesFile(list: EmailTemplate[]): Promise<void> {
  await ensureTemplatesFile();
  await fs.writeFile(TEMPLATES_FILE, JSON.stringify(list, null, 2), "utf8");
}

// -------------------- Public API --------------------

export async function listInquiries(): Promise<Inquiry[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<InquiryRow>(
      `SELECT * FROM inquiries ORDER BY created_at DESC`,
    );
    return rows.map(rowToInquiry);
  }
  return readInquiriesFile();
}

export async function addInquiry(input: NewInquiryInput): Promise<Inquiry> {
  if (USE_PG) {
    const id = randomUUID();
    const { rows } = await pgQuery<InquiryRow>(
      `INSERT INTO inquiries (
         id, parent_first_name, parent_last_name, email, phone,
         child_first_name, child_last_name, child_dob, expected_start_date,
         wants_tour, notes, source
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        id,
        input.parentFirstName,
        input.parentLastName,
        input.email,
        input.phone,
        input.childFirstName,
        input.childLastName,
        input.childDob,
        input.expectedStartDate,
        input.wantsTour,
        input.notes,
        input.source,
      ],
    );
    return rowToInquiry(rows[0]);
  }
  const inquiry: Inquiry = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    waitlistedAt: null,
    enrolledAt: null,
    paidSupplyAt: null,
  };
  const all = await readInquiriesFile();
  all.unshift(inquiry);
  await writeInquiriesFile(all);
  return inquiry;
}

export async function setWaitlisted(
  id: string,
  waitlisted: boolean,
): Promise<Inquiry | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<InquiryRow>(
      `UPDATE inquiries SET waitlisted_at = $2 WHERE id = $1 RETURNING *`,
      [id, waitlisted ? new Date() : null],
    );
    return rows[0] ? rowToInquiry(rows[0]) : null;
  }
  const all = await readInquiriesFile();
  const idx = all.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  all[idx] = {
    ...all[idx],
    waitlistedAt: waitlisted ? new Date().toISOString() : null,
  };
  await writeInquiriesFile(all);
  return all[idx];
}

export async function setEnrolled(
  id: string,
  enrolled: boolean,
): Promise<Inquiry | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<InquiryRow>(
      `UPDATE inquiries
         SET enrolled_at = $2,
             waitlisted_at = CASE WHEN $2 IS NOT NULL THEN NULL ELSE waitlisted_at END,
             paid_supply_at = CASE WHEN $2 IS NOT NULL THEN paid_supply_at ELSE NULL END
       WHERE id = $1 RETURNING *`,
      [id, enrolled ? new Date() : null],
    );
    return rows[0] ? rowToInquiry(rows[0]) : null;
  }
  const all = await readInquiriesFile();
  const idx = all.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  all[idx] = {
    ...all[idx],
    enrolledAt: enrolled ? new Date().toISOString() : null,
    waitlistedAt: enrolled ? null : all[idx].waitlistedAt,
    paidSupplyAt: enrolled ? all[idx].paidSupplyAt : null,
  };
  await writeInquiriesFile(all);
  return all[idx];
}

export async function setPaidSupply(
  id: string,
  paid: boolean,
): Promise<Inquiry | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<InquiryRow>(
      `UPDATE inquiries SET paid_supply_at = $2 WHERE id = $1 RETURNING *`,
      [id, paid ? new Date() : null],
    );
    return rows[0] ? rowToInquiry(rows[0]) : null;
  }
  const all = await readInquiriesFile();
  const idx = all.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  all[idx] = {
    ...all[idx],
    paidSupplyAt: paid ? new Date().toISOString() : null,
  };
  await writeInquiriesFile(all);
  return all[idx];
}

export async function deleteInquiry(id: string): Promise<boolean> {
  if (USE_PG) {
    const res = await pgQuery(`DELETE FROM inquiries WHERE id = $1`, [id]);
    return (res.rowCount ?? 0) > 0;
  }
  const all = await readInquiriesFile();
  const next = all.filter((i) => i.id !== id);
  if (next.length === all.length) return false;
  await writeInquiriesFile(next);
  return true;
}

export async function listTemplates(): Promise<EmailTemplate[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<TemplateRow>(
      `SELECT * FROM templates ORDER BY created_at DESC`,
    );
    return rows.map(rowToTemplate);
  }
  return readTemplatesFile();
}

export async function addTemplate(
  input: Pick<EmailTemplate, "title" | "body">,
): Promise<EmailTemplate> {
  if (USE_PG) {
    const { rows } = await pgQuery<TemplateRow>(
      `INSERT INTO templates (id, title, body) VALUES ($1, $2, $3) RETURNING *`,
      [randomUUID(), input.title, input.body],
    );
    return rowToTemplate(rows[0]);
  }
  const now = new Date().toISOString();
  const tpl: EmailTemplate = {
    id: randomUUID(),
    title: input.title,
    body: input.body,
    createdAt: now,
    updatedAt: now,
  };
  const all = await readTemplatesFile();
  all.unshift(tpl);
  await writeTemplatesFile(all);
  return tpl;
}

export async function updateTemplate(
  id: string,
  input: Pick<EmailTemplate, "title" | "body">,
): Promise<EmailTemplate | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<TemplateRow>(
      `UPDATE templates
         SET title = $2, body = $3, updated_at = NOW()
       WHERE id = $1 RETURNING *`,
      [id, input.title, input.body],
    );
    return rows[0] ? rowToTemplate(rows[0]) : null;
  }
  const all = await readTemplatesFile();
  const idx = all.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  all[idx] = {
    ...all[idx],
    title: input.title,
    body: input.body,
    updatedAt: new Date().toISOString(),
  };
  await writeTemplatesFile(all);
  return all[idx];
}

export async function deleteTemplate(id: string): Promise<boolean> {
  if (USE_PG) {
    const res = await pgQuery(`DELETE FROM templates WHERE id = $1`, [id]);
    return (res.rowCount ?? 0) > 0;
  }
  const all = await readTemplatesFile();
  const next = all.filter((t) => t.id !== id);
  if (next.length === all.length) return false;
  await writeTemplatesFile(next);
  return true;
}
