"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, total, count } = useCart();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#faf8f5] border-l border-[#e5ddd4] z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5ddd4]">
          <h2 className="font-light text-[#1a1a1a]">Cart {count > 0 && `(${count})`}</h2>
          <button onClick={onClose} className="text-[#6b6b6b] hover:text-[#1a1a1a] text-xl leading-none">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-[#8a8a8a] text-sm mt-8 text-center">Your cart is empty</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={`${item.type}-${item.id}`} className="flex gap-4 py-4 border-b border-[#e5ddd4]">
                  <div
                    className="w-14 h-14 rounded-xl bg-[#f0e6d8] flex items-center justify-center text-xs text-[#b8956a] shrink-0"
                  >
                    {item.type === "course" ? "▶" : "●"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1a1a1a] font-light leading-snug">{item.name}</p>
                    <p className="text-xs text-[#8a8a8a] mt-1 capitalize">{item.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-[#1a1a1a]">${item.price * item.qty}</p>
                    <button
                      onClick={() => remove(item.id)}
                      className="text-xs text-[#8a8a8a] hover:text-red-500 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-[#e5ddd4]">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-[#6b6b6b]">Total</span>
              <span className="font-light text-[#1a1a1a]">${total} CAD</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-[#1a1a1a] text-white text-center py-3 rounded-full text-sm tracking-wide hover:bg-[#333] transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
