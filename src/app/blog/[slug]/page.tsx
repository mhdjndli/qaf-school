"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, use } from "react";
import { posts, getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { BlogFAQ } from "@/data/blog-posts";

function FAQItem({ q, a }: BlogFAQ) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center gap-4 hover:bg-orange/[0.03] transition-colors"
      >
        <span className="font-semibold text-text text-[0.95rem]">{q}</span>
        <span
          className={`text-orange transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
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

// Content components for each blog post with internal links
function ArabicImmersionContent() {
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        At QAF, Arabic is not a subject that happens once a week. It is woven into every part of the day. Morning greetings happen in Arabic. Songs are sung in Arabic. Classroom routines, from lining up to washing hands, are narrated in Arabic. This constant, natural exposure is what linguists call &ldquo;immersion,&rdquo; and it is the most effective way for young children to acquire a new language.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">The Science Behind Early Language Learning</h2>
      <p className="text-text-light leading-relaxed">
        Research in neuroscience has shown that children between the ages of 3 and 6 are in what scientists call a &ldquo;critical period&rdquo; for language acquisition. During this window, the brain is uniquely wired to absorb new languages with remarkable efficiency. Unlike older learners who must consciously study grammar rules, young children acquire language intuitively, simply by hearing it and using it in meaningful contexts.
      </p>
      <p className="text-text-light leading-relaxed">
        Studies from the University of Washington and Harvard&rsquo;s Center on the Developing Child consistently show that bilingual children develop stronger executive function skills, including better attention control, cognitive flexibility, and working memory. These are the same skills that predict academic success in later years, which is why our{" "}
        <Link href="/program" className="text-orange-dark font-medium hover:underline">JK/SK program</Link>{" "}
        integrates Arabic immersion with Ontario&rsquo;s curriculum expectations.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What Arabic Immersion Looks Like at QAF</h2>
      <p className="text-text-light leading-relaxed">
        Every morning, children arrive between 8:45 and 9:00 AM and are greeted in Arabic by their teacher. The{" "}
        <Link href="/program" className="text-orange-dark font-medium hover:underline">daily schedule</Link>{" "}
        flows naturally between Arabic and English. Morning circle includes Arabic greetings, counting, days of the week, and a short surah. During the Montessori-inspired work cycle, many materials are labeled in both Arabic and English. Arabic songs and nasheed play during transitions. Even lunch is an Arabic learning opportunity, with children practicing food vocabulary and the adab of eating.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">For Families Who Don&rsquo;t Speak Arabic at Home</h2>
      <p className="text-text-light leading-relaxed">
        Many of our families do not speak Arabic at home, and that is perfectly fine. In fact, one of the most rewarding parts of our program is watching children from non-Arabic-speaking households begin counting, greeting, and even telling stories in Arabic within just a few months. Young children do not need textbooks or grammar drills. They need a rich environment where the language is alive, and that is exactly what we provide. Check our{" "}
        <Link href="/faq" className="text-orange-dark font-medium hover:underline">FAQ page</Link>{" "}
        for more answers to common questions about our Arabic approach.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Arabic and the Connection to Quran</h2>
      <p className="text-text-light leading-relaxed">
        For Muslim families, early Arabic immersion has a significance that goes beyond cognitive benefits. Arabic is the language of the Quran, of salah, and of du&rsquo;a. When a child grows up hearing and speaking Arabic naturally, their relationship with these sacred practices deepens. At QAF, children recite short surahs from Juz Amma as part of their daily routine. By Senior Kindergarten, they begin to understand simple Quranic vocabulary, not as foreign words but as familiar ones.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Measurable Outcomes</h2>
      <p className="text-text-light leading-relaxed">
        By the end of Senior Kindergarten, our students can recognize Arabic letters in all three positions (initial, medial, final), hold a simple conversation with a teacher or peer in Arabic, understand and follow classroom instructions in Arabic, sing more than a dozen Arabic songs and nasheeds, and recite short surahs with confidence. These are not just academic milestones. They are the foundation for a child who will grow up feeling at home in the Arabic language and connected to their faith. Learn more about these{" "}
        <Link href="/program" className="text-orange-dark font-medium hover:underline">learning outcomes on our Program page</Link>.
      </p>

      <div className="bg-cream rounded-xl p-6 mt-8 border border-border">
        <p className="text-text font-medium">
          Want to see Arabic immersion in action?{" "}
          <Link href="/admissions#tour" className="text-orange-dark font-semibold hover:underline">Book a tour</Link>{" "}
          and visit our classroom. You&rsquo;ll hear the language being spoken, watch children engaging with Arabic materials, and see for yourself why our approach works.
        </p>
      </div>
    </div>
  );
}

function MontessoriContent() {
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        Maria Montessori believed that children learn best when they are given the freedom to explore purposeful materials at their own pace, in a carefully prepared environment. This vision resonates deeply with the Islamic concept of fitrah, the idea that every child is born with a natural disposition toward truth, beauty, and their Creator. Our job as educators is not to impose knowledge but to create the conditions where a child&rsquo;s fitrah can unfold.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What is Tarbiyah?</h2>
      <p className="text-text-light leading-relaxed">
        Tarbiyah comes from the Arabic root &ldquo;r-b-w,&rdquo; which means to grow, to nurture, to increase. In the Islamic tradition, tarbiyah refers to the holistic development of a child: body, mind, heart, and soul. It is not simply education in the Western sense. It is the careful, patient cultivation of a human being who is connected to their Creator, grounded in good character, and equipped with the knowledge and skills they need to thrive.
      </p>
      <p className="text-text-light leading-relaxed">
        At QAF, tarbiyah is not a subject. It is the lens through which everything else is viewed. When a child learns to pour water carefully from one container to another (a classic Montessori practical life exercise), they are not just developing fine motor skills. They are practicing patience, care, and intention. When they learn to clean up their workspace before moving to a new activity, they are learning responsibility and respect for shared spaces. You can read more about{" "}
        <Link href="/about" className="text-orange-dark font-medium hover:underline">our philosophy on the About page</Link>.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">The Montessori Method: Key Principles We Use</h2>
      <p className="text-text-light leading-relaxed">
        We are selective about which elements of the Montessori method we adopt. We focus on the principles that align most naturally with our Islamic mission and with the developmental needs of 4- and 5-year-olds:
      </p>
      <ul className="space-y-3 ml-1">
        {[
          "The Prepared Environment: Our classroom is organized with child-sized furniture, open shelves, and clearly defined zones for different types of work. Materials are accessible and inviting.",
          "Long Work Cycles: Children are given extended, uninterrupted periods (typically 9:20 to 11:00 AM) to choose their work and engage deeply with it. This builds concentration and self-direction.",
          "Practical Life Activities: Pouring, buttoning, sweeping, folding, and caring for the classroom. These activities build independence, coordination, and a sense of responsibility.",
          "Observation Before Instruction: Our educators observe each child carefully before intervening. We guide rather than direct, and we trust the child's developmental timeline.",
          "Mixed-Age Interaction: JK and SK students share a classroom, allowing older children to mentor younger ones and younger children to learn from peers.",
        ].map((item, i) => (
          <li key={i} className="pl-6 relative text-text-light leading-relaxed before:content-['\25B8'] before:absolute before:left-0 before:text-orange">
            {item}
          </li>
        ))}
      </ul>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Where Montessori and Islam Converge</h2>
      <p className="text-text-light leading-relaxed">
        The parallels between Montessori philosophy and Islamic educational values are striking. Both traditions emphasize respect for the child as a whole person. Both value the environment as a teacher. Both prioritize intrinsic motivation over external rewards. And both recognize that true learning happens not through passive reception but through active, purposeful engagement with the world.
      </p>
      <p className="text-text-light leading-relaxed">
        Explore the details of what your child will learn in our{" "}
        <Link href="/program" className="text-orange-dark font-medium hover:underline">JK/SK Program page</Link>, including the Ontario curriculum framework and learning outcomes.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Why We Say &ldquo;Montessori-Inspired&rdquo;</h2>
      <p className="text-text-light leading-relaxed">
        We say &ldquo;Montessori-inspired&rdquo; because we also teach to Ontario&rsquo;s Kindergarten Program, and we integrate Islamic Studies, Quran, and Arabic in ways the classical Montessori curriculum does not include. What we take from Montessori is the philosophy: observe the child, prepare the environment, and trust the process. What we add is the Islamic framework that gives that process its deepest meaning. Visit our{" "}
        <Link href="/faq" className="text-orange-dark font-medium hover:underline">FAQ page</Link>{" "}
        for more details about our approach.
      </p>

      <div className="bg-cream rounded-xl p-6 mt-8 border border-border">
        <p className="text-text font-medium">
          Curious how this looks in practice?{" "}
          <Link href="/admissions#tour" className="text-orange-dark font-semibold hover:underline">Book a tour</Link>{" "}
          and see our prepared environment, meet our educators, and watch how tarbiyah comes alive in a Montessori-inspired classroom.
        </p>
      </div>
    </div>
  );
}

function DayAtQAFContent() {
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        One of the most common questions we hear during tours is: &ldquo;What does my child actually do all day?&rdquo; It is a great question, and the answer is one of the things that sets QAF apart. Every part of the day is intentional, balancing structure with freedom, academics with play, and learning with rest. Here is a detailed look at a typical day.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Drop-Off: 8:45 to 9:00 AM</h2>
      <p className="text-text-light leading-relaxed">
        The day begins gently. Children arrive between 8:45 and 9:00 AM and are greeted warmly in Arabic by their teacher at the door. They hang up their coats, change into indoor shoes, and settle into the prepared environment, choosing a quiet activity to ease into the morning. This transition time is intentional: it gives each child a calm, low-pressure start and lets our educators connect briefly with every family.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Morning Circle: 9:00 to 9:20 AM</h2>
      <p className="text-text-light leading-relaxed">
        Morning circle is one of the most special parts of the day. Children sit together on the carpet, say their morning duas, review the calendar and weather in Arabic, and listen to a short surah. The teacher introduces the theme for the day and the room fills with young voices reciting together. This daily ritual builds community, establishes rhythm, and reinforces both Islamic practice and{" "}
        <Link href="/blog/why-early-arabic-immersion-matters" className="text-orange-dark font-medium hover:underline">Arabic language skills</Link>.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Work Cycle: 9:20 to 11:00 AM</h2>
      <p className="text-text-light leading-relaxed">
        This is the heart of the{" "}
        <Link href="/program" className="text-orange-dark font-medium hover:underline">QAF program</Link>.
        During the work cycle, children engage with Montessori-inspired materials alongside Ontario literacy and numeracy activities. A child might trace Arabic letters in a sand tray, practice counting with manipulatives, work on a puzzle, or read with a teacher. The key is choice: children select their work from available options, which builds independence and intrinsic motivation.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Outdoor Play: 11:00 to 11:30 AM</h2>
      <p className="text-text-light leading-relaxed">
        Every day includes outdoor time in our fenced, supervised play area. Children run, climb, build, and explore. In winter, they build snow structures and explore ice. In warmer months, they play with parachutes, balls, and natural materials. Outdoor play is not a break from learning; it is an essential part of it. Movement, fresh air, and unstructured play support physical development, social skills, and emotional regulation.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Lunch: 11:30 AM to 12:15 PM</h2>
      <p className="text-text-light leading-relaxed">
        Lunch at QAF is more than a meal. It is a time for practicing Islamic manners (adab), speaking Arabic, and building community. Children say bismillah together, eat their packed lunches (QAF is a nut-free facility), and learn table manners rooted in the Sunnah. Conversation happens naturally in both Arabic and English.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Afternoon: 12:15 to 3:00 PM</h2>
      <p className="text-text-light leading-relaxed">
        After a quiet rest period (12:15 to 1:30 PM), the afternoon is devoted to Arabic lessons, Islamic Studies, art, music, and science exploration. Arabic and Islamic Studies alternate daily, ensuring deep engagement with both. Art and STEM activities connect to the day&rsquo;s theme, reinforcing learning through creative expression. Parents stay connected to all of these moments through{" "}
        <Link href="/parents" className="text-orange-dark font-medium hover:underline">ClassDojo on our Parents page</Link>,
        where daily photos and updates are shared.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Pick-Up: 3:00 to 3:15 PM</h2>
      <p className="text-text-light leading-relaxed">
        The day ends with a closing circle where children reflect on what they learned, say their closing dua, and prepare for pick-up. Parents often tell us their children come home full of stories, eager to show off a new Arabic word, a craft, or a surah they&rsquo;ve been practicing.
      </p>

      <div className="bg-cream rounded-xl p-6 mt-8 border border-border">
        <p className="text-text font-medium">
          See the full daily schedule, curriculum details, and learning outcomes on our{" "}
          <Link href="/program" className="text-orange-dark font-semibold hover:underline">JK/SK Program page</Link>.
          Ready to see it in person?{" "}
          <Link href="/admissions#tour" className="text-orange-dark font-semibold hover:underline">Book a tour</Link>.
        </p>
      </div>
    </div>
  );
}

function Grade1ReadinessContent() {
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        &ldquo;Will my child be ready for Grade 1?&rdquo; It is the question we hear most often from prospective parents, and the answer is unequivocally yes. QAF&rsquo;s curriculum is fully aligned with Ontario&rsquo;s Kindergarten Program, and our graduates consistently transition smoothly into Grade 1 in public, Catholic, private, and Islamic schools across Ottawa.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What &ldquo;Ready for Grade 1&rdquo; Really Means</h2>
      <p className="text-text-light leading-relaxed">
        Readiness for Grade 1 is about much more than knowing the alphabet or counting to 20 (though our students do both, in English and Arabic). It is about the full set of skills a child needs to thrive in a more structured classroom: the ability to focus for extended periods, to follow multi-step instructions, to work independently, to collaborate with peers, and to regulate emotions when things get hard. These are what educators call &ldquo;executive function skills,&rdquo; and research identifies them as the strongest predictors of academic success.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">How the Montessori-Inspired Work Cycle Builds These Skills</h2>
      <p className="text-text-light leading-relaxed">
        At QAF, executive function skills are built every day through our{" "}
        <Link href="/blog/montessori-meets-islamic-values" className="text-orange-dark font-medium hover:underline">Montessori-inspired approach</Link>.
        When a child spends 30 focused minutes building a tower, sorting objects by size, or tracing letters, they are not just learning content. They are practicing concentration, planning, sequencing, and self-correction. The long, uninterrupted work cycle (9:20 to 11:00 AM each day) is specifically designed to develop these capacities.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Ontario Curriculum Alignment</h2>
      <p className="text-text-light leading-relaxed">
        Our{" "}
        <Link href="/program" className="text-orange-dark font-medium hover:underline">JK/SK program</Link>{" "}
        is built on Ontario&rsquo;s four frames of learning: Belonging and Contributing, Self-Regulation and Well-Being, Demonstrating Literacy and Mathematics Behaviours, and Problem Solving and Innovating. Every activity, every observation, and every report is aligned with these provincial expectations. When your child moves to Grade 1, their new teacher will see a child who meets or exceeds all benchmarks.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Academic Milestones by the End of SK</h2>
      <ul className="space-y-3 ml-1">
        {[
          "Read simple English sentences with confidence",
          "Write their name, short words, and numbers to 50",
          "Recognize Arabic letters in all three positions (initial, medial, final)",
          "Recite 7 to 10 short surahs and understand their basic meanings",
          "Hold a simple conversation in Arabic with a teacher or peer",
          "Demonstrate early understanding of the pillars of Islam and stories of key Prophets",
          "Work independently for extended periods and collaborate effectively with peers",
        ].map((item, i) => (
          <li key={i} className="pl-7 relative text-text-light leading-relaxed before:content-['\2713'] before:absolute before:left-0 before:text-green before:font-bold">
            {item}
          </li>
        ))}
      </ul>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">The QAF Advantage: Small Classes, Deep Attention</h2>
      <p className="text-text-light leading-relaxed">
        Our students benefit from being in a small, nurturing environment where they are truly known. Our educators track each child&rsquo;s progress carefully through observation and adapt instruction to meet them where they are. This personalized attention, combined with our{" "}
        <Link href="/parents" className="text-orange-dark font-medium hover:underline">ClassDojo communication platform</Link>{" "}
        where parents can track progress daily, means that no child falls through the cracks. If your child needs more challenge, they get it. If they need more support, they get that too.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Beyond Academics: Character and Confidence</h2>
      <p className="text-text-light leading-relaxed">
        The children who leave QAF are not just academically prepared. They are confident, kind, and grounded in their identity. They know how to greet someone with salam, how to share generously, and how to persevere when something is hard. They carry the duas they&rsquo;ve learned, the Arabic they&rsquo;ve absorbed, and the Islamic values they&rsquo;ve practiced into every classroom they enter after QAF.
      </p>

      <div className="bg-cream rounded-xl p-6 mt-8 border border-border">
        <p className="text-text font-medium">
          Ready to learn more about{" "}
          <Link href="/admissions" className="text-orange-dark font-semibold hover:underline">admissions and tuition</Link>?
          Or{" "}
          <Link href="/admissions#tour" className="text-orange-dark font-semibold hover:underline">book a tour</Link>{" "}
          to see our classroom and meet our educators in person.
        </p>
      </div>
    </div>
  );
}

function IslamicIdentityContent() {
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        Young children do not learn about Islam from a textbook. They learn it from the environment around them. When a child hears bismillah before every meal, says alhamdulillah when something good happens, and recites a short surah with their classmates each morning, these practices become as natural as breathing. That is the goal at QAF: to make Islamic values feel like home.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Why the Early Years Matter for Identity Formation</h2>
      <p className="text-text-light leading-relaxed">
        Developmental psychologists agree that children between ages 4 and 6 are in a critical period for identity formation. They are beginning to ask: &ldquo;Who am I? What do I believe? Where do I belong?&rdquo; The answers they absorb during these years, from their family, their school, and their community, form the foundation of their self-concept for years to come. At QAF, we ensure that the answers a child absorbs include: &ldquo;I am Muslim, I am loved by Allah, and I belong to a beautiful ummah.&rdquo;
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Islam Through Love, Not Fear</h2>
      <p className="text-text-light leading-relaxed">
        Our approach to Islamic education is rooted in love. We tell the stories of the Prophets with warmth and wonder. We teach the beautiful names of Allah as a way of understanding the world: Ar-Rahman (the Most Merciful), Al-Khaliq (the Creator), Al-Wadud (the Most Loving). We practice adab (Islamic manners) not as a list of rules but as a way of being. This approach aligns with our broader{" "}
        <Link href="/about" className="text-orange-dark font-medium hover:underline">philosophy of tarbiyah</Link>,
        which emphasizes nurturing the whole child with patience and respect.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What Islamic Education Looks Like at QAF</h2>
      <p className="text-text-light leading-relaxed">
        Islam is not a separate &ldquo;class&rdquo; at QAF. It is integrated into the rhythm of the entire{" "}
        <Link href="/blog/what-a-day-looks-like-at-qaf" className="text-orange-dark font-medium hover:underline">school day</Link>.
        Morning circle begins with duas. Lunchtime is an opportunity to practice the adab of eating. Transitions between activities are accompanied by dhikr. Islamic Studies and Quran have dedicated afternoon blocks, but the values of Islam are practiced all day long.
      </p>
      <p className="text-text-light leading-relaxed">
        Specific elements include daily morning duas and dhikr, short and age-appropriate Quran memorization from Juz Amma, stories of the Prophets told with engaging visuals and role-play, learning the pillars of Islam and the pillars of iman through activities and crafts, and celebration of Ramadan, Eid, and other milestones of the Islamic calendar.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Welcoming All Muslim Families</h2>
      <p className="text-text-light leading-relaxed">
        QAF is independent and not affiliated with any specific mosque or school of thought. We welcome Muslim families from all backgrounds and focus on the shared fundamentals that unite our ummah. Our{" "}
        <Link href="/faq" className="text-orange-dark font-medium hover:underline">FAQ page</Link>{" "}
        has more details about our inclusive approach.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">The Signs Parents Notice at Home</h2>
      <p className="text-text-light leading-relaxed">
        Parents often tell us that the most meaningful changes they see at home are not academic. They are spiritual. A child who starts saying morning duas without being prompted. A child who reminds a sibling to say bismillah. A child who asks to hear more about a Prophet they learned about at school. A child who says &ldquo;alhamdulillah&rdquo; when they see something beautiful. These are the signs that a strong Islamic identity is taking root, and they are the moments that make our work at QAF so deeply rewarding.
      </p>

      <div className="bg-cream rounded-xl p-6 mt-8 border border-border">
        <p className="text-text font-medium">
          Want to see how we nurture Islamic identity in our classroom?{" "}
          <Link href="/admissions#tour" className="text-orange-dark font-semibold hover:underline">Book a tour</Link>{" "}
          and experience the warmth and faith of QAF for yourself. Questions?{" "}
          <Link href="/contact" className="text-orange-dark font-semibold hover:underline">Get in touch</Link>.
        </p>
      </div>
    </div>
  );
}

const contentMap: Record<string, () => React.ReactNode> = {
  "why-early-arabic-immersion-matters": ArabicImmersionContent,
  "montessori-meets-islamic-values": MontessoriContent,
  "what-a-day-looks-like-at-qaf": DayAtQAFContent,
  "preparing-your-child-for-grade-1": Grade1ReadinessContent,
  "building-islamic-identity-in-early-years": IslamicIdentityContent,
};

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.relatedSlugs);
  const ContentComponent = contentMap[slug];

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="relative aspect-[21/9] md:aspect-[3/1] max-h-[400px] w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-3xl mx-auto">
            <span className="bg-orange text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              {post.title}
            </h1>
            <p className="text-white/80 mt-3 text-sm">{post.date}</p>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="py-16">
        <article className="max-w-3xl mx-auto px-6">
          {ContentComponent && <ContentComponent />}
        </article>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {post.faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={rp.image}
                      alt={rp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-orange-dark text-xs font-semibold uppercase tracking-wide">
                      {rp.category}
                    </span>
                    <h3 className="font-heading text-lg font-bold mt-2 mb-2 text-text">
                      {rp.title}
                    </h3>
                    <p className="text-text-light text-sm">{rp.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange to-red py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">
            See QAF for yourself.
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
