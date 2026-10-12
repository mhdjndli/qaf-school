import Link from "next/link";
import { notFound } from "next/navigation";
import { getInquiry, listStudentDocuments } from "@/lib/store";
import {
  DOC_KIND_LABEL,
  centsToInput,
  enrolmentTypeLabel,
  fileSize,
  money,
  plainDate,
  shortDate,
  todayISO,
} from "@/lib/format";
import {
  enrolAction,
  reinstateAction,
  togglePaidSupplyAction,
  unenrolAction,
  updateEnrolmentDetailsAction,
} from "../../actions";
import UploadDocumentForm from "./UploadDocumentForm";
import DeleteDocumentButton from "./DeleteDocumentButton";
import WithdrawButton from "../../WithdrawButton";

export const dynamic = "force-dynamic";

export default async function EnrolledStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [inq, docs] = await Promise.all([
    getInquiry(id),
    listStudentDocuments(id),
  ]);
  if (!inq) notFound();

  const handbooks = docs.filter((d) => d.kind === "handbook");
  const finance = docs.filter((d) => d.kind !== "handbook");
  const invoiced = finance
    .filter((d) => d.kind === "invoice")
    .reduce((s, d) => s + (d.amountCents ?? 0), 0);
  const paid = finance
    .filter((d) => d.kind === "payment")
    .reduce((s, d) => s + (d.amountCents ?? 0), 0);
  const childName = `${inq.childFirstName} ${inq.childLastName}`;

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin/enrolled"
        className="text-sm text-text-light hover:text-orange-dark"
      >
        &larr; Back to enrolled
      </Link>

      <header className="mt-3 mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text">
            {childName}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            {inq.enrolledAt && inq.withdrawnOn ? (
              <>
                <Badge tone="muted">Enrolled {shortDate(inq.enrolledAt)}</Badge>
                <Badge tone="red">Withdrawn {plainDate(inq.withdrawnOn)}</Badge>
              </>
            ) : inq.enrolledAt ? (
              <Badge tone="green">Enrolled {shortDate(inq.enrolledAt)}</Badge>
            ) : (
              <Badge tone="red">Not currently enrolled</Badge>
            )}
            {inq.enrolmentType ? (
              <Badge tone={inq.enrolmentType === "full_time" ? "green" : "orange"}>
                {enrolmentTypeLabel(inq.enrolmentType)}
              </Badge>
            ) : (
              <Badge tone="muted">Type not set</Badge>
            )}
            {inq.monthlyFeeCents !== null ? (
              <Badge tone={inq.withdrawnOn ? "muted" : "orange"}>
                {money(inq.monthlyFeeCents)} / month
                {inq.withdrawnOn ? " (not counted)" : ""}
              </Badge>
            ) : (
              <Badge tone="muted">Monthly fee not set</Badge>
            )}
            {handbooks.length > 0 ? (
              <Badge tone="green">Handbook signed</Badge>
            ) : (
              <Badge tone="red">Handbook missing</Badge>
            )}
            {inq.paidSupplyAt ? (
              <Badge tone="green">Supply paid {shortDate(inq.paidSupplyAt)}</Badge>
            ) : (
              <Badge tone="muted">Supply fee unpaid</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {inq.enrolledAt && inq.withdrawnOn ? (
            <form action={reinstateAction}>
              <input type="hidden" name="id" value={inq.id} />
              <button
                type="submit"
                className="text-sm bg-green text-white px-3 py-1.5 rounded-md font-semibold hover:brightness-95 transition-colors"
              >
                Reinstate
              </button>
            </form>
          ) : inq.enrolledAt ? (
            <WithdrawButton
              id={inq.id}
              childName={childName}
              today={todayISO()}
              variant="button"
            />
          ) : null}
          {inq.enrolledAt ? (
            <form action={unenrolAction}>
              <input type="hidden" name="id" value={inq.id} />
              <button
                type="submit"
                className="text-sm text-red hover:underline"
              >
                Unenrol
              </button>
            </form>
          ) : (
            <form action={enrolAction}>
              <input type="hidden" name="id" value={inq.id} />
              <button
                type="submit"
                className="text-sm bg-green text-white px-3 py-1.5 rounded-md font-semibold hover:brightness-95 transition-colors"
              >
                Enrol
              </button>
            </form>
          )}
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Family details */}
        <Card title="Family & child">
          <dl className="text-sm space-y-2.5">
            <Row label="Child">{childName}</Row>
            <Row label="Date of birth">{plainDate(inq.childDob)}</Row>
            <Row label="Start">{inq.expectedStartDate}</Row>
            <Row label="Parent">
              {inq.parentFirstName} {inq.parentLastName}
            </Row>
            <Row label="Email">
              <a
                href={`mailto:${inq.email}`}
                className="text-orange-dark hover:underline break-all"
              >
                {inq.email}
              </a>
            </Row>
            <Row label="Phone">
              <a
                href={`tel:${inq.phone}`}
                className="text-orange-dark hover:underline"
              >
                {inq.phone}
              </a>
            </Row>
            <Row label="Inquiry">
              {shortDate(inq.createdAt)} &middot; {inq.source}
              {inq.wantsTour ? " · wanted a tour" : ""}
            </Row>
            <Row label="Notes">
              {inq.notes ? (
                <span className="whitespace-pre-wrap">{inq.notes}</span>
              ) : (
                <span className="text-text-light italic">None</span>
              )}
            </Row>
          </dl>
        </Card>

        {/* Enrolment commitment */}
        <Card title="Enrolment & fees">
          <form action={updateEnrolmentDetailsAction} className="space-y-4">
            <input type="hidden" name="id" value={inq.id} />
            <div>
              <span className="block text-xs font-semibold text-text mb-1.5">
                Enrolment type
              </span>
              <div className="flex flex-wrap gap-2">
                <RadioPill
                  name="enrolmentType"
                  value="full_time"
                  label="Full-time"
                  checked={inq.enrolmentType === "full_time"}
                />
                <RadioPill
                  name="enrolmentType"
                  value="part_time"
                  label="Part-time"
                  checked={inq.enrolmentType === "part_time"}
                />
                <RadioPill
                  name="enrolmentType"
                  value=""
                  label="Not set"
                  checked={inq.enrolmentType === null}
                />
              </div>
            </div>
            <label className="block">
              <span className="block text-xs font-semibold text-text mb-1">
                Monthly payment committed (CAD)
              </span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-sm">
                  $
                </span>
                <input
                  name="monthlyFee"
                  type="text"
                  inputMode="decimal"
                  defaultValue={centsToInput(inq.monthlyFeeCents)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all"
                />
              </div>
            </label>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-sm bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors"
              >
                Save
              </button>
            </div>
          </form>

          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm">
              <div className="font-semibold text-text">Resource / supply fee</div>
              <div className="text-text-light text-xs">
                {inq.paidSupplyAt
                  ? `Paid ${shortDate(inq.paidSupplyAt)}`
                  : "Not yet received"}
              </div>
            </div>
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
                  className="text-sm text-text-light hover:text-red hover:underline"
                >
                  Unmark paid
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
          </div>
        </Card>
      </div>

      {/* Signed parent handbook */}
      <Card
        title="Signed parent handbook"
        subtitle={
          handbooks.length
            ? `${handbooks.length} file${handbooks.length === 1 ? "" : "s"} on record`
            : "No signed handbook uploaded yet"
        }
        className="mb-6"
      >
        {handbooks.length > 0 ? (
          <ul className="divide-y divide-border border border-border rounded-lg mb-5">
            {handbooks.map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm flex-wrap"
              >
                <div className="min-w-0">
                  <div className="font-medium text-text">{d.label}</div>
                  <div className="text-text-light text-xs">
                    {d.docDate ? `Signed ${plainDate(d.docDate)} · ` : ""}
                    {d.filename} &middot; {fileSize(d.sizeBytes)} &middot;{" "}
                    uploaded {shortDate(d.createdAt)}
                  </div>
                </div>
                <FileActions id={d.id} name={d.label} />
              </li>
            ))}
          </ul>
        ) : null}
        <UploadDocumentForm inquiryId={inq.id} mode="handbook" />
      </Card>

      {/* Payments & invoices */}
      <Card
        title="Payments & invoices"
        subtitle={`${money(invoiced)} invoiced · ${money(paid)} paid${
          invoiced > paid ? ` · ${money(invoiced - paid)} outstanding` : ""
        }`}
      >
        {finance.length > 0 ? (
          <div className="overflow-x-auto border border-border rounded-lg mb-5">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-border text-text-light">
                <tr>
                  <Th>Date</Th>
                  <Th>Type</Th>
                  <Th>Description</Th>
                  <Th className="text-right">Amount</Th>
                  <Th>File</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {finance.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-border last:border-0"
                  >
                    <Td className="whitespace-nowrap">
                      {d.docDate ? plainDate(d.docDate) : shortDate(d.createdAt)}
                    </Td>
                    <Td>
                      <span
                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                          d.kind === "payment"
                            ? "bg-green/10 text-green"
                            : "bg-orange/10 text-orange-dark"
                        }`}
                      >
                        {DOC_KIND_LABEL[d.kind]}
                      </span>
                    </Td>
                    <Td className="text-text">{d.label}</Td>
                    <Td className="text-right whitespace-nowrap font-medium text-text">
                      {money(d.amountCents)}
                    </Td>
                    <Td className="text-text-light text-xs">
                      {d.filename} &middot; {fileSize(d.sizeBytes)}
                    </Td>
                    <Td className="text-right">
                      <FileActions id={d.id} name={d.label} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <UploadDocumentForm inquiryId={inq.id} mode="finance" />
      </Card>
    </div>
  );
}

function FileActions({ id, name }: { id: string; name: string }) {
  return (
    <div className="flex items-center justify-end gap-3 whitespace-nowrap">
      <a
        href={`/api/admin/files/${id}`}
        target="_blank"
        rel="noopener"
        className="text-orange-dark hover:underline font-medium text-sm"
      >
        View
      </a>
      <a
        href={`/api/admin/files/${id}?download=1`}
        className="text-orange-dark hover:underline font-medium text-sm"
      >
        Download
      </a>
      <DeleteDocumentButton id={id} name={name} />
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

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3">
      <dt className="text-text-light font-medium">{label}</dt>
      <dd className="text-text">{children}</dd>
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "green" | "orange" | "red" | "muted";
  children: React.ReactNode;
}) {
  const cls = {
    green: "bg-green/10 text-green",
    orange: "bg-orange/10 text-orange-dark",
    red: "bg-red/10 text-red",
    muted: "bg-border/60 text-text-light",
  }[tone];
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}
    >
      {children}
    </span>
  );
}

function RadioPill({
  name,
  value,
  label,
  checked,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={checked}
        className="peer sr-only"
      />
      <span className="inline-block text-sm px-3 py-1.5 rounded-md border border-border text-text-light peer-checked:bg-orange peer-checked:border-orange peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-orange/40 transition-colors">
        {label}
      </span>
    </label>
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
      className={`text-left font-semibold text-xs uppercase tracking-wide py-2.5 px-4 whitespace-nowrap ${className}`}
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
  return <td className={`py-2.5 px-4 align-top ${className}`}>{children}</td>;
}
