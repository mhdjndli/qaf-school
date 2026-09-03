import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're Enrolled · Sunday Camp",
  robots: { index: false, follow: false },
};

export default function CampThanks() {
  return (
    <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-24 md:py-32 text-center flex-1">
      <div className="max-w-2xl mx-auto px-6">
        <div className="w-20 h-20 rounded-full bg-green/10 text-green text-4xl flex items-center justify-center mx-auto mb-6">
          &#10003;
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-text">
          Alhamdulillah — your child&rsquo;s spot is reserved!
        </h1>
        <p className="text-text-light text-lg mb-4 leading-relaxed">
          Your payment went through and a receipt is on its way to your inbox.
          We&rsquo;ll email you before the first Sunday with everything you
          need: drop-off details, what to bring, and your child&rsquo;s class.
        </p>
        <p className="text-text-light text-lg mb-9 leading-relaxed">
          Questions in the meantime? Call us at{" "}
          <a href="tel:+16135818685" className="text-orange-dark font-semibold hover:underline">
            +1 613 581 8685
          </a>{" "}
          or email{" "}
          <a href="mailto:admin@qafschool.ca" className="text-orange-dark font-semibold hover:underline">
            admin@qafschool.ca
          </a>.
        </p>
        <Link
          href="/"
          className="inline-block bg-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Back to qafschool.com
        </Link>
      </div>
    </section>
  );
}
