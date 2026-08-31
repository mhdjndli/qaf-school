"use client";

import { useState } from "react";

import { faqData } from "@/data/faqs";


function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center gap-4 hover:bg-orange/[0.03] transition-colors"
      >
        <span className="font-semibold text-text text-[0.95rem]">{q}</span>
        <span
          className={`text-orange transition-transform flex-shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        >
          &#9660;
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-text-light text-[0.93rem] leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            Frequently Asked Questions
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Answers to the most common questions about QAF: our approach,
            daily life, admissions, and more.
          </p>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {faqData.map((cat, i) => (
            <div key={i} className="mb-12 last:mb-0">
              <h2 className="font-heading text-2xl font-bold text-orange-dark border-b-2 border-orange pb-2 mb-5">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.questions.map((faq, j) => (
                  <FAQItem key={j} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">
            Still have questions?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Reach out to us directly or submit an inquiry to see QAF in person.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/inquiry"
              className="inline-block bg-white text-orange-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Submit Inquiry &rarr;
            </a>
            <a
              href="mailto:admin@qafschool.ca"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              admin@qafschool.ca
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
