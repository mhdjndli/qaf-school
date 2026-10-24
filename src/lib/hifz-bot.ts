import crypto from "crypto";
import {
  addDawraPhoto,
  getDawraNote,
  getDawraStudent,
  getReport,
  listDawrat,
  listDawraStudents,
  listPhotosForDay,
  listReportsForDay,
  setAttendance,
  setDawraNote,
  type DawraStudent,
} from "./dawrat";
import { addDays, shortDay, todayISO, weekdayOf, weekdaysLabel } from "./format";
import {
  addHifzRecord,
  deleteHifzRecord,
  getHifzRecord,
  listHifzForDawra,
  listHifzForStudent,
  setPending,
  touchHifzTeacher,
  type HifzPending,
  type HifzRecord,
  type HifzTeacher,
} from "./hifz";

// The Hifz Telegram bot. Telegram POSTs every update to
// /api/telegram/hifz; approved teachers pick a Dawra, then:
//   📋 Attendance: tap a student → Attended / Absent, or "All attended"
//   📖 Hifz: tap a student and type what they recited ("Al-Insan 1-4")
//   📸 Media: pick a student (or everyone who attended) and send photos/videos
//   📝 General update: type a note for parents of everyone who attended
// Everything is saved for the Dawra's session day (see lastSessionDay).
// The webhook is registered with max_connections 1, so updates (e.g. the
// photos of an album) are handled one at a time and pending state is safe.
//
// Callback data (max 64 bytes), most with a ":YYYYMMDD" session-day suffix:
//   "m" Dawra menu            "d:<dawraId>" Attendance-or-Hifz choice
//   "c:<dawraId>" pick date   "a:<dawraId>" attendance list
//   "t:<studentId>" Attended/Absent prompt
//   "p:<studentId>" present   "b:<studentId>" absent
//   "A:<dawraId>" mark everyone not yet marked as present
//   "h:<dawraId>" hifz list   "s:<studentId>" start hifz entry
//   "x:<dawraId>" cancel hifz entry   "u:<recordId>" undo (no day needed)
//   "M:<dawraId>" media menu  "e:<dawraId>" media for everyone
//   "f:<studentId>" media for one student
//   "n:<dawraId>" general update      "r:<dawraId>" remove general update

const MAX_TEXT = 200;
const MAX_NOTE = 2000;
/** The Bot API can only download files up to 20 MB. */
const MAX_MEDIA_BYTES = 20 * 1024 * 1024;

// -------------------- Telegram API --------------------

export function hifzBotToken(): string | null {
  return process.env.HIFZ_BOT_TOKEN || null;
}

/**
 * Secret Telegram echoes back in X-Telegram-Bot-Api-Secret-Token, so only
 * Telegram can post updates. Derived from the token unless set explicitly.
 */
export function hifzWebhookSecret(token: string): string {
  return (
    process.env.HIFZ_WEBHOOK_SECRET ||
    crypto.createHmac("sha256", token).update("qaf-hifz-webhook-v1").digest("hex")
  );
}

type TgResponse<T> = { ok: boolean; result?: T; description?: string };

export async function telegram<T = unknown>(
  method: string,
  body: Record<string, unknown> = {},
): Promise<T> {
  const token = hifzBotToken();
  if (!token) throw new Error("HIFZ_BOT_TOKEN is not set.");
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as TgResponse<T>;
  if (!data.ok) throw new Error(`Telegram ${method}: ${data.description}`);
  return data.result as T;
}

type Button = { text: string; callback_data: string };
type Keyboard = Button[][];

function send(chatId: number, text: string, keyboard?: Keyboard) {
  return telegram<{ message_id: number }>("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...(keyboard ? { reply_markup: { inline_keyboard: keyboard } } : {}),
  });
}

/** Edits the message a button was on; falls back to a new message. */
async function edit(
  chatId: number,
  messageId: number,
  text: string,
  keyboard?: Keyboard,
) {
  try {
    await telegram("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
      reply_markup: { inline_keyboard: keyboard ?? [] },
    });
  } catch (err) {
    if (String(err).includes("message is not modified")) return;
    await send(chatId, text, keyboard);
  }
}

