"use client";

import { useState, useTransition } from "react";
import { connectHifzBotAction } from "./actions";

export default function ConnectBotButton({ label }: { label: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const res = await connectHifzBotAction();
            if (res.error) setError(res.error);
          })
        }
        className="text-sm bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors disabled:opacity-60 disabled:cursor-wait"
      >
        {pending ? "Connecting…" : label}
      </button>
      {error ? <p className="text-sm text-red">{error}</p> : null}
    </div>
  );
}
