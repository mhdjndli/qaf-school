"use client";

import { useState } from "react";
import { EXPENSE_CATEGORY_LABEL, money } from "@/lib/format";
import type { Expense } from "@/lib/store";
import { deleteExpenseAction, updateExpenseAction } from "../actions";
import ExpenseFields from "./ExpenseFields";

export default function ExpenseRow({ expense }: { expense: Expense }) {
  const [editing, setEditing] = useState(false);

  async function handleSave(formData: FormData) {
    await updateExpenseAction(formData);
    setEditing(false);
  }

  if (editing) {
    return (
      <tr className="border-b border-border last:border-0 bg-orange/[0.03]">
        <td colSpan={4} className="py-4 px-4">
          <form action={handleSave}>
            <input type="hidden" name="id" value={expense.id} />
            <ExpenseFields expense={expense} />
            <div className="flex justify-end items-center gap-3 mt-3">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-sm text-text-light hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-sm bg-orange text-white px-4 py-1.5 rounded-md font-semibold hover:bg-orange-dark transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-border last:border-0 hover:bg-orange/[0.03]">
      <td className="py-3 px-4 align-top">
        <div className="font-medium text-text">{expense.name}</div>
        {expense.notes ? (
          <div className="text-text-light text-xs">{expense.notes}</div>
        ) : null}
      </td>
      <td className="py-3 px-4 align-top">
        <span className="inline-block bg-orange/10 text-orange-dark text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
          {EXPENSE_CATEGORY_LABEL[expense.category] ?? expense.category}
        </span>
      </td>
      <td className="py-3 px-4 align-top">
        <span className="font-medium text-text whitespace-nowrap">
          {money(expense.monthlyAmountCents)}
          <span className="text-text-light font-normal text-xs"> /mo</span>
        </span>
      </td>
      <td className="py-3 px-4 pr-6 align-top text-right">
        <div className="flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-sm text-orange-dark font-medium hover:underline"
          >
            Edit
          </button>
          <form action={deleteExpenseAction}>
            <input type="hidden" name="id" value={expense.id} />
            <button
              type="submit"
              className="text-sm text-red hover:underline"
              onClick={(e) => {
                if (!confirm(`Delete "${expense.name}"?`)) e.preventDefault();
              }}
            >
              Delete
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}
