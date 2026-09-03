import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnrolButton from "./EnrolButton";

const SITE_URL = "https://qafschool.com";

export const metadata: Metadata = {
  title: "Sunday Camp · Quran, Arabic, Math & STEM, Soccer · Ages 8–15",
  description:
    "QAF Sunday Camp in Ottawa: four hours of Quran, Arabic, math & STEM, and soccer every Sunday, 11 AM–3 PM, ages 8–15. September 2026 – June 2027. $190/month or $1,710/year. Enrol online.",
  alternates: { canonical: "/sunday-camp" },
  openGraph: {
    title: "Sunday Camp at QAF · Ottawa · Ages 8–15",
    description:
      "Quran, Arabic, math & STEM, and soccer — every Sunday, 11 AM–3 PM at 900 Dynes Rd. $190/month or $1,710/year.",
    url: `${SITE_URL}/sunday-camp`,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "QAF School classroom in Ottawa" }],
  },
};

const scheduleRows = [
  {
    time: "11:00 – 12:00",
    title: "Quran class",
    text: "Recitation and memorization with a teacher, in small groups by level. Children review what they hold, add new verses at their own pace, and build the habit of reading with care.",
  },
  {
    time: "12:00 – 12:45",
    title: "Arabic class · reading and writing",
    text: "Letters, words, and sentences on paper and on the board. Juniors work on reading fluency; seniors move into writing and vocabulary they can use at home. Your family does not need to speak Arabic at home.",
  },
  {
    time: "12:45 – 1:15",
    title: "Break and snack",
    text: "Snacks packed from home. Time to eat, rest, and be with friends before the second half.",
  },
  {
    time: "1:15 – 2:00",
    title: "Math and STEM",
    text: "Hands-on problem solving: puzzles, building challenges, and experiments that stretch what children meet in school during the week, matched to the junior and senior classes.",
  },
  {
    time: "2:00 – 3:00",
    title: "Soccer or indoor activity",
    text: "Soccer on the field beside the school in the warm months. Through the Ottawa winter, the last hour moves inside: board games, team challenges, and group play.",
  },
];

const campJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "QAF Sunday Camp",
  description:
    "Weekly Sunday program in Ottawa for ages 8–15: Quran, Arabic reading and writing, math & STEM, and soccer or indoor activity. September 2026 to June 2027, Sundays 11 AM–3 PM.",
  url: `${SITE_URL}/sunday-camp`,
  provider: { "@id": `${SITE_URL}/#school` },
  offers: [
    {
      "@type": "Offer",
      name: "Monthly plan",
      price: "190",
      priceCurrency: "CAD",
      category: "Monthly tuition",
    },
    {
      "@type": "Offer",
      name: "Full year plan",
      price: "1710",
      priceCurrency: "CAD",
      category: "Annual tuition",
    },
  ],
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    courseSchedule: {
      "@type": "Schedule",
      byDay: "https://schema.org/Sunday",
      startTime: "11:00",
      endTime: "15:00",
      startDate: "2026-09-06",
      endDate: "2027-06-27",
    },
    location: {
      "@type": "Place",
      name: "QAF School",
      address: {
        "@type": "PostalAddress",
        streetAddress: "900 Dynes Rd",
        addressLocality: "Ottawa",
        addressRegion: "ON",
        postalCode: "K2C 3L6",
        addressCountry: "CA",
      },
    },
  },
};

