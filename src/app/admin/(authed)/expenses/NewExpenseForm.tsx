"use client";

import { useRef, useState } from "react";
import { createExpenseAction } from "../actions";
import ExpenseFields from "./ExpenseFields";

export default function NewExpenseForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleCreate(formData: FormData) {
    await createExpenseAction(formData);
    formRef.current?.reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors"
      >
        + Add expense
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={handleCreate}
      className="w-full bg-white border border-border rounded-xl shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4">
        <ExpenseFields />
      </div>
      <div className="flex justify-end items-center gap-3 px-5 py-3 border-t border-border bg-cream">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-text-light hover:underline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-sm bg-orange text-white px-4 py-1.5 rounded-md font-semibold hover:bg-orange-dark transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}
