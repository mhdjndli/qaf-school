"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/program", label: "JK/SK Program" },
  { href: "/admissions", label: "Admissions" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/parents", label: "Parents" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="QAF Logo"
            width={48}
            height={48}
            className="rounded-lg"
          />
          <span className="font-heading text-xl font-bold text-text hidden sm:block">
            QAF
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden xl:flex items-center gap-5">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-medium relative pb-1 transition-colors hover:text-orange-dark ${
                  pathname === l.href
                    ? "text-orange-dark after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange"
                    : "text-text"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/inquiry"
              className="bg-orange text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-dark transition-all hover:-translate-y-0.5"
            >
              Submit Inquiry
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="xl:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-text transition-transform ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text transition-transform ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-white border-t border-border shadow-lg">
          <ul className="px-6 py-4 space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 border-b border-border/50 text-base font-medium ${
                    pathname === l.href ? "text-orange-dark" : "text-text"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/inquiry"
                onClick={() => setOpen(false)}
                className="block mt-3 bg-orange text-white text-center px-5 py-3 rounded-lg font-semibold"
              >
                Submit Inquiry
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
