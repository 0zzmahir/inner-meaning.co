"use client";

// @ts-nocheck
import Link from "next/link";
import { useMemo } from "react";
import pagesData from "@/data/pages.generated.json";
import SiteFooter from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContentPageClient({ slug }: { slug: string }) {
  const allPages = pagesData as any[];

  const page = useMemo(
    () => allPages.find((p) => p.slug === slug),
    [allPages, slug]
  );

  const causes: string[] = useMemo(() => {
    if (!page?.possibleCauses) return [];
    if (Array.isArray(page.possibleCauses)) {
      return page.possibleCauses
        .map((c: any) =>
          typeof c === "string"
            ? c
            : c?.cause || c?.text || c?.reason || ""
        )
        .filter(Boolean);
    }
    return [];
  }, [page]);

  const faqItems: { question: string; answer: string }[] = useMemo(() => {
    if (!page?.faq || !Array.isArray(page.faq)) return [];
    return page.faq
      .map((f: any) => ({
        question: f.question || f.q || "",
        answer: f.answer || f.a || "",
      }))
      .filter((f: any) => f.question && f.answer);
  }, [page]);

  if (!page) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#050509] via-[#05060b] to-[#101319] text-slate-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-semibold mb-2">Not found</h1>
        <p className="text-slate-400 mb-3">
          We couldn&apos;t find any meaning for this topic.
        </p>
        <p className="text-xs text-slate-500 mb-6">
          Current slug: <span className="font-mono">{slug}</span>
        </p>
        <Link
          href="/"
          className="rounded-full border border-slate-700/80 bg-slate-950/80 px-4 py-2 text-sm hover:border-pink-400/80"
        >
          ⟵ Back to all meanings
        </Link>
      </main>
    );
  }

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
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-400/18 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-72 w-72 rounded-full bg-slate-400/14 blur-3xl" />
        <div className="absolute bottom-[-80px] right-0 h-96 w-96 rounded-full bg-rose-300/18 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-8 md:py-10">
        {/* üst bilgi */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/80 px-3 py-1 text-xs text-slate-200 hover:border-pink-400/80"
          >
            ⟵ Back
          </Link>
          <Badge
            variant="outline"
            className="border-slate-600/80 bg-slate-900/70 text-[0.7rem] tracking-[0.18em] uppercase text-slate-200"
          >
            {page.category?.toString().replace(/-/g, " ")}
          </Badge>
        </div>

        {/* başlık */}
        <header className="mb-6">
          <p className="mb-1 text-[0.7rem] uppercase tracking-[0.24em] text-slate-400">
            Inner Meaning · Explainer
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            {page.title}
          </h1>
          {page.intro && (
            <p className="mt-3 text-sm text-slate-300">{page.intro}</p>
          )}
        </header>

        <section className="space-y-4">
          <GlassCard title="Core Meaning">
            <p>{page.meaning}</p>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard title="Spiritual Perspective">
              <p>{page.spiritual}</p>
            </GlassCard>
            <GlassCard title="Psychological Perspective">
              <p>{page.psychological}</p>
            </GlassCard>
          </div>

          {causes.length > 0 && (
            <GlassCard title="Possible Causes">
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-200">
                {causes.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </GlassCard>
          )}

          {page.advice && (
            <GlassCard title="Gentle Advice">
              <p>{page.advice}</p>
            </GlassCard>
          )}

          {faqItems.length > 0 && (
            <GlassCard title="FAQ">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm text-slate-100">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-200">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </GlassCard>
          )}

          {/* BURASI İLERİDE ADSENSE BLOĞU İÇİN ÇOK UYGUN */}
          {/* <div className="h-28 rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 flex items-center justify-center text-xs text-slate-400">
            Ad space
          </div> */}
        </section>
      </div>
       <SiteFooter />
    </main>
  );
}

function GlassCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border border-slate-700/80 bg-slate-950/70 backdrop-blur-xl shadow-[0_20px_55px_rgba(0,0,0,0.9)]">
      <CardHeader>
        <CardTitle className="text-sm text-slate-100">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-200 space-y-3">
        {children}
      </CardContent>
    </Card>
  );
}
