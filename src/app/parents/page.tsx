import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For QAF Families · Parent Portal & Resources",
  description:
    "Parent portal, school calendar, handbook, and resources for current QAF families.",
};

export default function Parents() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            For QAF Families
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Everything you need to stay connected to your child&rsquo;s learning,
            from the parent portal to school policies and the calendar.
          </p>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Quick Links
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "&#128187;",
                title: "Parent Portal",
                text: "Pay tuition, view receipts, and manage your account.",
              },
              {
                icon: "&#128197;",
                title: "School Calendar",
                text: "Key dates, holidays, and events for the school year.",
              },
              {
                icon: "&#128214;",
                title: "Parent Handbook",
                text: "Everything you need in one document.",
              },
              {
                icon: "&#128233;",
                title: "Report an Absence",
                text: "Let us know if your child will be away.",
              },
              {
                icon: "&#128085;",
                title: "Uniform & Dress Code",
                text: "What to wear to QAF.",
              },
              {
                icon: "&#128222;",
                title: "Contact Us",
                text: "Reach the office or a specific teacher.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex items-start gap-4"
              >
                <div
                  className="w-11 h-11 bg-orange/10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  dangerouslySetInnerHTML={{ __html: card.icon }}
                />
                <div>
                  <h3 className="font-bold text-[0.95rem] mb-1">{card.title}</h3>
                  <p className="text-text-light text-sm">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARENT PORTAL */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-6">Parent Portal</h2>
          <p className="text-text-light leading-relaxed mb-6">
            Our Parent Portal is where tuition, fees, and account management live.
            Log in anytime to:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              "Pay monthly tuition",
              "View and download receipts",
              "Update your payment method",
              "See your payment history",
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-border flex items-center gap-3">
                <span className="text-green font-bold">&#10003;</span>
                <span className="text-text text-[0.93rem]">{item}</span>
              </div>
            ))}
          </div>
          <button className="bg-orange text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-dark transition-all hover:-translate-y-0.5">
            Log in to Parent Portal &rarr;
          </button>
        </div>
      </section>

      {/* COMMUNICATION */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-6">Communication via ClassDojo</h2>
          <p className="text-text-light leading-relaxed mb-8">
            We use ClassDojo as our primary parent communication platform. Every
            parent receives their own ClassDojo account to stay connected to their
            child&rsquo;s learning journey. Here&rsquo;s how we stay in touch:
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                freq: "Daily",
                text: "Photos, videos, and quick notes about your child\u2019s day shared through ClassDojo.",
              },
              {
                freq: "Weekly",
                text: "A classroom update highlighting what we learned, with photos and videos from the week.",
              },
              {
                freq: "Term-based",
                text: "Formal progress reports and parent-teacher conferences.",
              },
              {
                freq: "Anytime",
                text: "Message your child\u2019s teacher directly through ClassDojo for anything that can\u2019t wait.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-5 shadow-sm border-l-3 border-l-orange border border-border"
              >
                <strong className="text-orange-dark">{item.freq}.</strong>{" "}
                <span className="text-text-light text-[0.93rem]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POLICIES */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-8">
            Policies at a Glance
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Allergy & nut-free policy",
                text: "QAF is a strictly nut-free environment.",
              },
              {
                title: "Illness & exclusion",
                text: "We follow Ottawa Public Health guidelines.",
              },
              {
                title: "Dress code",
                text: "Comfortable, modest clothing appropriate for active play.",
              },
              {
                title: "Pick-up & drop-off",
                text: "Authorized pick-up persons only. ID required for new pick-up contacts.",
              },
              {
                title: "Weather closures",
                text: "Communicated via email and our parent communication platform.",
              },
            ].map((policy, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-5 shadow-sm border border-border"
              >
                <h3 className="font-bold text-[0.95rem] text-orange-dark mb-1">
                  {policy.title}
                </h3>
                <p className="text-text-light text-[0.93rem]">{policy.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
