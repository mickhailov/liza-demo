"use client";

import { useState } from "react";

const categories = [
  {
    id: "brows",
    title: "Eyebrow Services",
    desc: "Microblading, powder brows, ombre, combination techniques",
    duration: "2–3 hours",
    icon: "✦",
  },
  {
    id: "lips",
    title: "Lip Services",
    desc: "Lip blush, full lip colour, lip liner, neutralisation",
    duration: "2 hours",
    icon: "◈",
  },
  {
    id: "eyeliner",
    title: "Eyeliner",
    desc: "Classic liner, lash enhancement, lower lash line",
    duration: "1.5 hours",
    icon: "◉",
  },
  {
    id: "consultation",
    title: "Free Consultation",
    desc: "Discuss your goals, skin type, and the best technique for you",
    duration: "30 min",
    icon: "◎",
  },
];

export default function BookingPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-sm tracking-[0.2em] uppercase text-[#b8956a] mb-3">Schedule online</p>
        <h1 className="text-4xl font-light text-[#1a1a1a] mb-4">Book a session</h1>
        <p className="text-[#6b6b6b] max-w-lg">
          You&apos;ll receive a confirmation email right after booking.
        </p>
      </div>

      {/* Step 1 — category */}
      <div className="mb-8">
        <p className="text-xs tracking-[0.2em] uppercase text-[#8a8a8a] mb-4">
          Step 1 — Select appointment category
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              className={`text-left p-6 rounded-2xl border transition-all duration-200 ${
                selected === cat.id
                  ? "border-[#b8956a] bg-[#f0e6d8]"
                  : "border-[#e5ddd4] bg-white hover:border-[#b8956a]"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[#b8956a] text-lg">{cat.icon}</span>
                {selected === cat.id && (
                  <span className="text-[10px] tracking-widest uppercase text-[#b8956a] font-medium">Selected</span>
                )}
              </div>
              <h3 className="font-light text-[#1a1a1a] mb-1">{cat.title}</h3>
              <p className="text-xs text-[#6b6b6b] leading-relaxed mb-3">{cat.desc}</p>
              <p className="text-xs text-[#b8956a]">⏱ {cat.duration}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 — Acuity */}
      {selected && (
        <div className="animate-[fadeUp_0.25s_ease-out]">
          <p className="text-xs tracking-[0.2em] uppercase text-[#8a8a8a] mb-4">
            Step 2 — Choose date & time
          </p>
          <div className="border border-[#e5ddd4] rounded-2xl overflow-hidden">
            <iframe
              src="https://butfirstyou.as.me/"
              width="100%"
              height="750"
              style={{ border: "none" }}
              title="Book a session with Liza Pozhydaeva"
            />
          </div>
        </div>
      )}
    </div>
  );
}
