"use client";

import { useState } from "react";
import type { Inquiry } from "@/lib/store";

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function InquiryDetails({ inquiry }: { inquiry: Inquiry }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-orange-dark hover:underline font-medium text-sm"
      >
        View
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-heading text-lg font-bold">Inquiry details</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-text-light hover:text-text text-xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <dl className="px-6 py-5 space-y-3 text-sm">
              <Row label="Submitted">{formatDate(inquiry.createdAt)}</Row>
              <Row label="Parent">
                {inquiry.parentFirstName} {inquiry.parentLastName}
              </Row>
              <Row label="Email">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="text-orange-dark hover:underline"
                >
                  {inquiry.email}
                </a>
              </Row>
              <Row label="Phone">
                <a
                  href={`tel:${inquiry.phone}`}
                  className="text-orange-dark hover:underline"
                >
                  {inquiry.phone}
                </a>
              </Row>
              <Row label="Child">
                {inquiry.childFirstName} {inquiry.childLastName}
              </Row>
              <Row label="Child DOB">{inquiry.childDob}</Row>
              <Row label="Expected start">{inquiry.expectedStartDate}</Row>
              <Row label="Wants tour">{inquiry.wantsTour ? "Yes" : "No"}</Row>
              <Row label="Source">{inquiry.source}</Row>
              <Row label="Notes">
                {inquiry.notes ? (
                  <span className="whitespace-pre-wrap">{inquiry.notes}</span>
                ) : (
                  <span className="text-text-light italic">None</span>
                )}
              </Row>
              {inquiry.waitlistedAt ? (
                <Row label="Waitlisted">{formatDate(inquiry.waitlistedAt)}</Row>
              ) : null}
            </dl>
          </div>
        </div>
      ) : null}
    </>
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
    <div className="grid grid-cols-[140px_1fr] gap-3">
      <dt className="text-text-light font-medium">{label}</dt>
      <dd className="text-text">{children}</dd>
    </div>
  );
}
