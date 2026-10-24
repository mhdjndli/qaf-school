import Link from "next/link";
import { listDawrat } from "@/lib/dawrat";
import { weekdaysLabel } from "@/lib/format";
import { createDawraAction } from "./actions";
import HifzBotPanel from "./HifzBotPanel";
import WeekdayPicker from "./WeekdayPicker";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all";

export default async function DawratPage() {
  const dawrat = await listDawrat();

  return (
    <div className="max-w-5xl">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-text">Dawrat</h1>
        <p className="text-text-light text-sm mt-1">
          Short courses with daily attendance, reports and photos. Parents sign
          in at{" "}
          <a
            href="/dawrat"
            target="_blank"
            rel="noopener"
            className="text-orange-dark hover:underline font-medium"
          >
            qafschool.com/dawrat
          </a>{" "}
          with their child&apos;s first name and password.
        </p>
      </header>

      <section className="bg-white border border-border rounded-xl shadow-sm mb-8">
        <div className="bg-cream border-b border-border px-5 py-3 rounded-t-xl">
          <h2 className="font-heading text-lg font-bold text-text">
            Create a Dawra
          </h2>
        </div>
        <form
          action={createDawraAction}
          className="px-5 py-5 grid sm:grid-cols-[1fr_auto] gap-3 items-end"
        >
          <label className="block sm:col-span-2">
            <span className="block text-xs font-semibold text-text mb-1">
              Name *
            </span>
            <input
              name="name"
              required
              placeholder="e.g. Winter Quran Dawra 2026"
              className={inputCls}
            />
          </label>
          <fieldset>
            <legend className="block text-xs font-semibold text-text mb-1">
              Meets on
            </legend>
            <WeekdayPicker />
          </fieldset>
          <button
            type="submit"
            className="text-sm bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors"
          >
            Create Dawra
          </button>
        </form>
      </section>

      {dawrat.length === 0 ? (
        <p className="text-text-light text-sm">No Dawrat yet.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-4">
          {dawrat.map((d) => (
            <li key={d.id}>
              <Link
                href={`/admin/dawrat/${d.id}`}
                className="block bg-white border border-border rounded-xl shadow-sm px-5 py-4 hover:border-orange transition-colors"
              >
                <div className="font-heading text-lg font-bold text-text">
                  {d.name}
                </div>
                <div className="text-sm text-text-light mt-1">
                  {d.weekdays.length ? `${weekdaysLabel(d.weekdays)} · ` : ""}
                  {d.studentCount} student{d.studentCount === 1 ? "" : "s"}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <HifzBotPanel />
      </div>
    </div>
  );
}
