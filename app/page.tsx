"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import pagesData from "@/data/pages.generated.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import SiteFooter from "@/components/site-footer";


type PageItem = {
  slug: string;
  title: string;
  category?: string;
  intro?: string;
  meaning?: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  spiritual: "Spiritual",
  psychology: "Psychology",
  dream: "Dreams",
  signs: "Signs",
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<keyof typeof CATEGORY_LABELS>("all");

  const pages = (pagesData as PageItem[]) || [];

  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    pages.forEach((p) => p.category && set.add(p.category.toLowerCase()));
    return Array.from(set);
  }, [pages]);

  const filteredPages = useMemo(() => {
    const q = search.trim().toLowerCase();
    return pages.filter((p) => {
      const cat = (p.category || "").toLowerCase();
      if (category !== "all" && cat !== category) return false;
      if (!q) return true;

      const haystack =
        (p.title || "") + " " + (p.intro || "") + " " + (p.meaning || "");
      return haystack.toLowerCase().includes(q);
    });
  }, [pages, search, category]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050509] via-[#05060b] to-[#101319] text-slate-50">
      {/* NAVBAR – glass / sabit */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-sm">
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
            <Link href="/" className="hover:text-slate-50 transition">
              Library
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

      <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-8">
        {/* Arka plan: gümüş / pembe glow */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-pink-400/18 blur-3xl" />
          <div className="absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-slate-400/10 blur-3xl" />
          <div className="absolute bottom-[-80px] right-0 h-80 w-80 rounded-full bg-rose-300/16 blur-3xl" />
        </div>

        {/* Üst blok */}
        <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[0.7rem] tracking-[0.24em] text-slate-400">
              MODERN MEANING ARCHIVE
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
              Understand the strange moments your mind keeps replaying.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              A calm, glassy space that blends spiritual and psychological
              explanations for dreams, signs and emotions that refuse to be
              ignored.
            </p>
          </div>

          <div className="flex gap-3 text-xs text-slate-200">
            <InfoPill label="Entries" value={pages.length} />
            <InfoPill label="Categories" value={availableCategories.length} />
          </div>
        </header>

        {/* Arama + filtre */}
        <section className="mb-5 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Input
              placeholder="Search feelings, dreams, signs (e.g. 3AM, 11:11, teeth, empty)…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-950/60 border border-slate-700/80 placeholder:text-slate-500 text-sm shadow-[0_14px_40px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-[0.75rem]">
            <FilterChip
              label="All"
              active={category === "all"}
              onClick={() => setCategory("all")}
            />
            {["spiritual", "psychology", "dream", "signs"].map((key) => {
              if (!availableCategories.includes(key)) return null;
              const k = key as keyof typeof CATEGORY_LABELS;
              return (
                <FilterChip
                  key={k}
                  label={CATEGORY_LABELS[k]}
                  active={category === k}
                  onClick={() => setCategory(k)}
                />
              );
            })}
          </div>

          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-400">
            {filteredPages.length} RESULT
            {filteredPages.length === 1 ? "" : "S"}
          </p>
        </section>

        {/* Kartlar – glass + hover büyüme */}
        <section className="grid gap-4 md:grid-cols-2">
          {filteredPages.map((page) => (
            <Link key={page.slug} href={`/${page.slug}`}>
              <Card className="group cursor-pointer border border-slate-700/80 bg-slate-950/70 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.85)] transition-transform duration-200 hover:-translate-y-[4px] hover:scale-[1.02] hover:border-pink-300/80 hover:shadow-[0_26px_70px_rgba(0,0,0,0.95)]">
                <CardHeader className="pb-2">
                  <Badge className="mb-2 border-none bg-slate-800/80 text-[0.6rem] tracking-[0.18em] uppercase text-slate-300">
                    {(page.category || "").replace(/-/g, " ")}
                  </Badge>
                  <CardTitle className="line-clamp-2 text-sm font-semibold text-slate-50 group-hover:text-pink-100">
                    {page.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-[0.8rem] text-slate-300 group-hover:text-slate-100/90">
                    {page.intro || page.meaning}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[0.7rem] tracking-wide transition ${
        active
          ? "border-pink-400 bg-pink-500/20 text-pink-100 shadow-[0_0_25px_rgba(244,114,182,0.35)]"
          : "border-slate-700/80 bg-slate-950/60 text-slate-300 hover:border-pink-300/70 hover:text-pink-100"
      }`}
    >
      {label}
    </button>
  );
}

function InfoPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 px-3 py-2 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.8)]">
      <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-50">
        {value.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
