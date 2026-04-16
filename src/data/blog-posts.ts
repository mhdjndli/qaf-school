export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  image: string;
  date: string;
  category: string;
  relatedSlugs: string[];
  faqs: BlogFAQ[];
}

export const posts: BlogPost[] = [
  {
    slug: "why-early-arabic-immersion-matters",
    title: "Why Early Arabic Immersion Matters for Your Child",
    excerpt:
      "Children between ages 3 and 6 are in a critical window for language acquisition. At QAF, we harness this natural ability by immersing children in Arabic every single day.",
    metaDescription:
      "Learn why early Arabic immersion at QAF gives children stronger cognitive skills, deeper cultural identity, and a lifelong connection to the Quran. Ottawa Islamic kindergarten.",
    image: "/gallery/IMG_1809.jpg",
    date: "March 15, 2026",
    category: "Arabic Language",
    relatedSlugs: ["montessori-meets-islamic-values", "what-a-day-looks-like-at-qaf"],
    faqs: [
      {
        q: "Does my child need to speak Arabic at home to succeed at QAF?",
        a: "Not at all. A large number of QAF families do not speak Arabic at home. Our immersion environment is designed to teach Arabic naturally through daily routines, songs, and hands-on activities. Children absorb the language just by being in the classroom every day.",
      },
      {
        q: "How quickly will my child start speaking Arabic?",
        a: "Most children begin using simple Arabic greetings, numbers, and classroom vocabulary within the first few weeks. By the end of the first term, parents typically notice their child counting in Arabic, using common phrases, and singing Arabic songs at home.",
      },
      {
        q: "Will learning Arabic slow down my child's English development?",
        a: "Research consistently shows that bilingual children do not fall behind in their primary language. In fact, learning a second language strengthens cognitive flexibility, problem-solving, and literacy skills in both languages. Our program is fully aligned with Ontario's Kindergarten Program for English literacy.",
      },
      {
        q: "What Arabic skills will my child have by the end of Senior Kindergarten?",
        a: "By the end of SK, children can typically recognize Arabic letters in all three positions (initial, medial, final), hold a simple conversation with a teacher or peer, understand classroom instructions in Arabic, and recite short surahs from Juz Amma with confidence.",
      },
    ],
  },
  {
    slug: "montessori-meets-islamic-values",
    title: "How Montessori-Inspired Learning Aligns with Islamic Tarbiyah",
    excerpt:
      "The Montessori method and Islamic tarbiyah share a beautiful common ground: both place deep respect for the child at the center of education.",
    metaDescription:
      "Discover how QAF combines Montessori-inspired methods with Islamic tarbiyah to nurture the whole child. Learn about our unique approach in Ottawa.",
    image: "/gallery/IMG_1805.jpg",
    date: "February 28, 2026",
    category: "Our Approach",
    relatedSlugs: ["building-islamic-identity-in-early-years", "why-early-arabic-immersion-matters"],
    faqs: [
      {
        q: "Is QAF a certified Montessori school?",
        a: "QAF is Montessori-inspired, not a certified Montessori school. We adopt the elements of the Montessori method that best serve our students, including the prepared environment, hands-on materials, long work cycles, and respect for the child's pace. We combine these with Ontario's Kindergarten Program and our Islamic curriculum.",
      },
      {
        q: "What does a 'prepared environment' look like at QAF?",
        a: "Our classroom features child-sized furniture, open shelves with materials organized by subject area, defined zones for quiet work, circle time, art, and movement, and natural light. Every material is placed at the child's level so they can choose their work independently.",
      },
      {
        q: "How does tarbiyah differ from conventional education?",
        a: "Tarbiyah is the Islamic concept of holistic nurturing: developing the body, mind, heart, and soul together. Unlike conventional education that focuses primarily on academics, tarbiyah emphasizes character (adab), spiritual awareness, and the child's relationship with Allah alongside intellectual growth.",
      },
      {
        q: "Can my child transition from QAF to a public school for Grade 1?",
        a: "Absolutely. Our curriculum is fully aligned with Ontario's Kindergarten Program. Children who graduate from QAF meet or exceed all provincial expectations for Grade 1 readiness, whether they move to a public, Catholic, private, or Islamic school.",
      },
    ],
  },
  {
    slug: "what-a-day-looks-like-at-qaf",
    title: "What a Day Looks Like at QAF: From Drop-Off to Pick-Up",
    excerpt:
      "Parents often ask us what their child will actually do all day. Here is a walk-through of a typical day at QAF so you can picture exactly what your child's experience will be.",
    metaDescription:
      "A detailed look at a typical day at QAF Islamic kindergarten in Ottawa. From morning duas to outdoor play, see how your child spends their day.",
    image: "/gallery/IMG_1800.jpg",
    date: "February 10, 2026",
    category: "Daily Life",
    relatedSlugs: ["preparing-your-child-for-grade-1", "why-early-arabic-immersion-matters"],
    faqs: [
      {
        q: "What time does drop-off and pick-up happen?",
        a: "Drop-off is between 8:45 and 9:00 AM. The school day runs from 9:00 AM to 3:00 PM. Pick-up is from 3:00 to 3:15 PM. We ask all families to be punctual so we can begin our morning circle together.",
      },
      {
        q: "Does my child need to bring lunch?",
        a: "Yes, families send a packed lunch and two healthy snacks each day. QAF is a nut-free facility. All food must be halal. We practice bismillah before eating and adab at the table as part of our daily routine.",
      },
      {
        q: "How do I know what my child did during the day?",
        a: "We use ClassDojo as our parent communication platform. Every parent receives their own ClassDojo account where you will see daily photos, videos, and updates from the classroom. You can also message your child's teacher directly at any time.",
      },
      {
        q: "What happens if my child is not used to a full-day program?",
        a: "Our daily rhythm includes a balance of active and quiet periods, including a rest time after lunch for children who need it. The Montessori-inspired structure gives children the predictability they need to feel safe, while allowing enough flexibility to follow their curiosity.",
      },
    ],
  },
  {
    slug: "preparing-your-child-for-grade-1",
    title: "How QAF Prepares Your Child for a Confident Start in Grade 1",
    excerpt:
      "One of the most common questions we hear from parents is: will my child be ready for Grade 1? The answer is yes, and here is exactly how we get them there.",
    metaDescription:
      "Learn how QAF's Ontario-aligned curriculum, Montessori methods, and Arabic immersion prepare children for a confident transition to Grade 1 in any Ottawa school.",
    image: "/gallery/IMG_1798.jpg",
    date: "January 22, 2026",
    category: "Academics",
    relatedSlugs: ["what-a-day-looks-like-at-qaf", "montessori-meets-islamic-values"],
    faqs: [
      {
        q: "Is QAF's curriculum aligned with Ontario standards?",
        a: "Yes. Our curriculum is fully aligned with Ontario's Kindergarten Program. We teach to all four frames of learning: Belonging and Contributing, Self-Regulation and Well-Being, Demonstrating Literacy and Mathematics Behaviours, and Problem Solving and Innovating.",
      },
      {
        q: "What academic skills will my child have by the end of SK?",
        a: "By the end of Senior Kindergarten, children at QAF can read simple English sentences, write their name and short words, count and work with numbers to 50, recognize Arabic letters in all three positions, recite 7 to 10 short surahs, and hold a simple conversation in Arabic.",
      },
      {
        q: "Will my child be behind in English because of the Arabic focus?",
        a: "No. Research shows that bilingual education strengthens, not weakens, literacy in the primary language. Our English literacy and numeracy instruction follows Ontario's curriculum expectations, so your child will be fully prepared for Grade 1 English standards.",
      },
      {
        q: "Do QAF graduates succeed in Grade 1?",
        a: "100% of our graduates enter Grade 1 meeting or exceeding Ontario benchmarks. They transition smoothly into public, Catholic, private, and Islamic schools across Ottawa. Parents consistently report that their children feel confident and well-prepared.",
      },
    ],
  },
  {
    slug: "building-islamic-identity-in-early-years",
    title: "Building a Strong Islamic Identity in the Early Years",
    excerpt:
      "The years between 4 and 6 are when children begin to form their sense of self. At QAF, we believe this is the perfect time to plant the seeds of a joyful, confident Islamic identity.",
    metaDescription:
      "How QAF nurtures a joyful Islamic identity in young children through daily duas, Quran, stories of the Prophets, and adab. Ottawa's Islamic kindergarten.",
    image: "/gallery/IMG_1804.jpg",
    date: "January 5, 2026",
    category: "Islamic Education",
    relatedSlugs: ["montessori-meets-islamic-values", "what-a-day-looks-like-at-qaf"],
    faqs: [
      {
        q: "Is QAF affiliated with a specific mosque or school of thought?",
        a: "QAF is independent and welcomes Muslim families from all backgrounds. Our Islamic Studies curriculum focuses on the shared fundamentals: the pillars of Islam and iman, stories of the Prophets, the beautiful names of Allah, adab, and Quran recitation, all taught in a way that honors the diversity of our ummah.",
      },
      {
        q: "How much Quran will my child memorize?",
        a: "By the end of Senior Kindergarten, children typically memorize between 7 and 10 short surahs from Juz Amma, along with core daily duas (waking, eating, leaving the home, entering the washroom). We prioritize understanding and love for the Quran over speed.",
      },
      {
        q: "What is your approach to teaching Islam to young children?",
        a: "Our approach is rooted in love, not fear. We tell the stories of the Prophets with warmth and wonder, teach the beautiful names of Allah as a way of understanding the world, and practice adab as a way of being. Children learn through immersion, not lectures.",
      },
      {
        q: "How do you handle discipline from an Islamic perspective?",
        a: "We use positive, relationship-based guidance rooted in Islamic adab and Montessori principles. We do not use shaming, exclusion, or physical discipline. Children learn to name feelings, resolve conflict, make du'a, and repair relationships. Our classroom agreements are set with the children, not imposed on them.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return slugs.map((s) => posts.find((p) => p.slug === s)).filter(Boolean) as BlogPost[];
}
