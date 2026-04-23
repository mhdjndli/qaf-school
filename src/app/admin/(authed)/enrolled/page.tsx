import { listInquiries } from "@/lib/store";
import { togglePaidSupplyAction, unenrolAction } from "../actions";
import InquiryDetails from "../InquiryDetails";

function shortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminEnrolledPage() {
  const all = await listInquiries();
  const enrolled = all
    .filter((i) => i.enrolledAt)
    .sort((a, b) =>
      (b.enrolledAt ?? "").localeCompare(a.enrolledAt ?? ""),
    );

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-text">Enrolled</h1>
        <p className="text-text-light text-sm mt-1">
          {enrolled.length} enrolled. Mark supplies as paid once received.
        </p>
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
                  <Th>Parent</Th>
                  <Th>Child</Th>
                  <Th>Start</Th>
                  <Th>Contact</Th>
                  <Th>Paid Supply</Th>
                  <Th className="text-right pr-6">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {enrolled.map((inq) => (
                  <tr
                    key={inq.id}
                    className="border-b border-border last:border-0 hover:bg-orange/[0.03]"
                  >
                    <Td>
                      {inq.enrolledAt ? shortDate(inq.enrolledAt) : "\u2014"}
                    </Td>
                    <Td>
                      <div className="font-medium text-text">
                        {inq.parentFirstName} {inq.parentLastName}
                      </div>
                    </Td>
                    <Td>
                      <div className="font-medium text-text">
                        {inq.childFirstName} {inq.childLastName}
                      </div>
                      <div className="text-text-light text-xs">
                        DOB {inq.childDob}
                      </div>
                    </Td>
                    <Td>{inq.expectedStartDate}</Td>
                    <Td>
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
                            className="inline-block bg-green/10 text-green text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-green/20 transition-colors"
                          >
                            Paid &middot; {shortDate(inq.paidSupplyAt)}
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="text-sm bg-orange text-white px-3 py-1.5 rounded-md font-semibold hover:bg-orange-dark transition-colors"
                          >
                            Mark Paid Supply
                          </button>
                        )}
                      </form>
                    </Td>
                    <Td className="text-right pr-6">
                      <div className="flex justify-end items-center gap-3">
                        <InquiryDetails inquiry={inq} />
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
                ))}
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
      className={`text-left font-semibold text-xs uppercase tracking-wide py-3 px-4 ${className}`}
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
