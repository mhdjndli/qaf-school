"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  addInquiry,
  addStudentDocument,
  addTemplate,
  deleteInquiry,
  deleteStudentDocument,
  deleteTemplate,
  setEnrolled,
  setEnrolmentDetails,
  setPaidSupply,
  setWaitlisted,
  updateTemplate,
  type EnrolmentType,
  type InquirySource,
  type StudentDocumentKind,
} from "@/lib/store";

const VALID_SOURCES: readonly InquirySource[] = [
  "Google Search",
  "Word of Mouth",
  "Instagram",
  "Other",
];

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

function revalidateAll() {
  revalidatePath("/admin/inquiry");
  revalidatePath("/admin/waitlist");
  revalidatePath("/admin/enrolled");
  revalidatePath("/admin/enrolled/[id]", "page");
}

function parseEnrolmentType(raw: FormDataEntryValue | null): EnrolmentType | null {
  const v = String(raw ?? "");
  return v === "full_time" || v === "part_time" ? v : null;
}

/** "1,250.50" / "$1250" / "" -> cents or null */
function parseDollarsToCents(raw: FormDataEntryValue | null): number | null {
  const cleaned = String(raw ?? "").replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
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
  else if (status === "enrolled") {
    await setEnrolled(inquiry.id, true);
    await setEnrolmentDetails(inquiry.id, {
      enrolmentType: parseEnrolmentType(formData.get("enrolmentType")),
      monthlyFeeCents: parseDollarsToCents(formData.get("monthlyFee")),
    });
  }
  revalidateAll();
}

export async function updateEnrolmentDetailsAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await setEnrolmentDetails(id, {
    enrolmentType: parseEnrolmentType(formData.get("enrolmentType")),
    monthlyFeeCents: parseDollarsToCents(formData.get("monthlyFee")),
  });
  revalidateAll();
}

const VALID_DOC_KINDS: readonly StudentDocumentKind[] = [
  "handbook",
  "invoice",
  "payment",
];

export async function uploadStudentDocumentAction(
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();
  const inquiryId = String(formData.get("inquiryId") ?? "");
  const kindRaw = String(formData.get("kind") ?? "");
  const kind = VALID_DOC_KINDS.includes(kindRaw as StudentDocumentKind)
    ? (kindRaw as StudentDocumentKind)
    : null;
  const file = formData.get("file");
  if (!inquiryId || !kind) return { error: "Missing student or document type." };
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose a file to upload." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "File is too large (max 15 MB)." };
  }
  const labelRaw = String(formData.get("label") ?? "").trim();
  const label =
    labelRaw ||
    (kind === "handbook"
      ? "Signed parent handbook"
      : kind === "invoice"
        ? "Invoice"
        : "Payment");
  const docDateRaw = String(formData.get("docDate") ?? "").trim();
  const data = Buffer.from(await file.arrayBuffer());
  await addStudentDocument(
    {
      inquiryId,
      kind,
      label,
      amountCents:
        kind === "handbook" ? null : parseDollarsToCents(formData.get("amount")),
      docDate: docDateRaw || null,
      filename: file.name || "document",
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
    },
    data,
  );
  revalidateAll();
  return {};
}

export async function deleteStudentDocumentAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteStudentDocument(id);
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
