import crypto from "crypto";
import { getDawraStudent, listDawrat, listDawraStudents } from "./dawrat";
import { shortDay, todayISO, weekdayOf, weekdaysLabel } from "./format";
import {
  addHifzRecord,
  deleteHifzRecord,
  getHifzRecord,
  latestHifzByStudent,
  listHifzForDawra,
  listHifzForStudent,
  setPendingStudent,
  touchHifzTeacher,
  type HifzTeacher,
} from "./hifz";

// The Hifz Telegram bot. Telegram POSTs every update to
// /api/telegram/hifz; approved teachers pick a Dawra, tap a student and
// type what the child recited ("Al-Insan 1-4"), which is saved for today.
//
// Callback data (max 64 bytes): "m" menu, "d:<dawraId>" student list,
// "s:<studentId>" start entry, "x:<dawraId>" cancel entry, "u:<recordId>" undo.

const MAX_TEXT = 200;

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
  return telegram("sendMessage", {
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

// -------------------- Update types (only what we use) --------------------

type TgUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
};

type TgMessage = {
  message_id: number;
  from?: TgUser;
  chat: { id: number; type: string };
  text?: string;
};

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

function when(day: string, today: string): string {
  return day === today ? "today" : shortDay(day);
}

type Screen = { text: string; keyboard: Keyboard };

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
    text: `📖 <b>Hifz</b> · ${shortDay(today)}\n\nWhich dawra / halaqa?`,
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

async function studentList(dawraId: string, header?: string): Promise<Screen> {
  const today = todayISO();
  const [dawrat, students, latest, all] = await Promise.all([
    listDawrat(),
    listDawraStudents(dawraId),
    latestHifzByStudent(dawraId),
    listHifzForDawra(dawraId),
  ]);
  const dawra = dawrat.find((d) => d.id === dawraId);
  if (!dawra) return dawraMenu();

  const doneToday = new Set(
    all.filter((r) => r.day === today).map((r) => r.studentId),
  );
  const lines = students.map((s) => {
    const last = latest.get(s.id);
    const mark = doneToday.has(s.id) ? "✅" : "▫️";
    const detail = last
      ? `${esc(last.text)} <i>(${when(last.day, today)})</i>`
      : "<i>nothing yet</i>";
    return `${mark} <b>${esc(fullName(s))}</b> — ${detail}`;
  });

  const text = [
    header,
    `<b>${esc(dawra.name)}</b> · ${shortDay(today)} · ${doneToday.size}/${students.length} done today`,
    "",
    students.length ? lines.join("\n") : "No students in this dawra yet.",
    "",
    students.length ? "Tap a student to record today's tasmee3:" : "",
  ]
    .filter((l) => l !== undefined)
    .join("\n")
    .trim();

  const buttons: Button[] = students.map((s) => ({
    text: `${doneToday.has(s.id) ? "✅ " : ""}${fullName(s)}`,
    callback_data: `s:${s.id}`,
  }));
  const keyboard: Keyboard = [];
  for (let i = 0; i < buttons.length; i += 2) keyboard.push(buttons.slice(i, i + 2));
  keyboard.push([{ text: "⬅️ All dawrat", callback_data: "m" }]);
  return { text, keyboard };
}

async function entryPrompt(studentId: string): Promise<Screen | null> {
  const student = await getDawraStudent(studentId);
  if (!student) return null;
  const today = todayISO();
  const records = await listHifzForStudent(studentId);
  const todays = records.filter((r) => r.day === today);
  const last = records.find((r) => r.day !== today);

  const lines = [`📖 <b>${esc(fullName(student))}</b>`];
  lines.push(
    last
      ? `Last tasmee3: ${esc(last.text)} <i>(${shortDay(last.day)})</i>`
      : "No tasmee3 recorded before.",
  );
  if (todays.length) {
    lines.push(`Already today: ${todays.map((r) => esc(r.text)).join(", ")}`);
  }
  lines.push(
    "",
    `✍️ Type what ${esc(student.firstName)} recited today, e.g. <i>Al-Insan 1-4</i>`,
  );
  return {
    text: lines.join("\n"),
    keyboard: [[{ text: "⬅️ Back", callback_data: `x:${student.dawraId}` }]],
  };
}

// -------------------- Handlers --------------------

function displayName(u: TgUser): string {
  return [u.first_name, u.last_name].filter(Boolean).join(" ");
}

function notApprovedText(teacher: HifzTeacher): string {
  return (
    `Assalamu alaikum ${esc(teacher.name)}!\n\n` +
    "You're not approved to record hifz yet. Ask the QAF admin to approve " +
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
  if (!text || text.startsWith("/") || !teacher.pendingStudentId) {
    // /start, /menu, or text without a student selected: show the menu.
    if (teacher.pendingStudentId) await setPendingStudent(teacher.telegramId, null);
    const menu = await dawraMenu();
    await send(chat.id, menu.text, menu.keyboard);
    return;
  }
  await saveEntry(teacher, chat.id, teacher.pendingStudentId, text);
}

async function handleButton(
  teacher: HifzTeacher,
  message: TgMessage,
  data: string,
): Promise<void> {
  const chatId = message.chat.id;
  const [kind, id] = [data.slice(0, 1), data.slice(2)];
  let screen: Screen | null = null;

  if (kind === "d" && id) {
    screen = await studentList(id);
  } else if (kind === "s" && id) {
    screen = await entryPrompt(id);
    if (screen) await setPendingStudent(teacher.telegramId, id);
  } else if (kind === "x" && id) {
    await setPendingStudent(teacher.telegramId, null);
    screen = await studentList(id);
  } else if (kind === "u" && id) {
    screen = await undo(id);
  }

  if (!screen) {
    await setPendingStudent(teacher.telegramId, null);
    screen = await dawraMenu();
  }
  await edit(chatId, message.message_id, screen.text, screen.keyboard);
}

async function saveEntry(
  teacher: HifzTeacher,
  chatId: number,
  studentId: string,
  text: string,
): Promise<void> {
  const student = await getDawraStudent(studentId);
  await setPendingStudent(teacher.telegramId, null);
  if (!student) {
    const menu = await dawraMenu();
    await send(chatId, `That student no longer exists.\n\n${menu.text}`, menu.keyboard);
    return;
  }
  const record = await addHifzRecord({
    studentId,
    day: todayISO(),
    text: text.slice(0, MAX_TEXT),
    recordedBy: teacher.name,
  });
  const list = await studentList(
    student.dawraId,
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
  return studentList(
    student.dawraId,
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
      }>("getWebhookInfo"),
    ]);
    return {
      configured: true,
      username: me.username ?? null,
      webhookUrl: info.url,
      pendingUpdates: info.pending_update_count,
      lastError: info.last_error_message ?? null,
    };
  } catch (err) {
    return {
      configured: true,
      username: null,
      webhookUrl: "",
      pendingUpdates: 0,
      lastError: String(err instanceof Error ? err.message : err),
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
  });
  await telegram("setMyCommands", {
    commands: [{ command: "start", description: "Record today's tasmee3" }],
  });
}
