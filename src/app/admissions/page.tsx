import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Join · Sunday Camp & Tuesday Program",
  alternates: { canonical: "/admissions" },
  description:
    "How to join QAF's programs in Ottawa: enrol in Sunday Camp online ($190/month, seats available) or join the waitlist for the Tuesday evening Quran, Tajweed & Sira program.",
};

export default function Admissions() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            How to Join
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto leading-relaxed">
            QAF runs two weekly programs. Here&rsquo;s where each one stands
            and how to sign up.
          </p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="overflow-x-auto rounded-lg border border-card-line mb-12">
            <table className="w-full bg-white">
              <thead className="bg-red text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-sm">Program</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm">When</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm">Ages</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-card-line">
                  <td className="py-4 px-6 text-sm font-semibold">
                    <Link href="/sunday-camp" className="hover:text-orange-dark">Sunday Camp</Link>
                  </td>
                  <td className="py-4 px-6 text-sm whitespace-nowrap">Sundays 11 AM – 3 PM</td>
                  <td className="py-4 px-6 text-sm">8–15</td>
                  <td className="py-4 px-6 text-sm font-bold text-green whitespace-nowrap">Seats available</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-semibold">
                    <Link href="/tuesday" className="hover:text-orange-dark">Tuesday Evening Program</Link>
                  </td>
                  <td className="py-4 px-6 text-sm whitespace-nowrap">Tuesdays 6 – 8:30 PM</td>
                  <td className="py-4 px-6 text-sm">9–13</td>
                  <td className="py-4 px-6 text-sm font-bold text-red whitespace-nowrap">Full · Waitlist</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-warm-white rounded-lg p-8 border border-card-line flex flex-col">
              <h2 className="font-heading text-2xl font-bold mb-3 text-orange-dark">
                Sunday Camp
              </h2>
              <ol className="space-y-2 text-text-light text-[0.95rem] mb-6 list-decimal pl-5">
                <li>Choose the monthly plan on the Sunday Camp page ($190/month).</li>
                <li>Complete secure checkout online.</li>
                <li>We&rsquo;ll email you before the first Sunday with everything you need.</li>
              </ol>
              <Link
                href="/sunday-camp#pricing"
                className="mt-auto self-start bg-orange text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-dark transition-all hover:-translate-y-0.5"
              >
                Enrol in Sunday Camp &rarr;
              </Link>
            </div>
            <div className="bg-warm-white rounded-lg p-8 border border-card-line flex flex-col">
              <h2 className="font-heading text-2xl font-bold mb-3 text-orange-dark">
                Tuesday Evening Program
              </h2>
              <ol className="space-y-2 text-text-light text-[0.95rem] mb-6 list-decimal pl-5">
                <li>The program is currently full.</li>
                <li>Add your child to the waitlist with a short form.</li>
                <li>We&rsquo;ll contact you as soon as a seat opens up.</li>
              </ol>
              <Link
                href="/tuesday#waitlist"
                className="mt-auto self-start border-2 border-orange text-orange-dark px-7 py-3 rounded-lg font-semibold hover:bg-orange hover:text-white transition-all"
              >
                Join the Waitlist &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">
            Have a question first?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Send us a message and we&rsquo;ll get back to you within two
            business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-orange-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Contact Us &rarr;
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
