"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin/inquiry", label: "Inquiries" },
  { href: "/admin/waitlist", label: "Waitlist" },
  { href: "/admin/enrolled", label: "Enrolled" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <ul className="flex md:flex-col gap-1 px-2 md:px-4">
      {items.map((i) => {
        const active = pathname === i.href || pathname.startsWith(i.href + "/");
        return (
          <li key={i.href}>
            <Link
              href={i.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-orange text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {i.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
