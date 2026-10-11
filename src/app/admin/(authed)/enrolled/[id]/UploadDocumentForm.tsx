"use client";

import { useRef, useState, useTransition } from "react";
import { uploadStudentDocumentAction } from "../../actions";

type Mode = "handbook" | "finance";

const inputCls =
  "w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all";

export default function UploadDocumentForm({
  inquiryId,
  mode,
}: {
  inquiryId: string;
  mode: Mode;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await uploadStudentDocumentAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-3">
      <input type="hidden" name="inquiryId" value={inquiryId} />
      {mode === "handbook" ? (
        <input type="hidden" name="kind" value="handbook" />
      ) : null}

      {mode === "finance" ? (
        <div className="grid sm:grid-cols-[150px_1fr] gap-3">
          <Field label="Type *">
            <select name="kind" defaultValue="invoice" className={inputCls}>
              <option value="invoice">Invoice</option>
              <option value="payment">Payment / receipt</option>
            </select>
          </Field>
          <Field label="Description">
            <input
              name="label"
              type="text"
              placeholder="e.g. September 2026 tuition"
              className={inputCls}
            />
          </Field>
        </div>
      ) : (
        <Field label="Note (optional)">
          <input
            name="label"
            type="text"
            placeholder="e.g. Signed 2026–27 handbook"
            className={inputCls}
          />
        </Field>
      )}

      <div
        className={`grid gap-3 ${
          mode === "finance" ? "sm:grid-cols-3" : "sm:grid-cols-2"
        }`}
      >
        {mode === "finance" ? (
          <Field label="Amount (CAD)">
            <input
              name="amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              className={inputCls}
            />
          </Field>
        ) : null}
        <Field label={mode === "finance" ? "Date" : "Date signed"}>
          <input name="docDate" type="date" className={inputCls} />
        </Field>
        <Field label="File *">
          <input
            name="file"
            type="file"
            required
            accept=".pdf,.png,.jpg,.jpeg,.heic,.webp,.doc,.docx,image/*,application/pdf"
            className="w-full text-sm text-text-light file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-orange/10 file:text-orange-dark file:text-sm file:font-semibold hover:file:bg-orange/20 file:cursor-pointer"
          />
        </Field>
      </div>

      {error ? <p className="text-sm text-red">{error}</p> : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="text-sm bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
          {pending
            ? "Uploading…"
            : mode === "handbook"
              ? "Upload signed handbook"
              : "Upload document"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-text mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
