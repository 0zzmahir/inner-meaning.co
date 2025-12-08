import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AdsenseBlock } from "@/components/adsense-block";
import topicsRaw from "@/data/topics.json";

export const metadata: Metadata = {
  title: "Inner Meaning – Dreams, Signs & Mind Patterns",
  description:
    "Decode the strange patterns in your life: dream meanings, spiritual signs, strange events, emotional signals and mind loops.",
};

// Topic sayıları (build-time, CPU yok)
type Topic = { category?: string };
const topics = (topicsRaw as Topic[]) || [];

const totalEntries = topics.length;
const countByCategory = (name: string) =>
  topics.filter((t) => t.category === name).length;

const spiritualCount = countByCategory("Spiritual Signs");
const dreamCount = countByCategory("Dream Meanings");
const strangeCount = countByCategory("Strange Events");
const emotionalCount = countByCategory("Emotional Signals");
const mindCount = countByCategory("Mind Patterns");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* AdSense ana kodu – Google’ın istediği tam snippet */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8097019883190912"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />

          {/* Üst global banner */}
          <AdsenseBlock
            slot="1234567890" // Gerçek slot id ile değiştir
            className="mx-auto mt-3 w-full max-w-6xl px-4 md:px-8 lg:px-16"
          />

          <main className="flex-1">{children}</main>

          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 md:px-8 lg:px-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-xs font-bold text-slate-950">
            IM
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-50">
              Inner Meaning
            </span>
            <span className="text-[11px] text-slate-400">
              Dreams, signs & mind patterns
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-xs font-medium text-slate-300">
          <Link
            href="/"
            className="rounded-full px-3 py-1 hover:bg-slate-800/70 hover:text-slate-50"
          >
            Home
          </Link>
          <Link
            href="/library"
            className="rounded-full px-3 py-1 hover:bg-slate-800/70 hover:text-slate-50"
          >
            Library
          </Link>
          <Link
            href="/search"
            className="rounded-full px-3 py-1 hover:bg-slate-800/70 hover:text-slate-50"
          >
            Search
          </Link>
          <Link
            href="/about"
            className="hidden rounded-full px-3 py-1 text-slate-400 hover:bg-slate-800/70 hover:text-slate-50 md:inline-flex"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hidden rounded-full px-3 py-1 text-slate-400 hover:bg-slate-800/70 hover:text-slate-50 md:inline-flex"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900/80 bg-slate-950/95">
      {/* Footer banner ad */}
      <AdsenseBlock
        slot="1234567891" // Gerçek slot id ile değiştir
        className="mx-auto mt-6 w-full max-w-6xl px-4 md:px-8 lg:px-16"
      />

      <div className="mx-auto max-w-6xl px-4 pb-6 pt-8 md:px-8 lg:px-16">
        {/* Üst grid */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Sol: marka açıklaması */}
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-400">
                Inner Meaning
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Dream · Sign · Feeling Atlas
              </p>
            </div>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-slate-300">
              A calm library that gently explains the strange moments your mind
              keeps replaying.
            </p>
          </div>

          {/* Orta: tıklanabilir kategori sayıları */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Browse categories
            </p>
            <div className="mt-3 grid grid-cols-[minmax(0,1.5fr)_auto] gap-y-1.5 text-xs text-slate-300">
              <Link
                href="/library"
                className="hover:text-slate-50 hover:underline"
              >
                All entries
              </Link>
              <span className="text-right tabular-nums text-slate-400">
                {totalEntries.toLocaleString("en-US")}
              </span>

              <Link
                href="/search?q=spiritual%20signs"
                className="hover:text-slate-50 hover:underline"
              >
                Spiritual Signs
              </Link>
              <span className="text-right tabular-nums text-slate-400">
                {spiritualCount.toLocaleString("en-US")}
              </span>

              <Link
                href="/search?q=dream%20meanings"
                className="hover:text-slate-50 hover:underline"
              >
                Dream Meanings
              </Link>
              <span className="text-right tabular-nums text-slate-400">
                {dreamCount.toLocaleString("en-US")}
              </span>

              <Link
                href="/search?q=strange%20events"
                className="hover:text-slate-50 hover:underline"
              >
                Strange Events
              </Link>
              <span className="text-right tabular-nums text-slate-400">
                {strangeCount.toLocaleString("en-US")}
              </span>

              <Link
                href="/search?q=emotional%20signals"
                className="hover:text-slate-50 hover:underline"
              >
                Emotional Signals
              </Link>
              <span className="text-right tabular-nums text-slate-400">
                {emotionalCount.toLocaleString("en-US")}
              </span>

              <Link
                href="/search?q=mind%20patterns"
                className="hover:text-slate-50 hover:underline"
              >
                Mind Patterns
              </Link>
              <span className="text-right tabular-nums text-slate-400">
                {mindCount.toLocaleString("en-US")}
              </span>
            </div>
          </div>

          {/* Sağ: legal & about butonları */}
          <div className="space-y-3 md:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Legal & About
            </p>
            <div className="mt-3 inline-flex flex-wrap gap-2">
              <Link
                href="/privacy"
                className="inline-flex items-center rounded-full border border-pink-400/60 bg-pink-500/15 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-pink-100 hover:bg-pink-500/25"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="inline-flex items-center rounded-full border border-fuchsia-400/60 bg-fuchsia-500/15 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-fuchsia-100 hover:bg-fuchsia-500/25"
              >
                Terms
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-slate-500/70 bg-slate-800/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-slate-100 hover:bg-slate-700/80"
              >
                About
              </Link>
            </div>
          </div>
        </div>

        {/* Ayırıcı çizgi */}
        <div className="mt-6 h-px w-full bg-slate-900" />

        {/* Alt bar */}
        <div className="mt-4 flex flex-col justify-between gap-3 text-[11px] text-slate-500 md:flex-row md:items-center">
          <p>© {year} Inner Meaning. All rights reserved.</p>
          <p>
            Made with <span className="text-pink-400">♥</span> in {year} ·{" "}
            <Link
              href="https://inner-meaning.com"
              className="text-slate-300 hover:text-slate-100"
            >
              inner-meaning.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
