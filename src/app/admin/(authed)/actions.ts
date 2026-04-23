"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  addInquiry,
  addTemplate,
  deleteInquiry,
  deleteTemplate,
  setEnrolled,
  setPaidSupply,
  setWaitlisted,
  updateTemplate,
  type InquirySource,
} from "@/lib/store";

const VALID_SOURCES: readonly InquirySource[] = [
  "Google Search",
  "Word of Mouth",
  "Instagram",
  "Other",
];

function revalidateAll() {
  revalidatePath("/admin/inquiry");
  revalidatePath("/admin/waitlist");
  revalidatePath("/admin/enrolled");
}

export async function addToWaitlistAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await setWaitlisted(id, true);
  revalidateAll();
}

export async function removeFromWaitlistAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await setWaitlisted(id, false);
  revalidateAll();
}

export async function enrolAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await setEnrolled(id, true);
  revalidateAll();
}

export async function unenrolAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await setEnrolled(id, false);
  revalidateAll();
}

export async function togglePaidSupplyAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const paid = String(formData.get("paid") ?? "") === "true";
  if (id) await setPaidSupply(id, paid);
  revalidateAll();
}

export async function deleteInquiryAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteInquiry(id);
  revalidateAll();
}

export async function createManualInquiryAction(formData: FormData) {
  await requireAdmin();
  const status = String(formData.get("status") ?? "inquiry");
  const sourceRaw = String(formData.get("source") ?? "Other");
  const source: InquirySource = VALID_SOURCES.includes(
    sourceRaw as InquirySource,
  )
    ? (sourceRaw as InquirySource)
    : "Other";
  const notes = String(formData.get("notes") ?? "").trim();
  const inquiry = await addInquiry({
    parentFirstName: String(formData.get("parentFirstName") ?? "").trim(),
    parentLastName: String(formData.get("parentLastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    childFirstName: String(formData.get("childFirstName") ?? "").trim(),
    childLastName: String(formData.get("childLastName") ?? "").trim(),
    childDob: String(formData.get("childDob") ?? "").trim(),
    expectedStartDate: String(formData.get("expectedStartDate") ?? "").trim(),
    wantsTour: String(formData.get("wantsTour") ?? "no") === "yes",
    notes: notes ? notes : null,
    source,
  });
  if (status === "waitlist") await setWaitlisted(inquiry.id, true);
  else if (status === "enrolled") await setEnrolled(inquiry.id, true);
  revalidateAll();
}

export async function createTemplateAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  if (!title) return;
  await addTemplate({ title, body });
  revalidatePath("/admin/templates");
}

export async function updateTemplateAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  if (!id || !title) return;
  await updateTemplate(id, { title, body });
  revalidatePath("/admin/templates");
}

export async function deleteTemplateAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteTemplate(id);
  revalidatePath("/admin/templates");
}