async function downloadFile(fileId: string): Promise<Buffer> {
  const file = await telegram<{ file_path?: string }>("getFile", { file_id: fileId });
  if (!file.file_path) throw new Error("Telegram returned no file path.");
  const res = await fetch(
    `https://api.telegram.org/file/bot${hifzBotToken()}/${file.file_path}`,
  );
  if (!res.ok) throw new Error(`Telegram file download failed (${res.status}).`);
  return Buffer.from(await res.arrayBuffer());
}

// -------------------- Update types (only what we use) --------------------

type TgUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
};

type TgFile = { file_id: string; file_size?: number; mime_type?: string };

type TgMessage = {
  message_id: number;
  from?: TgUser;
  chat: { id: number; type: string };
  text?: string;
  media_group_id?: string;
  /** Sizes of one photo, smallest first. */
  photo?: TgFile[];
  video?: TgFile;
  /** Photos/videos sent "as a file" arrive as documents. */
  document?: TgFile;
};

type IncomingMedia = { fileId: string; size: number; mimeType: string };

function mediaOf(msg: TgMessage): IncomingMedia | null {
  const largest = msg.photo?.[msg.photo.length - 1];
  if (largest) {
    return { fileId: largest.file_id, size: largest.file_size ?? 0, mimeType: "image/jpeg" };
  }
  if (msg.video) {
    return {
      fileId: msg.video.file_id,
      size: msg.video.file_size ?? 0,
      mimeType: msg.video.mime_type || "video/mp4",
    };
  }
  const doc = msg.document;
  if (doc?.mime_type && /^(image|video)\//.test(doc.mime_type)) {
    return { fileId: doc.file_id, size: doc.file_size ?? 0, mimeType: doc.mime_type };
  }
  return null;
}

export type TgUpdate = {
  update_id: number;
  message?: TgMessage;
  callback_query?: {
    id: string;
    from: TgUser;
    message?: TgMessage;
    data?: string;
  };
};

// -------------------- Screens --------------------

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function fullName(s: { firstName: string; lastName: string }): string {
  return `${s.firstName} ${s.lastName}`.trim();
}

type Screen = { text: string; keyboard: Keyboard };

// -------------------- Session days --------------------
// Everything is recorded against the Dawra's session date, not the date the
// teacher happens to open the bot: a Tuesday halaqa filled in on Wednesday
// is still Tuesday's. Callbacks carry the day as a compact YYYYMMDD suffix.

const MAX_PAST_DAYS = 120;

/** The latest day on or before `today` the Dawra meets (today if unknown). */
function lastSessionDay(weekdays: number[], today: string): string {
  if (weekdays.length === 0) return today;
  for (let i = 0; i < 7; i++) {
    const day = addDays(today, -i);
    if (weekdays.includes(weekdayOf(day))) return day;
  }
  return today;
}

/** The last `count` session days, newest first (plain days if no weekdays set). */
function recentSessionDays(weekdays: number[], today: string, count: number): string[] {
  const days: string[] = [];
  for (let i = 0; days.length < count && i < MAX_PAST_DAYS; i++) {
    const day = addDays(today, -i);
    if (weekdays.length === 0 || weekdays.includes(weekdayOf(day))) days.push(day);
  }
  return days;
}

function cb(kind: string, id: string, day: string): string {
  return `${kind}:${id}:${day.replace(/-/g, "")}`;
}

function parseCallback(data: string): { kind: string; id: string; day: string | null } {
  const [kind = "", id = "", compact = ""] = data.split(":");
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(compact);
  return { kind, id, day: m ? `${m[1]}-${m[2]}-${m[3]}` : null };
}

function dayLabel(day: string, today: string): string {
  if (day === today) return `${shortDay(day)} (today)`;
  return shortDay(day);
}

// -------------------- Screens --------------------

