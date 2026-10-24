import type { DawraStudent } from "@/lib/dawrat";
import type { HifzRecord } from "@/lib/hifz";
import { shortDay, todayISO } from "@/lib/format";
import { addHifzRecordAction, deleteHifzRecordAction } from "../actions";
import Avatar from "./Avatar";
import ConfirmButton from "./ConfirmButton";

const inputCls =
  "px-2 py-1.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all";

/** Each student's latest tasmee3 with their full hifz history. */
export default function HifzCard({
  students,
  records,
}: {
  students: DawraStudent[];
  /** All records for the Dawra, newest first. */
  records: HifzRecord[];
}) {
  const today = todayISO();
  const byStudent = new Map<string, HifzRecord[]>();
  for (const r of records) {
    byStudent.set(r.studentId, [...(byStudent.get(r.studentId) ?? []), r]);
  }
  const doneToday = students.filter((s) =>
    byStudent.get(s.id)?.some((r) => r.day === today),
  ).length;

  return (
    <section className="bg-white border border-border rounded-xl shadow-sm mb-6">
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
                  {list.length ? `History (${list.length}) · Add` : "Add"}
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
                  {list.length ? (
                    <ol className="border border-border rounded-lg divide-y divide-border">
                      {list.map((r) => (
                        <li key={r.id} className="px-3 py-2 flex items-center gap-3">
                          <span className="text-xs text-text-light w-24 shrink-0">
                            {shortDay(r.day)}
                          </span>
                          <span className="flex-1 min-w-0 text-text">{r.text}</span>
                          {r.recordedBy ? (
                            <span className="text-xs text-text-light hidden sm:inline">
                              {r.recordedBy}
                            </span>
                          ) : null}
                          <ConfirmButton
                            action={deleteHifzRecordAction}
                            fields={{ id: r.id }}
                            message={`Delete "${r.text}" (${shortDay(r.day)}) for ${s.firstName}?`}
                            className="text-xs text-red hover:underline"
                          >
                            Delete
                          </ConfirmButton>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
