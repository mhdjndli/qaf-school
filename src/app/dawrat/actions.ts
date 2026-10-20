"use server";

import { redirect } from "next/navigation";
import { parentSignIn, parentSignOut } from "@/lib/dawrat-auth";

export async function parentLoginAction(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "");
  const password = String(formData.get("password") ?? "");
  const result = await parentSignIn(firstName, password);
  if (result !== "ok") redirect(`/dawrat?error=${result}`);
  redirect("/dawrat");
}

export async function parentLogoutAction() {
  await parentSignOut();
  redirect("/dawrat");
}
