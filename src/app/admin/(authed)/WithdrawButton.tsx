"use client";

import { useState } from "react";
import { withdrawAction } from "./actions";

/** "Withdraw" link that expands into a date picker (defaults to today) + confirm. */
export default function WithdrawButton({
  id,
  childName,
  today,
  variant = "link",
}: {
  id: string;
  childName: string;
  today: string;
  variant?: "link" | "button";
}) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === "button"
            ? "text-sm border border-red/40 text-red px-3 py-1.5 rounded-md font-semibold hover:bg-red/5 transition-colors whitespace-nowrap"
            : "text-sm text-red hover:underline whitespace-nowrap"
        }
      >
        Withdraw
      </button>
    );
  }

  return (
    <form
      action={withdrawAction}
      className="inline-flex items-center gap-2 flex-wrap justify-end"
      onSubmit={(e) => {
        if (!confirm(`Mark ${childName} as withdrawn? They will no longer count toward monthly payments.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <label className="text-xs text-text-light whitespace-nowrap">
        Withdrew on
        <input
          type="date"
          name="withdrawnOn"
          defaultValue={today}
          max={today}
          required
          className="ml-1.5 px-2 py-1 text-sm border border-border rounded-md text-text focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
      </label>
      <button
        type="submit"
        className="text-sm bg-red text-white px-3 py-1 rounded-md font-semibold hover:bg-red-dark transition-colors"
      >
        Confirm
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-sm text-text-light hover:underline"
      >
        Cancel
      </button>
    </form>
  );
}
