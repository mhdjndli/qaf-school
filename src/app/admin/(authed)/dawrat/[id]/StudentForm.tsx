"use client";

import { useRef, useState, useTransition } from "react";
import { compressImage } from "@/lib/compress-image";
import { saveDawraStudentAction } from "../actions";

const inputCls =
  "w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all";

/** Add a student to a Dawra, or edit one when `student` is given. */
export default function StudentForm({
  dawraId,
  student,
  onSaved,
}: {
  dawraId: string;
  student?: { id: string; firstName: string; lastName: string; dob: string | null };
  onSaved?: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const photo = formData.get("photo");
      if (photo instanceof File && photo.size > 0) {
        formData.set("photo", await compressImage(photo, 800));
      }
      const res = await saveDawraStudentAction(formData);
      if (res?.error) {
        setError(res.error);
        return;
      }
      if (!student) formRef.current?.reset();
      onSaved?.();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-3">
      <input type="hidden" name="dawraId" value={dawraId} />
      {student ? <input type="hidden" name="studentId" value={student.id} /> : null}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Field label="First name *">
          <input
            name="firstName"
            required
            defaultValue={student?.firstName}
            className={inputCls}
          />
        </Field>
        <Field label="Last name">
          <input
            name="lastName"
            defaultValue={student?.lastName}
            className={inputCls}
          />
        </Field>
        <Field label="Date of birth">
          <input
            name="dob"
            type="date"
            defaultValue={student?.dob ?? ""}
            className={inputCls}
          />
        </Field>
        <Field label={student ? "Replace picture" : "Picture"}>
          <input
            name="photo"
            type="file"
            accept="image/*"
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
          {pending ? "Saving…" : student ? "Save changes" : "Add student"}
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
      <span className="block text-xs font-semibold text-text mb-1">{label}</span>
      {children}
    </label>
  );
}
