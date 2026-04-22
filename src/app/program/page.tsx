import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Junior & Senior Kindergarten Program · QAF Ottawa",
  description:
    "Full-day JK and SK at QAF. Ontario curriculum, Montessori-inspired classroom, daily Arabic, Islamic values. See a day in the life and submit your inquiry.",
};

export default function Program() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            Junior &amp; Senior Kindergarten at QAF
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            A full-day, full-year kindergarten for children ages 4 and 5 where
            the Ontario curriculum meets Montessori-inspired learning, daily
            Arabic, and a deeply Islamic environment.
          </p>

          {/* Quick facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Ages", value: "4\u20135 (JK & SK)" },
              { label: "Hours", value: "9:00 AM \u2013 3:00 PM" },
              { label: "Tuition", value: "$690/month" },
              { label: "Start", value: "September 2026" },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-border">
                <p className="text-xs text-text-light uppercase tracking-wide mb-1">{f.label}</p>
                <p className="font-bold text-orange-dark text-sm">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO ROW */}
      <section className="py-4 bg-warm-white">
        <div className="grid grid-cols-3 gap-3 max-w-5xl mx-auto px-6">
          {[
            { src: "/gallery/IMG_1809.jpg", alt: "Children learning with clothespin activity" },
            { src: "/gallery/IMG_1805.jpg", alt: "Group table activity" },
            { src: "/gallery/IMG_1800.jpg", alt: "Child showing Arabic letter art" },
          ].map((img, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 33vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOUR CHILD WILL EXPERIENCE */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-3 text-center">
            What Your Child Will Experience
          </h2>
          <p className="text-text-light text-center mb-12 max-w-2xl mx-auto">
            A classroom that blends the best of three traditions: Ontario,
            Montessori, and Islamic.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "From the Ontario Kindergarten Program",
                color: "border-t-red",
                items: [
                  "Four frames of learning: Belonging, Self-Regulation, Literacy & Mathematics, Problem Solving",
                  "Play-based, inquiry-led instruction",
                  "Documented observation and reporting aligned with Ministry expectations",
                  "Smooth transition preparation for Grade 1",
                ],
              },
              {
                title: "From Montessori",
                color: "border-t-orange",
                items: [
                  "A prepared environment with materials at the child\u2019s level",
                  "Long, uninterrupted work periods that build concentration",
                  "Practical life activities that foster independence",
                  "Respect for the child\u2019s developmental pace",
                  "Mixed-age interaction that lets SKs lead and JKs learn",
                ],
              },
              {
                title: "Uniquely Islamic",
                color: "border-t-green",
                items: [
                  "Daily morning duas and the language of dhikr throughout the day",
                  "Short, age-appropriate Quran memorization (Juz Amma)",
                  "Stories of the Prophets, told with warmth and wonder",
                  "Adab woven into eating, speaking, playing, and greeting",
                  "Celebration of Ramadan, Eid, and Islamic milestones",
                ],
              },
              {
                title: "Uniquely Arabic",
                color: "border-t-orange",
                items: [
                  "Arabic spoken daily by our educators",
                  "Songs, stories, and routines happen in Arabic",
                  "Written Arabic (letters, basic words) introduced age-appropriately",
                  "Non-Arabic-speaking families warmly welcomed",
                ],
              },
            ].map((block, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl p-7 shadow-sm border border-border border-t-4 ${block.color}`}
              >
                <h3 className="font-heading text-lg font-bold mb-4">
                  {block.title}
                </h3>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="pl-5 relative text-text-light text-[0.93rem] leading-relaxed before:content-['\25B8'] before:absolute before:left-0 before:text-orange"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A DAY IN THE LIFE */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">
            A Day in the Life
          </h2>
          <p className="text-text-light text-center mb-10">
            Every day follows a rhythm: predictable enough to feel safe, flexible
            enough to follow curiosity.
          </p>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="w-full bg-white">
              <thead className="bg-orange text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-sm">Time</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm">Activity</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["8:45 - 9:00 AM", "Drop-off, free choice in the prepared environment, Arabic greetings"],
                  ["9:00 - 9:20 AM", "Morning circle: duas, calendar, weather, short surah, theme of the day"],
                  ["9:20 - 11:00 AM", "Work cycle: Montessori-inspired materials alongside Ontario literacy and numeracy"],
                  ["11:00 - 11:30 AM", "Outdoor play and movement"],
                  ["11:30 - 12:15 PM", "Lunch: bismillah, conversation in Arabic, adab at the table"],
                  ["12:15 - 1:30 PM", "Quiet time: rest for nappers, books and quiet work for others"],
                  ["1:30 - 2:15 PM", "Arabic lesson or Islamic Studies (alternates)"],
                  ["2:15 - 3:00 PM", "Art, music, science exploration, or small-group enrichment"],
                  ["3:00 - 3:15 PM", "Pick-up, closing dua, goodbye"],
                ].map(([time, activity], i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-orange/[0.03]">
                    <td className="py-3.5 px-6 font-semibold text-orange-dark whitespace-nowrap text-sm w-40">
                      {time}
                    </td>
                    <td className="py-3.5 px-6 text-text-light text-sm">{activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LEARNING OUTCOMES */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Learning Outcomes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
              <h3 className="font-heading text-xl font-bold text-orange-dark mb-5">
                By the End of JK
              </h3>
              <ul className="space-y-3">
                {[
                  "Recognize and write the letters of the English alphabet",
                  "Count to 20 and understand one-to-one correspondence",
                  "Recognize and begin writing Arabic letters",
                  "Recite 3 to 5 short surahs from Juz Amma",
                  "Know core duas: waking, eating, leaving the home, entering the washroom",
                  "Speak and understand basic classroom Arabic",
                  "Work independently for extended periods",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="pl-7 relative text-text-light text-[0.93rem] before:content-['\2713'] before:absolute before:left-0 before:text-green before:font-bold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
              <h3 className="font-heading text-xl font-bold text-orange-dark mb-5">
                By the End of SK
              </h3>
              <ul className="space-y-3">
                {[
                  "Read simple English sentences with confidence",
                  "Write their name, short words, and numbers to 50",
                  "Recognize Arabic letters in all three positions",
                  "Recite 7 to 10 short surahs and understand their meanings",
                  "Hold a simple conversation in Arabic",
                  "Demonstrate early understanding of the pillars of Islam",
                  "Transition confidently into Grade 1 in any Ontario school",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="pl-7 relative text-text-light text-[0.93rem] before:content-['\2713'] before:absolute before:left-0 before:text-green before:font-bold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            What&rsquo;s Included, What&rsquo;s Not
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-7 shadow-sm border-t-4 border-t-green">
              <h3 className="font-heading text-lg font-bold mb-4 text-green">
                Included in Tuition
              </h3>
              <ul className="space-y-2">
                {[
                  "Full JK/SK academic program",
                  "Daily Arabic and Islamic Studies",
                  "All classroom materials (via annual resource fee)",
                  "ClassDojo access for daily updates and progress tracking",
                  "Parent-teacher conferences",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="pl-6 relative text-text-light text-[0.93rem] before:content-['\2713'] before:absolute before:left-0 before:text-green before:font-bold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-7 shadow-sm border-t-4 border-t-red">
              <h3 className="font-heading text-lg font-bold mb-4 text-red">
                Not Included
              </h3>
              <ul className="space-y-2">
                {[
                  "Meals and snacks (packed from home)",
                  "Optional field trips with additional fees",
                  "QAF uniform / apparel (available via our store)",
                  "Before/after-care (if applicable)",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="pl-6 relative text-text-light text-[0.93rem] before:content-['\2717'] before:absolute before:left-0 before:text-red before:font-bold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">
            Ready to see the QAF classroom for yourself?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Submit an inquiry. We&rsquo;d love to show you around.
          </p>
          <Link
            href="/inquiry"
            className="inline-block bg-white text-orange-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Submit Inquiry &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
