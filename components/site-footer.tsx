"use client";

import Link from "next/link";
import pagesData from "@/data/pages.generated.json";

type PageItem = {
  category?: string;
};

// Footer’da göstereceğimiz ana kategoriler
const CATEGORY_KEYS = [
  "Spiritual Signs",
  "Dream Meanings",
  "Strange Events",
  "Emotional Signals",
  "Mind Patterns",
];

// JSON’dan tek seferlik sayım (module-level, her render’da değil)
const pages = (pagesData as PageItem[]) || [];
const totalEntries = pages.length;

const categoryCounts: Record<string, number> = CATEGORY_KEYS.reduce(
  (acc, key) => {
    acc[key] = 0;
    return acc;
  },
  {} as Record<string, number>
);

pages.forEach((p) => {
  if (!p.category) return;
  if (categoryCounts[p.category] === undefined) return;
  categoryCounts[p.category] += 1;
});

export default function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-slate-800/80 bg-gradient-to-t from-black/60 via-slate-950/40 to-transparent backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-6 text-sm text-slate-300 space-y-6">
        {/* Üst kısım: üç sütun */}
        <div className="grid gap-10 md:grid-cols-3 items-start">
          {/* 1️⃣ Sol — mini logo + açıklama */}
          <div className="space-y-3">
            {/* Mini logo */}
            <Link href="/" className="inline-flex flex-col leading-tight select-none group">
              <span className="text-[0.85rem] tracking-[0.26em] text-pink-300 group-hover:text-pink-200 transition">
                INNER MEANING
              </span>
              <span className="mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-slate-500 group-hover:text-pink-200/80 transition">
                dream · sign · feeling atlas
              </span>
            </Link>

            <p className="text-[0.85rem] text-slate-400 leading-relaxed">
              A calm library that gently explains the strange moments your mind
              keeps replaying.
            </p>
          </div>

          {/* 2️⃣ Orta — kategori listesi + count */}
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 mb-3">
              Browse Categories
            </p>
            <ul className="space-y-1.5 text-[0.9rem]">
              <FooterCategoryLink
                href="/library"
                label="All Entries"
                count={totalEntries}
              />
              {CATEGORY_KEYS.map((name) => (
                <FooterCategoryLink
                  key={name}
                  href={`/library?cat=${encodeURIComponent(name)}`}
                  label={name}
                  count={categoryCounts[name] || 0}
                />
              ))}
            </ul>
          </div>

          {/* 3️⃣ Sağ — YATAY küçük pill butonlar */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
              Legal & About
            </p>
            <div className="flex flex-wrap gap-2">
              <FooterPill href="/privacy" label="Privacy" variant="primary" />
              <FooterPill href="/terms" label="Terms" variant="primary" />
              <FooterPill href="/about" label="About" variant="secondary" />
            </div>
          </div>
        </div>

        {/* Alt imza satırı */}
        <div className="border-t border-slate-800/70 pt-4 text-[0.75rem] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© 2025 Inner Meaning. All rights reserved.</span>
          <span className="text-[0.7rem]">
            Made with <span className="text-pink-400">💗</span> in 2025 ·{" "}
            <Link
              href="/"
              className="text-slate-400 hover:text-pink-200 transition"
            >
              inner-meaning.com
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ================== Alt bileşenler ================== */

function FooterCategoryLink({
  href,
  label,
  count,
}: {
  href: string;
  label: string;
  count: number;
}) {
  return (
    <li className="flex items-center justify-between gap-3">
      <Link
        href={href}
        className="hover:text-pink-200 transition-colors duration-150"
      >
        {label}
      </Link>
      <span className="text-[0.75rem] text-slate-500 tabular-nums">
        {count.toLocaleString()}
      </span>
    </li>
  );
}

function FooterPill({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] transition border";

  const styles =
    variant === "primary"
      ? "border-pink-400/80 bg-pink-500/25 text-pink-100 shadow-[0_0_15px_rgba(244,114,182,0.3)] hover:bg-pink-500/40 hover:border-pink-300/80 hover:text-white"
      : "border-slate-700/80 bg-slate-950/70 text-slate-200 hover:border-pink-300/80 hover:text-pink-100 hover:bg-slate-900/80";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {label}
    </Link>
  );
}
