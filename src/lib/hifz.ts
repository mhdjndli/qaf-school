import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { listDawraStudents } from "./dawrat";
import { DATA_DIR, USE_PG, pgQuery } from "./store";

// -------------------- Hifz (Quran memorization) --------------------
// Each Dawra student gets one record per tasmee3 ("Al-Insan 1-4"), usually
// sent by a teacher through the Hifz Telegram bot. Teachers are Telegram
// users who messaged the bot and were approved in the admin panel; while a
// teacher is mid-entry, `pending` remembers what their next message is for
// (a hifz entry, media, or a general update) and for which session day.

export type HifzRecord = {
  id: string;
  studentId: string;
  /** YYYY-MM-DD */
  day: string;
  text: string;
  recordedBy: string | null;
  createdAt: string;
};

export type HifzTeacher = {
  telegramId: string;
  name: string;
  username: string | null;
  approved: boolean;
  pending: HifzPending | null;
  createdAt: string;
};

export type HifzPending =
  /** Next text is the tasmee3 for this student. */
  | { action: "hifz"; studentId: string; day: string }
  /** Next text is the Dawra's general update for the day. */
  | { action: "note"; dawraId: string; day: string }
  /**
   * Photos/videos that follow go to `studentId`, or to everyone in the Dawra
   * when null. `statusMessageId` is the bot's running "N saved" message for
   * the album (`group`) currently being received.
   */
  | {
      action: "media";
      dawraId: string;
      studentId: string | null;
      day: string;
      saved: number;
      statusMessageId: number | null;
      group: string | null;
    };

// -------------------- Postgres rows --------------------

type RecordRow = {
  id: string;
  student_id: string;
  day: string;
  text: string;
  recorded_by: string | null;
  created_at: Date;
};

function rowToRecord(r: RecordRow): HifzRecord {
  return {
    id: r.id,
    studentId: r.student_id,
    day: r.day,
    text: r.text,
    recordedBy: r.recorded_by,
    createdAt: r.created_at.toISOString(),
  };
}

type TeacherRow = {
  telegram_id: string;
  name: string;
  username: string | null;
  approved: boolean;
  pending: HifzPending | null;
  created_at: Date;
};

function rowToTeacher(r: TeacherRow): HifzTeacher {
  return {
    telegramId: r.telegram_id,
    name: r.name,
    username: r.username,
    approved: r.approved,
    pending: r.pending,
    createdAt: r.created_at.toISOString(),
  };
}

// -------------------- File backend (local dev fallback) --------------------

type HifzFile = { records: HifzRecord[]; teachers: HifzTeacher[] };

const HIFZ_FILE = path.join(DATA_DIR, "hifz.json");

async function readFileDb(): Promise<HifzFile> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const parsed = JSON.parse(await fs.readFile(HIFZ_FILE, "utf8"));
    return { records: parsed.records ?? [], teachers: parsed.teachers ?? [] };
  } catch {
    return { records: [], teachers: [] };
  }
}

async function writeFileDb(db: HifzFile): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(HIFZ_FILE, JSON.stringify(db, null, 2), "utf8");
}

function newestFirst(a: HifzRecord, b: HifzRecord): number {
  return b.day.localeCompare(a.day) || b.createdAt.localeCompare(a.createdAt);
}

// -------------------- Records --------------------

