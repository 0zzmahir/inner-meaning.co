"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import topicsRaw from "@/data/topics.json";

type Topic = {
  slug: string;
  title: string;
  category?: string;
  focus?: string;
};

const topics = (topicsRaw as Topic[]) || [];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  const results = useMemo(() => {
    if (!q) return [];
    const lower = q.toLowerCase();

    return topics
      .filter((t) => {
        const haystack =
          `${t.title} ${t.category ?? ""} ${t.focus ?? ""}`.toLowerCase();
        return haystack.includes(lower);
      })
      .slice(0, 60);
  }, [q]);

  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="badge bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300">
            Search
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Search Inner Meaning
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Type anything that repeats or feels strange: a time, a symbol, a
            feeling, a dream fragment…
          </p>
        </header>

        <form
          action="/search"
          method="GET"
          className="glass-card flex items-center gap-3 rounded-3xl px-4 py-3.5"
        >
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder='Try: "left ear ringing at night"'
            className="h-9 flex-1 rounded-2xl bg-slate-900/80 px-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none md:text-sm"
          />
          <button
            type="submit"
            className="inline-flex h-8 items-center rounded-full bg-cyan-500/15 px-3 text-[11px] font-medium uppercase tracking-[0.14em] text-cyan-200 border border-cyan-400/40"
          >
            Search
          </button>
        </form>

        <section className="space-y-3">
          {q ? (
            <p className="text-xs text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-200">
                {results.length}
              </span>{" "}
              result{results.length === 1 ? "" : "s"} for{" "}
              <span className="font-semibold text-slate-100">&quot;{q}&quot;</span>
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              Start typing to search across more than 10K topics.
            </p>
          )}

          {q && results.length === 0 && (
            <div className="glass-card rounded-3xl p-4 text-sm text-slate-300">
              Nothing matched this phrase yet. Try a simpler version of the
              feeling, sign or dream.
            </div>
          )}

          {results.length > 0 && (
            <div className="grid gap-3">
              {results.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className="glass-card glow-hover flex flex-col rounded-3xl p-4 text-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-[15px] font-semibold text-slate-50">
                      {t.title}
                    </h2>
                    {t.category && (
                      <span className="category-pill text-[11px]">
                        {t.category}
                      </span>
                    )}
                  </div>
                  {t.focus && (
                    <p className="mt-1 text-[12px] text-slate-400">
                      {t.focus}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
