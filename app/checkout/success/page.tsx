import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-28 text-center">
      <div className="w-16 h-16 rounded-full bg-[#f0e6d8] flex items-center justify-center mx-auto mb-6 text-2xl">
        ✓
      </div>
      <h1 className="text-3xl font-light text-[#1a1a1a] mb-3">Thank you!</h1>
      <p className="text-[#6b6b6b] mb-2">Your order has been confirmed.</p>
      <p className="text-sm text-[#8a8a8a] mb-10">
        A confirmation email has been sent. If you purchased a course, you&apos;ll find it in your personal cabinet.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/courses"
          className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full text-sm tracking-wide hover:bg-[#333] transition-colors"
        >
          Go to my courses
        </Link>
        <Link
          href="/shop"
          className="border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 rounded-full text-sm tracking-wide hover:bg-[#1a1a1a] hover:text-white transition-colors"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
}
