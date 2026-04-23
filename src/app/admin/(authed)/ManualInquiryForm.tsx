"use client";

import { useRef, useState } from "react";
import { createManualInquiryAction } from "./actions";

type Status = "inquiry" | "waitlist" | "enrolled";

const BUTTON_LABEL: Record<Status, string> = {
  inquiry: "+ Add inquiry manually",
  waitlist: "+ Add to waitlist manually",
  enrolled: "+ Add enrolled kid manually",
};

const SUBMIT_LABEL: Record<Status, string> = {
  inquiry: "Create inquiry",
  waitlist: "Add to waitlist",
  enrolled: "Add enrolled",
};

const SOURCES = [
  "Google Search",
  "Word of Mouth",
  "Instagram",
  "Other",
] as const;

export default function ManualInquiryForm({ status }: { status: Status }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleCreate(formData: FormData) {
    await createManualInquiryAction(formData);
    formRef.current?.reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors whitespace-nowrap"
      >
        {BUTTON_LABEL[status]}
      </button>
    );
  }

  return (
    <div className="bg-white border border-border rounded-xl shadow-sm p-6 mb-6">
      <form ref={formRef} action={handleCreate} className="space-y-5">
        <input type="hidden" name="status" value={status} />

        <fieldset className="space-y-3">
          <legend className="font-heading text-base font-bold text-orange-dark">
            Parent / Guardian
          </legend>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="First name *">
              <input
                name="parentFirstName"
                type="text"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Last name *">
              <input
                name="parentLastName"
                type="text"
                required
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Email *">
              <input
                name="email"
                type="email"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Phone *">
              <input name="phone" type="tel" required className={inputCls} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="font-heading text-base font-bold text-orange-dark">
            Child
          </legend>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="First name *">
              <input
                name="childFirstName"
                type="text"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Last name *">
              <input
                name="childLastName"
                type="text"
                required
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Date of birth *">
              <input
                name="childDob"
                type="date"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Expected start *">
              <input
                name="expectedStartDate"
                type="text"
                required
                placeholder="e.g. Sept 2026"
                className={inputCls}
              />
            </Field>
          </div>
        </fieldset>

        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Source">
            <select name="source" defaultValue="Other" className={inputCls}>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Wants a tour?">
            <select name="wantsTour" defaultValue="no" className={inputCls}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
        </div>

        <Field label="Notes (optional)">
          <textarea name="notes" rows={3} className={inputCls} />
        </Field>

        <div className="flex justify-end items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              formRef.current?.reset();
              setOpen(false);
            }}
            className="text-sm text-text-light hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-sm bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors"
          >
            {SUBMIT_LABEL[status]}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all";

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
