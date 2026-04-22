"use client";

import { useState } from "react";

const SOURCES = [
  "Google Search",
  "Word of Mouth",
  "Instagram",
  "Other",
] as const;

type FormState = {
  parentFirstName: string;
  parentLastName: string;
  email: string;
  phone: string;
  childFirstName: string;
  childLastName: string;
  childDob: string;
  expectedStartDate: string;
  wantsTour: "yes" | "no";
  notes: string;
  source: (typeof SOURCES)[number] | "";
};

const INITIAL: FormState = {
  parentFirstName: "",
  parentLastName: "",
  email: "",
  phone: "",
  childFirstName: "",
  childLastName: "",
  childDob: "",
  expectedStartDate: "",
  wantsTour: "yes",
  notes: "",
  source: "",
};

export default function InquiryPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          wantsTour: form.wantsTour === "yes",
          source: form.source || "Other",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            Submit an Inquiry
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us a little about your family and your child. Our admissions
            team will review your inquiry and, if it looks like a good fit,
            reach out to schedule a tour.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          {status === "done" ? (
            <div className="bg-green/10 border border-green rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">&#10003;</div>
              <h2 className="font-heading text-2xl font-bold mb-2 text-green">
                Inquiry Received
              </h2>
              <p className="text-text-light">
                Thank you! We&rsquo;ve received your inquiry and will be in
                touch within two business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border space-y-6"
            >
              {/* Parent */}
              <fieldset className="space-y-4">
                <legend className="font-heading text-lg font-bold text-orange-dark">
                  Parent / Guardian
                </legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name *">
                    <input
                      type="text"
                      required
                      value={form.parentFirstName}
                      onChange={(e) =>
                        update("parentFirstName", e.target.value)
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Last name *">
                    <input
                      type="text"
                      required
                      value={form.parentLastName}
                      onChange={(e) =>
                        update("parentLastName", e.target.value)
                      }
                      className={inputCls}
                    />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email *">
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone number *">
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                </div>
              </fieldset>

              {/* Child */}
              <fieldset className="space-y-4">
                <legend className="font-heading text-lg font-bold text-orange-dark">
                  Child
                </legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name *">
                    <input
                      type="text"
                      required
                      value={form.childFirstName}
                      onChange={(e) =>
                        update("childFirstName", e.target.value)
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Last name *">
                    <input
                      type="text"
                      required
                      value={form.childLastName}
                      onChange={(e) => update("childLastName", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Date of birth *">
                    <input
                      type="date"
                      required
                      value={form.childDob}
                      onChange={(e) => update("childDob", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Expected start date *">
                    <input
                      type="date"
                      required
                      value={form.expectedStartDate}
                      onChange={(e) =>
                        update("expectedStartDate", e.target.value)
                      }
                      className={inputCls}
                    />
                  </Field>
                </div>
              </fieldset>

              {/* Tour */}
              <Field label="Do you want us to contact you for a tour? *">
                <div className="flex gap-6 pt-1">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="wantsTour"
                      value="yes"
                      checked={form.wantsTour === "yes"}
                      onChange={() => update("wantsTour", "yes")}
                      className="accent-orange"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="wantsTour"
                      value="no"
                      checked={form.wantsTour === "no"}
                      onChange={() => update("wantsTour", "no")}
                      className="accent-orange"
                    />
                    No
                  </label>
                </div>
              </Field>

              {/* How did you hear */}
              <Field label="How did you hear about us? *">
                <select
                  required
                  value={form.source}
                  onChange={(e) =>
                    update("source", e.target.value as FormState["source"])
                  }
                  className={`${inputCls} bg-white`}
                >
                  <option value="">Select one</option>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Notes */}
              <Field label="Notes (optional)">
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Anything you'd like us to know"
                  className={`${inputCls} resize-y`}
                />
              </Field>

              {status === "error" && (
                <p className="text-red text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-orange text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-orange-dark transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === "submitting"
                  ? "Submitting..."
                  : "Submit Inquiry \u2192"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-text mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
