import { listExpenses, listInquiries } from "@/lib/store";
import { EXPENSE_CATEGORY_LABEL, money } from "@/lib/format";
import ExpenseRow from "./ExpenseRow";
import NewExpenseForm from "./NewExpenseForm";

export const dynamic = "force-dynamic";

export default async function AdminExpensesPage() {
  const [expenses, inquiries] = await Promise.all([
    listExpenses(),
    listInquiries(),
  ]);

  const expensesTotal = expenses.reduce(
    (sum, e) => sum + e.monthlyAmountCents,
    0,
  );
  // Same figure as "Expected monthly payments" on the Enrolled page.
  const active = inquiries.filter((i) => i.enrolledAt && !i.withdrawnOn);
  const incomeTotal = active.reduce(
    (sum, i) => sum + (i.monthlyFeeCents ?? 0),
    0,
  );
  const difference = incomeTotal - expensesTotal;

  const byCategory = Object.entries(EXPENSE_CATEGORY_LABEL)
    .map(([key, label]) => ({
      label,
      total: expenses
        .filter((e) => e.category === key)
        .reduce((sum, e) => sum + e.monthlyAmountCents, 0),
    }))
    .filter((c) => c.total > 0);

  return (
    <div>
      <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text">Expenses</h1>
          <p className="text-text-light text-sm mt-1">
            Recurring monthly costs — salaries, rent, utilities and more.
          </p>
        </div>
        <NewExpenseForm />
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Monthly income"
          value={money(incomeTotal)}
          hint={`Tuition from ${active.length} active ${
            active.length === 1 ? "child" : "children"
          }`}
        />
        <SummaryCard
          label="Monthly expenses"
          value={money(expensesTotal)}
          hint={`${expenses.length} ${
            expenses.length === 1 ? "expense" : "expenses"
          }`}
        />
        <SummaryCard
          label={difference >= 0 ? "Monthly profit" : "Monthly loss"}
          value={`${difference > 0 ? "+" : difference < 0 ? "−" : ""}${money(
            Math.abs(difference),
          )}`}
          hint="Income minus expenses"
          tone={difference > 0 ? "good" : difference < 0 ? "bad" : undefined}
        />
      </section>

      {expenses.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-text-light">
          No expenses yet. Click <strong>+ Add expense</strong> to add salaries,
          rent and other monthly costs.
        </div>
      ) : (
        <>
          <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cream border-b border-border text-text-light">
                  <tr>
                    <Th>Expense</Th>
                    <Th>Category</Th>
                    <Th>Monthly</Th>
                    <Th className="text-right pr-6">Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <ExpenseRow key={e.id} expense={e} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <section className="mt-6 bg-white border border-border rounded-xl shadow-sm p-5 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-text-light">
                Total monthly expenses
              </div>
              <div className="font-heading text-3xl font-bold text-text mt-1">
                {money(expensesTotal)}
                <span className="text-base font-normal text-text-light">
                  {" "}
                  / month
                </span>
              </div>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 text-sm">
              {byCategory.map((c) => (
                <div key={c.label}>
                  <dt className="text-text-light text-xs">{c.label}</dt>
                  <dd className="font-semibold text-text">{money(c.total)}</dd>
                </div>
              ))}
            </dl>
          </section>
        </>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "good" | "bad";
}) {
  return (
    <div
      className={`bg-white border rounded-xl shadow-sm p-5 ${
        tone === "good"
          ? "border-green/40"
          : tone === "bad"
            ? "border-red/40"
            : "border-border"
      }`}
    >
      <div className="text-xs font-semibold uppercase tracking-wide text-text-light">
        {label}
      </div>
      <div
        className={`font-heading text-2xl lg:text-3xl font-bold mt-1 whitespace-nowrap ${
          tone === "good" ? "text-green" : tone === "bad" ? "text-red" : "text-text"
        }`}
      >
        {value}
        <span className="text-base font-normal text-text-light"> / month</span>
      </div>
      <p className="text-xs text-text-light mt-1">{hint}</p>
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
