export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    category: "Our Programs",
    questions: [
      {
        q: "What programs does QAF offer?",
        a: "Two weekly programs at 900 Dynes Rd, Ottawa. Sunday Camp (ages 8\u201315, Sundays 11 AM\u20133 PM) covers Quran, Arabic reading and writing, math & STEM, and soccer. The Tuesday Evening Program (ages 9\u201313, Tuesdays 6\u20138:30 PM) focuses on Quran, Tajweed, and Sira.",
      },
      {
        q: "Are there seats available?",
        a: "Sunday Camp has seats available and you can enrol online. The Tuesday program is currently full, but you can join the waitlist and we\u2019ll contact you when a seat opens.",
      },
      {
        q: "My family doesn\u2019t speak Arabic. Will my child be able to keep up?",
        a: "Yes. Many QAF families do not speak Arabic at home. Classes are grouped by level, and we start from wherever your child is.",
      },
      {
        q: "How are classes grouped?",
        a: "By age and level. Sunday Camp has a junior and a senior class, each with its own room and teacher. Quran groups in both programs are split further by level.",
      },
    ],
  },
  {
    category: "Islam at QAF",
    questions: [
      {
        q: "Is QAF affiliated with a specific mosque or school of thought?",
        a: "QAF is independent and welcomes Muslim families from all backgrounds. We focus on the shared fundamentals: the Quran, the life of the Prophet \uFDFA, the pillars of Islam and iman, and adab.",
      },
      {
        q: "What is your approach to discipline?",
        a: "We use positive, relationship-based guidance rooted in Islamic adab. We do not use shaming, exclusion, or physical discipline.",
      },
    ],
  },
  {
    category: "Fees & Enrolment",
    questions: [
      {
        q: "How much does Sunday Camp cost?",
        a: "$190 per month for the camp year, September to June. You pay month to month with no long-term commitment.",
      },
      {
        q: "How do I join the Tuesday program waitlist?",
        a: "Fill out the short form on the Tuesday Program page. Your child is added to the waitlist right away, and we\u2019ll be in touch as soon as a seat opens.",
      },
      {
        q: "What should my child bring?",
        a: "A water bottle and, for Sunday Camp, a packed snack and clothes they can play soccer in. QAF is a nut-free facility and all food brought in must be halal.",
      },
    ],
  },
];
