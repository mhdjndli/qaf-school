import Link from "next/link";
import { listAllStudentDocuments, listInquiries } from "@/lib/store";
import {
  enrolmentTypeLabel,
  money,
  plainDate,
  shortDate,
  todayISO,
} from "@/lib/format";
import {
  reinstateAction,
  togglePaidSupplyAction,
  unenrolAction,
} from "../actions";
import ManualInquiryForm from "../ManualInquiryForm";
import WithdrawButton from "../WithdrawButton";

export const dynamic = "force-dynamic";

export default async function AdminEnrolledPage() {
  const [all, docs] = await Promise.all([
    listInquiries(),
    listAllStudentDocuments(),
  ]);
  const enrolled = all
    .filter((i) => i.enrolledAt)
    .sort((a, b) => {
      // Active kids first, withdrawn at the bottom; newest enrolment first.
      if (!a.withdrawnOn !== !b.withdrawnOn) return a.withdrawnOn ? 1 : -1;
      return (b.enrolledAt ?? "").localeCompare(a.enrolledAt ?? "");
    });
  const active = enrolled.filter((i) => !i.withdrawnOn);
  const withdrawnCount = enrolled.length - active.length;
  const today = todayISO();
  const handbookSigned = new Set(
    docs.filter((d) => d.kind === "handbook").map((d) => d.inquiryId),
  );
  const fullTime = active.filter((i) => i.enrolmentType === "full_time");
  const partTime = active.filter((i) => i.enrolmentType === "part_time");
  const sumFees = (list: typeof active) =>
    list.reduce((sum, i) => sum + (i.monthlyFeeCents ?? 0), 0);
  const monthlyTotal = sumFees(active);
  const missingFee = active.filter((i) => i.monthlyFeeCents === null).length;

  return (
    <div>
      <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text">Enrolled</h1>
          <p className="text-text-light text-sm mt-1">
            {[
              `${active.length} active`,
              `${fullTime.length} full-time`,
              `${partTime.length} part-time`,
              ...(withdrawnCount > 0 ? [`${withdrawnCount} withdrawn`] : []),
            ].join(" · ")}
            . Click a child to open their file.
          </p>
        </div>
        <ManualInquiryForm status="enrolled" />
      </header>

      {enrolled.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-text-light">
          No enrolled families yet. Enrol a family from the{" "}
          <a
            href="/admin/inquiry"
            className="text-orange-dark font-medium hover:underline"
          >
            Inquiries
          </a>{" "}
          or{" "}
          <a
            href="/admin/waitlist"
            className="text-orange-dark font-medium hover:underline"
          >
            Waitlist
          </a>
          .
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-border text-text-light">
                <tr>
                  <Th>Enrolled</Th>
                  <Th>Child</Th>
                  <Th>Parent</Th>
                  <Th>Type</Th>
                  <Th>Monthly</Th>
                  <Th>Handbook</Th>
                  <Th>Paid Supply</Th>
                  <Th className="text-right pr-6">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {enrolled.map((inq) => {
                  const href = `/admin/enrolled/${inq.id}`;
                  const withdrawn = Boolean(inq.withdrawnOn);
                  return (
                    <tr
                      key={inq.id}
                      className={`border-b border-border last:border-0 ${
                        withdrawn
                          ? "bg-border/20 text-text-light"
                          : "hover:bg-orange/[0.03]"
                      }`}
                    >
                      <Td>
                        <Link href={href} className="block whitespace-nowrap">
                          {shortDate(inq.enrolledAt)}
                        </Link>
                        {withdrawn ? (
                          <span className="mt-1 inline-block bg-red/10 text-red text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                            Withdrawn &middot; {plainDate(inq.withdrawnOn)}
                          </span>
                        ) : null}
                      </Td>
                      <Td>
                        <Link href={href} className="block group">
                          <div className="font-medium text-text whitespace-nowrap group-hover:text-orange-dark group-hover:underline">
                            {inq.childFirstName} {inq.childLastName}
                          </div>
                          <div className="text-text-light text-xs whitespace-nowrap">
                            DOB {inq.childDob}
                          </div>
                          <div className="text-text-light text-xs whitespace-nowrap">
                            Starts {inq.expectedStartDate}
                          </div>
                        </Link>
                      </Td>
                      <Td>
                        <div className="font-medium text-text whitespace-nowrap">
                          {inq.parentFirstName} {inq.parentLastName}
                        </div>
                        <div className="text-text-light text-xs">
                          <a
                            href={`mailto:${inq.email}`}
                            className="hover:text-orange-dark"
                          >
                            {inq.email}
                          </a>
                        </div>
                        <div className="text-text-light text-xs">
                          <a
                            href={`tel:${inq.phone}`}
                            className="hover:text-orange-dark"
                          >
                            {inq.phone}
                          </a>
                        </div>
                      </Td>
                      <Td>
                        <Link href={href} className="block">
                          {inq.enrolmentType ? (
                            <span
                              className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                                inq.enrolmentType === "full_time"
                                  ? "bg-green/10 text-green"
                                  : "bg-orange/10 text-orange-dark"
                              }`}
                            >
                              {enrolmentTypeLabel(inq.enrolmentType)}
                            </span>
                          ) : (
                            <span className="text-text-light text-xs italic">
                              Not set
                            </span>
                          )}
                        </Link>
                      </Td>
                      <Td>
                        <Link href={href} className="block">
                          {inq.monthlyFeeCents !== null ? (
                            <span
                              className={`font-medium whitespace-nowrap ${
                                withdrawn ? "line-through text-text-light" : "text-text"
                              }`}
                              title={withdrawn ? "Withdrawn — not counted" : undefined}
                            >
                              {money(inq.monthlyFeeCents)}
                              <span className="text-text-light font-normal text-xs">
                                {" "}
                                /mo
                              </span>
                            </span>
                          ) : (
                            <span className="text-text-light text-xs italic">
                              Not set
                            </span>
                          )}
                        </Link>
                      </Td>
                      <Td>
                        <Link href={href} className="block">
                          {handbookSigned.has(inq.id) ? (
                            <span className="inline-block bg-green/10 text-green text-xs font-semibold px-2.5 py-1 rounded-full">
                              Signed
                            </span>
                          ) : (
                            <span className="inline-block bg-red/10 text-red text-xs font-semibold px-2.5 py-1 rounded-full">
                              Missing
                            </span>
                          )}
                        </Link>
                      </Td>
                      <Td>
                        <form action={togglePaidSupplyAction}>
                          <input type="hidden" name="id" value={inq.id} />
                          <input
                            type="hidden"
                            name="paid"
                            value={inq.paidSupplyAt ? "false" : "true"}
                          />
                          {inq.paidSupplyAt ? (
                            <button
                              type="submit"
                              title={`Paid ${shortDate(inq.paidSupplyAt)} — click to unmark`}
                              className="inline-block bg-green/10 text-green text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-green/20 transition-colors whitespace-nowrap"
                            >
                              Paid &middot; {shortDate(inq.paidSupplyAt)}
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="text-sm bg-orange text-white px-3 py-1.5 rounded-md font-semibold hover:bg-orange-dark transition-colors whitespace-nowrap"
                            >
                              Mark Paid Supply
                            </button>
                          )}
                        </form>
                      </Td>
                      <Td className="text-right pr-6">
                        <div className="flex justify-end items-center gap-3">
                          <Link
                            href={href}
                            className="text-orange-dark hover:underline font-medium text-sm whitespace-nowrap"
                          >
                            Open file
                          </Link>
                          {withdrawn ? (
                            <form action={reinstateAction}>
                              <input type="hidden" name="id" value={inq.id} />
                              <button
                                type="submit"
                                className="text-sm text-green font-medium hover:underline whitespace-nowrap"
                              >
                                Reinstate
                              </button>
                            </form>
                          ) : (
                            <WithdrawButton
                              id={inq.id}
                              childName={`${inq.childFirstName} ${inq.childLastName}`}
                              today={today}
                            />
                          )}
                          <form action={unenrolAction}>
                            <input type="hidden" name="id" value={inq.id} />
                            <button
                              type="submit"
                              className="text-sm text-text-light hover:text-red hover:underline"
                            >
                              Unenrol
                            </button>
                          </form>
                        </div>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {enrolled.length > 0 ? (
        <section className="mt-6 bg-white border border-border rounded-xl shadow-sm p-5 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-light">
              Expected monthly payments
            </div>
            <div className="font-heading text-3xl font-bold text-text mt-1">
              {money(monthlyTotal)}
              <span className="text-base font-normal text-text-light">
                {" "}
                / month
              </span>
            </div>
            <p className="text-xs text-text-light mt-1">
              Sum of {active.length} active{" "}
              {active.length === 1 ? "child" : "children"}
              {withdrawnCount > 0
                ? `. ${withdrawnCount} withdrawn not counted`
                : ""}
              .
            </p>
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 text-sm">
            <div>
              <dt className="text-text-light text-xs">
                Full-time ({fullTime.length})
              </dt>
              <dd className="font-semibold text-text">
                {money(sumFees(fullTime))}
              </dd>
            </div>
            <div>
              <dt className="text-text-light text-xs">
                Part-time ({partTime.length})
              </dt>
              <dd className="font-semibold text-text">
                {money(sumFees(partTime))}
              </dd>
            </div>
            {missingFee > 0 ? (
              <div>
                <dt className="text-text-light text-xs">Fee not set</dt>
                <dd className="font-semibold text-red">
                  {missingFee} {missingFee === 1 ? "child" : "children"}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>
      ) : null}
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`text-left font-semibold text-xs uppercase tracking-wide py-3 px-4 whitespace-nowrap ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`py-3 px-4 align-top ${className}`}>{children}</td>;
}