async function dawraMenu(): Promise<Screen> {
  const today = todayISO();
  const weekday = weekdayOf(today);
  // Dawrat that meet today come first.
  const dawrat = (await listDawrat()).sort(
    (a, b) =>
      Number(b.weekdays.includes(weekday)) - Number(a.weekdays.includes(weekday)),
  );
  if (dawrat.length === 0) {
    return {
      text: "There are no active dawrat yet. Create one in the admin panel first.",
      keyboard: [],
    };
  }
  return {
    text: `🕌 <b>QAF</b> · ${shortDay(today)}\n\nWhich dawra / halaqa?`,
    keyboard: dawrat.map((d) => [
      {
        text: `${d.weekdays.includes(weekday) ? "📅 " : ""}${d.name}${
          d.weekdays.length ? ` · ${weekdaysLabel(d.weekdays)}` : ""
        } (${d.studentCount})`,
        callback_data: `d:${d.id}`,
      },
    ]),
  };
}

/** Everything a Dawra screen needs about one session day. */
async function loadDawraDay(dawraId: string, dayArg: string | null) {
  const today = todayISO();
  const [dawrat, students, hifz] = await Promise.all([
    listDawrat(),
    listDawraStudents(dawraId),
    listHifzForDawra(dawraId),
  ]);
  const dawra = dawrat.find((d) => d.id === dawraId) ?? null;
  const day = dayArg ?? lastSessionDay(dawra?.weekdays ?? [], today);
  const [reports, media, note] = await Promise.all([
    listReportsForDay(dawraId, day),
    listPhotosForDay(dawraId, day),
    getDawraNote(dawraId, day),
  ]);

  const hifzOnDay = new Set(
    hifz.filter((r) => r.day === day).map((r) => r.studentId),
  );
  // Latest tasmee3 up to and including the session day (newest first).
  const latest = new Map<string, HifzRecord>();
  for (const r of hifz) {
    if (r.day <= day && !latest.has(r.studentId)) latest.set(r.studentId, r);
  }
  const attendance = new Map(reports.map((r) => [r.studentId, r.absent]));
  const present = students.filter((s) => attendance.get(s.id) === false);
  const absent = students.filter((s) => attendance.get(s.id) === true);
  const unmarked = students.filter((s) => !attendance.has(s.id));
  const sharedMedia = media.filter((p) => p.studentId === null).length;
  const mediaBy = new Map<string, number>();
  for (const p of media) {
    if (p.studentId) mediaBy.set(p.studentId, (mediaBy.get(p.studentId) ?? 0) + 1);
  }
  return {
    today,
    day,
    dawra,
    students,
    latest,
    hifzOnDay,
    attendance,
    present,
    absent,
    unmarked,
    sharedMedia,
    mediaBy,
    note,
  };
}

function joinLines(lines: (string | undefined)[]): string {
  return lines
    .filter((l) => l !== undefined)
    .join("\n")
    .trim();
}

function studentButtons(
  students: DawraStudent[],
  label: (s: DawraStudent) => string,
  kind: string,
  day: string,
): Keyboard {
  const buttons: Button[] = students.map((s) => ({
    text: label(s),
    callback_data: cb(kind, s.id, day),
  }));
  const keyboard: Keyboard = [];
  for (let i = 0; i < buttons.length; i += 2) keyboard.push(buttons.slice(i, i + 2));
  return keyboard;
}

/** After picking a Dawra: what to record for a session day. */
async function modeMenu(
  dawraId: string,
  dayArg: string | null,
  header?: string,
): Promise<Screen> {
  const d = await loadDawraDay(dawraId, dayArg);
  if (!d.dawra) return dawraMenu();
  const total = d.students.length;
  const marked = total - d.unmarked.length;
  const studentMedia = [...d.mediaBy.values()].reduce((a, b) => a + b, 0);
  const mediaLine =
    d.sharedMedia || studentMedia
      ? `${d.sharedMedia} for everyone, ${studentMedia} for students`
      : "none yet";
  return {
    text: joinLines([
      header,
      `<b>${esc(d.dawra.name)}</b>`,
      `📅 Session: <b>${dayLabel(d.day, d.today)}</b>`,
      "",
      `📋 Attendance: ${marked}/${total} marked` +
        (marked ? ` (${d.present.length} present, ${d.absent.length} absent)` : ""),
      `📖 Hifz: ${d.hifzOnDay.size}/${total} recorded`,
      `📸 Media: ${mediaLine}`,
      `📝 General update: ${d.note ? "added" : "none yet"}`,
      "",
      "What do you want to record?",
    ]),
    keyboard: [
      [
        { text: "📋 Attendance", callback_data: cb("a", dawraId, d.day) },
        { text: "📖 Hifz", callback_data: cb("h", dawraId, d.day) },
      ],
      [
        { text: "📸 Media", callback_data: cb("M", dawraId, d.day) },
        { text: "📝 General update", callback_data: cb("n", dawraId, d.day) },
      ],
      [{ text: "📅 Change date", callback_data: cb("c", dawraId, d.day) }],
      [{ text: "⬅️ All dawrat", callback_data: "m" }],
    ],
  };
}

