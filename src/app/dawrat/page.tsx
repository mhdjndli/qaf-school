/* eslint-disable @next/next/no-img-element */
import type { Metadata, Viewport } from "next";
import { getParentStudent } from "@/lib/dawrat-auth";
import {
  getDawra,
  isVideo,
  listDawraNotes,
  listPhotosVisibleToStudent,
  listReportsForStudent,
  type DawraStudent,
} from "@/lib/dawrat";
import { listHifzForStudent } from "@/lib/hifz";
import { parentLoginAction, parentLogoutAction } from "./actions";
import PhotoGallery, { type MediaItem } from "./PhotoGallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Weekly updates",
  description: "Attendance, hifz, photos and videos from QAF School.",
  robots: { index: false, follow: false },
  // Lets parents "Add to Home Screen" and open it like an app.
  appleWebApp: { capable: true, title: "QAF", statusBarStyle: "default" },
};

export const viewport: Viewport = { themeColor: "#FFF8F0" };

export default async function DawratParentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const student = await getParentStudent();
  if (!student) {
    const { error } = await searchParams;
    return <LoginForm error={error} />;
  }
  return <Updates student={student} />;
}

function LoginForm({ error }: { error?: string }) {
  const inputCls =
    "w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all";
  return (
    <section className="bg-cream min-h-dvh flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/logo.jpg"
            alt="QAF"
            className="w-20 h-20 rounded-2xl mx-auto mb-5 shadow-sm"
          />
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
            Weekly updates
          </h1>
          <p className="text-text-light mt-2">
            Sign in to see your child&apos;s attendance, hifz, photos and
            updates.
          </p>
        </div>
        <form
          action={parentLoginAction}
          className="bg-white rounded-xl p-6 shadow-sm border border-border space-y-4"
        >
          <label className="block">
            <span className="block text-sm font-semibold text-text mb-1.5">
              Username{" "}
              <span className="font-normal text-text-light">
                (your child&apos;s first name)
              </span>
            </span>
            <input
              name="firstName"
              required
              autoComplete="username"
              autoCapitalize="words"
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-text mb-1.5">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              autoCapitalize="characters"
              className={`${inputCls} tracking-widest`}
            />
          </label>
          {error === "invalid" ? (
            <p className="text-red text-sm">
              That username and password don&apos;t match. Please check the
              password the school sent you.
            </p>
          ) : error === "throttled" ? (
            <p className="text-red text-sm">
              Too many attempts. Please wait 15 minutes and try again.
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full bg-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-dark transition-all"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-xs text-text-light mt-4">
          Don&apos;t have a password? Please contact the school.
        </p>
      </div>
    </section>
  );
}

async function Updates({ student }: { student: DawraStudent }) {
  const [dawra, reports, photos, hifz, notes] = await Promise.all([
    getDawra(student.dawraId),
    listReportsForStudent(student.id),
    listPhotosVisibleToStudent(student),
    listHifzForStudent(student.id),
    listDawraNotes(student.dawraId),
  ]);

  const reportBy = new Map(reports.map((r) => [r.day, r]));
  const photosBy = new Map<string, MediaItem[]>();
  for (const p of photos) {
    const item = { id: p.id, video: isVideo(p) };
    photosBy.set(p.day, [...(photosBy.get(p.day) ?? []), item]);
  }
  // General updates go to everyone who wasn't marked absent that day.
  const noteBy = new Map(
    notes
      .filter((n) => !reportBy.get(n.day)?.absent)
      .map((n) => [n.day, n.text]),
  );
  // Oldest first within a day, so several entries read in recitation order.
  const hifzBy = new Map<string, string[]>();
  for (const h of [...hifz].reverse()) {
    hifzBy.set(h.day, [...(hifzBy.get(h.day) ?? []), h.text]);
  }
  const days = [
    ...new Set([
      ...reportBy.keys(),
      ...photosBy.keys(),
      ...hifzBy.keys(),
      ...noteBy.keys(),
    ]),
  ].sort((a, b) => b.localeCompare(a));

  return (
    <div className="bg-cream min-h-dvh">
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-border pt-[env(safe-area-inset-top)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.jpg" alt="" className="w-8 h-8 rounded-lg" />
            <span className="font-heading text-lg font-bold text-text">QAF</span>
          </div>
          <form action={parentLogoutAction}>
            <button
              type="submit"
              className="text-sm text-text-light hover:text-orange-dark px-2 py-1"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      <section className="px-4 sm:px-6 py-6 md:py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <div className="max-w-3xl mx-auto">
          <header className="flex items-center gap-4 mb-6">
            {student.hasPhoto ? (
              <img
                src={`/api/dawrat/avatars/${student.id}`}
                alt={student.firstName}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow"
              />
            ) : (
              <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange/15 text-orange-dark text-2xl font-bold flex items-center justify-center">
                {student.firstName.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-text">
                {student.firstName}&apos;s weekly updates
              </h1>
              {dawra ? (
                <p className="text-text-light text-sm mt-0.5">{dawra.name}</p>
              ) : null}
            </div>
          </header>

          {days.length === 0 ? (
            <div className="bg-white border border-border rounded-2xl p-8 text-center text-text-light">
              No updates yet. Check back after the first class, in sha&apos;
              Allah.
            </div>
          ) : (
            <ol className="space-y-5">
              {days.map((day) => {
                const report = reportBy.get(day);
                const absent = Boolean(report?.absent);
                const media = photosBy.get(day) ?? [];
                const dayHifz = hifzBy.get(day) ?? [];
                const note = noteBy.get(day);
                const personal = report?.report ?? null;
                const empty =
                  !dayHifz.length && !personal && !note && !media.length;
                const { weekday, date } = dayParts(day);
                return (
                  <li
                    key={day}
                    className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden"
                  >
                    <div className="px-5 py-4 flex items-center justify-between gap-3 bg-warm-white border-b border-border">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
                          {weekday}
                        </div>
                        <h2 className="font-heading text-xl font-bold text-text">
                          {date}
                        </h2>
                      </div>
                      {absent ? (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red/10 text-red">
                          Absent
                        </span>
                      ) : (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green/10 text-green">
                          Present
                        </span>
                      )}
                    </div>

                    {absent ? (
                      <p className="px-5 py-4 text-text-light">
                        {student.firstName} was absent this day.
                      </p>
                    ) : empty ? (
                      <p className="px-5 py-4 text-text-light italic">
                        No details for this day yet.
                      </p>
                    ) : (
                      <div className="divide-y divide-border">
                        {dayHifz.length ? (
                          <DaySection icon="📖" label="Quran memorization">
                            <div className="flex flex-wrap gap-2">
                              {dayHifz.map((text, i) => (
                                <span
                                  key={i}
                                  dir="auto"
                                  className="inline-block text-lg font-semibold text-orange-dark bg-orange/10 rounded-lg px-3 py-1"
                                >
                                  {text}
                                </span>
                              ))}
                            </div>
                          </DaySection>
                        ) : null}
                        {personal ? (
                          <DaySection icon="💬" label={`About ${student.firstName}`}>
                            <p
                              dir="auto"
                              className="text-text whitespace-pre-wrap leading-relaxed text-start"
                            >
                              {personal}
                            </p>
                          </DaySection>
                        ) : null}
                        {note ? (
                          <DaySection icon="📝" label="General update">
                            <p
                              dir="auto"
                              className="text-text whitespace-pre-wrap leading-relaxed text-start"
                            >
                              {note}
                            </p>
                          </DaySection>
                        ) : null}
                        {media.length ? (
                          <DaySection
                            icon="📸"
                            label={`Photos & videos · ${media.length}`}
                          >
                            <PhotoGallery items={media} />
                          </DaySection>
                        ) : null}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </div>
  );
}

/** One labelled part of a day's card (hifz, notes, media). */
function DaySection({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-4">
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-light mb-2">
        <span aria-hidden className="text-base leading-none">
          {icon}
        </span>
        {label}
      </h3>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

/** "Tuesday" and "October 20, 2026" for a YYYY-MM-DD day. */
function dayParts(value: string): { weekday: string; date: string } {
  const [y, m, d] = value.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return {
    weekday: dt.toLocaleDateString("en-CA", { weekday: "long" }),
    date: dt.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}
