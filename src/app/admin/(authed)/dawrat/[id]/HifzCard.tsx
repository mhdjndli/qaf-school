import Form from "next/form";
import Link from "next/link";
import type { DawraStudent } from "@/lib/dawrat";
import type { HifzRecord } from "@/lib/hifz";
import { shortDay, todayISO } from "@/lib/format";
import { addHifzRecordAction, deleteHifzRecordAction } from "../actions";
import Avatar from "./Avatar";
import ConfirmButton from "./ConfirmButton";

const inputCls =
  "px-2 py-1.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all";

export type HifzFilters = { student: string; from: string; to: string };

const LOG_LIMIT = 300;

/** Each student's latest tasmee3, plus a filterable log of every entry. */
export default function HifzCard({
  dawraId,
  day,
  students,
  records,
  filters,
}: {
  dawraId: string;
  /** The daily-reports day being viewed, kept when filtering the log. */
  day: string | null;
  students: DawraStudent[];
  /** All records for the Dawra, newest first. */
  records: HifzRecord[];
  filters: HifzFilters;
}) {
  const today = todayISO();
  const nameOf = new Map(
    students.map((s) => [s.id, `${s.firstName} ${s.lastName}`.trim()]),
  );
  const filtered = records.filter(
    (r) =>
      (!filters.student || r.studentId === filters.student) &&
      (!filters.from || r.day >= filters.from) &&
      (!filters.to || r.day <= filters.to),
  );
  const filtering = Boolean(filters.student || filters.from || filters.to);
  const byStudent = new Map<string, HifzRecord[]>();
  for (const r of records) {
    byStudent.set(r.studentId, [...(byStudent.get(r.studentId) ?? []), r]);
  }
  const doneToday = students.filter((s) =>
    byStudent.get(s.id)?.some((r) => r.day === today),
  ).length;

  return (
    <section
      id="hifz"
      className="bg-white border border-border rounded-xl shadow-sm mb-6 scroll-mt-6"
    >
      <div className="bg-cream border-b border-border px-5 py-3 rounded-t-xl">
        <h2 className="font-heading text-lg font-bold text-text">
          Hifz (Quran memorization)
        </h2>
        <p className="text-text-light text-xs mt-0.5">
          {doneToday}/{students.length} recorded today. Teachers record through
          the Hifz Telegram bot; you can also add or fix entries here.
        </p>
      </div>
      <ul className="divide-y divide-border">
        {students.map((s) => {
          const list = byStudent.get(s.id) ?? [];
          const last = list[0];
          const name = `${s.firstName} ${s.lastName}`.trim();
          return (
            <li key={s.id} className="px-5 py-3">
              <div className="flex items-center gap-3 flex-wrap">
                <Avatar studentId={s.id} hasPhoto={s.hasPhoto} name={name} size={32} />
                <div className="font-medium text-text min-w-[8rem]">{name}</div>
                <div className="flex-1 min-w-0 text-sm">
                  {last ? (
                    <>
                      <span className="text-text">{last.text}</span>{" "}
                      <span
                        className={`text-xs ${last.day === today ? "text-green font-semibold" : "text-text-light"}`}
                      >
                        {last.day === today ? "today" : shortDay(last.day)}
                      </span>
                    </>
                  ) : (
                    <span className="text-text-light italic">Nothing recorded yet</span>
                  )}
                </div>
              </div>
              <details className="mt-1 ml-11 text-sm">
                <summary className="cursor-pointer text-xs text-orange-dark hover:underline list-none">
                  Add entry
                </summary>
                <div className="mt-2 space-y-3">
                  <form
                    action={addHifzRecordAction}
                    className="flex items-center gap-2 flex-wrap"
                  >
                    <input type="hidden" name="studentId" value={s.id} />
                    <input
                      type="date"
                      name="day"
                      required
                      defaultValue={today}
                      className={inputCls}
                    />
                    <input
                      name="text"
                      required
                      maxLength={200}
                      placeholder="e.g. Al-Insan 1-4"
                      className={`${inputCls} flex-1 min-w-[10rem]`}
                    />
                    <button
                      type="submit"
                      className="text-sm bg-orange text-white px-3 py-1.5 rounded-md font-semibold hover:bg-orange-dark transition-colors"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </details>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-border px-5 py-5">
        <h3 className="font-heading text-base font-bold text-text mb-3">Log</h3>
        <Form
          action={`/admin/dawrat/${dawraId}`}
          scroll={false}
          className="flex items-end gap-2 flex-wrap mb-4"
        >
          {day ? <input type="hidden" name="day" value={day} /> : null}
          <label className="block">
            <span className="block text-xs font-semibold text-text mb-1">Student</span>
            <select name="student" defaultValue={filters.student} className={inputCls}>
              <option value="">All students</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {nameOf.get(s.id)}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-text mb-1">From</span>
            <input type="date" name="from" defaultValue={filters.from} className={inputCls} />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-text mb-1">To</span>
            <input type="date" name="to" defaultValue={filters.to} className={inputCls} />
          </label>
          <button
            type="submit"
            className="text-sm px-3 py-1.5 rounded-md border border-border text-text hover:border-orange"
          >
            Filter
          </button>
          {filtering ? (
            <Link
              href={`/admin/dawrat/${dawraId}${day ? `?day=${day}` : ""}`}
              scroll={false}
              className="text-sm text-orange-dark hover:underline self-center"
            >
              Clear
            </Link>
          ) : null}
          <span className="text-xs text-text-light self-center ml-auto">
            {filtered.length} entr{filtered.length === 1 ? "y" : "ies"}
          </span>
        </Form>

        {filtered.length === 0 ? (
          <p className="text-sm text-text-light">
            {filtering ? "No entries match these filters." : "No hifz recorded yet."}
          </p>
        ) : (
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-cream text-left text-xs text-text-light">
                <tr>
                  <th className="px-3 py-2 font-semibold">Date</th>
                  <th className="px-3 py-2 font-semibold">Student</th>
                  <th className="px-3 py-2 font-semibold">Tasmee3</th>
                  <th className="px-3 py-2 font-semibold">Recorded by</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.slice(0, LOG_LIMIT).map((r) => (
                  <tr key={r.id}>
                    <td className="px-3 py-2 whitespace-nowrap text-text-light">
                      {shortDay(r.day)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-text">
                      {nameOf.get(r.studentId) ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-text">{r.text}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-text-light">
                      {r.recordedBy ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <ConfirmButton
                        action={deleteHifzRecordAction}
                        fields={{ id: r.id }}
                        message={`Delete "${r.text}" (${shortDay(r.day)}) for ${nameOf.get(r.studentId) ?? "this student"}?`}
                        className="text-xs text-red hover:underline"
                      >
                        Delete
                      </ConfirmButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {filtered.length > LOG_LIMIT ? (
          <p className="text-xs text-text-light mt-2">
            Showing the latest {LOG_LIMIT}. Narrow the dates to see older entries.
          </p>
        ) : null}
      </div>
    </section>
  );
}
