import { listInquiries } from "@/lib/store";
import {
  addToWaitlistAction,
  deleteInquiryAction,
  enrolAction,
} from "../actions";
import InquiryDetails from "../InquiryDetails";
import ManualInquiryForm from "../ManualInquiryForm";

function shortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminInquiryPage() {
  const inquiries = await listInquiries();

  return (
    <div>
      <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text">
            Inquiries
          </h1>
          <p className="text-text-light text-sm mt-1">
            {inquiries.length} total &middot; review and move strong candidates
            to the waitlist or enrol directly.
          </p>
        </div>
        <ManualInquiryForm status="inquiry" />
      </header>

      {inquiries.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-text-light">
          No inquiries yet.
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-border text-text-light">
                <tr>
                  <Th>Submitted</Th>
                  <Th>Parent</Th>
                  <Th>Child</Th>
                  <Th>Start</Th>
                  <Th>Tour?</Th>
                  <Th>Source</Th>
                  <Th>Status</Th>
                  <Th className="text-right pr-6">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="border-b border-border last:border-0 hover:bg-orange/[0.03]"
                  >
                    <Td>{shortDate(inq.createdAt)}</Td>
                    <Td>
                      <div className="font-medium text-text">
                        {inq.parentFirstName} {inq.parentLastName}
                      </div>
                      <div className="text-text-light text-xs">
                        {inq.email}
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
                    <Td>{inq.wantsTour ? "Yes" : "No"}</Td>
                    <Td>{inq.source}</Td>
                    <Td>
                      {inq.enrolledAt ? (
                        <span className="inline-block bg-green text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Enrolled
                        </span>
                      ) : inq.waitlistedAt ? (
                        <span className="inline-block bg-green/10 text-green text-xs font-semibold px-2.5 py-1 rounded-full">
                          Added to waitlist
                        </span>
                      ) : (
                        <span className="inline-block bg-orange/10 text-orange-dark text-xs font-semibold px-2.5 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </Td>
                    <Td className="text-right pr-6">
                      <div className="flex justify-end items-center gap-3">
                        <InquiryDetails inquiry={inq} />
                        {!inq.waitlistedAt && !inq.enrolledAt ? (
                          <form action={addToWaitlistAction}>
                            <input type="hidden" name="id" value={inq.id} />
                            <button
                              type="submit"
                              className="text-sm bg-orange text-white px-3 py-1.5 rounded-md font-semibold hover:bg-orange-dark transition-colors"
                            >
                              Add to waitlist
                            </button>
                          </form>
                        ) : null}
                        {!inq.enrolledAt ? (
                          <form action={enrolAction}>
                            <input type="hidden" name="id" value={inq.id} />
                            <button
                              type="submit"
                              className="text-sm bg-green text-white px-3 py-1.5 rounded-md font-semibold hover:brightness-95 transition-colors"
                            >
                              Enrol
                            </button>
                          </form>
                        ) : null}
                        <form action={deleteInquiryAction}>
                          <input type="hidden" name="id" value={inq.id} />
                          <button
                            type="submit"
                            className="text-sm text-red hover:underline"
                          >
                            Delete
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
