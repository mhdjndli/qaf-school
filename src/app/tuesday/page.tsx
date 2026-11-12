import type { Metadata } from "next";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";

const SITE_URL = "https://qafschool.com";

export const metadata: Metadata = {
  title: "Tuesday Evening Program · Quran, Tajweed & Sira · Ages 9–13",
  description:
    "QAF Tuesday Evening Program in Ottawa: Quran, Tajweed, and Sira every Tuesday, 6–8:30 PM, ages 9–13, at 900 Dynes Rd. The program is currently full; join the waitlist.",
  alternates: { canonical: "/tuesday" },
  openGraph: {
    title: "Tuesday Evening Program at QAF · Ottawa · Ages 9–13",
    description:
      "Quran, Tajweed, and Sira — every Tuesday, 6–8:30 PM at 900 Dynes Rd. Currently full; join the waitlist.",
    url: `${SITE_URL}/tuesday`,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "QAF School classroom in Ottawa" }],
  },
};

const subjects = [
  {
    icon: "۞",
    color: "bg-green/10 text-green",
    title: "Quran",
    text: "Recitation and memorization with a teacher, in small groups by level. Students review what they hold and add new verses at their own pace.",
  },
  {
    icon: "ع",
    color: "bg-orange/10 text-orange",
    title: "Tajweed",
    text: "The rules of correct recitation, taught step by step and practised aloud, so students read the Quran with accuracy and confidence.",
  },
  {
    icon: "☪",
    color: "bg-red/10 text-red",
    title: "Sira",
    text: "The life of the Prophet ﷺ: his character, his companions, and the lessons his story holds for young people growing up today.",
  },
];

const tuesdayJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "QAF Tuesday Evening Program",
  description:
    "Weekly Tuesday evening program in Ottawa for ages 9–13: Quran, Tajweed, and Sira. Tuesdays 6–8:30 PM.",
  url: `${SITE_URL}/tuesday`,
  provider: { "@id": `${SITE_URL}/#school` },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    courseSchedule: {
      "@type": "Schedule",
      byDay: "https://schema.org/Tuesday",
      startTime: "18:00",
      endTime: "20:30",
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

export default function TuesdayProgram() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tuesdayJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(242,140,40,0.08)_0%,transparent_70%)] rounded-full" />
        <div className="max-w-4xl mx-auto px-6 relative text-center">
          <span className="inline-block bg-red/10 text-red font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-5">
            Currently full · Waitlist open
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.4rem] font-bold mb-5 text-text leading-tight">
            Tuesday Evening Program
          </h1>
          <p className="text-text-light text-lg md:text-xl mb-7 leading-relaxed max-w-2xl mx-auto">
            An evening of <strong className="text-text">Quran</strong>,{" "}
            <strong className="text-text">Tajweed</strong>, and{" "}
            <strong className="text-text">Sira</strong> every Tuesday, for
            students ages 9 to 13.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center mb-8">
            {["Ages 9–13", "Tuesdays 6 – 8:30 PM", "900 Dynes Rd, Ottawa"].map((chip) => (
              <span key={chip} className="bg-warm-white border border-card-line text-text text-sm font-medium px-4 py-2 rounded-full">
                {chip}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#waitlist"
              className="bg-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Join the Waitlist &rarr;
            </a>
            <Link
              href="/sunday-camp"
              className="border-2 border-orange text-orange-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange hover:text-white transition-all hover:-translate-y-0.5"
            >
              Sunday Camp has seats
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHAT STUDENTS LEARN ===== */}
      <section className="py-16 md:py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
            What students learn
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map((s) => (
              <div key={s.title} className="bg-warm-white rounded-lg p-8 border border-card-line">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl mb-5 ${s.color}`}>
                  {s.icon}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-text-light leading-relaxed text-[0.95rem]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WAITLIST ===== */}
      <section id="waitlist" className="py-16 md:py-20 bg-cream scroll-mt-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
            Join the waitlist
          </h2>
          <p className="text-text-light text-center mb-10 leading-relaxed">
            All seats for the Tuesday program are currently taken. Add your
            child to the waitlist and we&rsquo;ll contact you as soon as a seat
            opens up. In the meantime,{" "}
            <Link href="/sunday-camp" className="text-orange-dark font-medium hover:underline">
              Sunday Camp
            </Link>{" "}
            still has seats available.
          </p>
          <InquiryForm waitlist="tuesday" />
        </div>
      </section>
    </>
  );
}
