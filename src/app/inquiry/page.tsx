import InquiryForm from "@/components/InquiryForm";

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
            Tell us a little about your family and your child. Our admissions
            team will review your inquiry and, if it looks like a good fit,
            reach out to schedule a tour.
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
