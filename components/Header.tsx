"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/courses", label: "Courses" },
  { href: "/booking", label: "Book a session" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[#e5ddd4] bg-[#faf8f5] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg tracking-widest font-light uppercase text-[#1a1a1a]">
          Liza Pozhydaeva
        </Link>
        <nav className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-[#b8956a] font-medium"
                  : "text-[#6b6b6b] hover:text-[#1a1a1a]"
              } ${
                link.href === "/booking"
                  ? "bg-[#1a1a1a] text-white px-5 py-2 rounded-full hover:bg-[#333] hover:text-white text-sm"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
