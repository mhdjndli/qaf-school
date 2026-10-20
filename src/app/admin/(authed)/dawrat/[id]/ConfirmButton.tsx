"use client";

import { useTransition } from "react";

/**
 * A button that asks for confirmation, then runs a server action with
 * `fields` as form data. Renders no <form>, so it can sit inside other forms.
 */
export default function ConfirmButton({
  action,
  fields,
  message,
  className,
  children,
}: {
  action: (formData: FormData) => Promise<void>;
  fields: Record<string, string>;
  message: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      className={`${className ?? ""} disabled:opacity-50`}
      onClick={() => {
        if (!confirm(message)) return;
        const fd = new FormData();
        for (const [k, v] of Object.entries(fields)) fd.set(k, v);
        startTransition(() => action(fd));
      }}
    >
      {children}
    </button>
  );
}
