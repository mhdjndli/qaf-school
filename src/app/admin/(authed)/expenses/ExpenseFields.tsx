import { EXPENSE_CATEGORY_LABEL, centsToInput } from "@/lib/format";
import type { Expense } from "@/lib/store";

const inputClass =
  "w-full px-3 py-2 text-sm border border-border rounded-md text-text bg-white focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20";

/** Shared name / category / amount / notes inputs for add + edit forms. */
export default function ExpenseFields({ expense }: { expense?: Expense }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
      <label className="text-xs font-semibold text-text-light">
        Name
        <input
          type="text"
          name="name"
          required
          defaultValue={expense?.name}
          placeholder="e.g. Lead educator salary"
          className={`mt-1 ${inputClass}`}
        />
      </label>
      <label className="text-xs font-semibold text-text-light">
        Category
        <select
          name="category"
          defaultValue={expense?.category ?? "salary"}
          className={`mt-1 ${inputClass}`}
        >
          {Object.entries(EXPENSE_CATEGORY_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold text-text-light">
        Monthly amount ($)
        <input
          type="text"
          inputMode="decimal"
          name="monthlyAmount"
          required
          defaultValue={centsToInput(expense?.monthlyAmountCents)}
          placeholder="0.00"
          className={`mt-1 ${inputClass}`}
        />
      </label>
      <label className="text-xs font-semibold text-text-light sm:col-span-3">
        Notes (optional)
        <input
          type="text"
          name="notes"
          defaultValue={expense?.notes ?? ""}
          className={`mt-1 ${inputClass}`}
        />
      </label>
    </div>
  );
}
