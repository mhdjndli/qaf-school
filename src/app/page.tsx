import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import PhotoStrip from "@/components/PhotoStrip";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(242,140,40,0.08)_0%,transparent_70%)] rounded-full" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(192,57,43,0.05)_0%,transparent_70%)] rounded-full" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-text">
            <span className="block font-[var(--font-inter)] text-sm md:text-base font-semibold uppercase tracking-[0.18em] text-orange-dark mb-4">
              Quran &amp; Arabic Programs for Kids in Ottawa
            </span>
            Where Faith, Language, and Learning Take Root.
          </h1>
          <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto mb-9 leading-relaxed">
            QAF runs weekly Islamic programs for school-age children: Sunday
            Camp for ages 8&ndash;15 and a Tuesday evening program for ages
            9&ndash;13, both at 900 Dynes Rd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sunday-camp"
              className="bg-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Enrol in Sunday Camp &rarr;
            </Link>
            <Link
              href="/tuesday"
              className="border-2 border-orange text-orange-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange hover:text-white transition-all hover:-translate-y-0.5"
            >
              Tuesday Program Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SCHOOL PHOTOS (carousel) ===== */}
      <PhotoStrip />

      {/* ===== PROGRAMS ===== */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Programs
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              Two weekly programs that fit around the school week.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                badge: "Seats available",
                badgeCls: "bg-green/10 text-green",
                title: "Sunday Camp",
                meta: "Ages 8\u201315 \u00b7 Sundays 11 AM \u2013 3 PM \u00b7 $190/month",
                text: "Four hours of Quran, Arabic reading and writing, math & STEM, and soccer or indoor activity, split into junior and senior classes.",
                href: "/sunday-camp",
                cta: "Enrol in Sunday Camp",
                img: "/gallery/IMG_1817.jpg",
                alt: "Children playing together outdoors",
              },
              {
                badge: "Full \u00b7 Join the waitlist",
                badgeCls: "bg-red/10 text-red",
                title: "Tuesday Evening Program",
                meta: "Ages 9\u201313 \u00b7 Tuesdays 6 \u2013 8:30 PM",
                text: "An evening of Quran, Tajweed, and Sira: recitation by level, the rules of correct reading, and the life of the Prophet \uFDFA.",
                href: "/tuesday",
                cta: "Join the Waitlist",
                img: "/gallery/IMG_1807.jpg",
                alt: "Students reading together",
              },
            ].map((p) => (
              <div
                key={p.href}
                className="bg-warm-white rounded-lg border border-card-line overflow-hidden flex flex-col transition-colors hover:border-orange"
              >
                <div className="relative aspect-[16/9]">
                  <Image src={p.img} alt={p.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className={`self-start font-semibold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 ${p.badgeCls}`}>
                    {p.badge}
                  </span>
                  <h3 className="font-heading text-2xl font-bold mb-2 text-orange-dark">
                    {p.title}
                  </h3>
                  <p className="text-sm font-semibold text-text mb-3">{p.meta}</p>
                  <p className="text-text-light leading-relaxed mb-6">{p.text}</p>
                  <Link
                    href={p.href}
                    className="mt-auto self-start bg-orange text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-dark transition-all hover:-translate-y-0.5"
                  >
                    {p.cta} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY QAF ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Why QAF
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Small groups by level",
                text: "Quran groups are split by level, so every student is challenged and supported at the right pace.",
              },
              {
                title: "Qualified teachers",
                text: "Experienced Quran and Arabic teachers who know every student by name.",
              },
              {
                title: "Arabic-rich, not Arabic-required",
                text: "Your family does not need to speak Arabic at home. We start where your child is.",
              },
              {
                title: "Serving Ottawa since 2021",
                text: "A warm community of Muslim families from across the city, at 900 Dynes Rd.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-warm-white rounded-lg p-7 border border-card-line"
              >
                <h3 className="font-heading text-lg font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-text-light text-[0.93rem] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARENT GUIDES ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Guides for Ottawa Muslim Families
          </h2>
          <p className="text-text-light text-center mb-12 max-w-2xl mx-auto">
            Looking for Quran classes, weekend Islamic school, or Arabic for
            your child in Ottawa? Start with our honest, regularly updated guides.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: "/blog/islamic-schools-in-ottawa-guide",
                title: "Islamic Schools in Ottawa: Full List & Comparison",
                text: "Every full-time Islamic school, kindergarten, and weekend program in Ottawa, side by side.",
              },
              {
                href: "/blog/islamic-schools-near-me-ottawa",
                title: "Islamic Schools Near Me: Ottawa by Neighbourhood",
                text: "Barrhaven, Kanata, Nepean, Orléans, and more: what is close to home in each part of the city.",
              },
              {
                href: "/blog/weekend-islamic-schools-ottawa",
                title: "Weekend Islamic Schools & Quran Classes in Ottawa",
                text: "Saturday and Sunday Quran, Arabic, and Islamic Studies programs for school-age children.",
              },
            ].map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="bg-warm-white rounded-lg p-7 border border-card-line transition-colors hover:border-orange group"
              >
                <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-orange-dark">
                  {g.title}
                </h3>
                <p className="text-text-light text-[0.93rem] leading-relaxed">
                  {g.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISIT US / MAP ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Come Visit Us
          </h2>
          <p className="text-text-light text-center mb-10 max-w-xl mx-auto">
            QAF Islamic School &mdash; 900 Dynes Rd, Ottawa, ON K2C 3L6
          </p>
          <div className="rounded-lg overflow-hidden border border-card-line">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.264!2d-75.7043661!3d45.3694474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce07e4d6c4381f%3A0xbe973bba6dfa410b!2sQAF%20Islamic%20School!5e0!3m2!1sen!2sca!4v1757116800000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="QAF Islamic School on Google Maps"
            />
          </div>
          <div className="text-center mt-6">
            <a
              href="https://maps.app.goo.gl/Coy9Zj73r6gshPh7A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-dark font-medium hover:underline"
            >
              Open in Google Maps &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
            Sunday Camp seats are still open.
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Quran, Arabic, math &amp; STEM, and soccer every Sunday for ages
            8&ndash;15. Reserve your child&rsquo;s seat today.
          </p>
          <Link
            href="/sunday-camp#pricing"
            className="inline-block bg-white text-orange-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Enrol in Sunday Camp &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
