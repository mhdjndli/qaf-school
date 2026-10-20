import { promises as fs } from "fs";
import path from "path";
import { randomInt, randomUUID } from "crypto";
import { DATA_DIR, USE_PG, pgQuery } from "./store";

// -------------------- Dawrat (short courses) --------------------
// A Dawra has students; each student gets an access code their parent uses
// at /dawrat. Every day a student can have one report row (attendance +
// daily summary) and any number of photos. A photo with studentId = null
// is shared with every student in the Dawra who wasn't marked absent that day.

export type Dawra = {
  id: string;
  name: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
};

export type DawraWithCount = Dawra & { studentCount: number };

export type DawraStudent = {
  id: string;
  dawraId: string;
  firstName: string;
  lastName: string;
  /** YYYY-MM-DD */
  dob: string | null;
  accessCode: string;
  hasPhoto: boolean;
  createdAt: string;
};

export type DawraStudentInput = Pick<
  DawraStudent,
  "firstName" | "lastName" | "dob"
>;

export type DawraReport = {
  id: string;
  studentId: string;
  /** YYYY-MM-DD */
  day: string;
  absent: boolean;
  report: string | null;
  updatedAt: string;
};

export type DawraPhoto = {
  id: string;
  dawraId: string;
  /** null = shared with every non-absent student that day */
  studentId: string | null;
  day: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

export type ImageUpload = { data: Buffer; mimeType: string };

// Unambiguous characters only (no 0/O, 1/I/L) so codes are easy to read out.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 6;

function generateAccessCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  }
  return code;
}

/** Uppercases and strips spaces/dashes so "ab3 k9x" matches "AB3K9X". */
export function normalizeAccessCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function isUniqueViolation(err: unknown): boolean {
  return (err as { code?: string })?.code === "23505";
}

// -------------------- Postgres rows --------------------

type DawraRow = {
  id: string;
  name: string;
  start_date: string | null;
  end_date: string | null;
  created_at: Date;
};

function rowToDawra(r: DawraRow): Dawra {
  return {
    id: r.id,
    name: r.name,
    startDate: r.start_date,
    endDate: r.end_date,
    createdAt: r.created_at.toISOString(),
  };
}

type StudentRow = {
  id: string;
  dawra_id: string;
  first_name: string;
  last_name: string;
  dob: string | null;
  access_code: string;
  has_photo: boolean;
  created_at: Date;
};

const STUDENT_COLUMNS = `id, dawra_id, first_name, last_name, dob, access_code,
  (photo IS NOT NULL) AS has_photo, created_at`;

function rowToStudent(r: StudentRow): DawraStudent {
  return {
    id: r.id,
    dawraId: r.dawra_id,
    firstName: r.first_name,
    lastName: r.last_name,
    dob: r.dob,
    accessCode: r.access_code,
    hasPhoto: r.has_photo,
    createdAt: r.created_at.toISOString(),
  };
}

type ReportRow = {
  id: string;
  student_id: string;
  day: string;
  absent: boolean;
  report: string | null;
  updated_at: Date;
};

function rowToReport(r: ReportRow): DawraReport {
  return {
    id: r.id,
    studentId: r.student_id,
    day: r.day,
    absent: r.absent,
    report: r.report,
    updatedAt: r.updated_at.toISOString(),
  };
}

type PhotoRow = {
  id: string;
  dawra_id: string;
  student_id: string | null;
  day: string;
  mime_type: string;
  size_bytes: number;
  created_at: Date;
};

const PHOTO_COLUMNS = `id, dawra_id, student_id, day, mime_type, size_bytes, created_at`;

function rowToPhoto(r: PhotoRow): DawraPhoto {
  return {
    id: r.id,
    dawraId: r.dawra_id,
    studentId: r.student_id,
    day: r.day,
    mimeType: r.mime_type,
    sizeBytes: r.size_bytes,
    createdAt: r.created_at.toISOString(),
  };
}