export async function addHifzRecord(input: {
  studentId: string;
  day: string;
  text: string;
  recordedBy: string | null;
}): Promise<HifzRecord> {
  const id = randomUUID();
  if (USE_PG) {
    const { rows } = await pgQuery<RecordRow>(
      `INSERT INTO hifz_records (id, student_id, day, text, recorded_by)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, input.studentId, input.day, input.text, input.recordedBy],
    );
    return rowToRecord(rows[0]);
  }
  const record: HifzRecord = { ...input, id, createdAt: new Date().toISOString() };
  const db = await readFileDb();
  db.records.push(record);
  await writeFileDb(db);
  return record;
}

export async function getHifzRecord(id: string): Promise<HifzRecord | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<RecordRow>(
      `SELECT * FROM hifz_records WHERE id = $1`,
      [id],
    );
    return rows[0] ? rowToRecord(rows[0]) : null;
  }
  const db = await readFileDb();
  return db.records.find((r) => r.id === id) ?? null;
}

export async function deleteHifzRecord(id: string): Promise<void> {
  if (USE_PG) {
    await pgQuery(`DELETE FROM hifz_records WHERE id = $1`, [id]);
    return;
  }
  const db = await readFileDb();
  db.records = db.records.filter((r) => r.id !== id);
  await writeFileDb(db);
}

/** A student's whole history, newest first. */
export async function listHifzForStudent(
  studentId: string,
): Promise<HifzRecord[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<RecordRow>(
      `SELECT * FROM hifz_records WHERE student_id = $1
        ORDER BY day DESC, created_at DESC`,
      [studentId],
    );
    return rows.map(rowToRecord);
  }
  const db = await readFileDb();
  return db.records.filter((r) => r.studentId === studentId).sort(newestFirst);
}

/** Every record for the students of a Dawra, newest first. */
export async function listHifzForDawra(dawraId: string): Promise<HifzRecord[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<RecordRow>(
      `SELECT h.* FROM hifz_records h
         JOIN dawra_students s ON s.id = h.student_id
        WHERE s.dawra_id = $1
        ORDER BY h.day DESC, h.created_at DESC`,
      [dawraId],
    );
    return rows.map(rowToRecord);
  }
  const [db, students] = await Promise.all([
    readFileDb(),
    listDawraStudents(dawraId),
  ]);
  const ids = new Set(students.map((s) => s.id));
  return db.records.filter((r) => ids.has(r.studentId)).sort(newestFirst);
}

// -------------------- Teachers (Telegram users) --------------------

export async function listHifzTeachers(): Promise<HifzTeacher[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<TeacherRow>(
      `SELECT * FROM hifz_teachers ORDER BY approved DESC, created_at DESC`,
    );
    return rows.map(rowToTeacher);
  }
  const db = await readFileDb();
  return [...db.teachers].sort(
    (a, b) =>
      Number(b.approved) - Number(a.approved) ||
      b.createdAt.localeCompare(a.createdAt),
  );
}

/**
 * Looks up the Telegram user, creating an unapproved entry on first contact
 * so the admin can approve them. Keeps their display name up to date.
 */
export async function touchHifzTeacher(input: {
  telegramId: string;
  name: string;
  username: string | null;
}): Promise<HifzTeacher> {
  if (USE_PG) {
    const { rows } = await pgQuery<TeacherRow>(
      `INSERT INTO hifz_teachers (telegram_id, name, username)
       VALUES ($1, $2, $3)
       ON CONFLICT (telegram_id) DO UPDATE
         SET name = EXCLUDED.name, username = EXCLUDED.username
       RETURNING *`,
      [input.telegramId, input.name, input.username],
    );
    return rowToTeacher(rows[0]);
  }
  const db = await readFileDb();
  let teacher = db.teachers.find((t) => t.telegramId === input.telegramId);
  if (teacher) {
    teacher.name = input.name;
    teacher.username = input.username;
  } else {
    teacher = {
      ...input,
      approved: false,
      pending: null,
      createdAt: new Date().toISOString(),
    };
    db.teachers.push(teacher);
  }
  await writeFileDb(db);
  return teacher;
}

export async function setHifzTeacherApproved(
  telegramId: string,
  approved: boolean,
): Promise<void> {
  if (USE_PG) {
    await pgQuery(
      `UPDATE hifz_teachers SET approved = $2, pending = NULL
        WHERE telegram_id = $1`,
      [telegramId, approved],
    );
    return;
  }
  const db = await readFileDb();
  const t = db.teachers.find((x) => x.telegramId === telegramId);
  if (!t) return;
  t.approved = approved;
  t.pending = null;
  await writeFileDb(db);
}

export async function deleteHifzTeacher(telegramId: string): Promise<void> {
  if (USE_PG) {
    await pgQuery(`DELETE FROM hifz_teachers WHERE telegram_id = $1`, [telegramId]);
    return;
  }
  const db = await readFileDb();
  db.teachers = db.teachers.filter((t) => t.telegramId !== telegramId);
  await writeFileDb(db);
}

/** What the teacher's next message is for (null clears it). */
export async function setPending(
  telegramId: string,
  pending: HifzPending | null,
): Promise<void> {
  if (USE_PG) {
    await pgQuery(
      `UPDATE hifz_teachers SET pending = $2 WHERE telegram_id = $1`,
      [telegramId, pending ? JSON.stringify(pending) : null],
    );
    return;
  }
  const db = await readFileDb();
  const t = db.teachers.find((x) => x.telegramId === telegramId);
  if (!t) return;
  t.pending = pending;
  await writeFileDb(db);
}