/** Pick an earlier session date (e.g. to catch up on a missed day). */
async function datePicker(dawraId: string, current: string | null): Promise<Screen> {
  const today = todayISO();
  const dawra = (await listDawrat()).find((d) => d.id === dawraId);
  if (!dawra) return dawraMenu();
  const days = recentSessionDays(dawra.weekdays, today, 6);
  const buttons: Button[] = days.map((day) => ({
    text: `${day === current ? "• " : ""}${dayLabel(day, today)}`,
    callback_data: cb("d", dawraId, day),
  }));
  const keyboard: Keyboard = [];
  for (let i = 0; i < buttons.length; i += 2) keyboard.push(buttons.slice(i, i + 2));
  keyboard.push([
    {
      text: "⬅️ Back",
      callback_data: current ? cb("d", dawraId, current) : `d:${dawraId}`,
    },
  ]);
  return {
    text: `<b>${esc(dawra.name)}</b>\n\nWhich session do you want to record?`,
    keyboard,
  };
}

async function attendanceList(
  dawraId: string,
  dayArg: string | null,
  header?: string,
): Promise<Screen> {
  const d = await loadDawraDay(dawraId, dayArg);
  if (!d.dawra) return dawraMenu();
  const mark = (s: DawraStudent) =>
    d.attendance.get(s.id) === undefined ? "▫️" : d.attendance.get(s.id) ? "❌" : "✅";

  const text = joinLines([
    header,
    `📋 <b>${esc(d.dawra.name)}</b> · ${dayLabel(d.day, d.today)}`,
    `${d.present.length} present · ${d.absent.length} absent · ${d.unmarked.length} not marked`,
    "",
    d.students.length
      ? d.students.map((s) => `${mark(s)} ${esc(fullName(s))}`).join("\n")
      : "No students in this dawra yet.",
    "",
    d.students.length ? "Tap a student to mark them:" : "",
  ]);

  const keyboard = studentButtons(d.students, (s) => `${mark(s)} ${fullName(s)}`, "t", d.day);
  if (d.unmarked.length) {
    const allLabel =
      d.unmarked.length === d.students.length
        ? "✅ All attended"
        : `✅ Rest attended (${d.unmarked.length})`;
    keyboard.push([{ text: allLabel, callback_data: cb("A", dawraId, d.day) }]);
  }
  keyboard.push([{ text: "⬅️ Back", callback_data: cb("d", dawraId, d.day) }]);
  return { text, keyboard };
}

async function attendancePrompt(studentId: string, day: string): Promise<Screen | null> {
  const student = await getDawraStudent(studentId);
  if (!student) return null;
  const report = await getReport(studentId, day);
  const current = !report ? "not marked yet" : report.absent ? "❌ absent" : "✅ attended";
  return {
    text: `📋 <b>${esc(fullName(student))}</b> · ${dayLabel(day, todayISO())}\nCurrently: ${current}`,
    keyboard: [
      [
        { text: "✅ Attended", callback_data: cb("p", studentId, day) },
        { text: "❌ Absent", callback_data: cb("b", studentId, day) },
      ],
      [{ text: "⬅️ Back", callback_data: cb("a", student.dawraId, day) }],
    ],
  };
}

