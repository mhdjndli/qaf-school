import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admissions & Tuition · Islamic Kindergarten Ottawa · QAF",
  description:
    "Apply to QAF for 2026/2027. Tuition $690/month plus $190 annual resource fee. Four-step admissions process. Submit your inquiry today.",
};

export default function Admissions() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            Admissions: 2026/2027
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto leading-relaxed">
            A simple, transparent process to bring your child into the QAF family.
            Four steps, no surprises.
          </p>
        </div>
      </section>

      {/* 4 STEP PROCESS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            The 4-Step Process
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: "1",
                title: "Inquire",
                text: "Submit our short inquiry form or email admin@qafschool.ca. We\u2019ll respond within two business days.",
              },
              {
                num: "2",
                title: "Tour",
                text: "Visit QAF in person. A 30-minute tour where you walk through the classroom, meet a teacher, and ask every question you have.",
              },
              {
                num: "3",
                title: "Apply",
                text: "Complete our application form and submit the required documents. Applications are reviewed on a rolling basis.",
              },
              {
                num: "4",
                title: "Enrol",
                text: "Receive your welcome package, sign the enrollment agreement, pay your first month\u2019s tuition, and join the QAF family.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-orange text-white rounded-full flex items-center justify-center text-xl font-bold font-heading mx-auto mb-5">
                  {step.num}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-text-light text-[0.93rem] leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TUITION & FEES */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">
            Tuition &amp; Fees
          </h2>
          <p className="text-text-light text-center mb-10">
            We believe in transparent pricing. No hidden charges, no surprises
            mid-year.
          </p>
          <div className="overflow-x-auto rounded-xl shadow-sm mb-10">
            <table className="w-full bg-white">
              <thead className="bg-red text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-sm">Item</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly tuition (JK and SK)", "$690 / month"],
                  ["Annual resource & supplies fee", "$190 / year (non-refundable)"],
                  ["Application fee", "Contact us"],
                ].map(([item, amount], i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-4 px-6 text-sm">{item}</td>
                    <td className="py-4 px-6 font-bold text-orange-dark text-sm whitespace-nowrap">
                      {amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h3 className="font-heading text-lg font-bold mb-3">Payment Schedule</h3>
              <ul className="space-y-2 text-text-light text-[0.93rem]">
                <li>Tuition: $690/month, billed 1st of each month, September\u2013June (10 months)</li>
                <li>Resource fee: $190 due once per school year at enrollment</li>
                <li>Payment via credit card, direct debit, or e-transfer through Parent Portal</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h3 className="font-heading text-lg font-bold mb-3">Annual Total</h3>
              <div className="text-text-light text-[0.93rem] space-y-2">
                <p>$690 &times; 10 months = <strong className="text-text">$6,900</strong> tuition</p>
                <p>+ $190 resource fee = <strong className="text-orange-dark text-lg">$7,090/year</strong></p>
                <p className="text-sm mt-3">
                  Sibling discount available. Contact{" "}
                  <a href="mailto:admin@qafschool.ca" className="text-orange-dark hover:underline">
                    admin@qafschool.ca
                  </a>{" "}
                  for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REQUIRED DOCUMENTS */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Required Documents
          </h2>
          <div className="max-w-xl mx-auto space-y-3">
            {[
              "Child\u2019s birth certificate",
              "Up-to-date immunization records (per Ontario requirements)",
              "One passport-sized photo of your child",
              "Allergy and health information form",
              "Emergency contacts",
              "Signed enrollment agreement (provided after acceptance)",
            ].map((doc, i) => (
              <div
                key={i}
                className="bg-white rounded-lg px-5 py-3.5 shadow-sm border border-border flex items-center gap-3"
              >
                <span className="text-orange text-lg">&#128196;</span>
                <span className="text-text text-[0.93rem]">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBMIT AN INQUIRY */}
      <section id="tour" className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">
            Submit an Inquiry
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Share a few details about your family and your child. Our admissions
            team will review your inquiry and, if it looks like a good fit,
            reach out to schedule a tour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inquiry"
              className="inline-block bg-white text-orange-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Submit Inquiry &rarr;
            </Link>
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
