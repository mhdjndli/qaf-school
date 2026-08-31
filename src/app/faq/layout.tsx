import type { Metadata } from "next";
import { faqData } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ · Islamic Kindergarten in Ottawa",
  description:
    "Answers to common questions about QAF School: Arabic immersion for non-Arabic-speaking families, Montessori-inspired learning, hours, tuition, meals, and Grade 1 readiness.",
  alternates: { canonical: "/faq" },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.flatMap((cat) =>
      cat.questions.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