async function markAttendance(
  studentId: string,
  day: string,
  absent: boolean,
): Promise<Screen | null> {
  const student = await getDawraStudent(studentId);
  if (!student) return null;
  await setAttendance([studentId], day, absent);
  return attendanceList(
    student.dawraId,
    day,
    `${absent ? "❌" : "✅"} ${esc(fullName(student))}: ${absent ? "absent" : "attended"}\n`,
  );
}

async function markRestAttended(dawraId: string, day: string): Promise<Screen> {
  const d = await loadDawraDay(dawraId, day);
  await setAttendance(d.unmarked.map((s) => s.id), d.day, false);
  return attendanceList(
    dawraId,
    d.day,
    d.unmarked.length ? `✅ Marked ${d.unmarked.length} as attended\n` : undefined,
  );
}

async function hifzList(
  dawraId: string,
  dayArg: string | null,
  header?: string,
): Promise<Screen> {
  const d = await loadDawraDay(dawraId, dayArg);
  if (!d.dawra) return dawraMenu();
  const mark = (s: DawraStudent) =>
    d.hifzOnDay.has(s.id) ? "✅" : d.attendance.get(s.id) ? "❌" : "▫️";

  const lines = d.students.map((s) => {
    const last = d.latest.get(s.id);
    const detail = last
      ? `${esc(last.text)} <i>(${shortDay(last.day)})</i>`
      : "<i>nothing yet</i>";
    const absent = d.attendance.get(s.id) ? " <i>· absent</i>" : "";
    return `${mark(s)} <b>${esc(fullName(s))}</b> — ${detail}${absent}`;
  });

  const text = joinLines([
    header,
    `📖 <b>${esc(d.dawra.name)}</b> · ${dayLabel(d.day, d.today)} · ${d.hifzOnDay.size}/${d.students.length} done`,
    "",
    d.students.length ? lines.join("\n") : "No students in this dawra yet.",
    "",
    d.students.length ? "Tap a student to record their tasmee3:" : "",
  ]);

  const keyboard = studentButtons(
    d.students,
    (s) => `${d.hifzOnDay.has(s.id) ? "✅ " : ""}${fullName(s)}`,
    "s",
    d.day,
  );
  keyboard.push([{ text: "⬅️ Back", callback_data: cb("d", dawraId, d.day) }]);
  return { text, keyboard };
}

async function entryPrompt(studentId: string, day: string): Promise<Screen | null> {
  const student = await getDawraStudent(studentId);
  if (!student) return null;
  const records = await listHifzForStudent(studentId);
  const onDay = records.filter((r) => r.day === day);
  const last = records.find((r) => r.day < day);

  const lines = [`📖 <b>${esc(fullName(student))}</b> · ${dayLabel(day, todayISO())}`];
  lines.push(
    last
      ? `Last tasmee3: ${esc(last.text)} <i>(${shortDay(last.day)})</i>`
      : "No tasmee3 recorded before.",
  );
  if (onDay.length) {
    lines.push(`Already this session: ${onDay.map((r) => esc(r.text)).join(", ")}`);
  }
  lines.push(
    "",
    `✍️ Type what ${esc(student.firstName)} recited, e.g. <i>Al-Insan 1-4</i>`,
  );
  return {
    text: lines.join("\n"),
    keyboard: [[{ text: "⬅️ Back", callback_data: cb("x", student.dawraId, day) }]],
  };
}

/** Who the next photos/videos are for. */
async function mediaMenu(
  dawraId: string,
  dayArg: string | null,
  header?: string,
): Promise<Screen> {
  const d = await loadDawraDay(dawraId, dayArg);
  if (!d.dawra) return dawraMenu();
  const count = (s: DawraStudent) => d.mediaBy.get(s.id) ?? 0;
  const withMedia = d.students.filter((s) => count(s) > 0);
  const text = joinLines([
    header,
    `📸 <b>${esc(d.dawra.name)}</b> · ${dayLabel(d.day, d.today)}`,
    `👥 Everyone who attended: ${d.sharedMedia}`,
    ...withMedia.map((s) => `${esc(fullName(s))}: ${count(s)}`),
    "",
    "Who are the photos or videos for?",
  ]);
  const keyboard: Keyboard = [
    [
      {
        text: `👥 Everyone who attended${d.sharedMedia ? ` (${d.sharedMedia})` : ""}`,
        callback_data: cb("e", dawraId, d.day),
      },
    ],
    ...studentButtons(
      d.students,
      (s) => `${fullName(s)}${count(s) ? ` (${count(s)})` : ""}`,
      "f",
      d.day,
    ),
    [{ text: "⬅️ Back", callback_data: cb("d", dawraId, d.day) }],
  ];
  return { text, keyboard };
}