// -------------------- File backend (local dev fallback) --------------------

type FileStudent = DawraStudent & { photoMime: string | null };

type DawratFile = {
  dawrat: Dawra[];
  students: FileStudent[];
  reports: DawraReport[];
  photos: DawraPhoto[];
};

const DAWRAT_FILE = path.join(DATA_DIR, "dawrat.json");
const DAWRAT_UPLOADS = path.join(DATA_DIR, "dawrat-uploads");

function photoPath(id: string): string {
  return path.join(DAWRAT_UPLOADS, id);
}

function avatarPath(studentId: string): string {
  return path.join(DAWRAT_UPLOADS, `avatar-${studentId}`);
}

async function readFileDb(): Promise<DawratFile> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const parsed = JSON.parse(await fs.readFile(DAWRAT_FILE, "utf8"));
    return {
      dawrat: parsed.dawrat ?? [],
      students: parsed.students ?? [],
      reports: parsed.reports ?? [],
      photos: parsed.photos ?? [],
    };
  } catch {
    return { dawrat: [], students: [], reports: [], photos: [] };
  }
}

async function writeFileDb(db: DawratFile): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DAWRAT_FILE, JSON.stringify(db, null, 2), "utf8");
}

function stripFileStudent(s: FileStudent): DawraStudent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { photoMime, ...rest } = s;
  return rest;
}

function sortStudents<T extends DawraStudent>(list: T[]): T[] {
  return [...list].sort(
    (a, b) =>
      a.firstName.localeCompare(b.firstName) ||
      a.lastName.localeCompare(b.lastName),
  );
}

// -------------------- Dawrat --------------------

export async function listDawrat(): Promise<DawraWithCount[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<DawraRow & { student_count: number }>(
      `SELECT d.*, (SELECT COUNT(*)::int FROM dawra_students s
                     WHERE s.dawra_id = d.id) AS student_count
         FROM dawrat d
        ORDER BY COALESCE(d.start_date, '') DESC, d.created_at DESC`,
    );
    return rows.map((r) => ({ ...rowToDawra(r), studentCount: r.student_count }));
  }
  const db = await readFileDb();
  return [...db.dawrat]
    .sort(
      (a, b) =>
        (b.startDate ?? "").localeCompare(a.startDate ?? "") ||
        b.createdAt.localeCompare(a.createdAt),
    )
    .map((d) => ({
      ...d,
      studentCount: db.students.filter((s) => s.dawraId === d.id).length,
    }));
}

export async function getDawra(id: string): Promise<Dawra | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<DawraRow>(
      `SELECT * FROM dawrat WHERE id = $1`,
      [id],
    );
    return rows[0] ? rowToDawra(rows[0]) : null;
  }
  const db = await readFileDb();
  return db.dawrat.find((d) => d.id === id) ?? null;
}

