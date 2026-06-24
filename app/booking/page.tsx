"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { id: "brows", title: "Eyebrow Services", desc: "Microblading, powder brows, ombre, combination techniques", duration: "2–3 hours", icon: "✦", price: 450 },
  { id: "lips", title: "Lip Services", desc: "Lip blush, full lip colour, lip liner, neutralisation", duration: "2 hours", icon: "◈", price: 380 },
  { id: "eyeliner", title: "Eyeliner", desc: "Classic liner, lash enhancement, lower lash line", duration: "1.5 hours", icon: "◉", price: 300 },
  { id: "consultation", title: "Free Consultation", desc: "Discuss your goals, skin type, and the best technique for you", duration: "30 min", icon: "◎", price: 0 },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
const UNAVAILABLE = [3, 7, 12, 18, 22];

function MockCalendar({ onConfirm }: { onConfirm: (date: string, time: string) => void }) {
  const now = new Date(2026, 5, 1); // June 2026
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const monthName = new Date(year, month).toLocaleString("en", { month: "long" });
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null); setSelectedTime(null);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null); setSelectedTime(null);
  }

  const cells = Array.from({ length: firstDow + daysInMonth }, (_, i) =>
    i < firstDow ? null : i - firstDow + 1
  );

  return (
    <div className="border border-[#e5ddd4] rounded-2xl overflow-hidden bg-white">
      <div className="grid md:grid-cols-[1fr_200px]">
        {/* Calendar */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-[#e5ddd4]">
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-[#f0e6d8] flex items-center justify-center text-[#6b6b6b] transition-colors">‹</button>
            <span className="font-light text-[#1a1a1a]">{monthName} {year}</span>
            <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-[#f0e6d8] flex items-center justify-center text-[#6b6b6b] transition-colors">›</button>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] tracking-wide text-[#8a8a8a] py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const unavail = UNAVAILABLE.includes(day);
              const isSelected = selectedDay === day;
              return (
                <button
                  key={i}
                  disabled={unavail}
                  onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                  className={`h-9 w-9 mx-auto rounded-full text-sm transition-all duration-150 ${
                    isSelected
                      ? "bg-[#1a1a1a] text-white"
                      : unavail
                      ? "text-[#d4c9bf] cursor-not-allowed"
                      : "text-[#1a1a1a] hover:bg-[#f0e6d8]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-[#8a8a8a] mt-4 text-center">Grey dates are unavailable</p>
        </div>

        {/* Time slots */}
        <div className="p-6">
          <p className="text-xs tracking-widest uppercase text-[#8a8a8a] mb-4">
            {selectedDay ? `${monthName} ${selectedDay}` : "Select a date"}
          </p>
          {selectedDay ? (
            <div className="flex flex-col gap-2">
              {TIMES.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2.5 px-4 rounded-xl text-sm border transition-all duration-150 ${
                    selectedTime === t
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "border-[#e5ddd4] text-[#1a1a1a] hover:border-[#b8956a]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#d4c9bf]">← Pick a day first</p>
          )}
        </div>
      </div>

      {/* Confirm bar */}
      {selectedDay && selectedTime && (
        <div className="border-t border-[#e5ddd4] px-6 py-4 flex items-center justify-between bg-[#faf8f5] animate-[fadeUp_0.2s_ease-out]">
          <div>
            <p className="text-sm font-light text-[#1a1a1a]">{monthName} {selectedDay}, {year}</p>
            <p className="text-xs text-[#b8956a]">{selectedTime}</p>
          </div>
          <button
            onClick={() => onConfirm(`${monthName} ${selectedDay}`, selectedTime)}
            className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-sm tracking-wide hover:bg-[#333] transition-colors"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ date: string; time: string } | null>(null);
  const router = useRouter();

  function handleConfirm(date: string, time: string) {
    setConfirmed({ date, time });
    setTimeout(() => router.push("/checkout/success"), 1800);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <div className="mb-10">
        <p className="text-sm tracking-[0.2em] uppercase text-[#b8956a] mb-3">Schedule online</p>
        <h1 className="text-3xl md:text-4xl font-light text-[#1a1a1a] mb-4">Book a session</h1>
        <p className="text-[#6b6b6b] max-w-lg text-sm md:text-base">
          You&apos;ll receive a confirmation email right after booking.
        </p>
      </div>

      {/* Step 1 */}
      <div className="mb-8">
        <p className="text-xs tracking-[0.2em] uppercase text-[#8a8a8a] mb-4">Step 1 — Select appointment category</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelected(cat.id); setConfirmed(null); }}
              className={`text-left p-5 md:p-6 rounded-2xl border transition-all duration-200 ${
                selected === cat.id ? "border-[#b8956a] bg-[#f0e6d8]" : "border-[#e5ddd4] bg-white hover:border-[#b8956a]"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[#b8956a] text-lg">{cat.icon}</span>
                {selected === cat.id && <span className="text-[10px] tracking-widest uppercase text-[#b8956a] font-medium">Selected</span>}
              </div>
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-light text-[#1a1a1a]">{cat.title}</h3>
                <span className="text-sm font-light text-[#1a1a1a] ml-2 shrink-0">
                  {cat.price === 0 ? "Free" : `$${cat.price} CAD`}
                </span>
              </div>
              <p className="text-xs text-[#6b6b6b] leading-relaxed mb-3">{cat.desc}</p>
              <p className="text-xs text-[#b8956a]">⏱ {cat.duration}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 */}
      {selected && !confirmed && (
        <div className="animate-[fadeUp_0.25s_ease-out]">
          <p className="text-xs tracking-[0.2em] uppercase text-[#8a8a8a] mb-4">Step 2 — Choose date & time</p>
          <MockCalendar onConfirm={handleConfirm} />
        </div>
      )}

      {/* Confirmed */}
      {confirmed && (
        <div className="border border-[#b8956a] bg-[#f0e6d8] rounded-2xl p-8 text-center animate-[fadeUp_0.2s_ease-out]">
          <div className="text-2xl mb-3">✓</div>
          <p className="font-light text-[#1a1a1a] mb-1">Appointment requested</p>
          <p className="text-sm text-[#b8956a]">{confirmed.date} at {confirmed.time}</p>
          <p className="text-xs text-[#6b6b6b] mt-3">Redirecting to confirmation...</p>
        </div>
      )}
    </div>
  );
}
