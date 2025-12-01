"use client";

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-slate-800/80 bg-gradient-to-t from-black/50 via-slate-950/50 to-transparent backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
        
        {/* Sol taraf */}
        <p className="text-[0.85rem] text-slate-400 tracking-wide">
          © 2025 Inner Meaning · A calm library of dreams, signs & feelings.
        </p>

        {/* Sağ taraf – büyük butonlar */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/privacy"
            className="rounded-full border border-pink-400/80 bg-pink-500/30 px-5 py-2 text-[0.85rem] uppercase tracking-[0.18em] 
            text-pink-100 shadow-[0_0_25px_rgba(244,114,182,0.35)] hover:bg-pink-500/40 hover:border-pink-300/80 hover:text-white transition"
          >
            Privacy
          </Link>

          <Link
            href="/terms"
            className="rounded-full border border-pink-400/80 bg-pink-500/30 px-5 py-2 text-[0.85rem] uppercase tracking-[0.18em]
            text-pink-100 shadow-[0_0_25px_rgba(244,114,182,0.35)] hover:bg-pink-500/40 hover:border-pink-300/80 hover:text-white transition"
          >
            Terms
          </Link>

          <Link
            href="/about"
            className="rounded-full border border-slate-700/80 bg-slate-950/70 px-5 py-2 text-[0.85rem] uppercase tracking-[0.18em]
            text-slate-200 hover:border-pink-300/80 hover:text-pink-100 transition hover:bg-slate-900/70"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
