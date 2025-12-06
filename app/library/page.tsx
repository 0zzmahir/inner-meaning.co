"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import pagesData from "@/data/pages.generated.json";
import SiteFooter from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LibraryPage() {
  const pages = pagesData as any[];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050509] via-[#05060b] to-[#101319] text-slate-50">

      {/* NAVBAR (Aynı Logo + Menü) */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-sm">

          {/* LOGO */}
          <Link href="/" className="group flex flex-col leading-tight select-none">
            <span className="font-semibold tracking-[0.32em] text-[1.35rem] text-pink-300 drop-shadow-[0_0_12px_rgba(255,100,180,0.55)] group-hover:text-pink-200 transition duration-200">
              INNER MEANING
            </span>
            <span className="mt-1 text-[0.63rem] uppercase tracking-[0.28em] text-slate-400 group-hover:text-pink-300/80 transition">
              a calm meaning library
            </span>
            <span className="mt-2 h-[2px] w-14 rounded-full bg-gradient-to-r from-pink-400 to-pink-200 opacity-60 group-hover:opacity-90 blur-[1px] group-hover:blur-[2px] transition-all duration-300" />
          </Link>

          <div className="flex items-center gap-6 text-[1rem] text-slate-200">
            <Link href="/" className="px-3 py-1.5 rounded-full hover:bg-slate-800/60 transition">Home</Link>
            <Link href="/about" className="px-3 py-1.5 rounded-full hover:bg-slate-800/60 transition">About</Link>
            <Link href="/library" className="px-3 py-1.5 rounded-full bg-pink-400/20 border border-pink-400/50 text-pink-100">Library</Link>
            <Link href="/contact" className="px-3 py-1.5 rounded-full hover:bg-slate-800/60 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ARKA PLAN */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-pink-400/16 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-slate-400/16 blur-3xl" />
      </div>

      {/* BAŞLIK */}
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <h1 className="text-3xl font-semibold text-slate-50 mb-3">Library</h1>
        <p className="text-slate-300 text-sm mb-8">
          All meanings, signs, dreams and emotional explanations — in one place.
        </p>

        {/* TÜM SAYFALAR */}
        <div className="grid gap-4 md:grid-cols-2">
          {pages.map((page) => (
            <Link key={page.slug} href={`/${page.slug}`}>
              <Card className="group cursor-pointer border border-slate-700/80 bg-slate-950/70 backdrop-blur-xl hover:scale-[1.02] hover:border-pink-300/70 transition">
                <CardHeader className="pb-2">
                  <Badge className="border-none bg-slate-800/70 text-slate-300 text-[0.6rem] uppercase">
                    {page.category}
                  </Badge>
                  <CardTitle className="text-sm text-slate-50 group-hover:text-pink-200">
                    {page.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-[0.8rem] text-slate-300 group-hover:text-slate-100/80">
                    {page.intro || page.meaning}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
