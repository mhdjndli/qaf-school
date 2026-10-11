"use client";

import { deleteStudentDocumentAction } from "../../actions";

export default function DeleteDocumentButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <form action={deleteStudentDocumentAction} className="inline">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-red hover:underline"
        onClick={(e) => {
          if (!confirm(`Delete "${name}"? This cannot be undone.`)) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </button>
    </form>
  );
}
