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
    slug: "why-choose-qaf-islamic-school-ottawa",
    title: "Why Choose QAF Islamic School in Ottawa?",
    excerpt:
      "Choosing a school is one of the biggest decisions a Muslim family makes. Here is an honest, detailed look at what makes QAF different — faith, Arabic, Montessori-inspired learning, and Ontario curriculum alignment, all under one roof.",
    metaDescription:
      "Why choose QAF Islamic School in Ottawa? Compare our Islamic JK & SK kindergarten: daily Arabic immersion, Quran, Montessori-inspired learning, Ontario curriculum, tuition, and daily schedule.",
    image: "/gallery/IMG_3075.jpg",
    date: "August 31, 2026",
    category: "Choosing a School",
    relatedSlugs: ["islamic-schools-in-ottawa-guide", "ottawa-islamic-school-fees-explained", "why-early-arabic-immersion-matters", "montessori-meets-islamic-values"],
    faqs: [
      {
        q: "What ages does QAF Islamic School accept?",
        a: "QAF offers Junior Kindergarten (JK) and Senior Kindergarten (SK) for children ages 4 and 5. Children should turn 4 by December 31 of the school year for JK.",
      },
      {
        q: "How much does QAF Islamic School cost?",
        a: "Tuition is $690 per month, billed September through June (10 months), plus a $190 annual resource and supplies fee. That works out to $6,900 in tuition per school year.",
      },
      {
        q: "Do children need to speak Arabic to enrol at QAF?",
        a: "No. Many QAF families do not speak Arabic at home. Our daily Arabic immersion approach is designed so children absorb the language naturally through songs, routines, stories, and play — no prior Arabic is needed.",
      },
      {
        q: "Will my child be ready for Grade 1 after QAF?",
        a: "Yes. Our program is fully aligned with Ontario's Kindergarten Program, so QAF graduates meet or exceed Grade 1 readiness expectations for any Ontario school — public, Catholic, private, or Islamic.",
      },
    ],
  },
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
    relatedSlugs: ["islamic-montessori-school-ottawa", "building-islamic-identity-in-early-years"],
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
  {
    slug: "islamic-schools-in-ottawa-guide",
    title: "Islamic Schools in Ottawa: A Parent\u2019s Guide for 2026/2027",
    excerpt:
      "Ottawa has more Islamic education options than most parents realize \u2014 full-time elementary schools, specialized kindergartens, weekend programs, and Quran academies. Here is an honest map of the landscape and how to choose well.",
    metaDescription:
      "Compare Islamic schools in Ottawa: full-time K\u20138 schools, Islamic kindergartens, and weekend programs. What to look for, questions to ask on tours, and how QAF fits in.",
    image: "/gallery/IMG_1795.jpg",
    date: "September 2, 2026",
    category: "Choosing a School",
    relatedSlugs: ["why-choose-qaf-islamic-school-ottawa", "ottawa-islamic-school-fees-explained", "islamic-montessori-school-ottawa", "muslim-daycare-ottawa-guide"],
    faqs: [
      {
        q: "How many Islamic schools are there in Ottawa?",
        a: "Ottawa is home to several full-time Islamic elementary schools (such as Abraar School, Ottawa Islamic School, Ahlul-Bayt Islamic School, and Tarbiyah Learning Academy), specialized early-years programs like QAF School, and many weekend and evening Quran and Arabic programs run through local masajid. Offerings change from year to year, so always confirm details directly with each school.",
      },
      {
        q: "What is the best Islamic school in Ottawa?",
        a: "There is no single answer \u2014 the best school is the one that fits your child\u2019s age, learning style, and your family\u2019s priorities. Compare the depth of the Arabic and Quran program, class sizes, teaching approach, Ontario curriculum alignment, location, and fees. Then visit in person: fifteen minutes inside a classroom tells you more than any website.",
      },
      {
        q: "What ages does QAF School serve?",
        a: "QAF School specializes in the early years: Junior Kindergarten (JK) and Senior Kindergarten (SK) for children ages 4 and 5. Because we focus exclusively on kindergarten, everything \u2014 the classroom, materials, daily rhythm, and teaching approach \u2014 is purpose-built for this age group.",
      },
      {
        q: "Do Islamic schools in Ottawa follow the Ontario curriculum?",
        a: "Most established Islamic schools in Ottawa align their academic program with Ontario curriculum expectations, adding Islamic Studies, Quran, and Arabic on top. QAF\u2019s program is fully aligned with Ontario\u2019s Kindergarten Program, so children transition smoothly into Grade 1 at any school in the province.",
      },
    ],
  },
  {
    slug: "ottawa-islamic-school-fees-explained",
    title: "Ottawa Islamic School Fees Explained: What Tuition Really Costs",
    excerpt:
      "Islamic school fees in Ottawa can feel opaque \u2014 tuition, registration fees, resource fees, and extras that only appear after you apply. Here is a transparent breakdown of how fees work, including exactly what QAF charges.",
    metaDescription:
      "What do Islamic school fees in Ottawa really cost? See how tuition structures work and QAF\u2019s transparent pricing: $690/month plus a $190 annual resource fee.",
    image: "/gallery/IMG_1803.jpg",
    date: "September 3, 2026",
    category: "Admissions",
    relatedSlugs: ["islamic-schools-in-ottawa-guide", "why-choose-qaf-islamic-school-ottawa"],
    faqs: [
      {
        q: "How much does Islamic school cost in Ottawa?",
        a: "Fees vary significantly by school, grade level, and what is included. Beyond monthly or annual tuition, most schools charge a registration or application fee plus annual resource, activity, or supply fees. Always ask for the total yearly cost in writing \u2014 including every mandatory fee \u2014 before comparing schools.",
      },
      {
        q: "How much does QAF School cost per year?",
        a: "QAF tuition is $690 per month, billed September through June (10 months), which totals $6,900 per school year. The only other mandatory charge is a $190 annual resource and supplies fee, bringing the full cost to $7,090 per year. There are no hidden fees.",
      },
      {
        q: "What does QAF tuition include?",
        a: "Tuition covers the full school day (9:00 AM to 3:00 PM), all instruction \u2014 Ontario-aligned academics, daily Arabic immersion, Quran, and Islamic Studies \u2014 plus Montessori-inspired classroom materials and daily communication through ClassDojo. The $190 resource fee covers consumable supplies for the year.",
      },
      {
        q: "When is tuition due and how do payments work?",
        a: "Tuition is billed on the 1st of each month from September to June. The $190 resource fee is due once per school year at enrollment. If you have questions about the payment schedule, contact us at admin@qafschool.ca and we will walk you through it.",
      },
    ],
  },
  {
    slug: "muslim-daycare-ottawa-guide",
    title: "Muslim Daycare in Ottawa: A Parent\u2019s Guide to Islamic Child Care",
    excerpt:
      "When parents search for a \u201cMuslim daycare near me,\u201d they are really looking for four things: halal food, Islamic values, Arabic exposure, and people they trust. Here is how to evaluate your options in Ottawa \u2014 and when a kindergarten is the better fit.",
    metaDescription:
      "Searching for a Muslim daycare in Ottawa? Learn what to look for in Islamic child care \u2014 halal food, duas, Arabic \u2014 and when an Islamic JK/SK program fits better.",
    image: "/gallery/IMG_1799.jpg",
    date: "September 4, 2026",
    category: "Choosing a School",
    relatedSlugs: ["islamic-schools-in-ottawa-guide", "what-a-day-looks-like-at-qaf"],
    faqs: [
      {
        q: "Is there a Muslim daycare near me in Ottawa?",
        a: "Ottawa has a growing number of Muslim-run home daycares and licensed child care centres, particularly in the south and west ends. For children ages 4\u20135, there is another option many parents overlook: a full-day Islamic kindergarten like QAF School at 900 Dynes Rd, which provides a structured JK/SK education with Arabic, Quran, and Islamic values built into every day.",
      },
      {
        q: "Is QAF School a daycare?",
        a: "No \u2014 QAF is a private Islamic school offering Junior and Senior Kindergarten for ages 4 and 5, running 9:00 AM to 3:00 PM, September through June. Unlike daycare, children follow a structured Ontario-aligned academic program with daily Arabic immersion, Quran, and Montessori-inspired learning.",
      },
      {
        q: "What should I look for in an Islamic daycare or preschool?",
        a: "Look for halal food practices, daily duas and Islamic routines taught with warmth, Arabic exposure, low child-to-educator ratios, a clean and organized environment, transparent daily communication with parents, and \u2014 for centres \u2014 proper licensing under Ontario\u2019s Child Care and Early Years Act.",
      },
      {
        q: "Does QAF provide halal food?",
        a: "Families pack their child\u2019s lunch and two snacks each day, and all food brought into the school must be halal. QAF is also a nut-free facility. Children practice bismillah before eating and the adab of sharing a meal together every day.",
      },
    ],
  },
  {
    slug: "islamic-montessori-school-ottawa",
    title: "Islamic Montessori School in Ottawa: What to Look For",
    excerpt:
      "\u201cIslamic Montessori\u201d is one of the fastest-growing searches among Muslim parents \u2014 and one of the least understood labels. Here is what it actually means, how to tell substance from marketing, and what to look for in a classroom.",
    metaDescription:
      "Looking for an Islamic Montessori school in Ottawa? Learn what Montessori-inspired really means, what to look for in a classroom, and how QAF blends both.",
    image: "/gallery/IMG_1806.jpg",
    date: "September 5, 2026",
    category: "Our Approach",
    relatedSlugs: ["montessori-meets-islamic-values", "islamic-schools-in-ottawa-guide"],
    faqs: [
      {
        q: "Is there an Islamic Montessori school in Ottawa?",
        a: "Yes \u2014 QAF School offers a Montessori-inspired Islamic Junior and Senior Kindergarten in Ottawa for ages 4\u20135, combining the prepared environment, hands-on materials, and long work cycles of the Montessori method with daily Arabic immersion, Quran, and Ontario\u2019s Kindergarten Program.",
      },
      {
        q: "What is the difference between a certified Montessori school and a Montessori-inspired one?",
        a: "Certified Montessori schools are accredited by organizations like AMI or AMS and follow the method in full, including multi-age classrooms spanning three years. Montessori-inspired programs like QAF adopt the elements that best serve their students \u2014 the prepared environment, self-directed work, hands-on materials \u2014 while integrating other frameworks, in our case Ontario\u2019s Kindergarten Program and an Islamic curriculum. Ask any school which specific elements they practice daily.",
      },
      {
        q: "Is the Montessori method compatible with Islamic education?",
        a: "Deeply so. Both are built on profound respect for the child, learning through purposeful activity, care for the environment, and the cultivation of self-discipline from within \u2014 which mirrors the Islamic concept of tarbiyah. Grace and courtesy lessons in Montessori map naturally onto Islamic adab.",
      },
      {
        q: "What Montessori elements does QAF use every day?",
        a: "A prepared environment with child-sized furniture and open shelves, an uninterrupted morning work cycle where children choose hands-on materials at their own pace, practical life activities, and grace-and-courtesy taught as Islamic adab. We combine these with structured Ontario-aligned literacy and numeracy, Arabic immersion, and Quran.",
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
