import type {
  EnrolmentType,
  ExpenseCategory,
  StudentDocumentKind,
} from "./store";

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

export const EXPENSE_CATEGORY_LABEL: Record<ExpenseCategory, string> = {
  salary: "Salary",
  rent: "Rent",
  utilities: "Utilities",
  supplies: "Supplies",
  food: "Food",
  insurance: "Insurance",
  other: "Other",
};

export function fileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Today's date as YYYY-MM-DD in Ottawa, for date-input defaults. */
export function todayISO(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Toronto" });
}

/** "4 yrs 7 mo" from a YYYY-MM-DD birth date (as of today in Ottawa). */
export function ageFrom(dob: string | null | undefined): string {
  const m = dob ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob) : null;
  if (!m) return "—";
  const [ty, tm, td] = todayISO().split("-").map(Number);
  let months = (ty - Number(m[1])) * 12 + (tm - Number(m[2]));
  if (td < Number(m[3])) months -= 1;
  if (months < 0) return "—";
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${rem} mo`;
  const y = `${years} yr${years === 1 ? "" : "s"}`;
  return rem ? `${y} ${rem} mo` : y;
}

/** "Monday, Oct 20, 2026" for a YYYY-MM-DD day. */
export function longDay(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return value;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Shifts a YYYY-MM-DD day by n days. */
export function addDays(value: string, n: number): string {
  const [y, mo, d] = value.split("-").map(Number);
  const dt = new Date(Date.UTC(y, mo - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

/** "Thu, Oct 22" for a YYYY-MM-DD day. */
export function shortDay(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return value;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/** Week order for display, Monday first so Sat & Sun sit together. */
export const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "Sat & Sun", "Mon, Wed & Fri" from getDay() numbers; "" when none. */
export function weekdaysLabel(days: number[]): string {
  const names = WEEKDAY_ORDER.filter((d) => days.includes(d)).map(
    (d) => WEEKDAY_SHORT[d],
  );
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

/** Day of the week (0 = Sunday) of a YYYY-MM-DD day. */
export function weekdayOf(value: string): number {
  const [y, mo, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
}
