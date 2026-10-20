"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import { saveReportAction } from "../actions";
import { uploadPhotos } from "./upload-photos";

const fileCls =
  "w-full text-sm text-text-light file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-orange/10 file:text-orange-dark file:text-sm file:font-semibold hover:file:bg-orange/20 file:cursor-pointer";

/** One student's attendance, daily report and pictures for a given day. */
export default function DayReportCard({
  dawraId,
  day,
  student,
  report,
  photos,
}: {
  dawraId: string;
  day: string;
  student: { id: string; firstName: string; lastName: string; hasPhoto: boolean };
  report: { absent: boolean; report: string | null } | null;
  /** Thumbnails of this student's own pictures for the day (server-rendered). */
  photos: React.ReactNode;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [absent, setAbsent] = useState(report?.absent ?? false);
  const [shared, setShared] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const fullName = `${student.firstName} ${student.lastName}`.trim();

  function handleSubmit(formData: FormData) {
    setError(null);
    const files = absent ? [] : Array.from(fileRef.current?.files ?? []);
    const shareWithAll = shared;
    startTransition(async () => {
      setStatus("Saving report…");
      const res = await saveReportAction(formData);
      if (res?.error) {
        setError(res.error);
        setStatus(null);
        return;
      }
      if (files.length) {
        const err = await uploadPhotos(
          files,
          { dawraId, day, studentId: student.id, shared: shareWithAll },
          (done, total) => setStatus(`Uploading pictures ${done}/${total}…`),
        );
        if (err) setError(err);
        if (fileRef.current) fileRef.current.value = "";
        setShared(false);
      }
      setStatus("Saved ✓");
      router.refresh();
      setTimeout(() => setStatus(null), 2000);
    });
  }

  return (
    <form
      action={handleSubmit}
      className={`border rounded-lg p-4 ${absent ? "border-red/30 bg-red/[0.03]" : "border-border bg-white"}`}
    >
      <input type="hidden" name="studentId" value={student.id} />
      <input type="hidden" name="day" value={day} />

      <div className="flex items-center gap-3 flex-wrap mb-3">
        <Avatar studentId={student.id} hasPhoto={student.hasPhoto} name={fullName} size={36} />
        <div className="font-medium text-text flex-1 min-w-0">
          {fullName}
          {!report ? (
            <span className="ml-2 text-xs font-normal text-text-light">Not recorded yet</span>
          ) : null}
        </div>
        <div className="flex gap-1.5">
          <AttendancePill
            label="Present"
            checked={!absent}
            onChange={() => setAbsent(false)}
            tone="green"
          />
          <AttendancePill
            label="Absent"
            checked={absent}
            onChange={() => setAbsent(true)}
            tone="red"
          />
          <input type="hidden" name="attendance" value={absent ? "absent" : "present"} />
        </div>
      </div>

      {absent ? (
        <p className="text-sm text-text-light italic">
          Parents will see: &ldquo;Your child was absent today.&rdquo; No pictures are shown
          for this day.
        </p>
      ) : (
        <div className="space-y-3">
          <textarea
            name="report"
            rows={3}
            defaultValue={report?.report ?? ""}
            placeholder={`How did ${student.firstName} do today? Performance, activities, notes for parents…`}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all"
          />
          {photos}
          <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-center">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className={fileCls}
            />
            <label className="flex items-center gap-2 text-sm text-text cursor-pointer select-none">
              <input
                type="checkbox"
                checked={shared}
                onChange={(e) => setShared(e.target.checked)}
                className="accent-orange w-4 h-4"
              />
              Apply pictures to all students today
            </label>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-end gap-3">
        {error ? <p className="text-sm text-red mr-auto">{error}</p> : null}
        {status ? <span className="text-sm text-text-light">{status}</span> : null}
        <button
          type="submit"
          disabled={pending}
          className="text-sm bg-orange text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-dark transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function AttendancePill({
  label,
  checked,
  onChange,
  tone,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  tone: "green" | "red";
}) {
  const on = tone === "green" ? "bg-green border-green text-white" : "bg-red border-red text-white";
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`text-sm px-3 py-1 rounded-md border transition-colors ${
        checked ? on : "border-border text-text-light hover:border-text-light"
      }`}
    >
      {label}
    </button>
  );
}
