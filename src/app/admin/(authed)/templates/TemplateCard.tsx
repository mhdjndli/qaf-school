"use client";

import { useState } from "react";
import {
  deleteTemplateAction,
  updateTemplateAction,
} from "../actions";
import type { EmailTemplate } from "@/lib/store";

export default function TemplateCard({ template }: { template: EmailTemplate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(template.title);
  const [body, setBody] = useState(template.body);

  async function handleSave(formData: FormData) {
    await updateTemplateAction(formData);
    setEditing(false);
  }

  return (
    <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
      {editing ? (
        <form action={handleSave} className="flex flex-col h-full">
          <input type="hidden" name="id" value={template.id} />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full font-heading text-lg font-bold text-text bg-cream px-5 py-3 border-b border-border focus:outline-none focus:ring-2 focus:ring-orange/40"
          />
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={14}
            className="w-full flex-1 px-5 py-4 text-sm text-text font-mono whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-orange/40"
          />
          <div className="flex justify-end items-center gap-3 px-5 py-3 border-t border-border bg-cream">
            <button
              type="button"
              onClick={() => {
                setTitle(template.title);
                setBody(template.body);
                setEditing(false);
              }}
              className="text-sm text-text-light hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm bg-orange text-white px-4 py-1.5 rounded-md font-semibold hover:bg-orange-dark transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="bg-cream border-b border-border px-5 py-3">
            <h3 className="font-heading text-lg font-bold text-text">
              {template.title}
            </h3>
          </div>
          <div className="px-5 py-4 flex-1">
            <pre className="text-sm text-text whitespace-pre-wrap font-sans">
              {template.body}
            </pre>
          </div>
          <div className="flex justify-end items-center gap-3 px-5 py-3 border-t border-border bg-cream">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm text-orange-dark font-medium hover:underline"
            >
              Edit
            </button>
            <form action={deleteTemplateAction}>
              <input type="hidden" name="id" value={template.id} />
              <button
                type="submit"
                className="text-sm text-red hover:underline"
                onClick={(e) => {
                  if (!confirm(`Delete "${template.title}"?`)) {
                    e.preventDefault();
                  }
                }}
              >
                Delete
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