function mediaTarget(student: DawraStudent | null): string {
  return student ? esc(fullName(student)) : "everyone who attended";
}

function mediaDoneButton(dawraId: string, day: string): Keyboard {
  return [[{ text: "✅ Done", callback_data: cb("M", dawraId, day) }]];
}

/** Waits for photos/videos for one student (or everyone when null). */
async function startMedia(
  teacher: HifzTeacher,
  dawraId: string,
  studentId: string | null,
  day: string,
): Promise<Screen | null> {
  const student = studentId ? await getDawraStudent(studentId) : null;
  if (studentId && !student) return null;
  const realDawraId = student?.dawraId ?? dawraId;
  await setPending(teacher.telegramId, {
    action: "media",
    dawraId: realDawraId,
    studentId,
    day,
    saved: 0,
    statusMessageId: null,
    group: null,
  });
  return {
    text: joinLines([
      `📸 Send photos or videos for <b>${mediaTarget(student)}</b> · ${dayLabel(day, todayISO())}`,
      "",
      "You can send several at once (up to 20 MB each). Tap Done when finished.",
    ]),
    keyboard: mediaDoneButton(realDawraId, day),
  };
}

async function saveMedia(
  teacher: HifzTeacher,
  chatId: number,
  msg: TgMessage,
  media: IncomingMedia,
  pending: Extract<HifzPending, { action: "media" }>,
): Promise<void> {
  if (media.size > MAX_MEDIA_BYTES) {
    await send(
      chatId,
      "⚠️ That file is over 20 MB, which Telegram doesn't let bots download. " +
        "Please send a shorter or compressed video.",
      mediaDoneButton(pending.dawraId, pending.day),
    );
    return;
  }
  const data = await downloadFile(media.fileId);
  await addDawraPhoto(
    { dawraId: pending.dawraId, studentId: pending.studentId, day: pending.day },
    { data, mimeType: media.mimeType },
  );

  const student = pending.studentId ? await getDawraStudent(pending.studentId) : null;
  const saved = pending.saved + 1;
  const status =
    `✅ ${saved} saved for <b>${mediaTarget(student)}</b> · ${dayLabel(pending.day, todayISO())}\n` +
    "Send more, or tap Done.";
  const keyboard = mediaDoneButton(pending.dawraId, pending.day);
  // One status message per album, edited as its items arrive.
  const sameAlbum =
    pending.statusMessageId !== null &&
    msg.media_group_id !== undefined &&
    msg.media_group_id === pending.group;
  let statusMessageId = pending.statusMessageId;
  if (sameAlbum && statusMessageId !== null) {
    await edit(chatId, statusMessageId, status, keyboard);
  } else {
    statusMessageId = (await send(chatId, status, keyboard)).message_id;
  }
  await setPending(teacher.telegramId, {
    ...pending,
    saved,
    statusMessageId,
    group: msg.media_group_id ?? null,
  });
}

/** Shows the day's general update and waits for a new one. */
async function startNote(
  teacher: HifzTeacher,
  dawraId: string,
  day: string,
): Promise<Screen> {
  const d = await loadDawraDay(dawraId, day);
  if (!d.dawra) return dawraMenu();
  await setPending(teacher.telegramId, { action: "note", dawraId, day: d.day });
  const keyboard: Keyboard = [];
  if (d.note) {
    keyboard.push([{ text: "🗑 Remove update", callback_data: cb("r", dawraId, d.day) }]);
  }
  keyboard.push([{ text: "⬅️ Back", callback_data: cb("d", dawraId, d.day) }]);
  return {
    text: joinLines([
      `📝 <b>General update</b> · ${esc(d.dawra.name)} · ${dayLabel(d.day, d.today)}`,
      "",
      d.note ? `Current update:\n<i>${esc(d.note.text)}</i>` : "No update for this session yet.",
      "",
      "✍️ Type the update for parents of everyone who attended." +
        (d.note ? " A new message replaces the current one." : ""),
    ]),
    keyboard,
  };
}

