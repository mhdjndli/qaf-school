import { listInquiries } from "@/lib/store";
import { removeFromWaitlistAction } from "../actions";
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

export default async function AdminWaitlistPage() {
  const all = await listInquiries();
  const waitlisted = all
    .filter((i) => i.waitlistedAt)
    .sort((a, b) =>
      (b.waitlistedAt ?? "").localeCompare(a.waitlistedAt ?? ""),
    );

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-text">Waitlist</h1>
        <p className="text-text-light text-sm mt-1">
          {waitlisted.length} on the waitlist. Families here were promoted from
          the inquiries list.
        </p>
      </header>

      {waitlisted.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-text-light">
          No one on the waitlist yet. Promote an inquiry from the{" "}
          <a
            href="/admin/inquiry"
            className="text-orange-dark font-medium hover:underline"
          >
            Inquiries
          </a>{" "}
          list.
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-border text-text-light">
                <tr>
                  <Th>Added</Th>
                  <Th>Parent</Th>
                  <Th>Child</Th>
                  <Th>Start</Th>
                  <Th>Contact</Th>
                  <Th className="text-right pr-6">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {waitlisted.map((inq) => (
                  <tr
                    key={inq.id}
                    className="border-b border-border last:border-0 hover:bg-orange/[0.03]"
                  >
                    <Td>
                      {inq.waitlistedAt ? shortDate(inq.waitlistedAt) : "\u2014"}
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
                    <Td className="text-right pr-6">
                      <div className="flex justify-end items-center gap-3">
                        <InquiryDetails inquiry={inq} />
                        <form action={removeFromWaitlistAction}>
                          <input type="hidden" name="id" value={inq.id} />
                          <button
                            type="submit"
                            className="text-sm text-red hover:underline"
                          >
                            Remove
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