export async function addDawra(
  input: Pick<Dawra, "name" | "startDate" | "endDate">,
): Promise<Dawra> {
  if (USE_PG) {
    const { rows } = await pgQuery<DawraRow>(
      `INSERT INTO dawrat (id, name, start_date, end_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [randomUUID(), input.name, input.startDate, input.endDate],
    );
    return rowToDawra(rows[0]);
  }
  const dawra: Dawra = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const db = await readFileDb();
  db.dawrat.push(dawra);
  await writeFileDb(db);
  return dawra;
}

export async function updateDawra(
  id: string,
  input: Pick<Dawra, "name" | "startDate" | "endDate">,
): Promise<void> {
  if (USE_PG) {
    await pgQuery(
      `UPDATE dawrat SET name = $2, start_date = $3, end_date = $4 WHERE id = $1`,
      [id, input.name, input.startDate, input.endDate],
    );
    return;
  }
  const db = await readFileDb();
  const idx = db.dawrat.findIndex((d) => d.id === id);
  if (idx === -1) return;
  db.dawrat[idx] = { ...db.dawrat[idx], ...input };
  await writeFileDb(db);
}

export async function deleteDawra(id: string): Promise<void> {
  if (USE_PG) {
    await pgQuery(`DELETE FROM dawrat WHERE id = $1`, [id]);
    return;
  }
  const db = await readFileDb();
  const studentIds = new Set(
    db.students.filter((s) => s.dawraId === id).map((s) => s.id),
  );
  const photos = db.photos.filter((p) => p.dawraId === id);
  db.dawrat = db.dawrat.filter((d) => d.id !== id);
  db.students = db.students.filter((s) => s.dawraId !== id);
  db.reports = db.reports.filter((r) => !studentIds.has(r.studentId));
  db.photos = db.photos.filter((p) => p.dawraId !== id);
  await writeFileDb(db);
  await Promise.all([
    ...photos.map((p) => fs.rm(photoPath(p.id), { force: true })),
    ...[...studentIds].map((sid) => fs.rm(avatarPath(sid), { force: true })),
  ]);
}

// -------------------- Students --------------------

export async function listDawraStudents(
  dawraId: string,
): Promise<DawraStudent[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<StudentRow>(
      `SELECT ${STUDENT_COLUMNS} FROM dawra_students
        WHERE dawra_id = $1 ORDER BY first_name, last_name`,
      [dawraId],
    );
    return rows.map(rowToStudent);
  }
  const db = await readFileDb();
  return sortStudents(
    db.students.filter((s) => s.dawraId === dawraId).map(stripFileStudent),
  );
}

export async function getDawraStudent(id: string): Promise<DawraStudent | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<StudentRow>(
      `SELECT ${STUDENT_COLUMNS} FROM dawra_students WHERE id = $1`,
      [id],
    );
    return rows[0] ? rowToStudent(rows[0]) : null;
  }
  const db = await readFileDb();
  const s = db.students.find((x) => x.id === id);
  return s ? stripFileStudent(s) : null;
}

/** Parent login: access code is unique, first name must also match. */
export async function findStudentByLogin(
  firstName: string,
  accessCode: string,
): Promise<DawraStudent | null> {
  const code = normalizeAccessCode(accessCode);
  const name = firstName.trim().toLowerCase();
  if (!code || !name) return null;
  let student: DawraStudent | null = null;
  if (USE_PG) {
    const { rows } = await pgQuery<StudentRow>(
      `SELECT ${STUDENT_COLUMNS} FROM dawra_students WHERE access_code = $1`,
      [code],
    );
    student = rows[0] ? rowToStudent(rows[0]) : null;
  } else {
    const db = await readFileDb();
    const s = db.students.find((x) => x.accessCode === code);
    student = s ? stripFileStudent(s) : null;
  }
  if (!student || student.firstName.trim().toLowerCase() !== name) return null;
  return student;
}

export async function addDawraStudent(
  dawraId: string,
  input: DawraStudentInput,
  photo: ImageUpload | null,
): Promise<DawraStudent> {
  const id = randomUUID();
  if (USE_PG) {
    for (let attempt = 0; ; attempt++) {
      try {
        const { rows } = await pgQuery<StudentRow>(
          `INSERT INTO dawra_students
             (id, dawra_id, first_name, last_name, dob, access_code,
              photo_mime, photo)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           RETURNING ${STUDENT_COLUMNS}`,
          [
            id,
            dawraId,
            input.firstName,
            input.lastName,
            input.dob,
            generateAccessCode(),
            photo?.mimeType ?? null,
            photo?.data ?? null,
          ],
        );
        return rowToStudent(rows[0]);
      } catch (err) {
        if (!isUniqueViolation(err) || attempt >= 5) throw err;
      }
    }
  }
  const db = await readFileDb();
  const taken = new Set(db.students.map((s) => s.accessCode));
  let code = generateAccessCode();
  while (taken.has(code)) code = generateAccessCode();
  if (photo) {
    await fs.mkdir(DAWRAT_UPLOADS, { recursive: true });
    await fs.writeFile(avatarPath(id), photo.data);
  }
  const student: FileStudent = {
    ...input,
    id,
    dawraId,
    accessCode: code,
    hasPhoto: Boolean(photo),
    photoMime: photo?.mimeType ?? null,
    createdAt: new Date().toISOString(),
  };
  db.students.push(student);
  await writeFileDb(db);
  return stripFileStudent(student);
}

/** Updates name/DOB; replaces the photo only when a new one is given. */
export async function updateDawraStudent(
  id: string,
  input: DawraStudentInput,
  photo: ImageUpload | null,
): Promise<void> {
  if (USE_PG) {
    if (photo) {
      await pgQuery(
        `UPDATE dawra_students
            SET first_name = $2, last_name = $3, dob = $4,
                photo_mime = $5, photo = $6
          WHERE id = $1`,
        [id, input.firstName, input.lastName, input.dob, photo.mimeType, photo.data],
      );
    } else {
      await pgQuery(
        `UPDATE dawra_students
            SET first_name = $2, last_name = $3, dob = $4
          WHERE id = $1`,
        [id, input.firstName, input.lastName, input.dob],
      );
    }
    return;
  }
  const db = await readFileDb();
  const idx = db.students.findIndex((s) => s.id === id);
  if (idx === -1) return;
  db.students[idx] = { ...db.students[idx], ...input };
  if (photo) {
    await fs.mkdir(DAWRAT_UPLOADS, { recursive: true });
    await fs.writeFile(avatarPath(id), photo.data);
    db.students[idx].hasPhoto = true;
    db.students[idx].photoMime = photo.mimeType;
  }
  await writeFileDb(db);
}

/** Issues a new access code; the old one (and any parent session) stops working. */
export async function regenerateAccessCode(id: string): Promise<void> {
  if (USE_PG) {
    for (let attempt = 0; ; attempt++) {
      try {
        await pgQuery(
          `UPDATE dawra_students SET access_code = $2 WHERE id = $1`,
          [id, generateAccessCode()],
        );
        return;
      } catch (err) {
        if (!isUniqueViolation(err) || attempt >= 5) throw err;
      }
    }
  }
  const db = await readFileDb();
  const idx = db.students.findIndex((s) => s.id === id);
  if (idx === -1) return;
  const taken = new Set(db.students.map((s) => s.accessCode));
  let code = generateAccessCode();
  while (taken.has(code)) code = generateAccessCode();
  db.students[idx].accessCode = code;
  await writeFileDb(db);
}

export async function deleteDawraStudent(id: string): Promise<void> {
  if (USE_PG) {
    await pgQuery(`DELETE FROM dawra_students WHERE id = $1`, [id]);
    return;
  }
  const db = await readFileDb();
  const photos = db.photos.filter((p) => p.studentId === id);
  db.students = db.students.filter((s) => s.id !== id);
  db.reports = db.reports.filter((r) => r.studentId !== id);
  db.photos = db.photos.filter((p) => p.studentId !== id);
  await writeFileDb(db);
  await Promise.all([
    fs.rm(avatarPath(id), { force: true }),
    ...photos.map((p) => fs.rm(photoPath(p.id), { force: true })),
  ]);
}

export async function getStudentAvatar(id: string): Promise<ImageUpload | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<{ photo_mime: string | null; photo: Buffer | null }>(
      `SELECT photo_mime, photo FROM dawra_students WHERE id = $1`,
      [id],
    );
    const r = rows[0];
    if (!r?.photo) return null;
    return { data: r.photo, mimeType: r.photo_mime || "image/jpeg" };
  }
  const db = await readFileDb();
  const s = db.students.find((x) => x.id === id);
  if (!s?.hasPhoto) return null;
  try {
    return {
      data: await fs.readFile(avatarPath(id)),
      mimeType: s.photoMime || "image/jpeg",
    };
  } catch {
    return null;
  }
}

// -------------------- Reports --------------------

export async function listReportsForDay(
  dawraId: string,
  day: string,
): Promise<DawraReport[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<ReportRow>(
      `SELECT r.* FROM dawra_reports r
         JOIN dawra_students s ON s.id = r.student_id
        WHERE s.dawra_id = $1 AND r.day = $2`,
      [dawraId, day],
    );
    return rows.map(rowToReport);
  }
  const db = await readFileDb();
  const ids = new Set(
    db.students.filter((s) => s.dawraId === dawraId).map((s) => s.id),
  );
  return db.reports.filter((r) => r.day === day && ids.has(r.studentId));
}

export async function listReportsForStudent(
  studentId: string,
): Promise<DawraReport[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<ReportRow>(
      `SELECT * FROM dawra_reports WHERE student_id = $1 ORDER BY day DESC`,
      [studentId],
    );
    return rows.map(rowToReport);
  }
  const db = await readFileDb();
  return db.reports
    .filter((r) => r.studentId === studentId)
    .sort((a, b) => b.day.localeCompare(a.day));
}

export async function getReport(
  studentId: string,
  day: string,
): Promise<DawraReport | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<ReportRow>(
      `SELECT * FROM dawra_reports WHERE student_id = $1 AND day = $2`,
      [studentId, day],
    );
    return rows[0] ? rowToReport(rows[0]) : null;
  }
  const db = await readFileDb();
  return db.reports.find((r) => r.studentId === studentId && r.day === day) ?? null;
}

export async function upsertReport(
  studentId: string,
  day: string,
  input: { absent: boolean; report: string | null },
): Promise<void> {
  if (USE_PG) {
    await pgQuery(
      `INSERT INTO dawra_reports (id, student_id, day, absent, report)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (student_id, day) DO UPDATE
         SET absent = EXCLUDED.absent, report = EXCLUDED.report,
             updated_at = NOW()`,
      [randomUUID(), studentId, day, input.absent, input.report],
    );
    return;
  }
  const db = await readFileDb();
  const now = new Date().toISOString();
  const idx = db.reports.findIndex(
    (r) => r.studentId === studentId && r.day === day,
  );
  if (idx === -1) {
    db.reports.push({ id: randomUUID(), studentId, day, ...input, updatedAt: now });
  } else {
    db.reports[idx] = { ...db.reports[idx], ...input, updatedAt: now };
  }
  await writeFileDb(db);
}

/** Days in a Dawra that have any report or photo, newest first. */
export async function listDawraDays(dawraId: string): Promise<string[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<{ day: string }>(
      `SELECT r.day FROM dawra_reports r
         JOIN dawra_students s ON s.id = r.student_id
        WHERE s.dawra_id = $1
       UNION
       SELECT day FROM dawra_photos WHERE dawra_id = $1
       ORDER BY day DESC`,
      [dawraId],
    );
    return rows.map((r) => r.day);
  }
  const db = await readFileDb();
  const ids = new Set(
    db.students.filter((s) => s.dawraId === dawraId).map((s) => s.id),
  );
  const days = new Set<string>([
    ...db.reports.filter((r) => ids.has(r.studentId)).map((r) => r.day),
    ...db.photos.filter((p) => p.dawraId === dawraId).map((p) => p.day),
  ]);
  return [...days].sort((a, b) => b.localeCompare(a));
}

// -------------------- Photos --------------------

export async function addDawraPhoto(
  input: Pick<DawraPhoto, "dawraId" | "studentId" | "day">,
  upload: ImageUpload,
): Promise<DawraPhoto> {
  const id = randomUUID();
  if (USE_PG) {
    const { rows } = await pgQuery<PhotoRow>(
      `INSERT INTO dawra_photos
         (id, dawra_id, student_id, day, mime_type, size_bytes, data)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING ${PHOTO_COLUMNS}`,
      [
        id,
        input.dawraId,
        input.studentId,
        input.day,
        upload.mimeType,
        upload.data.byteLength,
        upload.data,
      ],
    );
    return rowToPhoto(rows[0]);
  }
  await fs.mkdir(DAWRAT_UPLOADS, { recursive: true });
  await fs.writeFile(photoPath(id), upload.data);
  const photo: DawraPhoto = {
    ...input,
    id,
    mimeType: upload.mimeType,
    sizeBytes: upload.data.byteLength,
    createdAt: new Date().toISOString(),
  };
  const db = await readFileDb();
  db.photos.push(photo);
  await writeFileDb(db);
  return photo;
}

export async function listPhotosForDay(
  dawraId: string,
  day: string,
): Promise<DawraPhoto[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<PhotoRow>(
      `SELECT ${PHOTO_COLUMNS} FROM dawra_photos
        WHERE dawra_id = $1 AND day = $2 ORDER BY created_at`,
      [dawraId, day],
    );
    return rows.map(rowToPhoto);
  }
  const db = await readFileDb();
  return db.photos
    .filter((p) => p.dawraId === dawraId && p.day === day)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

/** The student's own photos plus the Dawra-wide shared photos (all days). */
export async function listPhotosVisibleToStudent(
  student: Pick<DawraStudent, "id" | "dawraId">,
): Promise<DawraPhoto[]> {
  if (USE_PG) {
    const { rows } = await pgQuery<PhotoRow>(
      `SELECT ${PHOTO_COLUMNS} FROM dawra_photos
        WHERE dawra_id = $1 AND (student_id = $2 OR student_id IS NULL)
        ORDER BY day DESC, created_at`,
      [student.dawraId, student.id],
    );
    return rows.map(rowToPhoto);
  }
  const db = await readFileDb();
  return db.photos
    .filter(
      (p) =>
        p.dawraId === student.dawraId &&
        (p.studentId === student.id || p.studentId === null),
    )
    .sort(
      (a, b) =>
        b.day.localeCompare(a.day) || a.createdAt.localeCompare(b.createdAt),
    );
}

export async function getDawraPhotoFile(
  id: string,
): Promise<{ photo: DawraPhoto; data: Buffer } | null> {
  if (USE_PG) {
    const { rows } = await pgQuery<PhotoRow & { data: Buffer }>(
      `SELECT ${PHOTO_COLUMNS}, data FROM dawra_photos WHERE id = $1`,
      [id],
    );
    if (!rows[0]) return null;
    return { photo: rowToPhoto(rows[0]), data: rows[0].data };
  }
  const db = await readFileDb();
  const photo = db.photos.find((p) => p.id === id);
  if (!photo) return null;
  try {
    return { photo, data: await fs.readFile(photoPath(id)) };
  } catch {
    return null;
  }
}

export async function deleteDawraPhoto(id: string): Promise<void> {
  if (USE_PG) {
    await pgQuery(`DELETE FROM dawra_photos WHERE id = $1`, [id]);
    return;
  }
  const db = await readFileDb();
  db.photos = db.photos.filter((p) => p.id !== id);
  await writeFileDb(db);
  await fs.rm(photoPath(id), { force: true });
}

/**
 * Whether a parent signed in as `student` may see `photo`: their own photos
 * always, shared ones only on days the child wasn't marked absent.
 */
export async function canStudentSeePhoto(
  student: Pick<DawraStudent, "id" | "dawraId">,
  photo: DawraPhoto,
): Promise<boolean> {
  if (photo.dawraId !== student.dawraId) return false;
  if (photo.studentId !== null && photo.studentId !== student.id) return false;
  const report = await getReport(student.id, photo.day);
  return !report?.absent;
}