// -------------------- Handlers --------------------

function displayName(u: TgUser): string {
  return [u.first_name, u.last_name].filter(Boolean).join(" ");
}

function notApprovedText(teacher: HifzTeacher): string {
  return (
    `Assalamu alaikum ${esc(teacher.name)}!\n\n` +
    "You're not approved to use this bot yet. Ask the QAF admin to approve " +
    `<b>${esc(teacher.name)}</b> in the admin panel (Dawrat → Hifz bot).`
  );
}

export async function handleHifzUpdate(update: TgUpdate): Promise<void> {
  const from = update.message?.from ?? update.callback_query?.from;
  const chat = update.message?.chat ?? update.callback_query?.message?.chat;
  if (!from || !chat || chat.type !== "private") return;

  const teacher = await touchHifzTeacher({
    telegramId: String(from.id),
    name: displayName(from),
    username: from.username ?? null,
  });

  if (update.callback_query) {
    const cq = update.callback_query;
    if (!teacher.approved) {
      await telegram("answerCallbackQuery", {
        callback_query_id: cq.id,
        text: "You're not approved yet. Ask the admin.",
        show_alert: true,
      });
      return;
    }
    await telegram("answerCallbackQuery", { callback_query_id: cq.id });
    if (cq.message) await handleButton(teacher, cq.message, cq.data ?? "");
    return;
  }

  const msg = update.message!;
  if (!teacher.approved) {
    await send(chat.id, notApprovedText(teacher));
    return;
  }
  const text = msg.text?.trim() ?? "";
  const pending = text.startsWith("/") ? null : teacher.pending;
  const media = mediaOf(msg);

  if (media && pending?.action === "media") {
    await saveMedia(teacher, chat.id, msg, media, pending);
  } else if (text && pending?.action === "hifz") {
    await saveEntry(teacher, chat.id, pending.studentId, pending.day, text);
  } else if (text && pending?.action === "note") {
    await setPending(teacher.telegramId, null);
    await setDawraNote(pending.dawraId, pending.day, text.slice(0, MAX_NOTE));
    const screen = await modeMenu(pending.dawraId, pending.day, "✅ General update saved\n");
    await send(chat.id, screen.text, screen.keyboard);
  } else if (pending?.action === "media") {
    await send(
      chat.id,
      "Send photos or videos, or tap Done.",
      mediaDoneButton(pending.dawraId, pending.day),
    );
  } else {
    // /start, or a message we weren't waiting for: show the menu.
    if (teacher.pending) await setPending(teacher.telegramId, null);
    const menu = await dawraMenu();
    const hint = media
      ? "To share photos or videos, pick a halaqa and tap 📸 Media first.\n\n"
      : "";
    await send(chat.id, hint + menu.text, menu.keyboard);
  }
}

async function handleButton(
  teacher: HifzTeacher,
  message: TgMessage,
  data: string,
): Promise<void> {
  const chatId = message.chat.id;
  const { kind, id, day } = parseCallback(data);
  let screen: Screen | null = null;

  // Buttons that start waiting for a message (hifz, media, update) set new
  // pending state; any other button cancels what we were waiting for.
  if (!["s", "e", "f", "n"].includes(kind) && teacher.pending) {
    await setPending(teacher.telegramId, null);
  }

  if (!id) {
    // "m" or anything unknown falls through to the Dawra menu.
  } else if (kind === "d") {
    screen = await modeMenu(id, day);
  } else if (kind === "c") {
    screen = await datePicker(id, day);
  } else if (kind === "a") {
    screen = await attendanceList(id, day);
  } else if (kind === "h" || kind === "x") {
    screen = await hifzList(id, day);
  } else if (kind === "u") {
    screen = await undo(id);
  } else if (kind === "M") {
    screen = await mediaMenu(id, day);
  } else if (day) {
    // Student-level buttons always carry their session day.
    if (kind === "t") {
      screen = await attendancePrompt(id, day);
    } else if (kind === "p" || kind === "b") {
      screen = await markAttendance(id, day, kind === "b");
    } else if (kind === "A") {
      screen = await markRestAttended(id, day);
    } else if (kind === "s") {
      screen = await entryPrompt(id, day);
      if (screen) await setPending(teacher.telegramId, { action: "hifz", studentId: id, day });
    } else if (kind === "e") {
      screen = await startMedia(teacher, id, null, day);
    } else if (kind === "f") {
      screen = await startMedia(teacher, "", id, day);
    } else if (kind === "n") {
      screen = await startNote(teacher, id, day);
    } else if (kind === "r") {
      await setDawraNote(id, day, "");
      screen = await modeMenu(id, day, "🗑 General update removed\n");
    }
  }

  screen ??= await dawraMenu();
  await edit(chatId, message.message_id, screen.text, screen.keyboard);
}

