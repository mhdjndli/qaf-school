import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog · QAF Islamic Kindergarten Ottawa",
  description:
    "Insights, tips, and stories from QAF. Learn about Islamic early education, Arabic immersion, Montessori-inspired learning, and life at our Ottawa kindergarten.",
};

const posts = [
  {
    slug: "why-early-arabic-immersion-matters",
    title: "Why Early Arabic Immersion Matters for Your Child",
    excerpt:
      "Children between ages 3 and 6 are in a critical window for language acquisition. At QAF, we harness this natural ability by immersing children in Arabic every single day. Research consistently shows that children who learn a second language early develop stronger cognitive flexibility, better problem-solving skills, and a deeper cultural identity. For Muslim families, early Arabic also builds a lifelong connection to the Quran and Islamic scholarship.",
    image: "/gallery/IMG_1809.jpg",
    date: "March 15, 2026",
    category: "Arabic Language",
    body: [
      "At QAF, Arabic is not a subject that happens once a week. It is woven into every part of the day. Morning greetings happen in Arabic. Songs are sung in Arabic. Classroom routines, from lining up to washing hands, are narrated in Arabic. This constant, natural exposure is what linguists call \"immersion,\" and it is the most effective way for young children to acquire a new language.",
      "Many of our families do not speak Arabic at home, and that is perfectly fine. In fact, one of the most rewarding parts of our program is watching children from non-Arabic-speaking households begin counting, greeting, and even telling stories in Arabic within just a few months. Young children do not need textbooks or grammar drills. They need a rich environment where the language is alive, and that is exactly what we provide.",
      "By the end of Senior Kindergarten, our students can recognize Arabic letters in all three positions, hold a simple conversation with a teacher or peer, and recite short surahs with confidence. These are not just academic milestones. They are the foundation for a child who will grow up feeling at home in the Arabic language and connected to their faith.",
    ],
  },
  {
    slug: "montessori-meets-islamic-values",
    title: "How Montessori-Inspired Learning Aligns with Islamic Tarbiyah",
    excerpt:
      "The Montessori method and Islamic tarbiyah share a beautiful common ground: both place deep respect for the child at the center of education. At QAF, we combine these two traditions to create a learning environment that nurtures the whole child, body, mind, heart, and soul.",
    image: "/gallery/IMG_1805.jpg",
    date: "February 28, 2026",
    category: "Our Approach",
    body: [
      "Maria Montessori believed that children learn best when they are given the freedom to explore purposeful materials at their own pace, in a carefully prepared environment. This vision resonates deeply with the Islamic concept of fitrah, the idea that every child is born with a natural disposition toward truth, beauty, and their Creator. Our job as educators is not to impose knowledge but to create the conditions where a child\u2019s fitrah can unfold.",
      "In practice, this looks like a classroom where children choose their work from a range of hands-on materials. A child might spend 20 minutes carefully pouring water from one container to another (a Montessori practical life exercise that builds concentration and fine motor skills), then move to tracing Arabic letters in a sand tray, then join a small group for a story about Prophet Ibrahim. Each activity is purposeful, and each is offered with respect for the child\u2019s readiness.",
      "We say \"Montessori-inspired\" because we also teach to Ontario\u2019s Kindergarten Program, and we integrate Islamic Studies and Quran in ways the classical Montessori curriculum does not include. What we take from Montessori is the philosophy: observe the child, prepare the environment, and trust the process. What we add is the Islamic framework that gives that process its deepest meaning.",
    ],
  },
  {
    slug: "what-a-day-looks-like-at-qaf",
    title: "What a Day Looks Like at QAF: From Drop-Off to Pick-Up",
    excerpt:
      "Parents often ask us what their child will actually do all day. Here is a walk-through of a typical day at QAF, from the moment your child arrives to the moment they leave, so you can picture exactly what your child\u2019s experience will be.",
    image: "/gallery/IMG_1800.jpg",
    date: "February 10, 2026",
    category: "Daily Life",
    body: [
      "The day begins between 8:45 and 9:00 AM as children arrive for drop-off. They are greeted warmly in Arabic by their teacher and settle into the prepared environment, choosing a quiet activity to ease into the morning. This transition time is gentle and intentional. It gives each child a calm start and lets our educators connect with every family at the door.",
      "At 9:00, we gather for morning circle. This is one of the most special parts of the day. Children sit together, say their morning duas, review the calendar and weather, and listen to a short surah. The teacher introduces the theme for the day, and the room fills with voices reciting together. From 9:20 to 11:00, children enter the work cycle: a long, uninterrupted block where they engage with Montessori-inspired materials alongside Ontario literacy and numeracy activities.",
      "After outdoor play and lunch (where we practice bismillah and the adab of eating together), the afternoon brings Arabic lessons, Islamic Studies, art, music, and science exploration. The day ends with a closing circle at 3:00 PM, where we reflect, say our closing dua, and prepare for pick-up at 3:00 to 3:15 PM. Parents often tell us their children come home full of stories about what they learned, eager to show off a new Arabic word or a craft they made.",
    ],
  },
  {
    slug: "preparing-your-child-for-grade-1",
    title: "How QAF Prepares Your Child for a Confident Start in Grade 1",
    excerpt:
      "One of the most common questions we hear from parents is: \"Will my child be ready for Grade 1?\" The answer is yes. QAF\u2019s curriculum is fully aligned with Ontario\u2019s Kindergarten Program, and our graduates consistently transition smoothly into Grade 1 in public, Catholic, private, and Islamic schools across Ottawa.",
    image: "/gallery/IMG_1798.jpg",
    date: "January 22, 2026",
    category: "Academics",
    body: [
      "Readiness for Grade 1 is about much more than knowing the alphabet or counting to 20 (though our students do both, in English and Arabic). It is about the full set of skills a child needs to thrive in a more structured classroom: the ability to focus for extended periods, to follow multi-step instructions, to work independently, to collaborate with peers, and to regulate emotions when things get hard.",
      "At QAF, these skills are built every day through the Montessori-inspired work cycle. When a child spends 30 focused minutes building a tower, sorting objects by size, or tracing letters, they are not just learning content. They are building the executive function skills (concentration, planning, self-correction) that research identifies as the strongest predictors of academic success in later years.",
      "Our students also benefit from being in a small, nurturing environment where they are truly known. Our educators track each child\u2019s progress carefully and adapt instruction to meet them where they are. By the end of Senior Kindergarten, children read simple English sentences, write their name and short words, recognize Arabic letters in all three positions, and demonstrate early understanding of the pillars of Islam. They leave QAF confident, curious, and ready for whatever comes next.",
    ],
  },
  {
    slug: "building-islamic-identity-in-early-years",
    title: "Building a Strong Islamic Identity in the Early Years",
    excerpt:
      "The years between 4 and 6 are when children begin to form their sense of self. At QAF, we believe this is the perfect time to plant the seeds of a joyful, confident Islamic identity, not through lectures, but through the daily rhythm of a classroom where faith is lived, not just taught.",
    image: "/gallery/IMG_1804.jpg",
    date: "January 5, 2026",
    category: "Islamic Education",
    body: [
      "Young children do not learn about Islam from a textbook. They learn it from the environment around them. When a child hears bismillah before every meal, says alhamdulillah when something good happens, and recites a short surah with their classmates each morning, these practices become as natural as breathing. That is the goal at QAF: to make Islamic values feel like home.",
      "Our approach to Islamic education is rooted in love, not fear. We tell the stories of the Prophets with warmth and wonder. We teach the beautiful names of Allah as a way of understanding the world. We practice adab (Islamic manners) not as a list of rules but as a way of being. Children learn to greet each other with salam, to share generously, to speak kindly, and to care for their classroom and their community.",
      "Parents often tell us that the most meaningful changes they see at home are not academic. They are spiritual. A child who starts saying morning duas without being prompted. A child who reminds a sibling to say bismillah. A child who asks to hear more about a Prophet they learned about at school. These are the signs that a strong Islamic identity is taking root, and they are the moments that make our work at QAF so deeply rewarding.",
    ],
  },
];

