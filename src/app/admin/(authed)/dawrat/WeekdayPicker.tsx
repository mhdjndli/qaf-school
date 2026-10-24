import { WEEKDAY_ORDER, WEEKDAY_SHORT } from "@/lib/format";

/** Checkboxes named "weekdays" (values 0 = Sunday … 6 = Saturday). */
export default function WeekdayPicker({ selected = [] }: { selected?: number[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {WEEKDAY_ORDER.map((d) => (
        <label key={d} className="cursor-pointer select-none">
          <input
            type="checkbox"
            name="weekdays"
            value={d}
            defaultChecked={selected.includes(d)}
            className="peer sr-only"
          />
          <span className="block text-sm px-2.5 py-1.5 rounded-md border border-border text-text-light hover:border-orange peer-checked:bg-orange peer-checked:border-orange peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-orange/30 transition-colors">
            {WEEKDAY_SHORT[d]}
          </span>
        </label>
      ))}
    </div>
  );
}
