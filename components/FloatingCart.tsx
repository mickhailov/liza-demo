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
      {/* Full width bar at bottom — mobile & desktop */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-[#1a1a1a] text-white px-6 md:px-10 py-4 animate-[fadeUp_0.25s_ease-out]"
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

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
