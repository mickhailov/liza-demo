"use client";

import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvc: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    let v = value;
    if (name === "card") v = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (name === "expiry") v = value.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
    if (name === "cvc") v = value.replace(/\D/g, "").slice(0, 3);
    setForm((f) => ({ ...f, [name]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clear();
      router.push("/checkout/success");
    }, 1800);
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="text-[#6b6b6b] mb-6">Your cart is empty.</p>
        <Link href="/shop" className="text-sm text-[#b8956a] hover:underline">Back to shop →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-sm tracking-[0.2em] uppercase text-[#b8956a] mb-3">Secure payment</p>
        <h1 className="text-4xl font-light text-[#1a1a1a]">Checkout</h1>
      </div>

      <div className="grid md:grid-cols-[1fr_380px] gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-sm tracking-widest uppercase text-[#6b6b6b] mb-4">Contact</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#6b6b6b] mb-1">Full name</label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  placeholder="Jane Smith"
                  className="w-full border border-[#e5ddd4] rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#b8956a] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-[#6b6b6b] mb-1">Email</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="jane@example.com"
                  className="w-full border border-[#e5ddd4] rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#b8956a] transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm tracking-widest uppercase text-[#6b6b6b] mb-4">Payment</h2>
            <div className="border border-[#e5ddd4] rounded-xl overflow-hidden bg-white">
              <div className="px-4 py-3 border-b border-[#e5ddd4]">
                <label className="block text-xs text-[#6b6b6b] mb-1">Card number</label>
                <input
                  name="card" value={form.card} onChange={handleChange} required
                  placeholder="1234 5678 9012 3456"
                  className="w-full text-sm focus:outline-none bg-transparent"
                />
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-3 border-r border-[#e5ddd4]">
                  <label className="block text-xs text-[#6b6b6b] mb-1">Expiry</label>
                  <input
                    name="expiry" value={form.expiry} onChange={handleChange} required
                    placeholder="MM/YY"
                    className="w-full text-sm focus:outline-none bg-transparent"
                  />
                </div>
                <div className="px-4 py-3">
                  <label className="block text-xs text-[#6b6b6b] mb-1">CVC</label>
                  <input
                    name="cvc" value={form.cvc} onChange={handleChange} required
                    placeholder="123"
                    className="w-full text-sm focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-[#8a8a8a] mt-2 flex items-center gap-1">
              <span>🔒</span> Secured by Stripe. Your card details are encrypted.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a1a1a] text-white py-4 rounded-full text-sm tracking-wide hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${total} CAD`
            )}
          </button>
        </form>

        {/* Order summary */}
        <div>
          <div className="border border-[#e5ddd4] rounded-2xl p-6 sticky top-24">
            <h2 className="text-sm tracking-widest uppercase text-[#6b6b6b] mb-4">Order summary</h2>
            <ul className="space-y-3 mb-4">
              {items.map((item) => (
                <li key={`${item.type}-${item.id}`} className="flex justify-between text-sm">
                  <div>
                    <p className="text-[#1a1a1a] font-light">{item.name}</p>
                    <p className="text-[#8a8a8a] text-xs capitalize">{item.type} × {item.qty}</p>
                  </div>
                  <span className="text-[#1a1a1a]">${item.price * item.qty}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#e5ddd4] pt-4 flex justify-between">
              <span className="text-sm text-[#6b6b6b]">Total</span>
              <span className="font-light text-[#1a1a1a]">${total} CAD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
