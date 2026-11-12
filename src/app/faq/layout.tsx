import type { Metadata } from "next";
import { faqData } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ · Sunday Camp & Tuesday Program",
  description:
    "Answers to common questions about QAF's Sunday Camp and Tuesday evening program in Ottawa: schedules, ages, seats, fees, and Arabic for non-Arabic-speaking families.",
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
