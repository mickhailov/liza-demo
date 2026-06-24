export default function BookingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-sm tracking-[0.2em] uppercase text-[#b8956a] mb-3">Schedule online</p>
        <h1 className="text-4xl font-light text-[#1a1a1a] mb-4">Book a session</h1>
        <p className="text-[#6b6b6b] max-w-lg">
          Choose a service and a time that works for you. You&apos;ll receive a confirmation email right after booking.
        </p>
      </div>

      <div className="border border-[#e5ddd4] rounded-2xl overflow-hidden">
        <iframe
          src="https://butfirstyou.as.me/"
          width="100%"
          height="800"
          style={{ border: "none" }}
          title="Book a session with Liza Pozhydaeva"
        />
      </div>
    </div>
  );
}
