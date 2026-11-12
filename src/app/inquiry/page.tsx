import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Submit an Inquiry",
  description:
    "Have a question about QAF's Sunday Camp or Tuesday evening program in Ottawa? Tell us about your family and we'll be in touch.",
  alternates: { canonical: "/inquiry" },
};

export default function InquiryPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            Submit an Inquiry
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us a little about your family and your child, and we&rsquo;ll
            be in touch within two business days. Looking for a specific
            program? <a href="/sunday-camp" className="text-orange-dark font-medium hover:underline">Sunday Camp</a> has
            seats available, and the{" "}
            <a href="/tuesday" className="text-orange-dark font-medium hover:underline">Tuesday program</a> has
            a waitlist.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
