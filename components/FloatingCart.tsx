"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";

export default function FloatingCart() {
  const { count, total } = useCart();
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  return (
    <>
      {/* Mobile — full width bar at bottom */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-[#1a1a1a] text-white px-6 py-4 animate-[fadeUp_0.25s_ease-out]"
      >
        <div className="flex items-center gap-3">
          <span className="relative">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span className="absolute -top-2 -right-2 bg-[#b8956a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
              {count}
            </span>
          </span>
          <span className="text-sm font-light">{count} {count === 1 ? "item" : "items"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-light">${total} CAD</span>
          <span className="bg-white text-[#1a1a1a] text-xs font-medium px-4 py-1.5 rounded-full">View cart</span>
        </div>
      </button>

      {/* Desktop — floating pill on the right */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3 bg-[#1a1a1a] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:bg-[#333] transition-all duration-300 animate-[fadeUp_0.25s_ease-out]"
      >
        <span className="relative">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span className="absolute -top-2 -right-2 bg-[#b8956a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
            {count}
          </span>
        </span>
        <span className="text-sm font-light tracking-wide">${total} CAD</span>
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
