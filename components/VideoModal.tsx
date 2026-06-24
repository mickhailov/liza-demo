"use client";

import { useEffect } from "react";

export default function VideoModal({ title, onClose }: { title: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl animate-[fadeUp_0.2s_ease-out]">
        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-white text-sm font-light">{title}</p>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            ✕ Close
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden aspect-video bg-black">
          <iframe
            src="https://www.youtube.com/embed/u_IZtJK-VI4?autoplay=1&rel=0"
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="text-center text-white/50 text-xs mt-3">
          Free preview lesson · Full course available after enrollment
        </p>
      </div>
    </div>
  );
}
