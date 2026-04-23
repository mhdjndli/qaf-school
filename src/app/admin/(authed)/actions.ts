"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  deleteInquiry,
  setEnrolled,
  setPaidSupply,
  setWaitlisted,
} from "@/lib/store";

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
