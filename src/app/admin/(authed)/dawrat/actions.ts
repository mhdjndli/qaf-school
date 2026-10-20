"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import {
  addDawra,
  addDawraPhoto,
  addDawraStudent,
  deleteDawra,
  deleteDawraPhoto,
  deleteDawraStudent,
  getDawraStudent,
  regenerateAccessCode,
  updateDawra,
  updateDawraStudent,
  upsertReport,
  type DawraStudentInput,
  type ImageUpload,
} from "@/lib/dawrat";

const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

function revalidateDawrat() {
  revalidatePath("/admin/dawrat");
  revalidatePath("/admin/dawrat/[id]", "page");
  revalidatePath("/dawrat");
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalDay(formData: FormData, key: string): string | null {
  const v = str(formData, key);
  return DAY_RE.test(v) ? v : null;
}

/** Reads an optional image from the form; returns an error string if invalid. */
async function readImage(
  formData: FormData,
  key: string,
): Promise<ImageUpload | null | string> {
  const file = formData.get(key);
  if (!(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/")) return "Only image files can be uploaded.";
  if (file.size > MAX_IMAGE_BYTES) return "Image is too large (max 15 MB).";
  return { data: Buffer.from(await file.arrayBuffer()), mimeType: file.type };
}

// -------------------- Dawrat --------------------

export async function createDawraAction(formData: FormData) {
  await requireAdmin();
  const name = str(formData, "name");
  if (!name) return;
  const dawra = await addDawra({
    name,
    startDate: optionalDay(formData, "startDate"),
    endDate: optionalDay(formData, "endDate"),
  });
  revalidateDawrat();
  redirect(`/admin/dawrat/${dawra.id}`);
}

export async function updateDawraAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const name = str(formData, "name");
  if (!id || !name) return;
  await updateDawra(id, {
    name,
    startDate: optionalDay(formData, "startDate"),
    endDate: optionalDay(formData, "endDate"),
  });
  revalidateDawrat();
}

export async function deleteDawraAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await deleteDawra(id);
  revalidateDawrat();
  redirect("/admin/dawrat");
}

// -------------------- Students --------------------

function parseStudent(formData: FormData): DawraStudentInput | null {
  const firstName = str(formData, "firstName");
  if (!firstName) return null;
  return {
    firstName,
    lastName: str(formData, "lastName"),
    dob: optionalDay(formData, "dob"),
  };
}

export async function saveDawraStudentAction(
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();
  const dawraId = str(formData, "dawraId");
  const studentId = str(formData, "studentId");
  const input = parseStudent(formData);
  if (!dawraId || !input) return { error: "First name is required." };
  const photo = await readImage(formData, "photo");
  if (typeof photo === "string") return { error: photo };
  if (studentId) await updateDawraStudent(studentId, input, photo);
  else await addDawraStudent(dawraId, input, photo);
  revalidateDawrat();
  return {};
}

export async function regenerateCodeAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await regenerateAccessCode(id);
  revalidateDawrat();
}

export async function deleteDawraStudentAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await deleteDawraStudent(id);
  revalidateDawrat();
}

// -------------------- Daily reports & photos --------------------

export async function saveReportAction(
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();
  const studentId = str(formData, "studentId");
  const day = optionalDay(formData, "day");
  if (!studentId || !day) return { error: "Missing student or date." };
  const absent = str(formData, "attendance") === "absent";
  const report = str(formData, "report");
  await upsertReport(studentId, day, {
    absent,
    report: absent || !report ? null : report,
  });
  revalidateDawrat();
  return {};
}

/**
 * Uploads one photo for a day. With `shared` set it goes to every student in
 * the Dawra (except those marked absent); otherwise only to `studentId`.
 */
export async function uploadDawraPhotoAction(
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();
  const dawraId = str(formData, "dawraId");
  const day = optionalDay(formData, "day");
  const shared = str(formData, "shared") === "1";
  const studentId = shared ? null : str(formData, "studentId") || null;
  if (!dawraId || !day) return { error: "Missing Dawra or date." };
  if (studentId) {
    const student = await getDawraStudent(studentId);
    if (student?.dawraId !== dawraId) return { error: "Unknown student." };
  } else if (!shared) {
    return { error: "Missing student." };
  }
  const image = await readImage(formData, "photo");
  if (typeof image === "string") return { error: image };
  if (!image) return { error: "Please choose a picture." };
  await addDawraPhoto({ dawraId, studentId, day }, image);
  revalidateDawrat();
  return {};
}

export async function deleteDawraPhotoAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await deleteDawraPhoto(id);
  revalidateDawrat();
}
