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
  /** Last substantial content update, shown as "Updated …" and used for dateModified. */
  updated?: string;
  category: string;
  relatedSlugs: string[];
  faqs: BlogFAQ[];
  /** Shorter <title> for search results (~50 chars); falls back to title. */
  seoTitle?: string;
  /** Content language; defaults to English. */
  lang?: "en" | "fr";
}

export const posts: BlogPost[] = [
  {
    slug: "islamic-schools-near-me-ottawa",
    seoTitle: "Islamic Schools Near Me in Ottawa, by Neighbourhood",
    title: "Islamic Schools Near Me: Ottawa Neighbourhood-by-Neighbourhood Guide (2026/27)",
    excerpt:
      "Nepean, Barrhaven, Kanata, Stittsville, South Keys, Orléans: every full-time Islamic school, Muslim preschool, and weekend program in Ottawa, grouped by area so you can see what is actually close to home.",
    metaDescription:
      "Find Islamic schools near you in Ottawa: full-time schools, Muslim preschools, and weekend Quran programs in Nepean, Barrhaven, Kanata, Stittsville, and Orléans.",
    image: "/gallery/IMG_1816.jpg",
    date: "October 26, 2026",
    category: "Choosing a School",
    relatedSlugs: ["islamic-schools-in-ottawa-guide", "weekend-islamic-schools-ottawa", "muslim-daycare-ottawa-guide", "junior-kindergarten-ottawa-guide"],
    faqs: [
      {
        q: "Is there an Islamic school near me in Ottawa?",
        a: "Most likely. Ottawa has full-time Islamic schools in Nepean (Ottawa Islamic School, Ummaty School, Abraar Elementary, QAF School), the west end and Bells Corners (Abraar Secondary, Al-Furqan, Tarbiyah Learning Academy), Stittsville (Marifah School, Fitra School), Barrhaven (SNMC Albushra School), Hunt Club (Ahlul Bayt Islamic School), St. Laurent Blvd (Islamic Montessori Academy), and Orléans (Jamia Islamia), plus weekend programs across the city.",
      },
      {
        q: "Is there an Islamic school in Kanata?",
        a: "We could not find a full-time Islamic school in Kanata itself as of October 2026. Kanata families typically choose full-time schools in Stittsville, Bells Corners, or the west end, and the Kanata Muslim Association runs Hikmah Saturday School and an evening Quran school at 351 Sandhill Rd.",
      },
      {
        q: "Is there an Islamic school in Barrhaven?",
        a: "Yes. SNMC Albushra School at 3020 Woodroffe Ave offers JK to Grade 6 with Quran, Arabic, and French. Barrhaven families are also close to several Nepean schools, including QAF School's Islamic JK and SK at 900 Dynes Rd, just off Prince of Wales Dr.",
      },
      {
        q: "Is there an Islamic school in Orléans?",
        a: "Yes. Jamia Islamia at 3555 St Joseph Blvd offers JK to Grade 8. Masjid Bilal also runs a weekday-evening and weekend Quran program in the east end, and free Saturday Arabic classes run at Fallingbrook Community Elementary and St. Matthew High School.",
      },
    ],
  },
  {
    slug: "weekend-islamic-schools-ottawa",
    seoTitle: "Weekend Islamic Schools & Quran Classes in Ottawa",
    title: "Weekend Islamic Schools & Quran Classes in Ottawa: The 2026/27 List",
    excerpt:
      "Sunday schools at the Ottawa Main Mosque, Saturday Arabic and Quran programs, free school-board Arabic classes, and more: every weekend Islamic program for kids in Ottawa, organized by area.",
    metaDescription:
      "Weekend Islamic schools in Ottawa for 2026/27: Saturday and Sunday Quran, Arabic, and Islamic Studies programs by area, plus free OCDSB and OCSB Arabic classes.",
    image: "/gallery/IMG_3078.jpg",
    date: "October 26, 2026",
    category: "Weekend Programs",
    relatedSlugs: ["quran-classes-for-kids-ottawa", "arabic-classes-for-kids-ottawa", "islamic-schools-in-ottawa-guide", "islamic-schools-near-me-ottawa"],
    faqs: [
      {
        q: "Are there free Arabic classes for kids in Ottawa?",
        a: "Yes. Both the OCDSB and the OCSB run free International Languages Arabic classes for JK to Grade 8 students on Saturday mornings from 9:30 to 12:00 at schools across Ottawa, with online options too. Ontario residents pay only a small activity or materials fee, and students from any school board can register.",
      },
      {
        q: "What weekend Islamic schools are there in Ottawa?",
        a: "Options include OMA Sunday School and AlFajr School at the Ottawa Main Mosque, Om Al-Qura School, Alnour School in Westboro and Kanata, Dar-Ul-Huda School, the Kanata Muslim Association's Hikmah Saturday School, Masjid Bilal's Quran program in Orléans, and QAF Sunday Camp in Nepean for ages 8 to 15.",
      },
      {
        q: "How much do weekend Islamic schools cost in Ottawa?",
        a: "Fees vary widely. Published 2026/27 fees range from about $100 per year at OMA Sunday School and $240 per year at Alnour School to monthly programs such as QAF Sunday Camp at $190 per month, which includes four hours of Quran, Arabic, STEM, and sports every Sunday. Board-run Arabic classes are free for Ontario residents apart from a small fee.",
      },
      {
        q: "Is there a Sunday Islamic school for kids in Ottawa?",
        a: "Yes. OMA Sunday School runs Sunday mornings and AlFajr School Sunday afternoons at the Ottawa Main Mosque on Northwestern Ave, and QAF Sunday Camp runs every Sunday from 11 AM to 3 PM at 900 Dynes Rd for ages 8 to 15.",
      },
    ],
  },
  {
    slug: "junior-kindergarten-ottawa-guide",
    seoTitle: "Junior Kindergarten in Ottawa: 2027 Parent Guide",
    title: "Junior Kindergarten in Ottawa: Age Cutoffs, Registration & Choosing a School",
    excerpt:
      "Your child turns four next year and suddenly everyone is asking where they will go for JK. Here is how kindergarten works in Ontario, when Ottawa boards open registration, what private options exist, and how to choose with confidence.",
    metaDescription:
      "Starting JK in Ottawa in 2027? Ontario age cutoffs, when Ottawa boards open registration, public vs. private options, and what to ask on every tour.",
    image: "/gallery/IMG_1812.jpg",
    date: "October 12, 2026",
    category: "Choosing a School",
    relatedSlugs: ["islamic-schools-in-ottawa-guide", "ottawa-islamic-school-fees-explained", "preparing-your-child-for-grade-1", "what-a-day-looks-like-at-qaf"],
    faqs: [
      {
        q: "What age does a child start Junior Kindergarten in Ottawa?",
        a: "In Ontario, a child starts Junior Kindergarten (JK) in September of the year they turn four, as long as they turn four by December 31 of that year. Senior Kindergarten (SK) follows the next year, the year they turn five. A child born anytime in 2023 starts JK in September 2027.",
      },
      {
        q: "Is kindergarten mandatory in Ontario?",
        a: "No. Compulsory school attendance in Ontario begins at age six, so JK and SK are optional. In practice, the vast majority of Ottawa families enrol their children in kindergarten, either at a public or Catholic board school or at a private school.",
      },
      {
        q: "When does kindergarten registration open in Ottawa?",
        a: "Ottawa's public and Catholic school boards usually open kindergarten registration in the winter for the following September, and you register at the school designated for your home address. Check each board's website for the exact dates each year. Private schools set their own timelines; QAF accepts applications year-round, with priority to families who apply early.",
      },
      {
        q: "Can my child do JK at a private school and then move to a public school?",
        a: "Yes, and many families do. Because QAF's program is aligned with Ontario's Kindergarten Program, children can move to a public, Catholic, private, or Islamic school for SK or Grade 1 without falling behind.",
      },
    ],
  },
  {
    slug: "arabic-classes-for-kids-ottawa",
    seoTitle: "Arabic Classes for Kids in Ottawa (2026 Guide)",
    title: "Arabic Classes for Kids in Ottawa: A Parent’s Guide to the Options",
    excerpt:
      "Immersion kindergarten, weekend school, or a tutor? “Arabic classes for kids” can mean very different things. Here is what actually works at each age, what to ask any program, and how families who do not speak Arabic at home can still raise confident Arabic readers.",
    metaDescription:
      "Arabic classes for kids in Ottawa: immersion kindergarten, weekend school, or tutoring? What works at each age, plus QAF options for ages 4–5 and 8–15.",
    image: "/gallery/IMG_1811.jpg",
    date: "October 12, 2026",
    category: "Arabic Language",
    relatedSlugs: ["why-early-arabic-immersion-matters", "quran-classes-for-kids-ottawa", "islamic-schools-in-ottawa-guide", "what-a-day-looks-like-at-qaf"],
    faqs: [
      {
        q: "Does QAF offer Arabic classes for kids in Ottawa?",
        a: "Yes, in two ways. Children aged 4 and 5 learn Arabic through daily immersion in our Junior and Senior Kindergarten, Monday to Friday. Children aged 8 to 15 can join QAF Sunday Camp, which includes a weekly Arabic reading and writing class alongside Quran, math and STEM, and soccer, every Sunday from 11 AM to 3 PM at 900 Dynes Rd.",
      },
      {
        q: "What is the best age for a child to start learning Arabic?",
        a: "The earlier the better for pronunciation and natural fluency: ages 3 to 6 are a sensitive window for language acquisition, which is why immersion works so well in kindergarten. But it is never too late. School-age children are excellent at learning to read and write, and steady weekly classes build real skills over a school year.",
      },
      {
        q: "We don’t speak Arabic at home. Can my child still learn?",
        a: "Yes. Many QAF families do not speak Arabic at home. Programs are designed for this: kindergarten children absorb Arabic through routines, songs, and stories, and Sunday Camp juniors start from letters and reading fluency. You do not need to teach Arabic yourself; a few minutes of encouragement and practice at home makes a big difference.",
      },
      {
        q: "How much does a child learn from one Arabic class per week?",
        a: "Honestly: a weekly class builds reading and writing skills steadily over a school year, but conversational fluency needs more exposure than one class can give. Pair a weekly class with ten minutes of reading at home, Arabic songs or stories in the car, and regular Quran listening, and progress speeds up noticeably.",
      },
    ],
  },
  {
    slug: "quran-classes-for-kids-ottawa",
    seoTitle: "Quran Classes for Kids in Ottawa: Weekend Guide",
    title: "Quran Classes & Weekend Islamic School for Kids in Ottawa",
    excerpt:
      "For children in public school during the week, a good weekend program can be the anchor of their Islamic education. Here is what separates a great Sunday or Saturday school from an exhausting one, and how QAF Sunday Camp approaches Quran, Arabic, and community for ages 8 to 15.",
    metaDescription:
      "Quran classes and weekend Islamic school for kids in Ottawa: what to look for, recitation vs. hifz, and QAF Sunday Camp for ages 8–15 at $190/month.",
    image: "/gallery/IMG_3077.jpg",
    date: "October 12, 2026",
    category: "Weekend Programs",
    relatedSlugs: ["arabic-classes-for-kids-ottawa", "islamic-schools-in-ottawa-guide", "building-islamic-identity-in-early-years", "ottawa-islamic-school-fees-explained"],
    faqs: [
      {
        q: "Are there weekend Quran classes for kids in Ottawa?",
        a: "Yes. Many masajid and community centres across Ottawa run Saturday or Sunday programs, and QAF runs Sunday Camp for ages 8 to 15: Quran in small groups by level, Arabic reading and writing, math and STEM, and soccer or indoor play, every Sunday from 11 AM to 3 PM at 900 Dynes Rd.",
      },
      {
        q: "How much does QAF Sunday Camp cost?",
        a: "Sunday Camp is $190 per month for the camp year, September 2026 to June 2027. It is a simple month-to-month subscription with no long-term commitment, and it covers all four hours every Sunday.",
      },
      {
        q: "Does my child need to read Arabic already to join Quran classes?",
        a: "No. At Sunday Camp, Quran groups are split by level, so a child who is still learning letters and a child who reads fluently each work at the right pace. Juniors also have an Arabic class focused on letters and reading fluency.",
      },
      {
        q: "What is the difference between Quran recitation classes and hifz?",
        a: "Recitation classes focus on reading the Quran correctly and fluently, often with tajweed, and usually include memorizing shorter surahs. Hifz programs aim to memorize the whole Quran and demand daily, intensive review. Most children in a weekend program are building recitation and steady memorization, which is the right foundation for hifz later if the family chooses it.",
      },
    ],
  },
  {
    slug: "ecole-islamique-ottawa",
    seoTitle: "École islamique à Ottawa : maternelle et arabe",
    lang: "fr",
    title: "École islamique à Ottawa : maternelle et jardin d’enfants avec arabe et Coran",
    excerpt:
      "Vous cherchez une école islamique à Ottawa pour votre enfant de 4 ou 5 ans? Voici comment fonctionne QAF School : immersion quotidienne en arabe, Coran, approche inspirée de Montessori et programme aligné sur celui de l’Ontario.",
    metaDescription:
      "École islamique à Ottawa pour les 4 et 5 ans : maternelle et jardin d’enfants avec arabe quotidien, Coran et approche inspirée de Montessori.",
    image: "/gallery/IMG_1813.jpg",
    date: "October 12, 2026",
    category: "En français",
    relatedSlugs: ["islamic-schools-in-ottawa-guide", "why-early-arabic-immersion-matters", "ottawa-islamic-school-fees-explained", "junior-kindergarten-ottawa-guide"],
    faqs: [
      {
        q: "Y a-t-il une école islamique pour les enfants de 4 et 5 ans à Ottawa?",
        a: "Oui. QAF School offre la maternelle (JK, 4 ans) et le jardin d’enfants (SK, 5 ans) au 900, chemin Dynes, à Ottawa. Le programme combine l’immersion quotidienne en arabe, le Coran, les études islamiques et une approche inspirée de Montessori, en accord avec le programme de maternelle et de jardin d’enfants de l’Ontario.",
      },
      {
        q: "Dans quelle langue l’enseignement est-il donné?",
        a: "En arabe et en anglais. L’arabe est utilisé chaque jour pour le cercle du matin, les routines, les chansons et les histoires; l’anglais sert à la littératie et à la numératie. L’enseignement n’est pas offert en français. Beaucoup de familles francophones choisissent QAF pour que leur enfant apprenne l’arabe tout en gardant le français à la maison.",
      },
      {
        q: "Combien coûte QAF School?",
        a: "Les droits de scolarité sont de 690 $ par mois, facturés sur 10 mois (de septembre à juin), plus des frais annuels de ressources et de fournitures de 190 $. Une réduction est offerte aux familles qui inscrivent plus d’un enfant.",
      },
      {
        q: "Mon enfant doit-il déjà parler arabe?",
        a: "Non. Une grande partie de nos familles ne parlent pas arabe à la maison. Les jeunes enfants apprennent la langue naturellement grâce à l’immersion quotidienne, aux chansons et aux activités pratiques. Vous n’avez pas besoin d’enseigner l’arabe vous-même.",
      },
    ],
  },
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
    relatedSlugs: ["islamic-schools-in-ottawa-guide", "ottawa-islamic-school-fees-explained", "junior-kindergarten-ottawa-guide", "arabic-classes-for-kids-ottawa"],
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
    relatedSlugs: ["arabic-classes-for-kids-ottawa", "montessori-meets-islamic-values", "what-a-day-looks-like-at-qaf"],
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
    seoTitle: "Islamic Schools in Ottawa: 2026/27 List & Comparison",
    title: "Islamic Schools in Ottawa (2026/27): The Full List, Compared",
    excerpt:
      "Ottawa has more Islamic education options than most parents realize \u2014 full-time elementary schools, specialized kindergartens, weekend programs, and Quran academies. Here is an honest map of the landscape and how to choose well.",
    metaDescription:
      "12 Islamic schools in Ottawa for 2026/27, compared: grades, location, and programs for Ottawa Islamic School, Abraar, Tarbiyah, Albushra, and more.",
    image: "/gallery/IMG_1795.jpg",
    date: "September 2, 2026",
    updated: "October 26, 2026",
    category: "Choosing a School",
    relatedSlugs: ["islamic-schools-near-me-ottawa", "weekend-islamic-schools-ottawa", "ottawa-islamic-school-fees-explained", "junior-kindergarten-ottawa-guide"],
    faqs: [
      {
        q: "How many Islamic schools are there in Ottawa?",
        a: "As of October 2026, Ottawa has about a dozen full-time Islamic schools: Ottawa Islamic School, Abraar School, Ahlul Bayt Islamic School, Tarbiyah Learning Academy, SNMC Albushra School, Ummaty School, Marifah School, Fitra School, Al-Furqan School, Jamia Islamia, Islamic Montessori Academy, and QAF School, plus many weekend and evening Quran and Arabic programs run through local masajid. Offerings change from year to year, so always confirm details directly with each school.",
      },
      {
        q: "What is the best Islamic school in Ottawa?",
        a: "There is no single answer \u2014 the best school is the one that fits your child\u2019s age, learning style, and your family\u2019s priorities. Compare the depth of the Arabic and Quran program, class sizes, teaching approach, Ontario curriculum alignment, location, and fees. Then visit in person: fifteen minutes inside a classroom tells you more than any website.",
      },
      {
        q: "Is there an Islamic high school in Ottawa?",
        a: "Yes. Ottawa Islamic School offers JK to Grade 12 with Ontario Secondary School Diploma credits, Abraar School's secondary campus serves Grades 7 to 12, and Ahlul Bayt Islamic School runs to Grade 10. Marifah School also offers a supported online high-school credit program in an Islamic setting.",
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
    seoTitle: "Ottawa Islamic School Fees 2026/27: Real Costs",
    title: "Ottawa Islamic School Fees 2026/27: What Tuition Really Costs",
    excerpt:
      "Islamic school fees in Ottawa can feel opaque \u2014 tuition, registration fees, resource fees, and extras that only appear after you apply. Here is a transparent breakdown of how fees work, including exactly what QAF charges.",
    metaDescription:
      "What do Islamic school fees in Ottawa really cost? See how tuition structures work and QAF\u2019s transparent pricing: $690/month plus a $190 annual resource fee.",
    image: "/gallery/IMG_1803.jpg",
    date: "September 3, 2026",
    category: "Admissions",
    relatedSlugs: ["islamic-schools-in-ottawa-guide", "junior-kindergarten-ottawa-guide", "why-choose-qaf-islamic-school-ottawa", "quran-classes-for-kids-ottawa"],
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
    seoTitle: "Islamic Daycare & Muslim Preschools in Ottawa (2026)",
    title: "Islamic Daycare in Ottawa: A Parent\u2019s Guide to Muslim Child Care",
    excerpt:
      "When parents search for a \u201cMuslim daycare near me,\u201d they are really looking for four things: halal food, Islamic values, Arabic exposure, and people they trust. Here is how to evaluate your options in Ottawa \u2014 and when a kindergarten is the better fit.",
    metaDescription:
      "Islamic daycare and Muslim preschool options in Ottawa for 2026, plus what to check (halal food, duas, Arabic, licensing) and when JK/SK fits better.",
    image: "/gallery/IMG_1799.jpg",
    date: "September 4, 2026",
    updated: "October 26, 2026",
    category: "Choosing a School",
    relatedSlugs: ["islamic-schools-near-me-ottawa", "junior-kindergarten-ottawa-guide", "islamic-schools-in-ottawa-guide", "what-a-day-looks-like-at-qaf"],
    faqs: [
      {
        q: "Is there a Muslim daycare near me in Ottawa?",
        a: "Options are still limited but growing. Verified programs include MAC Preschool and Childcare at 1085 Grenon Ave (a licensed centre in the west end), Marifah School's toddler care and preschool in Stittsville, and Montessori toddler and Casa programs at Blossom Montessori and the Islamic Montessori Academy on St. Laurent Blvd. Many families also use Muslim-run home daycares found through community networks. For children ages 4\u20135, there is another option many parents overlook: a full-day Islamic kindergarten like QAF School at 900 Dynes Rd, which provides a structured JK/SK education with Arabic, Quran, and Islamic values built into every day.",
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
    seoTitle: "Islamic Montessori School in Ottawa: What to Look For",
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
