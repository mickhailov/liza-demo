import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#f0e6d8] py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-[#b8956a] mb-4">
              Permanent Makeup Artist · Winnipeg, Canada
            </p>
            <h1 className="text-5xl font-light leading-tight text-[#1a1a1a] mb-6">
              The art of<br />
              <em>natural beauty</em>
            </h1>
            <p className="text-[#6b6b6b] text-lg leading-relaxed mb-10 max-w-md">
              Professional permanent makeup services and online courses.
              Learn from a certified master with 10+ years of experience.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/booking"
                className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full text-sm tracking-wide hover:bg-[#333] transition-colors"
              >
                Book a session
              </Link>
              <Link
                href="/courses"
                className="border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 rounded-full text-sm tracking-wide hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                View courses
              </Link>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden rounded-2xl bg-[#d4bfac]">
            <Image
              src="/ai-photos/hero-treatment.png"
              alt="Permanent makeup artist preparing an eyebrow treatment"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-16 text-[#1a1a1a]">What I offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Permanent Makeup",
                desc: "Eyebrows, lips, eyeliner — professional results that last for years. Book a consultation to discuss your goals.",
                link: "/booking",
                cta: "Book now",
              },
              {
                title: "Online Courses",
                desc: "20 in-depth lessons on permanent makeup techniques. Learn at your own pace with lifetime access.",
                link: "/courses",
                cta: "See courses",
              },
              {
                title: "Professional Products",
                desc: "Pigments, tools and aftercare products trusted by professionals. Used in every session.",
                link: "/shop",
                cta: "Shop now",
              },
            ].map((item) => (
              <div key={item.title} className="border border-[#e5ddd4] rounded-2xl p-8 hover:border-[#b8956a] transition-colors">
                <h3 className="text-xl font-light mb-3 text-[#1a1a1a]">{item.title}</h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6">{item.desc}</p>
                <Link href={item.link} className="text-sm text-[#b8956a] tracking-wide hover:underline">
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#f0e6d8] py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-80 overflow-hidden rounded-2xl bg-[#d4bfac]">
            <Image
              src="/ai-photos/about-artist.png"
              alt="Permanent makeup educator in a warm professional studio"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-[#b8956a] mb-4">About me</p>
            <h2 className="text-3xl font-light mb-6 text-[#1a1a1a]">Certified master<br />& educator</h2>
            <p className="text-[#6b6b6b] leading-relaxed mb-4">
              I&apos;ve been practicing permanent makeup for over 10 years, working with clients across Canada.
              My approach focuses on natural-looking results that complement your unique features.
            </p>
            <p className="text-[#6b6b6b] leading-relaxed mb-8">
              I&apos;m passionate about education and have trained dozens of artists through my online courses.
              Each lesson reflects real-world techniques I use with clients every day.
            </p>
            <Link href="/booking" className="text-sm text-[#b8956a] tracking-wide hover:underline">
              Book a consultation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
