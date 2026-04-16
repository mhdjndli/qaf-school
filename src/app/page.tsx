import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(242,140,40,0.08)_0%,transparent_70%)] rounded-full" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(192,57,43,0.05)_0%,transparent_70%)] rounded-full" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-text">
            Where Faith, Language, and Learning Take Root.
          </h1>
          <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto mb-9 leading-relaxed">
            QAF is Ottawa&rsquo;s Islamic Junior and Senior Kindergarten for
            children ages 4 and 5, blending the Ontario curriculum with
            Montessori-inspired learning, daily Arabic, and a joyful Islamic
            environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions#tour"
              className="bg-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Book a Tour &rarr;
            </Link>
            <Link
              href="/program"
              className="border-2 border-orange text-orange-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange hover:text-white transition-all hover:-translate-y-0.5"
            >
              See Our Program
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PHOTO BANNER ===== */}
      <section className="py-4 bg-warm-white overflow-hidden">
        <div className="flex gap-4 animate-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-6 w-full">
            {[
              { src: "/gallery/IMG_1805.jpg", alt: "Children working together on hands-on activities" },
              { src: "/gallery/IMG_1800.jpg", alt: "Child proudly showing art project with Arabic letter" },
              { src: "/gallery/IMG_1795.jpg", alt: "Building a snowman during outdoor play" },
              { src: "/gallery/IMG_1809.jpg", alt: "Children learning with clothespin activity at the chalkboard" },
            ].map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QAF DIFFERENCE ===== */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The QAF Difference
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              Three pillars that make QAF unlike any other kindergarten in Ottawa.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                icon: "\u262A",
                color: "bg-red/10 text-red",
                title: "Faith at the Center",
                text: "Mornings begin with duas, days unfold with adab, and children hear the Quran as naturally as they hear their teacher\u2019s voice. Islam isn\u2019t a subject at QAF; it\u2019s the air we breathe.",
              },
              {
                icon: "\u270E",
                color: "bg-orange/10 text-orange",
                title: "Montessori-Inspired Learning",
                text: "We combine Ontario\u2019s Kindergarten Program with Montessori-inspired materials and practices: purposeful activities, mixed-age work, and respect for each child\u2019s pace.",
              },
              {
                icon: "\u0639",
                color: "bg-green/10 text-green",
                title: "Arabic as a Living Language",
                text: "Arabic is spoken daily in our classroom, in songs, stories, play, and transitions. Children absorb the language naturally, whether from Arabic-speaking homes or not.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 ${card.color}`}
                >
                  {card.icon}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">
                  {card.title}
                </h3>
                <p className="text-text-light leading-relaxed text-[0.95rem]">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAM AT A GLANCE ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Program at a Glance
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image src="/gallery/IMG_1798.jpg" alt="Child painting during art time" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
              <h3 className="font-heading text-2xl font-bold mb-3 text-orange-dark">
                Junior &amp; Senior Kindergarten (Ages 4&ndash;5)
              </h3>
              <p className="text-text-light leading-relaxed mb-6">
                A full-day kindergarten experience blending Ontario&rsquo;s curriculum
                with Montessori-inspired practice, daily Arabic, and Islamic values.
                Small groups, qualified educators, and a carefully prepared environment
                designed for your child&rsquo;s first steps into formal learning.
              </p>
              <Link
                href="/program"
                className="inline-block bg-orange text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-dark transition-all hover:-translate-y-0.5"
              >
                Explore the JK/SK Program &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY QAF ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Why QAF
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Small, nurturing classrooms",
                text: "A low student-to-teacher ratio means your child is seen, known, and supported every day.",
              },
              {
                title: "Qualified educators",
                text: "Our team includes RECEs and Arabic specialists, credentialed, caring, and deeply invested.",
              },
              {
                title: "Arabic-rich, not Arabic-required",
                text: "Your family does not need to speak Arabic at home. Our environment does the teaching.",
              },
              {
                title: "Ready for Grade 1 and beyond",
                text: "Our graduates leave QAF confident, bilingual, and academically prepared for any school.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-7 shadow-sm border border-border"
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

      {/* ===== A DAY AT QAF ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            A Day at QAF
          </h2>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="w-full bg-white">
              <thead className="bg-orange text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-sm">
                    Time
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm">
                    What&rsquo;s Happening
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["8:45 - 9:00 AM", "Drop-off, warm greeting in Arabic, settling into the classroom"],
                  ["9:00 - 9:20 AM", "Morning circle: duas, calendar, weather, a short surah, and the day\u2019s theme"],
                  ["9:20 - 11:00 AM", "Work cycle: Montessori-inspired activities alongside Ontario curriculum learning"],
                  ["11:00 - 11:30 AM", "Outdoor play, movement, fresh air, and free play"],
                  ["11:30 - 12:15 PM", "Lunch: Bismillah, conversation in Arabic, adab of eating"],
                  ["12:15 - 1:30 PM", "Quiet time: rest, stories, individual work for non-nappers"],
                  ["1:30 - 2:15 PM", "Arabic lesson or Islamic Studies (alternates)"],
                  ["2:15 - 3:00 PM", "Art, music, science exploration, or small-group enrichment"],
                  ["3:00 - 3:15 PM", "Pick-up, closing dua, goodbye"],
                ].map(([time, desc], i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-orange/[0.03]">
                    <td className="py-3.5 px-6 font-semibold text-orange-dark whitespace-nowrap text-sm">
                      {time}
                    </td>
                    <td className="py-3.5 px-6 text-text-light text-sm">
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== CLASSDOJO / STAY CONNECTED ===== */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
                Stay Connected with ClassDojo
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                At QAF, we believe parents should be part of their child&rsquo;s
                learning journey every step of the way. Through ClassDojo, our
                parent communication platform, you&rsquo;ll receive:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Daily photos and videos from the classroom",
                  "Updates on your child\u2019s academic progress and milestones",
                  "Direct messaging with your child\u2019s teacher",
                  "Weekly classroom stories and highlights",
                  "Important announcements and reminders",
                ].map((item, i) => (
                  <li key={i} className="pl-6 relative text-text-light text-[0.93rem] before:content-['\2713'] before:absolute before:left-0 before:text-green before:font-bold">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-text-light text-sm">
                Every parent gets their own ClassDojo account so you never miss a
                moment of your child&rsquo;s growth at QAF.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                <Image src="/gallery/IMG_1803.jpg" alt="Classroom learning activity" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                <Image src="/gallery/IMG_1806.jpg" alt="Children during group time" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                <Image src="/gallery/IMG_1802.jpg" alt="Art project in progress" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                <Image src="/gallery/IMG_1807.jpg" alt="Children reading together" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Life at QAF
          </h2>
          <p className="text-text-light text-center mb-10 text-lg">
            A glimpse into our classroom, outdoor play, and hands-on learning.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: "/gallery/IMG_1817.jpg", alt: "Parachute play outdoors" },
              { src: "/gallery/IMG_1796.jpg", alt: "Outdoor exploration in snow" },
              { src: "/gallery/IMG_1811.jpg", alt: "Winter outdoor play" },
              { src: "/gallery/IMG_1804.jpg", alt: "Learning through play" },
              { src: "/gallery/IMG_1808.jpg", alt: "Creative activities" },
              { src: "/gallery/IMG_1816.jpg", alt: "Group activity outdoors" },
              { src: "/gallery/IMG_1799.jpg", alt: "Classroom exploration" },
              { src: "/gallery/IMG_1813.jpg", alt: "Winter fun at QAF" },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARENT VOICES ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Parent Voices
          </h2>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                quote:
                  "After three months at QAF, my daughter started saying her morning duas without any prompting. Her teachers made dhikr feel like play.",
                author: "Amira",
                role: "Mother of a JK student",
              },
              {
                quote:
                  "We don\u2019t speak Arabic at home and I was nervous. By month two, my son was counting to ten in Arabic at bedtime.",
                author: "Hassan",
                role: "Father of a JK student",
              },
              {
                quote:
                  "QAF gave our SK graduate the confidence to walk into Grade 1 reading, praying, and proud of who she is.",
                author: "Fatima",
                role: "Mother of a QAF alumna",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 shadow-sm border-l-4 border-l-orange border border-border relative"
              >
                <span className="absolute top-3 left-5 text-6xl text-orange/15 font-serif leading-none">
                  &ldquo;
                </span>
                <p className="italic text-text mb-4 relative leading-relaxed text-[0.95rem]">
                  {t.quote}
                </p>
                <cite className="not-italic font-semibold text-orange-dark text-sm">
                  {t.author},{" "}
                  <span className="font-normal text-text-light">{t.role}</span>
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BY THE NUMBERS ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            By the Numbers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "2021", label: "Serving Ottawa families since" },
              { stat: "8:1", label: "Student-to-teacher ratio" },
              { stat: "3", label: "Languages in daily use" },
              { stat: "100%", label: "Graduates meet Ontario Grade 1 benchmarks" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 text-center shadow-sm border-t-4 border-t-orange"
              >
                <div className="font-heading text-4xl font-bold text-orange-dark mb-2">
                  {s.stat}
                </div>
                <p className="text-text-light text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
            See QAF for yourself.
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            The best way to understand what makes QAF different is to walk
            through the classroom. Tours run weekly during the school year.
          </p>
          <Link
            href="/admissions#tour"
            className="inline-block bg-white text-orange-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Book Your Tour &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