export default function Blog() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            The QAF Blog
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Insights, stories, and resources from Ottawa&rsquo;s Islamic
            kindergarten. Learn more about our approach to early education.
          </p>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={posts[0].image}
                alt={posts[0].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-orange-dark text-sm font-semibold uppercase tracking-wide">
                {posts[0].category}
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2 mb-4">
                {posts[0].title}
              </h2>
              <p className="text-text-light leading-relaxed mb-4 text-[0.95rem]">
                {posts[0].excerpt}
              </p>
              <p className="text-text-light/60 text-sm mb-5">{posts[0].date}</p>
              <Link
                href={`#${posts[0].slug}`}
                className="text-orange-dark font-semibold hover:underline"
              >
                Read more &rarr;
              </Link>
            </div>
          </div>

          {/* ALL POSTS GRID */}
          <div className="grid md:grid-cols-2 gap-8">
            {posts.slice(1).map((post, i) => (
              <article key={i} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <span className="text-orange-dark text-xs font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-text-light text-[0.93rem] leading-relaxed mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-text-light/60 text-sm">{post.date}</span>
                    <Link
                      href={`#${post.slug}`}
                      className="text-orange-dark font-semibold text-sm hover:underline"
                    >
                      Read more &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FULL ARTICLES */}
      <section className="py-10 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          {posts.map((post, i) => (
            <article key={i} id={post.slug} className="mb-16 last:mb-0 scroll-mt-24">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <span className="text-orange-dark text-sm font-semibold uppercase tracking-wide">
                {post.category}
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2 mb-2">
                {post.title}
              </h2>
              <p className="text-text-light/60 text-sm mb-6">{post.date}</p>
              <div className="space-y-5">
                {post.body.map((paragraph, j) => (
                  <p key={j} className="text-text-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {i < posts.length - 1 && (
                <hr className="mt-16 border-border" />
              )}
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">
            Ready to learn more about QAF?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            The best way to experience QAF is in person. Book a tour and see our
            classroom for yourself.
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
