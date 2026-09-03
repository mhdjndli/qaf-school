"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnrolButton({
  plan,
  label,
  variant,
}: {
  plan: "monthly" | "annual";
  label: string;
  variant: "solid" | "outline";
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const className =
    variant === "solid"
      ? "block w-full text-center bg-orange text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-orange-dark transition-all hover:shadow-lg disabled:opacity-60"
      : "block w-full text-center border-2 border-orange text-orange-dark px-6 py-4 rounded-lg font-semibold text-lg hover:bg-orange hover:text-white transition-all disabled:opacity-60";

  async function startCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/camp-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      router.push("/inquiry");
    } catch {
      router.push("/inquiry");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={startCheckout} disabled={loading} className={className}>
      {loading ? "Opening secure checkout…" : label}
    </button>
  );
}
