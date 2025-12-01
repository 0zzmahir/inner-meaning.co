import Link from "next/link";
import SiteFooter from "@/components/site-footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050509] via-[#05060b] to-[#101319] text-slate-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 text-sm">
          {/* LOGO + TAGLINE */}
{/* LOGO + TAGLINE (PREMIUM NEON VERSION) */}
<Link href="/" className="group flex flex-col leading-tight select-none">
  <span
    className="
      font-semibold 
      tracking-[0.32em]
      text-[1.35rem]
      text-pink-300 
      drop-shadow-[0_0_12px_rgba(255,100,180,0.55)]
      group-hover:text-pink-200
      transition
      duration-200
    "
  >
    INNER MEANING
  </span>

  <span
    className="
      mt-1
      text-[0.63rem]
      uppercase 
      tracking-[0.28em]
      text-slate-400
      group-hover:text-pink-300/80
      transition
    "
  >
    a calm meaning library
  </span>

  {/* PEMBE NEON ALT ÇİZGİ */}
  <span
    className="
      mt-2
      h-[2px]
      w-14
      rounded-full
      bg-gradient-to-r from-pink-400 to-pink-200
      opacity-60
      group-hover:opacity-90
      blur-[1px]
      group-hover:blur-[2px]
      transition-all 
      duration-300
    "
  />
</Link>


          <div className="flex items-center gap-5 text-[0.8rem] text-slate-300">
            <Link href="/" className="hover:text-slate-50 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-slate-50 transition">
              About
            </Link>
             <Link
    href="/contact"
    className="px-3 py-1.5 rounded-full hover:text-white hover:bg-slate-800/60 transition"
  >
    Contact
  </Link>
          </div>
        </div>
      </nav>

      {/* arka plan efektleri */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-60px] top-20 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="absolute right-[-40px] bottom-10 h-80 w-80 rounded-full bg-slate-300/16 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 md:p-8 shadow-[0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <h1 className="text-2xl font-semibold text-slate-50 mb-3">
            About Inner Meaning
          </h1>
          <p className="text-sm text-slate-300 mb-3">
            Inner Meaning is a quiet corner of the internet built to answer a
            simple question:{" "}
            <span className="italic">
              “What is this strange moment in my life trying to tell me?”
            </span>
          </p>
          <p className="text-sm text-slate-300 mb-3">
            Instead of generic horoscopes or clickbait fear, each entry blends
            spiritual symbolism with gentle psychological context. The goal is
            not to scare you or promise miracles, but to give you language for
            experiences you can&apos;t easily explain.
          </p>
          <p className="text-sm text-slate-300">
            Over time, this library will grow into hundreds of thousands of
            explained dreams, signs, and emotional patterns — all written in a
            calm, modern and readable way, so you can explore quietly at your
            own pace. It&apos;s also designed to be friendly for reading on
            mobile, tablets, and laptops, and to host a few tasteful ad spots
            without feeling spammy.
          </p>

          {/* AdSense için sabit alan örneği */}
          {/* Gerçek reklam kodunu buraya koyabilirsin */}
          {/* 
          <div className="mt-8 h-28 rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 flex items-center justify-center text-xs text-slate-400">
            Ad space
          </div>
          */}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
