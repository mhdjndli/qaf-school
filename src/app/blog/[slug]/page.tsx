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
    <div className="bg-warm-white rounded-lg border border-card-line overflow-hidden">
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

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          Want to see Arabic immersion in action?{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
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

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          Curious how this looks in practice?{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
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

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          See the full daily schedule, curriculum details, and learning outcomes on our{" "}
          <Link href="/program" className="text-orange-dark font-semibold hover:underline">JK/SK Program page</Link>.
          Ready to see it in person?{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>.
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

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          Ready to learn more about{" "}
          <Link href="/admissions" className="text-orange-dark font-semibold hover:underline">admissions and tuition</Link>?
          Or{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">submit an inquiry</Link>{" "}
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

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          Want to see how we nurture Islamic identity in our classroom?{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
          and experience the warmth and faith of QAF for yourself. Questions?{" "}
          <Link href="/contact" className="text-orange-dark font-semibold hover:underline">Get in touch</Link>.
        </p>
      </div>
    </div>
  );
}


function WhyChooseQAFContent() {
  const thStyle = "text-left font-heading font-bold text-text px-4 py-3 text-sm";
  const tdStyle = "px-4 py-3 text-text-light text-sm leading-relaxed align-top";
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        Choosing where your child spends their first years of school is one of the biggest decisions a Muslim family makes. You are not just choosing a classroom; you are choosing the environment that will shape how your child sees learning, language, and their own faith. In Ottawa, families usually weigh three options: public school kindergarten, a daycare or preschool, or an Islamic school. This post lays out, honestly and specifically, what QAF offers so you can decide whether we are the right fit for your family.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">QAF at a Glance</h2>
      <div className="overflow-x-auto rounded-lg border border-card-line">
        <table className="w-full border-collapse bg-white">
          <tbody>
            {[
              ["Program", "Junior & Senior Kindergarten (JK/SK)"],
              ["Ages", "4 and 5 years old"],
              ["Hours", "9:00 AM \u2013 3:00 PM, Monday to Friday (drop-off from 8:45 AM)"],
              ["Curriculum", "Ontario Kindergarten Program + Montessori-inspired practice"],
              ["Languages", "Daily Arabic immersion alongside English"],
              ["Faith", "Quran, duas, Islamic studies, and adab woven through the day"],
              ["Location", "900 Dynes Rd, Ottawa — minutes from Mooney's Bay"],
              ["Tuition", "$690/month (Sept\u2013June) + $190 annual resource fee"],
              ["Serving families", "Since 2021"],
            ].map(([label, value], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-cream/50" : "bg-white"}>
                <td className="px-4 py-3 font-semibold text-text text-sm whitespace-nowrap">{label}</td>
                <td className={tdStyle}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">1. Faith Is the Environment, Not a Subject</h2>
      <p className="text-text-light leading-relaxed">
        In most schools, even good ones, Islam is at best an add-on: a weekend class, an after-school program, something separate from &ldquo;real&rdquo; school. At QAF it is the air the classroom breathes. Mornings open with duas. Children hear and recite Quran daily, practice the adab of eating and sharing, and celebrate Ramadan and Eid as the highlights of the year. Because this happens at ages 4 and 5, when identity is forming, children internalize that being Muslim is normal, joyful, and theirs. We wrote more about this in{" "}
        <Link href="/blog/building-islamic-identity-in-early-years" className="text-orange-dark font-medium hover:underline">Building Islamic Identity in the Early Years</Link>.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">2. Daily Arabic Immersion That Actually Works</h2>
      <p className="text-text-light leading-relaxed">
        Arabic at QAF is not a 30-minute weekly lesson. It is the language of morning circle, songs, routines, and play, every single day. Children between 4 and 6 are in the critical window for language acquisition, and immersion is how they learn best. Families who speak no Arabic at home routinely watch their child counting, greeting, and singing in Arabic within months. By the end of SK, children recognize Arabic letters in all positions and follow classroom instructions in Arabic. The science and the outcomes are detailed in{" "}
        <Link href="/blog/why-early-arabic-immersion-matters" className="text-orange-dark font-medium hover:underline">Why Early Arabic Immersion Matters</Link>.
      </p>

      <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-md my-2">
        <Image
          src="/gallery/IMG_3076.jpg"
          alt="Arabic alphabet wall and class schedule in the QAF classroom"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      <p className="text-center text-text-light text-sm !-mt-1">
        Arabic surrounds the children &mdash; on the walls, in songs, and in daily routines.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">3. Montessori-Inspired, Ontario-Aligned</h2>
      <p className="text-text-light leading-relaxed">
        Parents should not have to choose between a nurturing environment and academic rigor. QAF combines the best of Montessori practice &mdash; the prepared environment, long uninterrupted work cycles, practical life activities, respect for each child&rsquo;s pace &mdash; with full alignment to Ontario&rsquo;s Kindergarten Program. That means your child develops deep concentration and independence <em>and</em> meets or exceeds every Grade 1 readiness expectation. Read how the two traditions fit together in{" "}
        <Link href="/blog/montessori-meets-islamic-values" className="text-orange-dark font-medium hover:underline">Montessori Meets Islamic Values</Link>.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">How QAF Compares to Other Options in Ottawa</h2>
      <p className="text-text-light leading-relaxed">
        Every option below can be a good choice for the right family. The question is what you want your child&rsquo;s day to contain. Here is a fair, side-by-side look:
      </p>
      <div className="overflow-x-auto rounded-lg border border-card-line">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-orange/10">
              <th className={thStyle}>What you get</th>
              <th className={thStyle}>QAF</th>
              <th className={thStyle}>Public school JK/SK</th>
              <th className={thStyle}>Typical daycare/preschool</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Ontario Kindergarten curriculum", "\u2713 Fully aligned", "\u2713 Yes", "Varies by centre"],
              ["Daily Arabic immersion", "\u2713 Every day", "—", "Rarely"],
              ["Quran, duas & Islamic studies", "\u2713 Woven into the day", "—", "—"],
              ["Montessori-inspired materials", "\u2713 Daily work cycle", "Play-based (varies)", "Varies by centre"],
              ["Halal, nut-free food environment", "\u2713 Policy", "Not guaranteed", "Varies"],
              ["Islamic holidays celebrated", "\u2713 Ramadan & Eid centred", "—", "Varies"],
              ["Small, family-like community", "\u2713 By design", "Class sizes vary", "\u2713 Often"],
            ].map(([row, qaf, pub, dc], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-cream/50" : "bg-white"}>
                <td className="px-4 py-3 font-medium text-text text-sm">{row}</td>
                <td className={`${tdStyle} text-green font-semibold`}>{qaf}</td>
                <td className={tdStyle}>{pub}</td>
                <td className={tdStyle}>{dc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What a Day Looks Like</h2>
      <p className="text-text-light leading-relaxed">
        Structure matters at this age, and so does joy. Our day balances both &mdash; here is the rhythm your child would live every weekday:
      </p>
      <div className="overflow-x-auto rounded-lg border border-card-line">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-orange/10">
              <th className={thStyle}>Time</th>
              <th className={thStyle}>Activity</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["8:45 \u2013 9:00", "Drop-off, Arabic greetings, free choice in the prepared environment"],
              ["9:00 \u2013 9:20", "Morning circle: duas, calendar & weather in Arabic, short surah"],
              ["9:20 \u2013 11:00", "Montessori-inspired work cycle: literacy, numeracy, practical life"],
              ["11:00 \u2013 11:30", "Outdoor play in our fenced, supervised green space"],
              ["11:30 \u2013 12:15", "Lunch with Islamic adab (halal, nut-free)"],
              ["12:15 \u2013 1:30", "Quiet rest period"],
              ["1:30 \u2013 2:15", "Arabic lessons / Islamic studies (alternating daily)"],
              ["2:15 \u2013 3:00", "Art, music, science exploration, small-group enrichment"],
              ["3:00 \u2013 3:15", "Closing circle, dua, and pick-up"],
            ].map(([time, activity], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-cream/50" : "bg-white"}>
                <td className="px-4 py-3 font-semibold text-orange-dark text-sm whitespace-nowrap tabular-nums">{time}</td>
                <td className={tdStyle}>{activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-text-light leading-relaxed">
        For the full narrative version, see{" "}
        <Link href="/blog/what-a-day-looks-like-at-qaf" className="text-orange-dark font-medium hover:underline">What a Day Looks Like at QAF</Link>.
      </p>

      <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-md my-2">
        <Image
          src="/gallery/IMG_3078.jpg"
          alt="QAF play area with activity tables, climbing triangle, and play kitchen"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      <p className="text-center text-text-light text-sm !-mt-1">
        Purpose-built spaces for both focused work and joyful play.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Transparent, Simple Tuition</h2>
      <p className="text-text-light leading-relaxed">
        Private Islamic education in Ottawa is an investment, and we keep ours straightforward &mdash; no hidden fees, no surprise charges:
      </p>
      <div className="overflow-x-auto rounded-lg border border-card-line">
        <table className="w-full border-collapse bg-white">
          <tbody>
            {[
              ["Monthly tuition (JK and SK)", "$690 / month"],
              ["Billing period", "September \u2013 June (10 months)"],
              ["Annual resource & supplies fee", "$190 / year"],
              ["Total per school year", "$6,900 tuition + $190 fee"],
            ].map(([label, value], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-cream/50" : "bg-white"}>
                <td className="px-4 py-3 font-medium text-text text-sm">{label}</td>
                <td className="px-4 py-3 font-semibold text-orange-dark text-sm whitespace-nowrap">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-text-light leading-relaxed">
        Full details, payment terms, and our four-step admissions process are on the{" "}
        <Link href="/admissions" className="text-orange-dark font-medium hover:underline">Admissions & Tuition page</Link>.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Questions to Ask Any School You Visit</h2>
      <p className="text-text-light leading-relaxed">
        Whether or not you choose QAF, ask these questions on every tour &mdash; they reveal more than any brochure:
      </p>
      <ul className="space-y-3 ml-1">
        {[
          "How is faith actually present in a normal Tuesday — not just on special occasions?",
          "How much Arabic will my child hear per day, and from whom?",
          "Is the program aligned with Ontario's Kindergarten Program for Grade 1 readiness?",
          "How long are uninterrupted work or play periods? (Longer periods build concentration.)",
          "How do teachers communicate with parents day to day?",
          "What does the food policy look like — halal, allergies, nut-free?",
        ].map((item, i) => (
          <li key={i} className="pl-7 relative text-text-light leading-relaxed before:content-['\2713'] before:absolute before:left-0 before:text-green before:font-bold">
            {item}
          </li>
        ))}
      </ul>
      <p className="text-text-light leading-relaxed">
        We answer all of these (and many more) on our{" "}
        <Link href="/faq" className="text-orange-dark font-medium hover:underline">FAQ page</Link>.
      </p>

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          The best way to choose a school is to stand in the classroom.{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
          and come see QAF for yourself &mdash; meet our educators, watch the work cycle, and hear the Arabic in the air.
        </p>
      </div>
    </div>
  );
}


function IslamicSchoolsGuideContent() {
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        If you have typed &ldquo;Islamic schools in Ottawa&rdquo; into a search bar recently, you already know the problem: the results are a scattered mix of school websites, outdated directories, and forum threads from years ago. Ottawa actually has a rich and growing landscape of Islamic education, with more than ten full-time Islamic schools plus kindergartens, Montessori programs, and weekend schools. This guide is our attempt at one honest map of it, including where QAF fits and where another school might serve your family better.
      </p>
      <BCallout>
        <strong>How we built this list:</strong> we started from the Ontario Ministry of Education&rsquo;s private school registry (updated October 2026) and checked every school against its own website. Grades, programs, and fees change from year to year, so always confirm details directly with each school. Listing on the Ministry registry means a school has filed a notice to operate; the Ministry does not rank or endorse private elementary schools. Spot something out of date?{" "}
        <Link href="/contact" className="text-orange-dark font-semibold hover:underline">Tell us</Link> and we will correct it.
      </BCallout>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Full-Time Islamic Schools in Ottawa at a Glance</h2>
      <BTable
        head={["School", "Grades", "Area", "Notable"]}
        rows={[
          ["Ottawa Islamic School", "JK–12", "Nepean (Merivale)", "One of the few with a full high school (OSSD)"],
          ["Abraar School", "JK–6 and 7–12", "Nepean & west end", "Two campuses; run by MAC"],
          ["Ahlul Bayt Islamic School", "JK–10", "Hunt Club / South Keys", "French from JK; Shia Ithna Asheri Islamic studies"],
          ["Tarbiyah Learning Academy", "JK–8", "Bells Corners", "Hifdh track; core French"],
          ["SNMC Albushra School", "JK–6", "Barrhaven", "Quran, Arabic, and French"],
          ["Ummaty School", "JK–8", "Nepean (Colonnade)", "English stream plus a French stream in early grades"],
          ["Marifah School", "JK–8", "Stittsville", "French Immersion JK/SK; toddler and preschool care"],
          ["Fitra School", "Elementary", "Stittsville", "Run by the Stittsville Muslim Association"],
          ["Al-Furqan School", "Upper elementary", "West end (Bayshore)", "Selective full-time hifz program"],
          ["Jamia Islamia", "JK–8", "Orléans", "East-end elementary option"],
          ["Islamic Montessori Academy", "Ages 4–12", "St. Laurent Blvd", "Montessori Casa and Elementary"],
          ["QAF School", "JK & SK (ages 4–5)", "Nepean (Carleton Heights)", "Kindergarten specialist; daily Arabic immersion"],
        ]}
      />

      <h2 className="font-heading text-2xl font-bold text-text pt-4">The Schools, One by One</h2>

      <BH3>Ottawa Islamic School (JK to Grade 12)</BH3>
      <BP>
        One of the few Islamic schools in Ottawa offering a complete pathway from kindergarten through high school, with Ontario Secondary School Diploma credits. Located at 10 Coral Ave in Nepean, near Merivale Rd and Colonnade. The school reports strong enrolment growth and a building expansion underway. Website:{" "}
        <BX href="https://www.ottawaislamicschool.org/">ottawaislamicschool.org</BX>.
      </BP>

      <BH3>Abraar School (JK to Grade 12, two campuses)</BH3>
      <BP>
        Operated by the Muslim Association of Canada. The elementary campus (JK to Grade 6) is at 70 Fieldrow St in Nepean; the secondary campus (Grades 7 to 12, with OSSD credits) is at 1085 Grenon Ave in the west end, which also houses MAC&rsquo;s licensed preschool and child care centre. Website:{" "}
        <BX href="https://schools.macnet.ca/abraarelementary/">Abraar Elementary</BX>.
      </BP>

      <BH3>Ahlul Bayt Islamic School (JK to Grade 10)</BH3>
      <BP>
        Operating since 2002 at 3025 Albion Rd N, in the Hunt Club and South Keys area. Offers French from JK and OSSD credits in the upper grades, and teaches Islamic education according to Shia Ithna Asheri teachings, as the school describes on its own site. Website:{" "}
        <BX href="https://abischool.com/">abischool.com</BX>.
      </BP>

      <BH3>Tarbiyah Learning Academy (JK to Grade 8)</BH3>
      <BP>
        Founded in 2012 and located on the second floor of Jami Omar Mosque at 3990 Old Richmond Rd in Bells Corners. Known for its hifdh track, which aims for students to complete the Quran by Grade 8, alongside core French. The school notes a significant waiting list, so apply early. Website:{" "}
        <BX href="https://www.tarbiyahlearning.ca/">tarbiyahlearning.ca</BX>.
      </BP>

      <BH3>SNMC Albushra School (JK to Grade 6)</BH3>
      <BP>
        Run by the South Nepean Muslim Community at 3020 Woodroffe Ave, the most convenient full-time option for many Barrhaven families. Curriculum includes Quran, Arabic, and French alongside Ontario academics. Website:{" "}
        <BX href="https://albushraschool.ca/">albushraschool.ca</BX>.
      </BP>

      <BH3>Ummaty School (JK to Grade 8)</BH3>
      <BP>
        At 154 Colonnade Rd S in Nepean. Runs an English stream from JK to Grade 8 and, depending on registrations, a French stream in the early grades, a rare option for francophone Muslim families. Website:{" "}
        <BX href="https://ummatyschool.ca/">ummatyschool.ca</BX>.
      </BP>

      <BH3>Marifah School (JK to Grade 8, plus toddler and preschool)</BH3>
      <BP>
        A not-for-profit school established in 2023 at 1586 Stittsville Main St. Offers French Immersion in JK and SK, toddler care for ages 1 to 3, a preschool for ages 2.5 to 5, and a supported online high-school credit program in an Islamic setting. Website:{" "}
        <BX href="https://marifah.ca/">marifah.ca</BX>.
      </BP>

      <BH3>Fitra School (Elementary)</BH3>
      <BP>
        A full-time elementary school run by the Stittsville Muslim Association at 1469 Stittsville Main St, with Quran, Arabic, and an after-school clubs program. Contact the school for its current grade range. Website:{" "}
        <BX href="https://fitraschool.ca/">fitraschool.ca</BX>.
      </BP>

      <BH3>Al-Furqan School (full-time hifz)</BH3>
      <BP>
        A specialized MAC program at 2825 DuMaurier Ave in the west end, built around full-time Quran memorization: students aim to memorize the entire Quran over three years, with a small, selective intake in the upper elementary grades. A strong fit for children who already read Arabic fluently and families committed to hifz. Website:{" "}
        <BX href="https://schools.macnet.ca/ottawaalfurqan/">Al-Furqan Ottawa</BX>.
      </BP>

      <BH3>Jamia Islamia (JK to Grade 8)</BH3>
      <BP>
        Describes itself as the first elementary Islamic school in Orléans, at 3555 St Joseph Blvd, making it the main full-time option for east-end families. Website:{" "}
        <BX href="https://jamiaislamiaottawa.org/">jamiaislamiaottawa.org</BX>.
      </BP>

      <BH3>Islamic Montessori Academy (ages 4 to 12)</BH3>
      <BP>
        An Islamic Montessori school at 2465 St. Laurent Blvd offering a Montessori Casa for ages 4 to 6, an Elementary program for ages 6 to 12, and a Quran academy. It shares a home with Blossom Montessori School, which runs toddler and Casa programs for younger children. Website:{" "}
        <BX href="https://imaottawa.ca/">imaottawa.ca</BX>.
      </BP>

      <BH3>QAF School (JK &amp; SK, ages 4 to 5)</BH3>
      <BP>
        That is us. Rather than serving every grade, we focus exclusively on{" "}
        <Link href="/program" className="text-orange-dark font-medium hover:underline">Junior and Senior Kindergarten</Link>{" "}
        at 900 Dynes Rd, near Carleton Heights. The advantage of specialization is depth: every shelf, material, routine, and teacher is purpose-built for one developmental stage, with Montessori-inspired learning, daily Arabic immersion, Quran, and Ontario&rsquo;s Kindergarten Program. Many of our families continue to one of the full-time schools above for Grade 1; others move to public school with their identity firmly rooted.
      </BP>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Beyond Full-Time: Weekend, Hifz, and Early-Years Options</h2>
      <p className="text-text-light leading-relaxed">
        <strong className="text-text">Weekend and evening programs.</strong> Many masajid and community groups run Saturday or Sunday schools teaching Quran, Arabic, and Islamic Studies, and the OCDSB and OCSB offer free Saturday Arabic classes. We list them all by area in our{" "}
        <BL href="/blog/weekend-islamic-schools-ottawa">guide to weekend Islamic schools in Ottawa</BL>. QAF runs its own{" "}
        <Link href="/sunday-camp" className="text-orange-dark font-medium hover:underline">Sunday Camp</Link>{" "}
        for ages 8 to 15.
      </p>
      <p className="text-text-light leading-relaxed">
        <strong className="text-text">Daycare and preschool.</strong> For children under four, options include MAC&rsquo;s licensed preschool and child care centre, Marifah&rsquo;s toddler and preschool programs, and Montessori toddler programs. See our{" "}
        <BL href="/blog/muslim-daycare-ottawa-guide">guide to Islamic daycare in Ottawa</BL>.
      </p>
      <p className="text-text-light leading-relaxed">
        <strong className="text-text">Looking for something close to home?</strong> Our{" "}
        <BL href="/blog/islamic-schools-near-me-ottawa">neighbourhood-by-neighbourhood guide</BL>{" "}
        groups every option by part of the city, from Barrhaven and Kanata to Orléans.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What &ldquo;Best&rdquo; Actually Means</h2>
      <p className="text-text-light leading-relaxed">
        Parents often ask us which Islamic school in Ottawa is the best. The honest answer is that &ldquo;best&rdquo; is the wrong frame; the right one is <em>fit</em>. A school that is perfect for an eight-year-old working toward hifz may be a poor match for a four-year-old who needs hands-on learning and a gentle introduction to Arabic. When you compare schools, weigh six things: the grades offered (will your child need to switch schools later?), the depth of the Arabic and Quran program (daily immersion or a weekly class?), the teaching approach (worksheets or hands-on materials?), class size and ratios, alignment with Ontario curriculum expectations, and the total yearly cost, which we break down honestly in our{" "}
        <Link href="/blog/ottawa-islamic-school-fees-explained" className="text-orange-dark font-medium hover:underline">guide to Ottawa Islamic school fees</Link>. Commute matters too: a school 40 minutes away is 400 hours in the car over a school year.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Seven Questions to Ask on Any School Tour</h2>
      <p className="text-text-light leading-relaxed">
        A website tells you what a school wants to say. A visit tells you what it actually is. When you tour any Islamic school in Ottawa, including ours, ask: How much Arabic will my child hear per day, and from whom? How is Quran taught: with love and understanding, or memorization under pressure? What does discipline look like in practice? What are the actual class sizes this year? How do teachers communicate with parents, and how often? Is the academic program aligned with Ontario&rsquo;s curriculum? And finally: may I see a classroom in session? A school confident in its answers will welcome every one of these questions.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Why the Early Years Deserve Special Attention</h2>
      <p className="text-text-light leading-relaxed">
        Between ages 4 and 6, children are in the critical window for language acquisition and identity formation. A child who spends JK and SK immersed in Arabic, Quran, and Islamic adab does not just learn content; they form a self-image in which being Muslim is natural, joyful, and theirs. This is why we built QAF as an early-years specialist:{" "}
        <Link href="/blog/why-early-arabic-immersion-matters" className="text-orange-dark font-medium hover:underline">daily Arabic immersion</Link>,{" "}
        <Link href="/blog/montessori-meets-islamic-values" className="text-orange-dark font-medium hover:underline">Montessori-inspired learning</Link>, and full{" "}
        <Link href="/blog/preparing-your-child-for-grade-1" className="text-orange-dark font-medium hover:underline">Ontario Grade 1 readiness</Link>,
        whether your child continues to a full-time Islamic school afterward or moves to a public school.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Start With a Visit</h2>
      <p className="text-text-light leading-relaxed">
        Wherever your search leads, visit in person before you decide, and apply early: several Ottawa Islamic schools keep waiting lists. If your child is 4 or 5, we would love for QAF to be one of your visits. We are located at 900 Dynes Rd in Ottawa; see our{" "}
        <Link href="/admissions" className="text-orange-dark font-medium hover:underline">admissions process</Link>{" "}
        or browse our{" "}
        <Link href="/faq" className="text-orange-dark font-medium hover:underline">FAQ</Link>{" "}
        for the details parents ask about most.
      </p>

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          Comparing schools for 2026/2027?{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
          and we&rsquo;ll invite you to see our classroom in person.
        </p>
      </div>
    </div>
  );
}

function FeesGuideContent() {
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        Ask most private schools what a year actually costs and you will get a number that grows every time you ask a follow-up question. Tuition, then a registration fee, then a resource fee, then uniforms, then activity fees. We believe fee transparency is part of amanah — so this guide explains how Islamic school fees in Ottawa typically work, and then shows you exactly what QAF charges, with nothing held back.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">How Islamic School Fees Are Structured in Ottawa</h2>
      <p className="text-text-light leading-relaxed">
        Most Islamic schools in Ottawa — and private schools generally — build their fees from the same components: <strong className="text-text">base tuition</strong> (billed monthly or annually), a <strong className="text-text">registration or application fee</strong> (usually non-refundable, paid at enrollment), an <strong className="text-text">annual resource or supplies fee</strong>, and sometimes <strong className="text-text">extras</strong> such as uniforms, field trips, or before-and-after care. Fees vary widely between schools and grade levels, and published numbers are not always complete. The single most useful thing you can do when comparing schools is to ask each one, in writing: &ldquo;What is the total amount I will pay for one full school year, including every mandatory fee?&rdquo;
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">QAF School Fees for 2026/2027</h2>
      <p className="text-text-light leading-relaxed">
        Here is our complete fee structure — the same one published on our{" "}
        <Link href="/admissions" className="text-orange-dark font-medium hover:underline">admissions page</Link>:
      </p>
      <ul className="space-y-2 text-text-light leading-relaxed list-disc pl-6">
        <li><strong className="text-text">Tuition: $690 per month</strong>, billed on the 1st of each month, September through June (10 months)</li>
        <li><strong className="text-text">Resource &amp; supplies fee: $190 per year</strong>, due once at enrollment (non-refundable)</li>
        <li><strong className="text-text">Total for the year: $690 &times; 10 + $190 = $7,090</strong></li>
      </ul>
      <p className="text-text-light leading-relaxed">
        That is the entire list. No application fee, no hidden charges, no surprise invoices in February.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What Your Tuition Actually Pays For</h2>
      <p className="text-text-light leading-relaxed">
        A fee only makes sense next to what it buys. QAF tuition covers the full school day from 9:00 AM to 3:00 PM, taught by educators trained for the early years. That includes complete{" "}
        <Link href="/blog/preparing-your-child-for-grade-1" className="text-orange-dark font-medium hover:underline">Ontario-aligned literacy and numeracy</Link>, daily{" "}
        <Link href="/blog/why-early-arabic-immersion-matters" className="text-orange-dark font-medium hover:underline">Arabic immersion</Link>{" "}
        woven through the whole day rather than a single period, Quran and Islamic Studies, Montessori-inspired classroom materials, and daily photos and updates for parents through ClassDojo. The $190 resource fee covers your child&rsquo;s consumable supplies — art materials, workbooks, and classroom consumables — for the entire year. See{" "}
        <Link href="/blog/what-a-day-looks-like-at-qaf" className="text-orange-dark font-medium hover:underline">what a full day looks like</Link>{" "}
        to picture exactly what those hours contain.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Questions to Ask Any School About Fees</h2>
      <p className="text-text-light leading-relaxed">
        Before you enrol anywhere, ask: Is the registration fee refundable if plans change? What happens to tuition if we withdraw mid-year? Are there sibling discounts? What is <em>not</em> included — lunches, uniforms, trips, aftercare? And when do fees increase, and by how much historically? Clear, direct answers are a good sign about everything else the school does.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Thinking About Value, Not Just Cost</h2>
      <p className="text-text-light leading-relaxed">
        $7,090 a year is real money for any family. The question worth asking is what it purchases: two years in which your child learns to read, count, and problem-solve to Ontario standards — while also learning to love the Quran, speak and understand Arabic, and feel at home in their identity, during the exact window when identity forms. Families weighing this decision may find our post on{" "}
        <Link href="/blog/why-choose-qaf-islamic-school-ottawa" className="text-orange-dark font-medium hover:underline">why families choose QAF</Link>{" "}
        a useful companion to this one.
      </p>

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          Have a question about fees we didn&rsquo;t answer?{" "}
          <Link href="/contact" className="text-orange-dark font-semibold hover:underline">Contact us</Link>{" "}
          or{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">submit an inquiry</Link>{" "}
          — we&rsquo;ll give you a straight answer.
        </p>
      </div>
    </div>
  );
}

function MuslimDaycareContent() {
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        When a parent searches for a &ldquo;Muslim daycare near me,&rdquo; they are rarely just looking for supervision. They are looking for four things at once: food they can trust to be halal, adults who share their values, an environment where duas and adab are part of the day rather than an afterthought, and — for many families — exposure to Arabic while their child&rsquo;s brain is most ready for it. This guide walks through how to evaluate Islamic child care in Ottawa, and explains a distinction that matters more than most parents realize once a child turns four.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What Makes Child Care Genuinely &ldquo;Islamic&rdquo;</h2>
      <p className="text-text-light leading-relaxed">
        Anyone can put the word Islamic on a sign. What you are actually looking for is practice: halal food policies that are enforced rather than assumed, bismillah and daily duas woven into routines, gentle teaching of adab — how we speak, share, and treat one another — educators who model the character you want your child to absorb, and ideally daily Arabic in songs, greetings, and play. When you visit, do not ask &ldquo;is this an Islamic environment?&rdquo; Ask &ldquo;what did the children do this morning?&rdquo; and listen for whether the deen shows up in the answer.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Daycares, Home Care, and Schools: Know What You Are Comparing</h2>
      <p className="text-text-light leading-relaxed">
        In Ontario, licensed child care centres and licensed home child care operate under the Child Care and Early Years Act, with regulated ratios and inspections — if you are considering a daycare, ask to see the licence. Unlicensed home daycares are legal within strict limits on the number of children, but carry fewer safeguards, so ask more questions. Private schools like QAF are a different category altogether: an educational institution with a structured curriculum, a school day, and a school year. None of these is automatically better — an infant needs different care than a five-year-old — but you should know which one you are standing in.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">A Practical Checklist for Your Visit</h2>
      <p className="text-text-light leading-relaxed">
        Whatever option you tour, check the same things: How many children per adult, really, at busy times? Is the space clean, organized, and set up for children rather than for adult convenience? How will you hear about your child&rsquo;s day — photos, messages, a daily report, or nothing? What is the sick policy and the discipline approach? Is the facility nut-aware or nut-free? And trust the small signals: how staff speak to children when they think no one is watching tells you more than any brochure.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">The Question Nobody Asks: Is Your Child Ready for More Than Daycare?</h2>
      <p className="text-text-light leading-relaxed">
        Here is the distinction that matters at age four. In Ontario, children can begin Junior Kindergarten the year they turn four — and this is the age when a play-based but <em>structured</em> educational program starts to matter. A four-year-old in an excellent daycare is cared for; a four-year-old in an excellent kindergarten is cared for <em>and</em> systematically taught early literacy, numeracy, self-regulation, and — at an Islamic school — Quran and Arabic through daily immersion. If your child is 4 or 5, the real comparison is no longer between daycares. It is between daycare and school.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Muslim Daycare and Preschool Options in Ottawa</h2>
      <p className="text-text-light leading-relaxed">
        Dedicated Islamic child care for children under four is still limited in Ottawa. These are the programs we could verify in October 2026; always confirm licensing, spaces, and fees directly:
      </p>
      <BList
        items={[
          <><strong className="text-text">MAC Preschool and Childcare (Abraar location)</strong>, 1085 Grenon Ave, west end: a licensed child care centre run by the Muslim Association of Canada, with toddler and preschool spaces.</>,
          <><strong className="text-text">Marifah School toddler care and preschool</strong>, 1586 Stittsville Main St: toddler care for ages 1 to 3 and preschool for ages 2.5 to 5, attached to a JK to Grade 8 Islamic school. <BX href="https://marifah.ca/">Website</BX></>,
          <><strong className="text-text">Islamic Montessori Academy and Blossom Montessori</strong>, 2465 St. Laurent Blvd: an Islamic Montessori Casa for ages 4 to 6, with Montessori toddler (18 months to 3) and Casa programs offered by Blossom Montessori at the same address. <BX href="https://imaottawa.ca/">Website</BX></>,
          <><strong className="text-text">Kindergarten at full-time Islamic schools</strong>: from age four, JK is available at Ottawa Islamic School, Abraar, Ahlul Bayt, Tarbiyah, Albushra, Ummaty, Marifah, Jamia Islamia, and QAF. See our{" "}<BL href="/blog/islamic-schools-in-ottawa-guide">full list of Islamic schools in Ottawa</BL>.</>,
        ]}
      />
      <p className="text-text-light leading-relaxed">
        Many Muslim families also use home daycares run by Muslim caregivers, found mostly through word of mouth and community groups. To check whether any centre or agency is licensed, search the Ontario government&rsquo;s licensed child care locator, and for options by neighbourhood see{" "}
        <BL href="/blog/islamic-schools-near-me-ottawa">Islamic schools and preschools near you in Ottawa</BL>.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Where QAF Fits</h2>
      <p className="text-text-light leading-relaxed">
        QAF School is not a daycare — we are Ottawa&rsquo;s Islamic{" "}
        <Link href="/program" className="text-orange-dark font-medium hover:underline">JK and SK kindergarten</Link>{" "}
        at 900 Dynes Rd, serving ages 4 and 5 from 9:00 AM to 3:00 PM. Children get everything families hope to find in a Muslim daycare — a nut-free, halal environment, daily duas, adab, warm Muslim educators — plus a full{" "}
        <Link href="/blog/preparing-your-child-for-grade-1" className="text-orange-dark font-medium hover:underline">Ontario-aligned academic program</Link>{" "}
        and{" "}
        <Link href="/blog/why-early-arabic-immersion-matters" className="text-orange-dark font-medium hover:underline">daily Arabic immersion</Link>. Curious what the day actually contains? Read{" "}
        <Link href="/blog/what-a-day-looks-like-at-qaf" className="text-orange-dark font-medium hover:underline">what a day looks like at QAF</Link>{" "}
        from drop-off to pick-up.
      </p>

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          Is your child turning 4 or 5?{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
          and come see the difference a real kindergarten makes.
        </p>
      </div>
    </div>
  );
}

function IslamicMontessoriContent() {
  return (
    <div className="space-y-6">
      <p className="text-text-light leading-relaxed">
        &ldquo;Islamic Montessori&rdquo; has become one of the most-searched phrases among Muslim parents in North America — and one of the most loosely used labels in early education. Some programs that use it are deeply Montessori in practice; others own a few wooden toys. This guide explains what the pairing really means, how to tell substance from marketing, and what to look for when you visit a classroom in Ottawa.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">Why Muslim Parents Keep Finding Montessori</h2>
      <p className="text-text-light leading-relaxed">
        The attraction is not a trend — it is a genuine philosophical match. Maria Montessori built her method on deep respect for the child, purposeful hands-on work, care for the environment, and discipline that grows from within rather than being imposed from outside. Islamic tarbiyah is built on the same foundations: every child born upon the fitrah, character cultivated through practice and habit, knowledge honored, and the murabbi guiding rather than forcing. Montessori&rsquo;s &ldquo;grace and courtesy&rdquo; lessons are, almost line for line, lessons in adab. We explore this alignment in depth in{" "}
        <Link href="/blog/montessori-meets-islamic-values" className="text-orange-dark font-medium hover:underline">How Montessori-Inspired Learning Aligns with Islamic Tarbiyah</Link>.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">&ldquo;Certified&rdquo; vs. &ldquo;Montessori-Inspired&rdquo;: An Honest Distinction</h2>
      <p className="text-text-light leading-relaxed">
        The word Montessori is not trademarked, so schools use it freely — which makes one distinction worth understanding. <strong className="text-text">Certified Montessori schools</strong> are accredited by bodies like AMI or AMS and implement the full method, including three-year mixed-age classrooms and a complete Montessori curriculum sequence. <strong className="text-text">Montessori-inspired programs</strong> adopt selected elements and combine them with other frameworks. QAF is Montessori-inspired, and we say so plainly: we practice the prepared environment, the uninterrupted work cycle, hands-on materials, and freedom within limits — combined with Ontario&rsquo;s Kindergarten Program and a daily Islamic and Arabic curriculum that a strict Montessori sequence was never designed to carry. Whichever school you consider, the question to ask is not &ldquo;are you Montessori?&rdquo; but &ldquo;<em>which Montessori practices will my child experience daily?</em>&rdquo;
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What to Look For When You Visit</h2>
      <p className="text-text-light leading-relaxed">
        A real Montessori-informed classroom is recognizable within minutes. Look for child-sized furniture and materials on open shelves at the child&rsquo;s height, so children choose work independently. Look for a long, protected work period — not a day chopped into fifteen-minute rotations. Look for children concentrating on real, purposeful activity: pouring, buttoning, sorting, building words with letter tiles. Look for calm teachers who observe and guide rather than direct from the front. And in an Islamic Montessori setting, look for the deen inside the environment itself — Arabic letter materials on the shelves, duas in the daily rhythm, adab practiced as grace and courtesy — not a religion corner bolted onto a secular room.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">What Islamic Montessori Looks Like at QAF</h2>
      <p className="text-text-light leading-relaxed">
        At QAF in Ottawa, the morning work cycle is the heart of the day: children choose hands-on materials for literacy, numeracy, practical life, and Arabic at their own pace, while teachers give small individual lessons. Arabic is not a subject on a schedule — it is{" "}
        <Link href="/blog/why-early-arabic-immersion-matters" className="text-orange-dark font-medium hover:underline">immersed through the entire day</Link>, from morning greetings to lunch adab. Quran is taught with love and repetition, and Ontario&rsquo;s Kindergarten Program runs underneath it all, so children leave SK fully{" "}
        <Link href="/blog/preparing-your-child-for-grade-1" className="text-orange-dark font-medium hover:underline">ready for Grade 1</Link>{" "}
        in any school. You can see the full daily rhythm on our{" "}
        <Link href="/program" className="text-orange-dark font-medium hover:underline">Program page</Link>.
      </p>

      <h2 className="font-heading text-2xl font-bold text-text pt-4">The Only Reliable Test</h2>
      <p className="text-text-light leading-relaxed">
        Websites — including ours — can only tell you so much. The reliable test of any Islamic Montessori school is standing in the classroom: watching whether children are concentrated or waiting, whether Arabic is alive or laminated, whether the adults kneel down to a child&rsquo;s eye level. Our{" "}
        <Link href="/admissions" className="text-orange-dark font-medium hover:underline">admissions process</Link>{" "}
        begins with exactly that visit.
      </p>

      <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
        <p className="text-text font-medium">
          Want to see a Montessori-inspired Islamic classroom in action?{" "}
          <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
          and we&rsquo;ll arrange your visit.
        </p>
      </div>
    </div>
  );
}

// ---- Shared building blocks for newer posts ----
function BP({ children }: { children: React.ReactNode }) {
  return <p className="text-text-light leading-relaxed">{children}</p>;
}
function BH2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading text-2xl font-bold text-text pt-4">{children}</h2>;
}
function BL({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-orange-dark font-medium hover:underline">
      {children}
    </Link>
  );
}
function BList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3 ml-1">
      {items.map((item, i) => (
        <li key={i} className="pl-6 relative text-text-light leading-relaxed before:content-['\25B8'] before:absolute before:left-0 before:text-orange">
          {item}
        </li>
      ))}
    </ul>
  );
}
function BCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream rounded-lg p-6 mt-8 border border-card-line">
      <p className="text-text font-medium">{children}</p>
    </div>
  );
}

function JKOttawaGuideContent() {
  return (
    <div className="space-y-6">
      <BP>
        Somewhere around your child&rsquo;s third birthday, the question starts coming from every direction: grandparents, neighbours, other parents at the park. <em>Where is she going for JK?</em> If you are not sure how kindergarten works in Ontario, when to register, or how to compare a public school with a private one, you are not alone. This guide walks through the whole picture for Ottawa families, in plain language.
      </BP>

      <BH2>How Kindergarten Works in Ontario</BH2>
      <BP>
        Ontario kindergarten is a two-year program. <strong className="text-text">Junior Kindergarten (JK)</strong> starts in September of the year your child turns four, and <strong className="text-text">Senior Kindergarten (SK)</strong> follows the next year, the year they turn five. The cutoff is December 31: a child born anytime in 2023 starts JK in September 2027, whether their birthday is in January or December. That means some children start JK at three and a half while others are nearly five, which is completely normal.
      </BP>
      <BP>
        Kindergarten is not mandatory in Ontario. Compulsory school attendance begins at age six, so families can choose whether, and where, their child attends JK and SK. In practice, most Ottawa children do attend, and the two kindergarten years are where many of the habits that carry a child through school are formed.
      </BP>

      <BH2>Your Options in Ottawa</BH2>
      <BP>
        <strong className="text-text">Public and Catholic boards.</strong> Ottawa has four publicly funded school boards: the Ottawa-Carleton District School Board (English public), the Ottawa Catholic School Board (English Catholic), and two French-language boards, CEPEO (public) and CECCE (Catholic). English boards offer full-day kindergarten at your designated neighbourhood school, based on your home address. French-language boards have their own admission criteria, so check eligibility directly with them.
      </BP>
      <BP>
        <strong className="text-text">Private schools.</strong> Private options include Montessori schools, independent schools, and faith-based schools, including Islamic schools. They charge tuition, set their own admissions timelines, and can offer things a large public classroom often cannot: smaller groups, a specific teaching approach, or a curriculum built around a family&rsquo;s faith and language. If you are weighing Islamic options specifically, our{" "}
        <BL href="/blog/islamic-schools-in-ottawa-guide">guide to Islamic schools in Ottawa</BL> maps the full landscape.
      </BP>

      <BH2>When to Register</BH2>
      <BP>
        Ottawa&rsquo;s public and Catholic boards usually open kindergarten registration in the winter for the following September. Exact dates change each year, so check your board&rsquo;s website in the fall and have your child&rsquo;s birth certificate or passport, proof of address, and immunization record ready. Private schools set their own timelines and many have limited spaces, so families considering a private kindergarten should start touring in the fall. A simple timeline that works for most families:
      </BP>
      <BList
        items={[
          <><strong className="text-text">Fall:</strong> research options, read reviews, and book tours.</>,
          <><strong className="text-text">Winter:</strong> register with your public board and submit private school applications.</>,
          <><strong className="text-text">Spring:</strong> confirm your choice and complete any enrolment paperwork or deposits.</>,
          <><strong className="text-text">Summer:</strong> practise routines at home: packing a lunch, using the washroom independently, and short separations.</>,
        ]}
      />

      <BH2>What Actually Matters at Age Four</BH2>
      <BP>
        It is easy to compare schools on reputation or proximity alone. At four, a few things matter more than anything on a brochure: how many children each adult is responsible for, whether learning is hands-on and play-based rather than worksheet-driven, how the school handles the first weeks of separation, how teachers guide behaviour, and whether the environment reflects your family&rsquo;s values and language. Ask every school the same questions on your tour: What are the real class sizes this year? What does a typical morning look like? How will I hear about my child&rsquo;s day? What happens when a child is upset at drop-off?
      </BP>
      <BP>
        It also helps to know what a school day looks like hour by hour. Ours is laid out in{" "}
        <BL href="/blog/what-a-day-looks-like-at-qaf">a day at QAF, from drop-off to pick-up</BL>.
      </BP>

      <BH2>Signs Your Child Is Ready</BH2>
      <BP>
        Readiness for JK is less about academics and more about independence. Most children are ready when they can use the washroom with minimal help, follow a simple two-step instruction, separate from a parent for a few hours, and tolerate a predictable daily routine. If your child is still working on some of these in the spring, that is normal; a good kindergarten is designed to grow these skills, not to demand them on day one.
      </BP>

      <BH2>Where QAF Fits</BH2>
      <BP>
        QAF School is an Islamic Junior and Senior Kindergarten for ages 4 and 5 at 900 Dynes Rd in Ottawa. Our{" "}
        <BL href="/program">JK/SK program</BL> is aligned with Ontario&rsquo;s Kindergarten Program and combines Montessori-inspired, hands-on learning with daily Arabic immersion, Quran, and Islamic Studies. The school day runs 9:00 AM to 3:00 PM, Monday to Friday. Tuition is $690 per month over ten months plus a $190 annual resource fee, with a sibling discount; every fee is broken down in our{" "}
        <BL href="/blog/ottawa-islamic-school-fees-explained">fees guide</BL>. We accept applications year-round, and because our program is small, families who apply early get priority. Children leave QAF ready for Grade 1 at any Ontario school, as we explain in{" "}
        <BL href="/blog/preparing-your-child-for-grade-1">how QAF prepares children for Grade 1</BL>.
      </BP>

      <BCallout>
        Choosing a kindergarten for September 2027?{" "}
        <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
        and we&rsquo;ll invite you to see a QAF classroom in session.
      </BCallout>
    </div>
  );
}

function ArabicClassesKidsContent() {
  return (
    <div className="space-y-6">
      <BP>
        When parents search for &ldquo;Arabic classes for kids,&rdquo; they usually mean one of three very different things: a school where Arabic is spoken all day, a weekend class where children learn to read and write, or a private tutor. Each can work. Each works best at a different age and for a different goal. This guide helps Ottawa families match the option to the child.
      </BP>

      <BH2>Option 1: Daily Immersion (Best for Ages 4 to 6)</BH2>
      <BP>
        Young children do not learn languages the way adults do. Between roughly ages 3 and 6, they absorb sounds, vocabulary, and sentence patterns simply by living inside a language. That is why daily immersion is so powerful in the early years: Arabic is not a subject, it is the language of greetings, songs, routines, and play. We explain the research behind this in{" "}
        <BL href="/blog/why-early-arabic-immersion-matters">why early Arabic immersion matters</BL>.
      </BP>
      <BP>
        At QAF, children aged 4 and 5 hear and use Arabic every day in our{" "}
        <BL href="/program">Islamic JK/SK program</BL>. By the end of Senior Kindergarten, children typically recognize Arabic letters in all their positions, follow classroom instructions in Arabic, hold a simple conversation, and recite short surahs with confidence, all without any Arabic required at home.
      </BP>

      <BH2>Option 2: Weekend Arabic School (Best for School-Age Children)</BH2>
      <BP>
        For children who attend public school during the week, a weekend program is the most practical way to build real Arabic literacy. The best ones group children by level, focus on reading and writing with steady practice, and pair Arabic with Quran so the two reinforce each other. Many masajid and community centres in Ottawa run Saturday or Sunday programs.
      </BP>
      <BP>
        QAF&rsquo;s own <BL href="/sunday-camp">Sunday Camp</BL> is built for ages 8 to 15. Every Sunday from 11 AM to 3 PM, children have a Quran class in small groups by level, an Arabic reading and writing class, math and STEM, and an hour of soccer or indoor play. Juniors work on letters and reading fluency; seniors move into writing and everyday vocabulary. It runs September to June for $190 a month, month to month.
      </BP>

      <BH2>Option 3: Tutoring and Online Classes</BH2>
      <BP>
        One-on-one tutoring is flexible and can target exactly where a child is stuck. Online classes widen the choice of teachers. The trade-offs: young children often struggle to stay engaged on a screen, and learning alone means missing the peer motivation that makes language feel alive. Tutoring works best as a supplement for older children who already have a foundation, or for a specific goal like preparing for a reading level.
      </BP>

      <BH2>Questions to Ask Any Arabic Program</BH2>
      <BList
        items={[
          "Are children grouped by level, or by age only?",
          "Which variety of Arabic is taught: Modern Standard Arabic, a spoken dialect, or both?",
          "What does progress look like after one term, and how is it reported to parents?",
          "How large are the classes, and who teaches them?",
          "Is the program designed for families who don't speak Arabic at home?",
          "What practice, if any, is expected at home each week?",
        ]}
      />

      <BH2>Helping at Home When You Don&rsquo;t Speak Arabic</BH2>
      <BP>
        Many QAF families do not speak Arabic, and their children thrive. You do not need to teach the language yourself. What helps most is consistency and warmth: play Arabic songs and stories in the car, ask your child to teach you one word a day, label a few things around the house, listen to Quran recitation together, and set aside ten minutes for reading practice on most days. Children love being the expert, and their confidence grows every time they teach a parent something new.
      </BP>

      <BH2>Choosing by Age</BH2>
      <BP>
        If your child is 4 or 5, daily immersion in kindergarten gives the strongest foundation you will ever be able to give. If your child is in elementary or middle school, a structured weekend program with Quran and Arabic together, plus a little practice at home, builds lasting literacy. Either way, the best Arabic class is one your child looks forward to.
      </BP>

      <BCallout>
        Questions about Arabic at QAF?{" "}
        <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
        for our JK/SK program, or{" "}
        <Link href="/sunday-camp" className="text-orange-dark font-semibold hover:underline">reserve a Sunday Camp spot</Link>{" "}
        for ages 8 to 15.
      </BCallout>
    </div>
  );
}

function QuranClassesKidsContent() {
  return (
    <div className="space-y-6">
      <BP>
        For many Muslim families in Ottawa, the weekday is public school and the weekend is where Islamic learning happens. A good weekend program can become the anchor of a child&rsquo;s relationship with the Quran, with Arabic, and with other Muslim kids. A poor one becomes the thing they beg to skip. Here is how to tell the difference, and how to choose the right Quran classes for your child.
      </BP>

      <BH2>What a Great Weekend Islamic Program Includes</BH2>
      <BList
        items={[
          <><strong className="text-text">Quran by level, not just by age.</strong> A ten-year-old who is still learning letters and a ten-year-old who reads fluently need different classes.</>,
          <><strong className="text-text">Arabic reading and writing.</strong> Quran recitation improves fastest when children can actually read the script with confidence.</>,
          <><strong className="text-text">Adab and identity.</strong> Children should leave knowing more about how to be Muslim, not just more verses.</>,
          <><strong className="text-text">Friends and movement.</strong> Kids return happily to places where they have friends and where they get to run around.</>,
          <><strong className="text-text">Clear communication with parents.</strong> You should know what your child is working on and how to help at home.</>,
        ]}
      />

      <BH2>Recitation, Tajweed, and Hifz: Know Your Goal</BH2>
      <BP>
        &ldquo;Quran classes&rdquo; covers a range of goals. <strong className="text-text">Recitation</strong> classes teach children to read the Quran correctly and fluently, usually with steady memorization of shorter surahs. <strong className="text-text">Tajweed</strong> focuses on the rules of beautiful, correct pronunciation. <strong className="text-text">Hifz</strong> programs aim to memorize the whole Quran and require intensive daily review, often in a full-time or daily after-school setting. For most children in a weekend program, strong recitation and consistent memorization is the right goal, and it is the foundation for hifz later if your family chooses it.
      </BP>

      <BH2>Questions to Ask Before You Enrol</BH2>
      <BList
        items={[
          "How are Quran groups divided, and how many children are in each?",
          "How will I know what my child is memorizing and how they are progressing?",
          "What happens in the rest of the day besides Quran?",
          "What does the program cost for the full year, and is there a long-term commitment?",
          "What is the food policy, and is the facility nut-free?",
          "May my child try a class before we commit?",
        ]}
      />

      <BH2>How QAF Sunday Camp Works</BH2>
      <BP>
        <BL href="/sunday-camp">QAF Sunday Camp</BL> is our weekend program for ages 8 to 15, every Sunday from 11 AM to 3 PM at 900 Dynes Rd. Instead of scattering Quran, Arabic, and tutoring across separate weeknights, it brings them together in one afternoon:
      </BP>
      <BList
        items={[
          <><strong className="text-text">11:00 to 12:00, Quran:</strong> recitation and memorization in small groups by level. Children review what they hold and add new verses at their own pace.</>,
          <><strong className="text-text">12:00 to 12:45, Arabic:</strong> reading and writing. Juniors build reading fluency; seniors move into writing and vocabulary.</>,
          <><strong className="text-text">12:45 to 1:15, break and snack</strong> with friends.</>,
          <><strong className="text-text">1:15 to 2:00, math and STEM:</strong> puzzles, building challenges, and experiments.</>,
          <><strong className="text-text">2:00 to 3:00, soccer</strong> on the field beside the school in warm months, and indoor games through the Ottawa winter.</>,
        ]}
      />
      <BP>
        There are two classes, juniors and seniors, each with their own room and teacher. Tuition is $190 a month from September to June, month to month, with no long-term commitment. Your family does not need to speak Arabic at home.
      </BP>

      <BH2>For Younger Children</BH2>
      <BP>
        If your child is 4 or 5, Quran is part of every day in our{" "}
        <BL href="/program">Islamic JK/SK program</BL>. By the end of Senior Kindergarten, children typically memorize 7 to 10 short surahs from Juz Amma along with core daily duas, learned with understanding and love rather than pressure. Read more about{" "}
        <BL href="/blog/building-islamic-identity-in-early-years">building Islamic identity in the early years</BL>.
      </BP>

      <BH2>Making It Stick at Home</BH2>
      <BP>
        Weekend learning sticks when it shows up during the week. Ten minutes of review after Fajr or before bed, listening to the surah your child is memorizing in the car, and asking them to lead a short recitation at home all turn one afternoon a week into a daily habit. Above all, keep the Quran joyful. A child who loves coming back each week will go further than one who is pushed.
      </BP>

      <BCallout>
        Looking for a weekend Islamic program in Ottawa?{" "}
        <Link href="/sunday-camp" className="text-orange-dark font-semibold hover:underline">See Sunday Camp and reserve a spot</Link>, or browse our{" "}
        <Link href="/blog/islamic-schools-in-ottawa-guide" className="text-orange-dark font-semibold hover:underline">guide to Islamic schools in Ottawa</Link>.
      </BCallout>
    </div>
  );
}

function EcoleIslamiqueOttawaContent() {
  return (
    <div className="space-y-6">
      <BP>
        Beaucoup de familles musulmanes d&rsquo;Ottawa, notamment francophones, cherchent une école où leur jeune enfant pourra apprendre l&rsquo;arabe, le Coran et les valeurs islamiques dès les premières années. QAF School est une école islamique spécialisée dans la petite enfance : la maternelle (JK) et le jardin d&rsquo;enfants (SK) pour les enfants de 4 et 5 ans, au 900, chemin Dynes, à Ottawa.
      </BP>

      <BH2>Un programme pensé pour les 4 et 5 ans</BH2>
      <BP>
        Notre <BL href="/program">programme JK/SK</BL> est aligné sur le programme de maternelle et de jardin d&rsquo;enfants de l&rsquo;Ontario. Il combine trois éléments : une approche inspirée de Montessori (environnement préparé, matériel concret, longues périodes de travail autonome), une immersion quotidienne en arabe, et l&rsquo;enseignement du Coran et des études islamiques. Les enfants terminent le jardin d&rsquo;enfants prêts pour la 1re année dans n&rsquo;importe quelle école de l&rsquo;Ontario, publique, catholique, privée ou islamique.
      </BP>

      <BH2>Les langues : soyons clairs</BH2>
      <BP>
        L&rsquo;enseignement à QAF se fait en <strong className="text-text">arabe et en anglais</strong>, et non en français. L&rsquo;arabe est la langue du cercle du matin, des routines, des chansons et des histoires; l&rsquo;anglais sert à la littératie et à la numératie, selon le programme ontarien. Beaucoup de familles francophones font ce choix volontairement : l&rsquo;enfant garde le français à la maison et ajoute l&rsquo;arabe et l&rsquo;anglais pendant la période où il apprend les langues le plus facilement. Si l&rsquo;instruction en français est essentielle pour vous, les conseils scolaires de langue française d&rsquo;Ottawa (CEPEO et CECCE) restent une bonne option.
      </BP>

      <BH2>Une journée à QAF</BH2>
      <BP>
        La journée se déroule du lundi au vendredi, de 9 h à 15 h. L&rsquo;arrivée se fait entre 8 h 45 et 9 h, avec un accueil en arabe. Le cercle du matin (9 h à 9 h 20) comprend salutations, comptage et une courte sourate. Vient ensuite une longue période de travail inspirée de Montessori (9 h 20 à 11 h), puis le jeu à l&rsquo;extérieur et le dîner. Après un temps calme, l&rsquo;après-midi est consacré à l&rsquo;arabe, aux études islamiques, à l&rsquo;art, à la musique et aux sciences. Le départ se fait entre 15 h et 15 h 15. Les familles apportent un dîner et deux collations; l&rsquo;école est sans noix et toute nourriture doit être halal.
      </BP>

      <BH2>L&rsquo;arabe et le Coran, même sans arabe à la maison</BH2>
      <BP>
        Une grande partie de nos familles ne parlent pas arabe à la maison. Les jeunes enfants apprennent naturellement grâce à l&rsquo;immersion quotidienne. À la fin du jardin d&rsquo;enfants, ils reconnaissent généralement les lettres arabes dans toutes leurs positions, comprennent les consignes en arabe et mémorisent de 7 à 10 courtes sourates de Juz Amma, avec compréhension et amour plutôt que sous la pression.
      </BP>

      <BH2>Frais de scolarité 2026-2027</BH2>
      <BList
        items={[
          "Droits de scolarité : 690 $ par mois, sur 10 mois (de septembre à juin).",
          "Frais annuels de ressources et de fournitures : 190 $ (non remboursables).",
          "Réduction pour les familles qui inscrivent plus d'un enfant.",
        ]}
      />
      <BP>
        Tous les détails, en anglais, se trouvent sur notre page <BL href="/admissions">Admissions</BL> et dans notre{" "}
        <BL href="/blog/ottawa-islamic-school-fees-explained">guide des frais</BL>.
      </BP>

      <BH2>Pour les enfants de 8 à 15 ans</BH2>
      <BP>
        Le <BL href="/sunday-camp">Sunday Camp</BL> de QAF accueille les enfants de 8 à 15 ans tous les dimanches, de 11 h à 15 h : Coran en petits groupes selon le niveau, lecture et écriture de l&rsquo;arabe, mathématiques et STIM, puis soccer ou activités intérieures. Le coût est de 190 $ par mois, de septembre à juin, sans engagement à long terme.
      </BP>

      <BH2>Venez nous visiter</BH2>
      <BP>
        La meilleure façon de connaître QAF est de visiter une classe. Nous acceptons les demandes toute l&rsquo;année, mais les places sont limitées et la priorité est donnée aux familles qui s&rsquo;inscrivent tôt. Vous pouvez aussi nous écrire à admin@qafschool.ca.
      </BP>

      <BCallout>
        Votre enfant aura 4 ou 5 ans?{" "}
        <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Faites une demande de renseignements</Link>{" "}
        et nous vous inviterons à visiter notre classe.
      </BCallout>
    </div>
  );
}

// External link to another organization's site (opens in a new tab).
function BX({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="text-orange-dark font-medium hover:underline">
      {children}
    </a>
  );
}
function BH3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-heading text-xl font-bold text-text pt-2">{children}</h3>;
}
function BTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-card-line">
      <table className="w-full bg-white text-sm">
        <thead className="bg-orange text-white">
          <tr>
            {head.map((h) => (
              <th key={h} className="py-3 px-4 text-left font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-card-line last:border-0 align-top">
              {r.map((c, j) => (
                <td key={j} className={`py-3 px-4 text-text-light ${j === 0 ? "font-semibold text-text" : ""}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WeekendIslamicSchoolsContent() {
  return (
    <div className="space-y-6">
      <BP>
        Most Muslim children in Ottawa go to public or Catholic school during the week, so for many families the weekend is where Quran, Arabic, and Islamic Studies happen. The good news: Ottawa has more weekend options than most parents realize, from mosque Sunday schools to free Arabic classes run by the school boards. The hard part is that the information is scattered across a dozen websites, PDFs, and Facebook posts. We pulled it together in one place, organized by part of the city.
      </BP>
      <BCallout>
        <strong>How we built this list:</strong> every program below was checked against its organizer&rsquo;s own website in October 2026. Mosques and community groups often update schedules late in the summer, and some only run classes when enough children register, so always confirm days, ages, and fees directly before you enrol. Spot something out of date?{" "}
        <Link href="/contact" className="text-orange-dark font-semibold hover:underline">Let us know</Link> and we will fix it.
      </BCallout>

      <BH2>At a Glance: Weekend Islamic Programs in Ottawa</BH2>
      <BTable
        head={["Program", "Area", "When", "Focus"]}
        rows={[
          ["OMA Sunday School", "Central (Ottawa Main Mosque)", "Sun 9:30 AM–1:00 PM", "Quran reading, Islamic basics"],
          ["AlFajr School (OMA)", "Central (Ottawa Main Mosque)", "Sun 1:30–4:30 PM", "Quran, Islamic Studies"],
          ["Om Al-Qura School", "Central (Melrose Ave)", "Sat 12:30–4:30 PM", "Arabic, Quran, Islamic Studies"],
          ["Alnour School", "Westboro & Kanata", "Sat 9:30 AM–2:30 PM", "Arabic, Quran, Islamic education"],
          ["Dar-Ul-Huda School (AICP)", "East-central (St. Laurent Blvd)", "Sat morning", "Arabic, Quran"],
          ["KMA Hikmah Saturday School", "Kanata", "Saturdays", "Quran, Islamic Studies, Arabic, Urdu"],
          ["Masjid Bilal Quran Program", "Orléans", "Sat & Sun late morning; weekday evenings", "Quran reading, tajweed, memorization"],
          ["QAF Sunday Camp", "Nepean (Dynes Rd)", "Sun 11 AM–3 PM", "Quran, Arabic, STEM, soccer"],
          ["OCDSB & OCSB Arabic classes", "Sites across the city", "Sat 9:30 AM–12:00 PM", "Arabic language (free)"],
        ]}
      />

      <BH2>Free Option First: School-Board Arabic Classes</BH2>
      <BP>
        Many parents do not know that Ottawa&rsquo;s English school boards run <strong className="text-text">free Arabic classes</strong> for elementary students through their International Languages programs. They teach the language rather than Quran or Islamic Studies, but they are an excellent, low-cost foundation that makes Quran reading easier later.
      </BP>
      <BList
        items={[
          <><strong className="text-text">OCDSB International Languages (JK to Grade 8).</strong> Saturday mornings from 9:30 to 12:00 at schools across the city, including Bayshore, Knoxdale, Broadview Avenue, Cambridge Street, Carleton Heights, Charles H. Hulse, Blossom Park, Sawmill Creek, Farley Mowat (Barrhaven), Vimy Ridge (Findlay Creek), Roch Carrier (Kanata), Westwind (Stittsville), and Fallingbrook (Orléans). There are also online Saturday and after-school options. Open to students from any board; free for Ontario residents apart from a small activity fee. Details on the{" "}
            <BX href="https://www.ocdsb.ca/programs-learning/continuing-education/international-languages-program/international-indigenous-languages-elementary-program">OCDSB International Languages page</BX>.</>,
          <><strong className="text-text">OCSB International Languages (JK to Grade 8).</strong> Saturday mornings from 9:30 to 12:00 at St. Patrick&rsquo;s High School (Alta Vista), St. Mother Teresa High School (Barrhaven), and St. Matthew High School (Orléans), plus an online beginner class for Grades 2 to 8. Free for Ontario residents apart from a small materials fee, and registration stays open through the school year. Details on the{" "}
            <BX href="https://conted.ocsb.ca/elementary/international-languages-elementary/">OCSB Continuing Education site</BX>.</>,
        ]}
      />

      <BH2>Central Ottawa</BH2>
      <BH3>Ottawa Muslim Association (Ottawa Main Mosque), 251 Northwestern Ave</BH3>
      <BP>
        The OMA hosts several weekend programs under one roof. <strong className="text-text">OMA Sunday School</strong> runs Sundays from 9:30 AM to 1:00 PM from September to June for children six and up, teaching Quran reading and the foundations of Islam, with some of the most affordable fees in the city (published at $100 per year for one child for 2026/27). <strong className="text-text">AlFajr School</strong> runs Sunday afternoons from 1:30 to 4:30 with Quran and Islamic subjects. For children who want to go deeper into recitation and memorization, the mosque&rsquo;s Ottawa Qur&rsquo;an Institute offers <strong className="text-text">Tarteel Juniors</strong> for ages 6 to 18. See{" "}
        <BX href="https://ss.ottawamosque.ca/">OMA Sunday School</BX>,{" "}
        <BX href="https://alfajr.ottawamosque.ca/">AlFajr School</BX>, and{" "}
        <BX href="https://ottawamosque.ca/tarteel/">Tarteel</BX>.
      </BP>
      <BH3>Om Al-Qura School, 35 Melrose Ave</BH3>
      <BP>
        A Saturday-afternoon school (12:30 to 4:30) teaching Arabic, Quran, and Islamic Studies, listed through the Ottawa Main Mosque&rsquo;s education page. Classes run when enough students register, so contact them early. More at{" "}
        <BX href="https://omalqura.ottawamosque.ca/">omalqura.ottawamosque.ca</BX>.
      </BP>
      <BH3>Alnour School (Westboro campus at Broadview Public School)</BH3>
      <BP>
        Alnour runs a full Saturday: Arabic from 9:30 to 12:00, then Quran and Islamic education from 12:00 to 2:30, with instruction in Arabic. Published fees for 2026/27 start at $240 per child for the year, with a sibling discount. Registration is on the{" "}
        <BX href="https://www.alnourschool.ca/registration-form-2/">Alnour School website</BX>.
      </BP>
      <BH3>Dar-Ul-Huda School (AICP), 847 St. Laurent Blvd</BH3>
      <BP>
        Run by the Association of Islamic Charitable Projects, Dar-Ul-Huda offers Saturday-morning Arabic and Quran classes from age five, with materials designed for children who are not yet fluent in Arabic. Call 613-747-1444 or see the{" "}
        <BX href="https://www.aicp.ca/activities-ottawa-ontario/">AICP activities page</BX> to confirm this year&rsquo;s schedule.
      </BP>

      <BH2>West End &amp; Kanata</BH2>
      <BH3>Kanata Muslim Association, 351 Sandhill Rd</BH3>
      <BP>
        KMA runs <strong className="text-text">Hikmah Saturday School</strong> for JK to Grade 8, covering Quran, Islamic Studies in English, and Arabic and Urdu, and the <strong className="text-text">Al-Madinah Quran School</strong>, an evening program for ages 5 to 14 focused on tajweed and memorization. Hours are not published online, so contact KMA directly. See the{" "}
        <BX href="https://www.kanatamuslims.ca/education/hikmah-school">KMA education pages</BX>.
      </BP>
      <BH3>Alnour School (Kanata campus at Jack Donohue Public School)</BH3>
      <BP>
        Same Saturday schedule and fees as the Westboro campus above, for families in Kanata and Stittsville.
      </BP>

      <BH2>East End &amp; Orléans</BH2>
      <BH3>Masjid Bilal (Islamic Society of Cumberland), Orléans</BH3>
      <BP>
        Masjid Bilal offers a Quran program with two tracks: a weekday evening option (Monday to Thursday, 5:30 to 7:30 PM) and a weekend option (Saturday and Sunday, 11:00 AM to 1:00 PM), covering Quran reading, tajweed, and memorization with students placed by level. Contact the Islamic Society of Cumberland to confirm location and fees for this year.
      </BP>

      <BH2>South Ottawa, Nepean &amp; Barrhaven</BH2>
      <BH3>QAF Sunday Camp, 900 Dynes Rd</BH3>
      <BP>
        Our own weekend program, for ages 8 to 15, every Sunday from 11 AM to 3 PM near Carleton Heights. Instead of a morning of Quran alone, <BL href="/sunday-camp">Sunday Camp</BL> combines Quran in small groups by level, Arabic reading and writing, math and STEM, and soccer or indoor games, so children come back because they want to. Tuition is $190 a month, month to month, with no long-term commitment. We explain the thinking behind it in{" "}
        <BL href="/blog/quran-classes-for-kids-ottawa">Quran classes and weekend Islamic school for kids</BL>.
      </BP>
      <BH3>Hunt Club &amp; Barrhaven mosques</BH3>
      <BP>
        Masjid ar-Rahmah (Assunnah Muslims Association, 1216 Hunt Club Rd) has run a Sunday-afternoon Arabic circle for young children in recent years, and South Nepean Muslim Community (SNMC) in Barrhaven is the largest mosque in the south end. Neither had current children&rsquo;s schedules published when we checked, so contact them directly. For free Arabic in Barrhaven, the OCDSB site at Farley Mowat and the OCSB site at St. Mother Teresa are both close by.
      </BP>

      <BH2>How to Choose Between Them</BH2>
      <BList
        items={[
          <><strong className="text-text">Start with the goal.</strong> Arabic language (try the free board classes), Quran reading and memorization (a mosque program or Tarteel), or a well-rounded day your child enjoys (a program that mixes Quran with Arabic, activities, and friends).</>,
          <><strong className="text-text">Check how classes are grouped.</strong> Quran groups split by reading level, not just age, keep strong readers moving and beginners from feeling lost.</>,
          <><strong className="text-text">Count the real commitment.</strong> A two-hour Sunday class and a five-hour Saturday are very different for a child who already has a full school week.</>,
          <><strong className="text-text">Ask what happens at home.</strong> Ten minutes of daily review does more than any weekend program alone.</>,
          <><strong className="text-text">Visit once.</strong> Watch whether children look engaged or just endure it. That tells you more than any flyer.</>,
        ]}
      />

      <BH2>Looking for Full-Time Instead?</BH2>
      <BP>
        If you are weighing a full-time Islamic school rather than a weekend program, see our{" "}
        <BL href="/blog/islamic-schools-in-ottawa-guide">complete list of Islamic schools in Ottawa</BL> or browse{" "}
        <BL href="/blog/islamic-schools-near-me-ottawa">Islamic schools by neighbourhood</BL>. For children aged 4 and 5, our{" "}
        <BL href="/program">Islamic JK/SK program</BL> builds Quran and Arabic into every school day.
      </BP>

      <BCallout>
        Want a weekend program your child actually looks forward to?{" "}
        <Link href="/sunday-camp" className="text-orange-dark font-semibold hover:underline">See QAF Sunday Camp</Link>{" "}
        and reserve a spot.
      </BCallout>
    </div>
  );
}

function NearMeContent() {
  return (
    <div className="space-y-6">
      <BP>
        &ldquo;Islamic school near me&rdquo; is one of the most common searches Ottawa Muslim parents make, and for good reason. A great school across the city can mean an hour in the car every day, while a good school ten minutes away can change your whole family&rsquo;s routine. Ottawa is big, and its Islamic schools, preschools, and weekend programs are spread from Stittsville to Orléans. This guide groups every option by area so you can see what is actually close to home.
      </BP>
      <BCallout>
        Every school and program below was checked against its own website and, for full-time schools, the Ontario Ministry of Education&rsquo;s private school registry in October 2026. Details change, so confirm grades, availability, and fees directly. For full school profiles, see our{" "}
        <Link href="/blog/islamic-schools-in-ottawa-guide" className="text-orange-dark font-semibold hover:underline">complete list of Islamic schools in Ottawa</Link>.
      </BCallout>

      <BH2>Nepean, Merivale &amp; Carleton Heights</BH2>
      <BP>
        The densest cluster of Islamic schools in the city, convenient for families in Nepean, Centrepointe, Carlington, Hunt Club West, and Barrhaven commuters.
      </BP>
      <BList
        items={[
          <><strong className="text-text">Ottawa Islamic School</strong>, 10 Coral Ave: JK to Grade 12. <BX href="https://www.ottawaislamicschool.org/">Website</BX></>,
          <><strong className="text-text">Ummaty School</strong>, 154 Colonnade Rd S: JK to Grade 8, English and early-grades French streams. <BX href="https://ummatyschool.ca/">Website</BX></>,
          <><strong className="text-text">Abraar School (Elementary)</strong>, 70 Fieldrow St: JK to Grade 6. <BX href="https://schools.macnet.ca/abraarelementary/">Website</BX></>,
          <><strong className="text-text">QAF School</strong>, 900 Dynes Rd: Islamic JK &amp; SK for ages 4 to 5, plus <BL href="/sunday-camp">Sunday Camp</BL> for ages 8 to 15. <BL href="/program">Program</BL></>,
        ]}
      />

      <BH2>West End: Bayshore, Britannia &amp; Bells Corners</BH2>
      <BList
        items={[
          <><strong className="text-text">Abraar School (Secondary)</strong>, 1085 Grenon Ave: Grades 7 to 12. The same building houses <strong className="text-text">MAC Preschool and Childcare</strong>, a licensed centre with toddler and preschool spaces.</>,
          <><strong className="text-text">Al-Furqan School</strong>, 2825 DuMaurier Ave: full-time hifz program for upper-elementary students. <BX href="https://schools.macnet.ca/ottawaalfurqan/">Website</BX></>,
          <><strong className="text-text">Tarbiyah Learning Academy</strong>, 3990 Old Richmond Rd (Jami Omar Mosque), Bells Corners: JK to Grade 8 with a hifdh track. <BX href="https://www.tarbiyahlearning.ca/">Website</BX></>,
          <><strong className="text-text">Alnour School</strong>, Saturdays at Broadview Public School in Westboro: Arabic, Quran, and Islamic education. <BX href="https://www.alnourschool.ca/">Website</BX></>,
        ]}
      />

      <BH2>Kanata &amp; Stittsville</BH2>
      <BP>
        Stittsville has grown into a real hub, with two full-time schools on Stittsville Main St. We could not find a full-time Islamic school in Kanata itself, but it has strong weekend programs.
      </BP>
      <BList
        items={[
          <><strong className="text-text">Marifah School</strong>, 1586 Stittsville Main St: JK to Grade 8 with French Immersion in kindergarten, plus toddler care (ages 1 to 3) and preschool (ages 2.5 to 5). <BX href="https://marifah.ca/">Website</BX></>,
          <><strong className="text-text">Fitra School</strong>, 1469 Stittsville Main St: full-time elementary run by the Stittsville Muslim Association. <BX href="https://fitraschool.ca/">Website</BX></>,
          <><strong className="text-text">Kanata Muslim Association</strong>, 351 Sandhill Rd: Hikmah Saturday School (JK to Grade 8) and the Al-Madinah evening Quran school (ages 5 to 14). <BX href="https://www.kanatamuslims.ca/education/hikmah-school">Website</BX></>,
          <><strong className="text-text">Alnour School (Kanata campus)</strong>, Saturdays at Jack Donohue Public School.</>,
        ]}
      />
      <BP>
        For full-time Islamic school, Kanata families typically look at Stittsville, Bells Corners, or the west end, all a short drive away.
      </BP>

      <BH2>Barrhaven &amp; Riverside South</BH2>
      <BList
        items={[
          <><strong className="text-text">SNMC Albushra School</strong>, 3020 Woodroffe Ave: JK to Grade 6 with Quran, Arabic, and French. <BX href="https://albushraschool.ca/">Website</BX></>,
          <><strong className="text-text">Free board Arabic classes</strong> on Saturday mornings at Farley Mowat Public School (OCDSB) and St. Mother Teresa High School (OCSB).</>,
        ]}
      />
      <BP>
        For JK and SK, Barrhaven and Riverside South families are also within easy reach of the Nepean schools above via Woodroffe, Merivale, or Prince of Wales; QAF on Dynes Rd is just off Prince of Wales Dr.
      </BP>

      <BH2>Hunt Club, South Keys &amp; Alta Vista</BH2>
      <BList
        items={[
          <><strong className="text-text">Ahlul Bayt Islamic School</strong>, 3025 Albion Rd N: JK to Grade 10, French from JK. <BX href="https://abischool.com/">Website</BX></>,
          <><strong className="text-text">Islamic Montessori Academy</strong>, 2465 St. Laurent Blvd: Montessori Casa (ages 4 to 6) and Elementary (6 to 12), alongside Blossom Montessori&rsquo;s toddler and Casa programs. <BX href="https://imaottawa.ca/">Website</BX></>,
          <><strong className="text-text">Masjid ar-Rahmah</strong>, 1216 Hunt Club Rd: has run Sunday Arabic circles for young children; contact for this year&rsquo;s schedule.</>,
        ]}
      />

      <BH2>Central &amp; East-Central Ottawa</BH2>
      <BList
        items={[
          <><strong className="text-text">Ottawa Main Mosque (OMA)</strong>, 251 Northwestern Ave: OMA Sunday School, AlFajr School, and Tarteel Juniors Quran program. <BX href="https://ss.ottawamosque.ca/">Website</BX></>,
          <><strong className="text-text">Om Al-Qura School</strong>, 35 Melrose Ave: Saturday Arabic, Quran, and Islamic Studies. <BX href="https://omalqura.ottawamosque.ca/">Website</BX></>,
          <><strong className="text-text">Dar-Ul-Huda School</strong>, run by AICP (847 St. Laurent Blvd): Saturday Arabic and Quran from age five.</>,
        ]}
      />

      <BH2>Orléans &amp; the East End</BH2>
      <BList
        items={[
          <><strong className="text-text">Jamia Islamia</strong>, 3555 St Joseph Blvd: JK to Grade 8; describes itself as the first elementary Islamic school in Orléans. <BX href="https://jamiaislamiaottawa.org/">Website</BX></>,
          <><strong className="text-text">Masjid Bilal (Islamic Society of Cumberland)</strong>: weekday-evening and weekend Quran program with tajweed and memorization.</>,
          <><strong className="text-text">Free board Arabic classes</strong> on Saturday mornings at Fallingbrook Community Elementary (OCDSB) and St. Matthew High School (OCSB).</>,
        ]}
      />

      <BH2>Islamic Daycare &amp; Preschool Near You</BH2>
      <BP>
        Dedicated Muslim child care for under-fours is still limited in Ottawa. The options we could verify are MAC Preschool and Childcare at 1085 Grenon Ave (licensed, west end), Marifah&rsquo;s toddler and preschool programs in Stittsville, and Montessori toddler and Casa programs at Blossom Montessori and the Islamic Montessori Academy on St. Laurent Blvd. Once your child turns four, an Islamic JK program becomes an option too; we explain the difference in our{" "}
        <BL href="/blog/muslim-daycare-ottawa-guide">guide to Islamic daycare in Ottawa</BL>.
      </BP>

      <BH2>Weighing Distance Against Fit</BH2>
      <BP>
        Proximity matters, especially for young children: a short commute means more sleep, calmer mornings, and easier playdates with classmates. But it is only one factor. A few rules of thumb:
      </BP>
      <BList
        items={[
          <><strong className="text-text">For JK and SK, fit beats distance up to about 20 minutes.</strong> The early years shape how your child feels about school and about being Muslim; an extra ten minutes for the right classroom is usually worth it.</>,
          <><strong className="text-text">Think about the whole pathway.</strong> If you want one school through Grade 8 or 12, check which schools near you offer the grades you will need later.</>,
          <><strong className="text-text">Ask about carpools.</strong> Families often come from the same neighbourhoods; ask whether the school can connect you with others nearby.</>,
          <><strong className="text-text">Visit at drop-off time.</strong> You will see the real traffic, the real routine, and how children arrive.</>,
        ]}
      />

      <BCallout>
        Live in Nepean, Barrhaven, Riverside South, or anywhere near Prince of Wales Dr with a 4- or 5-year-old?{" "}
        <Link href="/inquiry" className="text-orange-dark font-semibold hover:underline">Submit an inquiry</Link>{" "}
        and come see QAF&rsquo;s classroom at 900 Dynes Rd.
      </BCallout>
    </div>
  );
}

const contentMap: Record<string, () => React.ReactNode> = {
  "islamic-schools-near-me-ottawa": NearMeContent,
  "weekend-islamic-schools-ottawa": WeekendIslamicSchoolsContent,
  "junior-kindergarten-ottawa-guide": JKOttawaGuideContent,
  "arabic-classes-for-kids-ottawa": ArabicClassesKidsContent,
  "quran-classes-for-kids-ottawa": QuranClassesKidsContent,
  "ecole-islamique-ottawa": EcoleIslamiqueOttawaContent,
  "islamic-schools-in-ottawa-guide": IslamicSchoolsGuideContent,
  "ottawa-islamic-school-fees-explained": FeesGuideContent,
  "muslim-daycare-ottawa-guide": MuslimDaycareContent,
  "islamic-montessori-school-ottawa": IslamicMontessoriContent,
  "why-choose-qaf-islamic-school-ottawa": WhyChooseQAFContent,
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
      <section className="relative" lang={post.lang ?? "en"}>
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
            <p className="text-white/80 mt-3 text-sm">
              {post.updated ? `Updated ${post.updated}` : post.date}
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="py-16">
        <article className="max-w-3xl mx-auto px-6" lang={post.lang ?? "en"}>
          {ContentComponent && <ContentComponent />}
        </article>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-cream" lang={post.lang ?? "en"}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">
            {post.lang === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}
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
                  className="bg-warm-white rounded-lg border border-card-line overflow-hidden transition-colors hover:border-orange group"
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
            The best way to experience QAF is in person. Submit an inquiry and
            we&rsquo;ll invite you in to see our classroom.
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