async function saveEntry(
  teacher: HifzTeacher,
  chatId: number,
  studentId: string,
  day: string,
  text: string,
): Promise<void> {
  const student = await getDawraStudent(studentId);
  await setPending(teacher.telegramId, null);
  if (!student) {
    const menu = await dawraMenu();
    await send(chatId, `That student no longer exists.\n\n${menu.text}`, menu.keyboard);
    return;
  }
  const record = await addHifzRecord({
    studentId,
    day,
    text: text.slice(0, MAX_TEXT),
    recordedBy: teacher.name,
  });
  const list = await hifzList(
    student.dawraId,
    day,
    `✅ Saved for <b>${esc(fullName(student))}</b>: ${esc(record.text)}\n`,
  );
  await send(chatId, list.text, [
    [{ text: `↩️ Undo ${student.firstName}`, callback_data: `u:${record.id}` }],
    ...list.keyboard,
  ]);
}

async function undo(recordId: string): Promise<Screen | null> {
  const record = await getHifzRecord(recordId);
  if (!record) return null;
  const student = await getDawraStudent(record.studentId);
  await deleteHifzRecord(recordId);
  if (!student) return null;
  return hifzList(
    student.dawraId,
    record.day,
    `↩️ Removed for <b>${esc(fullName(student))}</b>: ${esc(record.text)}\n`,
  );
}

// -------------------- Admin: webhook setup --------------------

export type HifzBotStatus =
  | { configured: false }
  | {
      configured: true;
      username: string | null;
      webhookUrl: string;
      pendingUpdates: number;
      lastError: string | null;
      /** Registered before the current settings; click Reconnect. */
      outdated: boolean;
    };

export async function getHifzBotStatus(): Promise<HifzBotStatus> {
  if (!hifzBotToken()) return { configured: false };
  try {
    const [me, info] = await Promise.all([
      telegram<{ username?: string }>("getMe"),
      telegram<{
        url: string;
        pending_update_count: number;
        last_error_message?: string;
        max_connections?: number;
      }>("getWebhookInfo"),
    ]);
    return {
      configured: true,
      username: me.username ?? null,
      webhookUrl: info.url,
      pendingUpdates: info.pending_update_count,
      lastError: info.last_error_message ?? null,
      outdated: Boolean(info.url) && info.max_connections !== 1,
    };
  } catch (err) {
    return {
      configured: true,
      username: null,
      webhookUrl: "",
      pendingUpdates: 0,
      lastError: String(err instanceof Error ? err.message : err),
      outdated: false,
    };
  }
}

/** Points the bot at this site's webhook and sets its command menu. */
export async function connectHifzWebhook(origin: string): Promise<void> {
  const token = hifzBotToken();
  if (!token) throw new Error("HIFZ_BOT_TOKEN is not set.");
  await telegram("setWebhook", {
    url: `${origin}/api/telegram/hifz`,
    secret_token: hifzWebhookSecret(token),
    allowed_updates: ["message", "callback_query"],
    // One update at a time: album photos arrive as separate updates and
    // share the teacher's pending state.
    max_connections: 1,
  });
  await telegram("setMyCommands", {
    commands: [{ command: "start", description: "Record today's tasmee3" }],
  });
}
