import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About QAF · Islamic Kindergarten Ottawa · Qabas Academic Foundation",
  description:
    "Meet QAF, Ottawa's Islamic JK/SK serving families since 2021. Learn our Montessori-inspired philosophy, meet our team, and see what makes us different.",
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
            QAF, the Qabas Academic Foundation, is an Islamic Junior and Senior
            Kindergarten in Ottawa, serving families who want their child&rsquo;s
            earliest years of formal learning to be shaped by faith, language,
            and purposeful play.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-5 text-text-light leading-relaxed">
            <p>
              QAF was founded in 2021 by Ottawa families who wanted something
              their city did not yet have: a kindergarten where children would be
              surrounded by Arabic every day, where Islamic identity would be
              woven into the rhythm of the classroom, and where learning would be
              shaped by the best of modern pedagogy, including the Montessori
              method.
            </p>
            <p>
              We started small. One classroom, a handful of families, and a
              clear conviction: that the years between 4 and 5 are among the
              most formative in a child&rsquo;s life, and that the language,
              environment, and values a child absorbs in those years stay with
              them forever.
            </p>
            <p>
              Since then, QAF has grown into a warm community of families from
              across Ottawa. We remain intentionally small, because knowing
              every child by name is not a feature; it is the entire point.
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
            Tarbiyah, in a prepared environment
          </p>
          <div className="space-y-5 text-text-light leading-relaxed mb-12">
            <p>
              We believe every child arrives with fitrah, a pure, natural
              disposition toward truth, beauty, and their Creator. Our job is
              not to fill a child with information but to prepare an environment
              where that fitrah can unfold.
            </p>
            <p>
              That is why our approach is Montessori-inspired. Maria
              Montessori&rsquo;s insight, that children learn best through
              purposeful, hands-on engagement with thoughtfully chosen
              materials, aligns deeply with the Islamic tradition of tarbiyah:
              the patient, holistic nurture of body, mind, heart, and soul.
            </p>
            <p>
              We say Montessori-inspired, not Montessori-pure, because we also
              teach to Ontario&rsquo;s Kindergarten Program, and we integrate
              Islamic Studies, Quran, and Arabic in ways the classical Montessori
              curriculum does not include. What we take from Montessori is the
              respect for the child, for the environment, and for the belief
              that children are not empty vessels to be filled but whole people
              to be nurtured.
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
                text: "Children hear it, speak it, sing it, and absorb it, not as a school subject but as a daily companion.",
              },
              {
                title: "Ontario-aligned rigor",
                text: "Every child leaves QAF meeting or exceeding Ontario\u2019s Kindergarten Program expectations, ready for Grade 1.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-border"
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
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-border"
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

      {/* MEET OUR TEAM */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Meet Our Team
          </h2>
          <p className="text-text-light leading-relaxed mb-8">
            Our educators are what make QAF, QAF. Each one is chosen not just
            for their credentials but for the warmth they bring to our
            classroom.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl p-6 shadow-sm border border-border text-center"
              >
                <div className="w-24 h-24 rounded-full bg-cream mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-orange/40">&#128100;</span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-1">
                  Educator Name
                </h3>
                <p className="text-orange-dark text-sm font-medium mb-2">
                  Role &middot; RECE
                </p>
                <p className="text-text-light text-sm">
                  Languages: English, Arabic
                </p>
              </div>
            ))}
          </div>
          <p className="text-text-light text-sm mt-6 italic text-center">
            Staff profiles coming soon. Please check back or visit us during a
            tour to meet the team in person.
          </p>
        </div>
      </section>

      {/* FACILITY */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-6">
            Our Facility
          </h2>
          <p className="text-text-light leading-relaxed mb-4">
            Our classroom is designed for 4- and 5-year-olds, with child-sized
            furniture, materials within reach, natural light, and clear zones
            for quiet work, circle time, and movement. Safety standards meet or
            exceed Ontario requirements.
          </p>
          <p className="text-text-light leading-relaxed mb-4">
            Our outdoor play area is fenced, age-appropriate, and supervised at
            all times. QAF is a nut-free facility and all food must be halal.
          </p>
          <p className="text-text-light leading-relaxed">
            Parents stay connected to their child&rsquo;s day through ClassDojo,
            where they receive photos, videos, and progress updates directly
            from our educators.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">
            Now that you know us, come meet us.
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Book a tour, walk through our classroom, and see whether QAF feels
            like the right first school for your child.
          </p>
          <Link
            href="/admissions#tour"
            className="inline-block bg-white text-orange-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Book a Tour &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
