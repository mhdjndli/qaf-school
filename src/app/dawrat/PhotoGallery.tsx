"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";

/** Grid of a day's pictures; tapping one opens a full-screen viewer. */
export default function PhotoGallery({ ids }: { ids: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const src = (id: string) => `/api/dawrat/photos/${id}`;

  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + ids.length) % ids.length)),
    [ids.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <>
      <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {ids.map((id, i) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="block w-full aspect-square overflow-hidden rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-orange"
            >
              <img
                src={src(id)}
                alt={`Picture ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </button>
          </li>
        ))}
      </ul>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setOpen(null)}
        >
          <img
            src={src(ids[open])}
            alt={`Picture ${open + 1} of ${ids.length}`}
            className="max-w-[95vw] max-h-[85vh] object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 text-white text-2xl leading-none hover:bg-white/25"
          >
            ×
          </button>
          {ids.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous picture"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 text-white text-2xl hover:bg-white/25"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next picture"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 text-white text-2xl hover:bg-white/25"
              >
                ›
              </button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                {open + 1} / {ids.length}
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
