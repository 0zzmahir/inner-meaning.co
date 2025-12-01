import Link from "next/link";
import SiteFooter from "@/components/site-footer";

export default function PrivacyPage() {
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

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 md:p-8 shadow-[0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <h1 className="text-2xl font-semibold text-slate-50 mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-300 mb-3">
            Inner Meaning does not collect personal information such as your
            real name, address, or payment details when you simply browse the
            website.
          </p>
          <p className="text-sm text-slate-300 mb-3">
            Basic analytics may be used to understand which topics are visited
            most often. This is only to improve the content and experience of
            the site, not to track individuals.
          </p>
          <p className="text-sm text-slate-300">
            Third-party advertising partners (such as Google AdSense) may use
            cookies to show more relevant ads. You can manage or disable cookies
            in your browser settings at any time.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
