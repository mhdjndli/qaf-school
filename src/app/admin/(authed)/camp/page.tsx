import { listCampEnrolments } from "@/lib/store";

export const dynamic = "force-dynamic";

function shortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function money(cents: number, currency: string): string {
  return `$${(cents / 100).toLocaleString()} ${currency}`;
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">
      {children}
    </th>
  );
}

export default async function AdminCampPage() {
  const enrolments = await listCampEnrolments();
  const monthly = enrolments.filter((e) => e.plan === "monthly").length;
  const annual = enrolments.filter((e) => e.plan === "annual").length;

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-text">
          Sunday Camp
        </h1>
        <p className="text-text-light text-sm mt-1">
          {enrolments.length} paid enrolment{enrolments.length === 1 ? "" : "s"}
          {enrolments.length > 0 && ` · ${monthly} monthly · ${annual} full year`}
          . Recorded automatically from Stripe checkout.
        </p>
      </header>

      {enrolments.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-text-light">
          No camp payments yet. When a family completes Stripe checkout on the{" "}
          <a
            href="/sunday-camp"
            className="text-orange-dark font-medium hover:underline"
          >
            Sunday Camp page
          </a>
          , they will appear here.
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-border text-text-light">
                <tr>
                  <Th>Paid</Th>
                  <Th>Parent</Th>
                  <Th>Child</Th>
                  <Th>Plan</Th>
                  <Th>Amount</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {enrolments.map((e) => (
                  <tr key={e.id} className="hover:bg-cream/40">
                    <td className="px-4 py-3 whitespace-nowrap text-text-light">
                      {shortDate(e.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-medium text-text whitespace-nowrap">
                      {e.parentName}
                    </td>
                    <td className="px-4 py-3 text-text-light">
                      {e.childName ?? "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                          e.plan === "annual"
                            ? "bg-green/10 text-green"
                            : "bg-orange/10 text-orange-dark"
                        }`}
                      >
                        {e.plan === "annual" ? "Full year" : "Monthly"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-text">
                      {money(e.amountCents, e.currency)}
                    </td>
                    <td className="px-4 py-3 text-text-light">
                      <a
                        href={`mailto:${e.email}`}
                        className="hover:text-orange-dark hover:underline"
                      >
                        {e.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-text-light whitespace-nowrap">
                      {e.phone ?? "—"}
                    </td>
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
