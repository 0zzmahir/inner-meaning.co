import Link from "next/link";
import SiteFooter from "@/components/site-footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050509] via-[#05060b] to-[#101319] text-slate-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 text-sm">
          {/* PREMIUM LOGO */}
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

          <div className="flex items-center gap-6 text-[1rem] text-slate-200">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-slate-800/60 transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-slate-800/60 transition"
            >
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

      {/* ARKA PLAN GLOWLAR */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-60px] top-32 h-80 w-80 rounded-full bg-pink-400/22 blur-3xl" />
        <div className="absolute right-[-40px] bottom-20 h-96 w-96 rounded-full bg-slate-300/14 blur-3xl" />
      </div>

      {/* İÇERİK */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 md:p-10 shadow-[0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-4">
            Contact
          </h1>

          <p className="text-sm text-slate-300 mb-6">
            If you'd like to reach out about feedback, corrections, suggestions
            or collaboration ideas, you can use the email below. Inner Meaning
            is a calm side of the internet — thoughtful messages are appreciated.
          </p>

          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/50 p-6 shadow-[0_12px_35px_rgba(0,0,0,0.55)] backdrop-blur-lg">
            <p className="text-sm text-slate-400 mb-2">Email</p>
            <p className="text-pink-300 text-lg font-medium tracking-wide drop-shadow-[0_0_12px_rgba(255,100,180,0.4)]">
              contact@inner-meaning.com
            </p>

            <p className="mt-6 text-sm text-slate-400 mb-2">Response time</p>
            <p className="text-slate-300 text-sm">
              Usually within 6 hours.
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
