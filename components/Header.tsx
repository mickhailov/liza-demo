"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/courses", label: "Courses" },
  { href: "/booking", label: "Book a session" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-[#e5ddd4] bg-[#faf8f5] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link href="/" className="text-base md:text-lg tracking-widest font-light uppercase text-[#1a1a1a]">
            Liza Pozhydaeva
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  pathname === link.href ? "text-[#b8956a] font-medium" : "text-[#6b6b6b] hover:text-[#1a1a1a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="text-sm bg-[#1a1a1a] text-white px-5 py-2 rounded-full hover:bg-[#333] transition-colors tracking-wide"
            >
              Book a session
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
              aria-label="Open cart"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#b8956a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#6b6b6b]"
              aria-label="Open cart"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#b8956a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#1a1a1a] p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#e5ddd4] bg-[#faf8f5] px-6 py-4 flex flex-col gap-1 animate-[fadeUp_0.15s_ease-out]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-sm tracking-wide border-b border-[#f0e6d8] last:border-0 transition-colors ${
                  link.href === "/booking"
                    ? "text-[#b8956a] font-medium"
                    : pathname === link.href
                    ? "text-[#b8956a] font-medium"
                    : "text-[#1a1a1a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
