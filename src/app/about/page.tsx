import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About QAF · Quran & Arabic Programs in Ottawa",
  alternates: { canonical: "/about" },
  description:
    "Meet QAF, serving Ottawa Muslim families since 2021 with Sunday Camp and a Tuesday evening Quran, Tajweed & Sira program for school-age children.",
};

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            Founded to raise a generation rooted in faith, fluent in Arabic, and
            ready for the world.
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto leading-relaxed">
            QAF, the Qabas Academic Foundation, runs weekly Islamic programs in
            Ottawa for school-age children: Sunday Camp and a Tuesday evening
            program of Quran, Tajweed, and Sira.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-5 text-text-light leading-relaxed">
            <p>
              QAF was founded in 2021 by Ottawa families who wanted their
              children surrounded by Arabic and the Quran, with Islamic
              identity woven into the rhythm of the classroom.
            </p>
            <p>
              QAF began as a Junior and Senior Kindergarten. Today
              we focus on what families asked us for most: steady, weekly
              Quran and Arabic learning for school-age children that fits
              around the school week.
            </p>
            <p>
              Our Sunday Camp brings Quran, Arabic, math &amp; STEM, and soccer
              together every Sunday for ages 8&ndash;15. Our Tuesday evening
              program focuses on Quran, Tajweed, and Sira for ages 9&ndash;13.
              We remain intentionally small, because knowing every child by
              name is not a feature; it is the entire point.
            </p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-3">
            Our Philosophy
          </h2>
          <p className="text-orange-dark font-heading text-xl italic mb-6">
            Tarbiyah, one week at a time
          </p>
          <div className="space-y-5 text-text-light leading-relaxed mb-12">
            <p>
              We believe every child arrives with fitrah, a pure, natural
              disposition toward truth, beauty, and their Creator. Our job is
              not to fill a child with information but to nurture that fitrah
              through the Quran, the Arabic language, and the example of the
              Prophet \uFDFA.
            </p>
            <p>
              That is tarbiyah: the patient, holistic nurture of body, mind,
              heart, and soul. It shapes how we teach, how we speak to
              students, and how we build community among families.
            </p>
          </div>

          <h3 className="font-heading text-2xl font-bold mb-6">
            Four principles that shape every day
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Faith first",
                text: "Every routine and interaction reinforces love for Allah, the Prophet \uFDFA, and the Quran.",
              },
              {
                title: "Respect for the child",
                text: "We observe before we instruct. We guide before we correct. We never shame.",
              },
              {
                title: "Arabic as a living language",
                text: "Students read it, write it, and use it, not as a dry school subject but as the language of the Quran.",
              },
              {
                title: "Steady progress",
                text: "Weekly classes by level mean every student keeps moving forward in recitation, memorization, and understanding.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="bg-warm-white rounded-lg p-6 border border-card-line"
              >
                <h4 className="font-heading text-lg font-bold text-orange-dark mb-2">
                  {v.title}
                </h4>
                <p className="text-text-light text-[0.93rem] leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GRID */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-8 text-center">
            A Glimpse Inside QAF
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                src: "/gallery/IMG_1817.jpg",
                alt: "Parachute play outdoors",
              },
              {
                src: "/gallery/IMG_1812.jpg",
                alt: "Winter exploration",
              },
              {
                src: "/gallery/IMG_1804.jpg",
                alt: "Hands-on learning",
              },
            ].map((photo, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-lg overflow-hidden border border-card-line"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITY */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-6">
            Our Facility
          </h2>
          <p className="text-text-light leading-relaxed mb-4">
            Our programs run at 900 Dynes Rd in Ottawa, with bright classrooms
            for each class and a field beside the school for soccer in the
            warm months.
          </p>
          <p className="text-text-light leading-relaxed">
            QAF is a nut-free facility and all food brought in must be halal.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">
            Now that you know us, come join us.
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Sunday Camp still has seats available for ages 8&ndash;15.
          </p>
          <Link
            href="/sunday-camp"
            className="inline-block bg-white text-orange-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Enrol in Sunday Camp &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
