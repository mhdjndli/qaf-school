"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { deleteInquiry, setWaitlisted } from "@/lib/store";

export async function addToWaitlistAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await setWaitlisted(id, true);
  revalidatePath("/admin/inquiry");
  revalidatePath("/admin/waitlist");
}

export async function removeFromWaitlistAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await setWaitlisted(id, false);
  revalidatePath("/admin/inquiry");
  revalidatePath("/admin/waitlist");
}

export async function deleteInquiryAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteInquiry(id);
  revalidatePath("/admin/inquiry");
  revalidatePath("/admin/waitlist");
}
