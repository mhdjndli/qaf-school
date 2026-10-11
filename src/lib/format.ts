import type { EnrolmentType, StudentDocumentKind } from "./store";

export function shortDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Plain YYYY-MM-DD strings should not shift by timezone. */
export function plainDate(value: string | null | undefined): string {
  if (!value) return "—";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return shortDate(value);
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function money(cents: number | null | undefined): string {
  if (cents === null || cents === undefined) return "—";
  return (cents / 100).toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
}

export function centsToInput(cents: number | null | undefined): string {
  if (cents === null || cents === undefined) return "";
  return (cents / 100).toFixed(2);
}

export const ENROLMENT_TYPE_LABEL: Record<EnrolmentType, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
};

export function enrolmentTypeLabel(t: EnrolmentType | null): string {
  return t ? ENROLMENT_TYPE_LABEL[t] : "Not set";
}

export const DOC_KIND_LABEL: Record<StudentDocumentKind, string> = {
  handbook: "Signed handbook",
  invoice: "Invoice",
  payment: "Payment",
};

export function fileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
