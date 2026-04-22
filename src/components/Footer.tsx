import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-text text-white/80 pt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.jpg" alt="QAF" width={44} height={44} className="rounded-lg" />
              <span className="font-heading text-xl font-bold text-white">QAF</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Qabas Academic Foundation<br />
              Islamic JK &amp; SK &middot; Ottawa &middot; Since 2021
            </p>
            <div className="mt-4 text-sm text-white/60">
              <p>900 Dynes Rd</p>
              <p>Ottawa, ON K2C 3L6</p>
              <p className="mt-2">
                <a href="mailto:admin@qafschool.ca" className="hover:text-orange transition-colors">
                  admin@qafschool.ca
                </a>
              </p>
              <p>
                <a href="tel:+16135818685" className="hover:text-orange transition-colors">
                  +1 613 581 8685
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/program", label: "JK/SK Program" },
                { href: "/admissions", label: "Admissions" },
                { href: "/faq", label: "FAQ" },
                { href: "/blog", label: "Blog" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-orange transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Families */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">
              For Families
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/parents", label: "Parent Portal" },
                { href: "/parents", label: "School Calendar" },
                { href: "/parents", label: "Parent Handbook" },
                { href: "/contact", label: "Contact Us" },
              ].map((l, i) => (
                <li key={i}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-orange transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://instagram.com/qafott"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-orange transition-colors"
                >
                  Instagram @qafott
                </a>
              </li>
              <li>
                <Link
                  href="/inquiry"
                  className="text-sm text-white/60 hover:text-orange transition-colors"
                >
                  Submit Inquiry
                </Link>
              </li>
              <li>
                <a
                  href="mailto:admin@qafschool.ca"
                  className="text-sm text-white/60 hover:text-orange transition-colors"
                >
                  admin@qafschool.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>&copy; 2026 Qabas Academic Foundation. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-orange transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-orange transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
