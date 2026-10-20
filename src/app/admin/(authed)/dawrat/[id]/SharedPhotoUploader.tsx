"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { uploadPhotos } from "./upload-photos";

/** Uploads pictures that every non-absent student in the Dawra sees for the day. */
export default function SharedPhotoUploader({
  dawraId,
  day,
}: {
  dawraId: string;
  day: string;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function upload() {
    const files = Array.from(fileRef.current?.files ?? []);
    if (!files.length) {
      setError("Choose one or more pictures first.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const err = await uploadPhotos(
        files,
        { dawraId, day, studentId: null, shared: true },
        (done, total) => setStatus(`Uploading ${done}/${total}…`),
      );
      if (err) setError(err);
      if (fileRef.current) fileRef.current.value = "";
      setStatus(null);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="flex-1 min-w-0 text-sm text-text-light file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-orange/10 file:text-orange-dark file:text-sm file:font-semibold hover:file:bg-orange/20 file:cursor-pointer"
      />
      <button
        type="button"
        onClick={upload}
        disabled={pending}
        className="text-sm bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors disabled:opacity-60 disabled:cursor-wait"
      >
        {pending ? status ?? "Uploading…" : "Upload for everyone"}
      </button>
      {error ? <p className="text-sm text-red w-full">{error}</p> : null}
    </div>
  );
}
