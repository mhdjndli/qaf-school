import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-24 md:py-32 text-center flex-1">
      <div className="max-w-2xl mx-auto px-6">
        <p className="font-heading text-6xl md:text-7xl font-bold text-orange mb-4">404</p>
        <h1 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-text">
          This page seems to have wandered off
        </h1>
        <p className="text-text-light text-lg mb-9 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
          Let&rsquo;s get you back to something helpful.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/program"
            className="border-2 border-orange text-orange-dark px-8 py-4 rounded-lg font-semibold hover:bg-orange hover:text-white transition-all hover:-translate-y-0.5"
          >
            See Our Program
          </Link>
        </div>
      </div>
    </section>
  );
}
