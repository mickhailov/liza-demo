"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const courses = [
  {
    id: 101,
    title: "Eyebrow Mastery",
    subtitle: "Microblading & Powder Brows",
    lessons: 20,
    price: 299,
    badge: "Most popular",
    topics: ["Face mapping & symmetry", "Colour theory & skin types", "Microblading technique", "Powder & ombre brows", "Healing process & corrections"],
  },
  {
    id: 102,
    title: "Lip Blush",
    subtitle: "Natural Colour & Full Lip",
    lessons: 12,
    price: 199,
    badge: null,
    topics: ["Lip anatomy & shapes", "Pigment selection", "Needle techniques", "After-care protocols"],
  },
  {
    id: 103,
    title: "Complete PM Course",
    subtitle: "Brows + Lips + Eyeliner",
    lessons: 35,
    price: 599,
    badge: "Best value",
    topics: ["Full brow course content", "Full lip course content", "Eyeliner techniques", "Business & client management", "Live Q&A sessions"],
  },
];

export default function CoursesPage() {
  const { add } = useCart();
  const [enrolled, setEnrolled] = useState<number | null>(null);

  function handleEnroll(c: typeof courses[0]) {
    add({ id: c.id, name: c.title, price: c.price, type: "course" });
    setEnrolled(c.id);
    setTimeout(() => setEnrolled(null), 1200);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-sm tracking-[0.2em] uppercase text-[#b8956a] mb-3">Learn from a master</p>
        <h1 className="text-4xl font-light text-[#1a1a1a] mb-4">Online Courses</h1>
        <p className="text-[#6b6b6b] max-w-xl">
          Professional permanent makeup training at your own pace. Lifetime access and certificate on completion.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`border rounded-2xl overflow-hidden flex flex-col ${
              course.badge === "Best value" ? "border-[#b8956a] ring-1 ring-[#b8956a]" : "border-[#e5ddd4]"
            }`}
          >
            {course.badge && (
              <div className="bg-[#b8956a] text-white text-xs tracking-widest uppercase text-center py-2">
                {course.badge}
              </div>
            )}
            <div className="p-8 flex flex-col flex-1">
              <h2 className="text-xl font-light text-[#1a1a1a] mb-1">{course.title}</h2>
              <p className="text-sm text-[#b8956a] mb-4">{course.subtitle}</p>
              <div className="flex gap-4 text-sm text-[#6b6b6b] mb-6">
                <span>{course.lessons} lessons</span>
                <span>·</span>
                <span>30 min each</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {course.topics.map((topic) => (
                  <li key={topic} className="flex gap-2 text-sm text-[#6b6b6b]">
                    <span className="text-[#b8956a] mt-0.5">✓</span>
                    {topic}
                  </li>
                ))}
              </ul>
              <div className="border-t border-[#e5ddd4] pt-6">
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-light text-[#1a1a1a]">${course.price}</span>
                  <span className="text-sm text-[#8a8a8a]">CAD</span>
                </div>
                <button
                  onClick={() => handleEnroll(course)}
                  className={`w-full py-3 rounded-full text-sm tracking-wide transition-all duration-300 ${
                    enrolled === course.id
                      ? "bg-[#b8956a] text-white"
                      : "bg-[#1a1a1a] text-white hover:bg-[#333]"
                  }`}
                >
                  {enrolled === course.id ? "Added to cart ✓" : "Enroll now"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#f0e6d8] rounded-2xl p-10 grid sm:grid-cols-3 gap-8 text-center">
        {[
          { icon: "▶", label: "Lifetime access", desc: "Watch any time, as many times as you need" },
          { icon: "📋", label: "Certificate", desc: "Receive a certificate after completing the course" },
          { icon: "💬", label: "Support", desc: "Ask questions directly through the student portal" },
        ].map((item) => (
          <div key={item.label}>
            <div className="text-2xl mb-3">{item.icon}</div>
            <h3 className="font-light text-[#1a1a1a] mb-1">{item.label}</h3>
            <p className="text-sm text-[#6b6b6b]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
