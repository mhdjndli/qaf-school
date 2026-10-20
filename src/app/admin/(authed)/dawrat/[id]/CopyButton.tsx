"use client";

import { useState } from "react";

export default function CopyButton({
  text,
  label = "Copy",
  className = "text-sm text-orange-dark hover:underline font-medium whitespace-nowrap",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.prompt("Copy this message:", text);
        }
      }}
      className={className}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
