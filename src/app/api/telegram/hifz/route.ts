import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  handleHifzUpdate,
  hifzBotToken,
  hifzWebhookSecret,
  type TgUpdate,
} from "@/lib/hifz-bot";

export async function POST(req: NextRequest) {
  const token = hifzBotToken();
  if (!token) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const given = Buffer.from(
    req.headers.get("x-telegram-bot-api-secret-token") ?? "",
  );
  const expected = Buffer.from(hifzWebhookSecret(token));
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  // Always answer 200 once authenticated: Telegram retries failed updates,
  // and one bad message shouldn't block every later one.
  try {
    await handleHifzUpdate((await req.json()) as TgUpdate);
  } catch (err) {
    console.error("hifz-bot update error:", err);
  }
  return NextResponse.json({ ok: true });
}