export default function SundayCamp() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(campJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(242,140,40,0.08)_0%,transparent_70%)] rounded-full" />
        <div className="max-w-6xl mx-auto px-6 relative grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block bg-green/10 text-green font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-5">
              Now enrolling · September 2026 – June 2027
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.4rem] font-bold mb-5 text-text leading-tight">
              Sunday Camp at QAF
            </h1>
            <p className="text-text-light text-lg md:text-xl mb-7 leading-relaxed">
              Four hours of <strong className="text-text">Quran</strong>,{" "}
              <strong className="text-text">Arabic</strong>,{" "}
              <strong className="text-text">math &amp; STEM</strong>, and{" "}
              <strong className="text-text">soccer</strong> — every Sunday from
              11 AM to 3 PM. A full weekly rhythm of faith, language, and
              learning in one afternoon.
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-start mb-8">
              {["Ages 8–15", "Sundays 11 AM – 3 PM", "900 Dynes Rd, Ottawa", "$190/month"].map((chip) => (
                <span key={chip} className="bg-white border border-border text-text text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                  {chip}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#pricing"
                className="bg-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Reserve a Spot &rarr;
              </a>
              <a
                href="#schedule"
                className="border-2 border-orange text-orange-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange hover:text-white transition-all hover:-translate-y-0.5"
              >
                See the Schedule
              </a>
            </div>
          </div>
          <div className="hidden md:block relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/gallery/IMG_3075.jpg"
              alt="Bright QAF classroom ready for Sunday Camp"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 560px"
              priority
            />
          </div>
        </div>
      </section>

      {/* ===== FOUR PILLARS ===== */}
      <section className="py-16 md:py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-center">
            One afternoon. Four things that matter.
          </h2>
          <p className="text-text-light text-lg text-center max-w-2xl mx-auto mb-12">
            Instead of scattering weeknights across separate Quran, Arabic, and
            tutoring programs, QAF brings them together in one place, one day a week.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "\u{1F4D6}",
                color: "bg-green/10",
                title: "Quran",
                text: "Small groups by level. Recitation, memorization, and the habit of reading with care.",
              },
              {
                icon: "ع",
                color: "bg-orange/10",
                title: "Arabic",
                text: "Reading and writing, from letters to sentences. No Arabic needed at home.",
              },
              {
                icon: "⚙️",
                color: "bg-red/10",
                title: "Math & STEM",
                text: "Puzzles, building challenges, and experiments that stretch beyond weekday school.",
              },
              {
                icon: "⚽",
                color: "bg-green/10",
                title: "Soccer & Play",
                text: "Soccer on the field beside the school; team games indoors through the winter.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl p-7 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all text-center"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto ${card.color}`}>
                  {card.icon}
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-text-light text-[0.93rem] leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCHEDULE ===== */}
      <section id="schedule" className="py-16 md:py-20 bg-cream scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-center">
            The afternoon, hour by hour
          </h2>
          <p className="text-text-light text-lg text-center max-w-2xl mx-auto mb-12">
            Two classes — juniors and seniors — each with their own room and their own teacher.
          </p>
          <div className="space-y-4">
            {scheduleRows.map((row) => (
              <div
                key={row.time}
                className="bg-white rounded-xl p-6 shadow-sm border border-border flex flex-col sm:flex-row gap-3 sm:gap-6"
              >
                <div className="sm:w-36 shrink-0">
                  <span className="inline-block bg-orange/10 text-orange-dark font-bold text-sm px-3 py-1.5 rounded-lg whitespace-nowrap tabular-nums">
                    {row.time}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold mb-1">{row.title}</h3>
                  <p className="text-text-light text-[0.95rem] leading-relaxed">{row.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPACE ===== */}
      <section className="py-16 md:py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Where Sundays happen
            </h2>
            <p className="text-text-light text-lg leading-relaxed mb-4">
              The camp runs in our classrooms at 900 Dynes Rd: bright rooms with
              space to learn, read, build, and move. The junior and senior
              classes each have their own room and their own teacher.
            </p>
            <p className="text-text-light text-lg leading-relaxed">
              In warm months, the last hour is soccer on the green field right
              beside the school. Through the Ottawa winter, play moves inside
              with board games and team challenges.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <Image src="/gallery/IMG_3077.jpg" alt="QAF classroom with tables and whiteboard" fill className="object-cover" sizes="(max-width: 768px) 50vw, 280px" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <Image src="/gallery/IMG_3086.jpg" alt="Green field beside the school where campers play soccer" fill className="object-cover" sizes="(max-width: 768px) 50vw, 280px" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md col-span-2">
              <Image src="/gallery/IMG_3080.jpg" alt="QAF learning room with whiteboard and materials" fill className="object-cover" sizes="(max-width: 768px) 100vw, 560px" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-16 md:py-20 bg-cream scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-center">
            Two ways to pay
          </h2>
          <p className="text-text-light text-lg text-center max-w-2xl mx-auto mb-12">
            The camp year runs September 2026 to June 2027 — ten months of
            Sundays. Both plans cover the same program.
          </p>
          <div className="grid md:grid-cols-2 gap-7 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border flex flex-col">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-text-light mb-3">
                Monthly
              </h3>
              <p className="mb-1">
                <span className="font-heading text-5xl font-bold text-text">$190</span>
                <span className="text-text-light text-lg"> / month</span>
              </p>
              <p className="text-text-light text-[0.95rem] leading-relaxed mt-3 mb-8 flex-1">
                Ten payments of $190, September through June. Simple and
                predictable: the same amount each month of the camp year.
              </p>
              <EnrolButton plan="monthly" label="Enrol Monthly" variant="outline" />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange relative flex flex-col">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full whitespace-nowrap">
                Save $190 — one month free
              </span>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-text-light mb-3">
                Full year
              </h3>
              <p className="mb-1">
                <span className="font-heading text-5xl font-bold text-text">$1,710</span>
                <span className="text-text-light text-lg"> / year</span>
              </p>
              <p className="text-text-light text-[0.95rem] leading-relaxed mt-3 mb-8 flex-1">
                One payment for all ten months. You save $190 — a full month of
                tuition — compared with paying monthly.
              </p>
              <EnrolButton plan="annual" label="Enrol for the Year" variant="solid" />
            </div>
          </div>
          <p className="text-center text-text-light text-sm mt-8">
            Secure checkout by credit card via Stripe &middot; Spots in each class are limited
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10 text-center">
            Common questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: "Does my child need to speak Arabic already?",
                a: "No. Juniors start from letters and reading fluency; seniors move into writing and everyday vocabulary. Many QAF families do not speak Arabic at home.",
              },
              {
                q: "How are the classes divided?",
                a: "Two classes by age and level — a junior class and a senior class (ages 8–15 overall). Each has its own room and its own teacher, and Quran groups are further split by level.",
              },
              {
                q: "What should my child bring?",
                a: "A packed snack, a water bottle, and clothes they can play soccer in. QAF is a nut-free facility and all food brought in must be halal.",
              },
              {
                q: "What happens in winter?",
                a: "The learning hours are unchanged. The last hour moves indoors: board games, team challenges, and group play in our classrooms.",
              },
              {
                q: "Can we try before committing to the year?",
                a: "Yes — start on the monthly plan ($190/month). If you switch to the annual plan, you get the same program and save a full month of tuition.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-heading text-lg font-bold mb-2">{item.q}</h3>
                <p className="text-text-light text-[0.95rem] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Reserve your child&rsquo;s spot
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Sundays 11 AM – 3 PM &middot; Ages 8 – 15 &middot; September 2026 – June 2027
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="bg-white text-orange-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Choose a Plan &rarr;
            </a>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-dark transition-all hover:-translate-y-0.5"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
