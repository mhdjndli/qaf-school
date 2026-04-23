"use client";

import { useRef, useState } from "react";
import { createTemplateAction } from "../actions";

export default function NewTemplateForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleCreate(formData: FormData) {
    await createTemplateAction(formData);
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
        + New template
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={handleCreate}
      className="bg-white border border-border rounded-xl shadow-sm overflow-hidden"
    >
      <input
        type="text"
        name="title"
        placeholder="Template title"
        required
        className="w-full font-heading text-lg font-bold text-text bg-cream px-5 py-3 border-b border-border focus:outline-none focus:ring-2 focus:ring-orange/40"
      />
      <textarea
        name="body"
        placeholder="Email body…"
        rows={10}
        className="w-full px-5 py-4 text-sm text-text focus:outline-none focus:ring-2 focus:ring-orange/40"
      />
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
          Create
        </button>
      </div>
    </form>
  );
}
