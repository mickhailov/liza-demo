"use client";

import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const products = [
  { id: 1, name: "Brow Pigment — Warm Brown", price: 49, category: "Pigments", desc: "Long-lasting warm brown pigment for natural brow enhancement.", color: "#c4a882", image: "/products/pigment-brown.jpg" },
  { id: 2, name: "Brow Pigment — Ash Taupe", price: 49, category: "Pigments", desc: "Cool-toned ash taupe for soft, modern brows.", color: "#a89080", image: "/products/pigment-taupe.jpg" },
  { id: 3, name: "Lip Pigment — Nude Rose", price: 54, category: "Pigments", desc: "Delicate nude rose for natural lip blush results.", color: "#d4a0a0", image: "/products/pigment-rose.jpg" },
  { id: 4, name: "Aftercare Healing Cream", price: 28, category: "Aftercare", desc: "Soothing cream for post-procedure care. Speeds up healing.", color: "#e8d5c4", image: "/products/aftercare-cream.jpg" },
  { id: 5, name: "Microblading Pen Set", price: 89, category: "Tools", desc: "Professional-grade microblading pens for precise hair strokes.", color: "#8a9090", image: "/products/microblading-pen.jpg" },
  { id: 6, name: "Numbing Cream 30g", price: 35, category: "Accessories", desc: "Topical numbing cream for maximum client comfort.", color: "#c8d4d0", image: "/products/numbing-cream.jpg" },
];

export default function ShopPage() {
  const { add } = useCart();
  const [added, setAdded] = useState<number | null>(null);

  function handleAdd(p: typeof products[0]) {
    add({ id: p.id, name: p.name, price: p.price, type: "product" });
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1200);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-sm tracking-[0.2em] uppercase text-[#b8956a] mb-3">Professional supplies</p>
        <h1 className="text-4xl font-light text-[#1a1a1a]">Shop</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-[#e5ddd4] rounded-2xl overflow-hidden hover:border-[#b8956a] transition-colors">
            {/* IMAGE PLACEHOLDER — replace div with <Image> once photos are ready */}
            {/* Expected file: public{product.image} e.g. public/products/pigment-brown.jpg */}
            {/* To replace: <div className="relative h-52 overflow-hidden"><Image src={product.image} alt={product.name} fill className="object-cover" /></div> */}
            <div className="h-52 flex flex-col items-center justify-center gap-2" style={{ backgroundColor: product.color + "30" }}>
              <div className="w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center" style={{ borderColor: product.color }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: product.color }}>
                  <path d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-3h4l2 3h4a2 2 0 012 2z"/>
                  <circle cx="12" cy="11" r="3"/>
                </svg>
              </div>
              <p className="text-[10px] tracking-wide" style={{ color: product.color }}>
                {product.image.replace("/products/", "")}
              </p>
            </div>
            <div className="p-6">
              <p className="text-xs tracking-widest uppercase text-[#b8956a] mb-1">{product.category}</p>
              <h3 className="font-light text-[#1a1a1a] mb-2">{product.name}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">{product.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-light text-[#1a1a1a]">${product.price} CAD</span>
                <button
                  onClick={() => handleAdd(product)}
                  className={`px-5 py-2 rounded-full text-xs tracking-wide transition-all duration-300 ${
                    added === product.id
                      ? "bg-[#b8956a] text-white"
                      : "bg-[#1a1a1a] text-white hover:bg-[#333]"
                  }`}
                >
                  {added === product.id ? "Added ✓" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-[#8a8a8a] mt-12">
        Secure checkout · Fast shipping across Canada
      </p>
    </div>
  );
}
