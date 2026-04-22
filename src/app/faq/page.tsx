"use client";

import { useState } from "react";

const faqData = [
  {
    category: "About the Program",
    questions: [
      {
        q: "My family doesn\u2019t speak Arabic. Will my child be able to keep up?",
        a: "Yes. A significant portion of our families are non-Arabic-speaking, and our program is built for exactly this. Young children are extraordinary language learners. By being immersed in Arabic daily, alongside Montessori-inspired visual and hands-on teaching, they absorb the language naturally. You will not need to teach Arabic at home.",
      },
      {
        q: "Is QAF fully Montessori?",
        a: "We are Montessori-inspired, not fully Montessori. We take the parts of the Montessori method that work best for our children and our mission (the prepared environment, long work cycles, practical life activities, and respect for the child\u2019s pace) and combine them with Ontario\u2019s Kindergarten Program, Arabic language learning, Islamic Studies, and Quran.",
      },
      {
        q: "Will my child be ready for Grade 1?",
        a: "Yes. Our curriculum is fully aligned with Ontario\u2019s Kindergarten Program, so your child will meet or exceed the expectations for Grade 1 readiness in any Ontario school: public, Catholic, private, or Islamic. Our graduates consistently transition smoothly.",
      },
      {
        q: "What languages are used in the classroom?",
        a: "Arabic and English are both used daily. Arabic is prioritized in morning circle, daily routines, songs, and stories. English is used for literacy and numeracy instruction in line with Ontario\u2019s curriculum. Children develop both languages in parallel.",
      },
    ],
  },
  {
    category: "Daily Life",
    questions: [
      {
        q: "What are your hours?",
        a: "Drop-off is from 8:45 to 9:00 AM, and the school day runs from 9:00 AM to 3:00 PM, Monday to Friday. Pick-up is from 3:00 to 3:15 PM. We are closed on statutory holidays and major Islamic holidays. See our school calendar for the full schedule.",
      },
      {
        q: "Do you provide meals and snacks?",
        a: "We ask families to send a packed lunch and two healthy snacks each day. QAF is a nut-free facility, so please do not send any items containing peanuts or tree nuts. All food brought into our school must be halal.",
      },
      {
        q: "What happens if my child is sick?",
        a: "Please keep your child home if they are feverish, vomiting, or have an untreated contagious illness. Notify us by email or phone by 8:45 AM. We follow Ottawa Public Health guidance on illness exclusion and return-to-school.",
      },
      {
        q: "How do you communicate with parents?",
        a: "We use ClassDojo as our primary communication platform. Every parent gets their own ClassDojo account where they can see daily photos and videos from the classroom, track their child\u2019s academic progress, receive important announcements, and message their child\u2019s teacher directly. You\u2019ll never feel out of the loop about your child\u2019s day.",
      },
    ],
  },
  {
    category: "Islam at QAF",
    questions: [
      {
        q: "Is QAF affiliated with a specific mosque or school of thought?",
        a: "QAF is independent and welcomes Muslim families from all backgrounds. Our Islamic Studies curriculum focuses on the shared fundamentals: the pillars of Islam and iman, stories of the Prophets, the beautiful names of Allah, adab, and Quran recitation, all taught in a way that honors the diversity of our ummah.",
      },
      {
        q: "How much Quran does my child memorize?",
        a: "By the end of SK, children typically memorize between 7 and 10 short surahs from Juz Amma, along with the core daily duas. We prioritize understanding and love for the Quran over speed of memorization. Children learn at a pace that feels joyful, not forced.",
      },
      {
        q: "What is your approach to discipline?",
        a: "We use positive, relationship-based guidance rooted in Islamic adab and Montessori principles. We do not use shaming, exclusion, or physical discipline. Children learn to name feelings, resolve conflict, make du\u2019a, and repair relationships.",
      },
    ],
  },
  {
    category: "Admissions & Fees",
    questions: [
      {
        q: "What does it cost to attend QAF?",
        a: "Tuition is $690 per month, billed over 10 months (September to June), plus a one-time annual resource and supplies fee of $190. All fees are summarized on our Admissions page.",
      },
      {
        q: "Is the resource fee refundable?",
        a: "No. The $190 annual resource and supplies fee is non-refundable. It covers materials purchased specifically for your child\u2019s year at QAF.",
      },
      {
        q: "Do you offer sibling discounts or financial aid?",
        a: "Yes, we offer a sibling discount for families with more than one child enrolled. Contact admissions@qafschool.ca for details.",
      },
      {
        q: "When should I apply?",
        a: "We accept applications year-round, but priority is given to families who apply early. Because our program is small, spaces fill quickly, so the earlier you apply, the better.",
      },
    ],
  },
];

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
              href="mailto:info@qafschool.ca"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              info@qafschool.ca
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
