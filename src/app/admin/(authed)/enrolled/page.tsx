import Link from "next/link";
import { listAllStudentDocuments, listInquiries } from "@/lib/store";
import { enrolmentTypeLabel, money, shortDate } from "@/lib/format";
import { togglePaidSupplyAction, unenrolAction } from "../actions";
import ManualInquiryForm from "../ManualInquiryForm";

export const dynamic = "force-dynamic";

export default async function AdminEnrolledPage() {
  const [all, docs] = await Promise.all([
    listInquiries(),
    listAllStudentDocuments(),
  ]);
  const enrolled = all
    .filter((i) => i.enrolledAt)
    .sort((a, b) =>
      (b.enrolledAt ?? "").localeCompare(a.enrolledAt ?? ""),
    );
  const handbookSigned = new Set(
    docs.filter((d) => d.kind === "handbook").map((d) => d.inquiryId),
  );
  const fullTime = enrolled.filter((i) => i.enrolmentType === "full_time").length;
  const partTime = enrolled.filter((i) => i.enrolmentType === "part_time").length;
  const monthlyTotal = enrolled.reduce(
    (sum, i) => sum + (i.monthlyFeeCents ?? 0),
    0,
  );

  return (
    <div>
      <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text">Enrolled</h1>
          <p className="text-text-light text-sm mt-1">
            {enrolled.length} enrolled &middot; {fullTime} full-time &middot;{" "}
            {partTime} part-time &middot; {money(monthlyTotal)} committed per
            month. Click a child to open their file.
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
                  return (
                    <tr
                      key={inq.id}
                      className="border-b border-border last:border-0 hover:bg-orange/[0.03]"
                    >
                      <Td>
                        <Link href={href} className="block">
                          {shortDate(inq.enrolledAt)}
                        </Link>
                      </Td>
                      <Td>
                        <Link href={href} className="block group">
                          <div className="font-medium text-text group-hover:text-orange-dark group-hover:underline">
                            {inq.childFirstName} {inq.childLastName}
                          </div>
                          <div className="text-text-light text-xs">
                            DOB {inq.childDob} &middot; starts{" "}
                            {inq.expectedStartDate}
                          </div>
                        </Link>
                      </Td>
                      <Td>
                        <div className="font-medium text-text">
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
                              className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
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
                            <span className="font-medium text-text whitespace-nowrap">
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
                          <form action={unenrolAction}>
                            <input type="hidden" name="id" value={inq.id} />
                            <button
                              type="submit"
                              className="text-sm text-red hover:underline"
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
