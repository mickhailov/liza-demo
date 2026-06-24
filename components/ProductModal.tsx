"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  desc: string;
  color: string;
  image: string;
};

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function handleAdd() {
    add({ id: product.id, name: product.name, price: product.price, type: "product" });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#faf8f5] rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl animate-[fadeUp_0.2s_ease-out]">
        {/* Image area */}
        <div className="relative h-64 bg-[#f0e6d8]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 512px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors text-sm"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-8">
          <p className="text-xs tracking-widest uppercase text-[#b8956a] mb-1">{product.category}</p>
          <h2 className="text-2xl font-light text-[#1a1a1a] mb-3">{product.name}</h2>
          <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6">{product.desc}</p>

          <div className="flex items-center gap-3 text-xs text-[#8a8a8a] mb-6">
            <span>✓ Free shipping over $100</span>
            <span>·</span>
            <span>✓ Professional grade</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-light text-[#1a1a1a]">${product.price} <span className="text-sm text-[#8a8a8a]">CAD</span></span>
            <button
              onClick={handleAdd}
              className={`px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-300 ${
                added ? "bg-[#b8956a] text-white" : "bg-[#1a1a1a] text-white hover:bg-[#333]"
              }`}
            >
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
