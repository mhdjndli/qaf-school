/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { getParentStudent } from "@/lib/dawrat-auth";
import {
  getDawra,
  listPhotosVisibleToStudent,
  listReportsForStudent,
  type DawraStudent,
} from "@/lib/dawrat";
import { longDay } from "@/lib/format";
import { parentLoginAction, parentLogoutAction } from "./actions";
import PhotoGallery from "./PhotoGallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dawrat · Parent updates",
  description: "Daily reports and pictures for QAF School Dawrat.",
  robots: { index: false, follow: false },
};

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
    <section className="bg-cream min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
            Dawrat
          </h1>
          <p className="text-text-light mt-2">
            Sign in to see your child&apos;s daily report and pictures.
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
  const [dawra, reports, photos] = await Promise.all([
    getDawra(student.dawraId),
    listReportsForStudent(student.id),
    listPhotosVisibleToStudent(student),
  ]);

  const reportBy = new Map(reports.map((r) => [r.day, r]));
  const photosBy = new Map<string, string[]>();
  for (const p of photos) {
    photosBy.set(p.day, [...(photosBy.get(p.day) ?? []), p.id]);
  }
  const days = [...new Set([...reportBy.keys(), ...photosBy.keys()])].sort(
    (a, b) => b.localeCompare(a),
  );

  return (
    <section className="bg-cream min-h-[70vh] px-4 sm:px-6 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
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
              {student.firstName}&apos;s daily updates
            </h1>
            {dawra ? (
              <p className="text-text-light text-sm mt-0.5">{dawra.name}</p>
            ) : null}
          </div>
          <form action={parentLogoutAction}>
            <button
              type="submit"
              className="text-sm text-text-light hover:text-orange-dark hover:underline"
            >
              Sign out
            </button>
          </form>
        </header>

        {days.length === 0 ? (
          <div className="bg-white border border-border rounded-xl p-8 text-center text-text-light">
            No updates yet. Check back after the first day of the Dawra,
            in sha&apos; Allah.
          </div>
        ) : (
          <ol className="space-y-5">
            {days.map((day) => {
              const report = reportBy.get(day);
              const dayPhotos = photosBy.get(day) ?? [];
              return (
                <li
                  key={day}
                  className="bg-white border border-border rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="px-5 py-3 border-b border-border flex items-center justify-between gap-3 bg-warm-white">
                    <h2 className="font-semibold text-text">{longDay(day)}</h2>
                    {report?.absent ? (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red/10 text-red">
                        Absent
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green/10 text-green">
                        Present
                      </span>
                    )}
                  </div>
                  <div className="px-5 py-4">
                    {report?.absent ? (
                      <p className="text-text-light">
                        Your child was absent today.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {report?.report ? (
                          <p className="text-text whitespace-pre-wrap leading-relaxed">
                            {report.report}
                          </p>
                        ) : null}
                        {dayPhotos.length ? (
                          <PhotoGallery ids={dayPhotos} />
                        ) : null}
                        {!report?.report && !dayPhotos.length ? (
                          <p className="text-text-light italic">
                            No written report for this day.
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}
