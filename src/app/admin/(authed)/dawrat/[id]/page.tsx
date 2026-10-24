import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDawra,
  listDawraDays,
  listDawraStudents,
  listPhotosForDay,
  listReportsForDay,
} from "@/lib/dawrat";
import { listHifzForDawra } from "@/lib/hifz";
import {
  addDays,
  ageFrom,
  longDay,
  plainDate,
  todayISO,
  weekdaysLabel,
} from "@/lib/format";
import { deleteDawraAction, updateDawraAction } from "../actions";
import ConfirmButton from "./ConfirmButton";
import DayReportCard from "./DayReportCard";
import HifzCard from "./HifzCard";
import PhotoThumbs from "./PhotoThumbs";
import SharedPhotoUploader from "./SharedPhotoUploader";
import StudentForm from "./StudentForm";
import StudentRow from "./StudentRow";
import WeekdayPicker from "../WeekdayPicker";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all";

export default async function DawraPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ day?: string }>;
}) {
  const { id } = await params;
  const { day: dayParam } = await searchParams;
  const day =
    dayParam && /^\d{4}-\d{2}-\d{2}$/.test(dayParam) ? dayParam : todayISO();

  const dawra = await getDawra(id);
  if (!dawra) notFound();
  const [students, reports, photos, days, hifz] = await Promise.all([
    listDawraStudents(id),
    listReportsForDay(id, day),
    listPhotosForDay(id, day),
    listDawraDays(id),
    listHifzForDawra(id),
  ]);

  const reportBy = new Map(reports.map((r) => [r.studentId, r]));
  const sharedPhotos = photos.filter((p) => p.studentId === null);
  const absentCount = reports.filter((r) => r.absent).length;
  const presentCount = reports.length - absentCount;
  const dayHref = (d: string) => `/admin/dawrat/${id}?day=${d}#day`;

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin/dawrat"
        className="text-sm text-text-light hover:text-orange-dark"
      >
        &larr; All Dawrat
      </Link>

      <header className="mt-3 mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text">
            {dawra.name}
          </h1>
          <p className="text-sm text-text-light mt-1">
            {dawra.weekdays.length ? `${weekdaysLabel(dawra.weekdays)} · ` : ""}
            {students.length} student{students.length === 1 ? "" : "s"}
          </p>
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer text-orange-dark font-medium hover:underline list-none">
            Edit Dawra
          </summary>
          <div className="mt-3 bg-white border border-border rounded-xl p-4 shadow-sm w-[min(420px,85vw)] space-y-3">
            <form action={updateDawraAction} className="space-y-3">
              <input type="hidden" name="id" value={dawra.id} />
              <label className="block">
                <span className="block text-xs font-semibold text-text mb-1">Name</span>
                <input name="name" required defaultValue={dawra.name} className={inputCls} />
              </label>
              <fieldset>
                <legend className="block text-xs font-semibold text-text mb-1">Meets on</legend>
                <WeekdayPicker selected={dawra.weekdays} />
              </fieldset>
              <div className="flex justify-between items-center">
                <ConfirmButton
                  action={deleteDawraAction}
                  fields={{ id: dawra.id }}
                  message={`Delete "${dawra.name}" with all its students, reports and pictures? This cannot be undone.`}
                  className="text-sm text-red hover:underline"
                >
                  Delete Dawra
                </ConfirmButton>
                <button
                  type="submit"
                  className="text-sm bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </details>
      </header>

      {/* Students */}
      <Card
        title="Students"
        subtitle="Click “Copy invitation” to copy the link, username and password in one message for the parent."
        className="mb-6"
      >
        {students.length > 0 ? (
          <ul className="divide-y divide-border border border-border rounded-lg mb-5">
            {students.map((s) => (
              <StudentRow
                key={s.id}
                dawraId={dawra.id}
                dawraName={dawra.name}
                student={s}
                age={ageFrom(s.dob)}
                dobLabel={plainDate(s.dob)}
              />
            ))}
          </ul>
        ) : null}
        <h3 className="text-sm font-semibold text-text mb-2">Add a student</h3>
        <StudentForm dawraId={dawra.id} />
      </Card>

      {students.length > 0 ? (
        <HifzCard students={students} records={hifz} />
      ) : null}

      {/* Daily reports */}
      <section id="day" className="scroll-mt-6">
        <Card
          title="Daily reports"
          subtitle={
            reports.length
              ? `${longDay(day)} · ${presentCount} present · ${absentCount} absent`
              : longDay(day)
          }
        >
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <Link
              href={dayHref(addDays(day, -1))}
              className="text-sm px-3 py-1.5 rounded-md border border-border text-text-light hover:border-orange hover:text-orange-dark"
            >
              &larr; Prev
            </Link>
            <form method="get" className="flex items-center gap-2">
              <input
                type="date"
                name="day"
                defaultValue={day}
                className="px-2 py-1.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:border-orange"
              />
              <button
                type="submit"
                className="text-sm px-3 py-1.5 rounded-md border border-border text-text hover:border-orange"
              >
                Go
              </button>
            </form>
            <Link
              href={dayHref(addDays(day, 1))}
              className="text-sm px-3 py-1.5 rounded-md border border-border text-text-light hover:border-orange hover:text-orange-dark"
            >
              Next &rarr;
            </Link>
            {day !== todayISO() ? (
              <Link
                href={dayHref(todayISO())}
                className="text-sm text-orange-dark hover:underline ml-1"
              >
                Today
              </Link>
            ) : null}
          </div>

          {days.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mb-5">
              <span className="text-xs text-text-light mr-1 self-center">
                Recorded days:
              </span>
              {days.slice(0, 30).map((d) => (
                <Link
                  key={d}
                  href={dayHref(d)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    d === day
                      ? "bg-orange text-white"
                      : "bg-cream border border-border text-text-light hover:border-orange"
                  }`}
                >
                  {plainDate(d)}
                </Link>
              ))}
            </div>
          ) : null}

          {students.length === 0 ? (
            <p className="text-sm text-text-light">
              Add students above to start recording attendance and reports.
            </p>
          ) : (
            <>
              <div className="border border-dashed border-orange/40 rounded-lg p-4 mb-5 bg-orange/[0.03]">
                <div className="text-sm font-semibold text-text mb-1">
                  Pictures for everyone today
                </div>
                <p className="text-xs text-text-light mb-3">
                  Shown on every student&apos;s report for this day, except
                  students marked absent.
                </p>
                {sharedPhotos.length ? (
                  <div className="mb-3">
                    <PhotoThumbs ids={sharedPhotos.map((p) => p.id)} />
                  </div>
                ) : null}
                <SharedPhotoUploader dawraId={dawra.id} day={day} />
              </div>

              <div className="space-y-3">
                {students.map((s) => {
                  const report = reportBy.get(s.id) ?? null;
                  const own = photos.filter((p) => p.studentId === s.id);
                  return (
                    <DayReportCard
                      key={`${s.id}-${day}`}
                      dawraId={dawra.id}
                      day={day}
                      student={s}
                      report={report}
                      photos={<PhotoThumbs ids={own.map((p) => p.id)} />}
                    />
                  );
                })}
              </div>
            </>
          )}
        </Card>
      </section>
    </div>
  );
}

function Card({
  title,
  subtitle,
  className = "",
  children,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`bg-white border border-border rounded-xl shadow-sm ${className}`}
    >
      <div className="bg-cream border-b border-border px-5 py-3 rounded-t-xl">
        <h2 className="font-heading text-lg font-bold text-text">{title}</h2>
        {subtitle ? (
          <p className="text-text-light text-xs mt-0.5">{subtitle}</p>
        ) : null}
      </div>
      <div className="px-5 py-5">{children}</div>
    </section>
  );
}
