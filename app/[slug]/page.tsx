// app/[slug]/page.tsx
import type { Metadata } from "next";
import { AdsenseBlock } from "@/components/adsense-block";

import rawTopics from "@/data/topics.json";
import rawPages from "@/data/pages.generated.json";

type Topic = {
  slug: string;
  title: string;
  category?: string;
  focus?: string;
  metaDescription?: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type PageContent = {
  slug: string;
  title?: string;
  category?: string;
  intro?: string;
  meaning?: string;
  spiritual?: string;
  psychological?: string;
  possibleCauses?: string[];
  advice?: string;
  faq?: FaqItem[];
};

const topics = (rawTopics as Topic[]) || [];
const pages = (rawPages as PageContent[]) || [];

const pageBySlug = new Map<string, PageContent>();
for (const p of pages) {
  if (p.slug) pageBySlug.set(p.slug, p);
}

export const dynamic = "error";
export const revalidate = false;

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

function getCombined(slug: string) {
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) return null;

  const page = pageBySlug.get(slug);

  const title = (page?.title || topic.title || "").trim();
  const category = (page?.category || topic.category || "").trim() || undefined;

  const description =
    topic.metaDescription ||
    topic.focus ||
    page?.intro ||
    page?.meaning?.slice(0, 160) ||
    "";

  return { slug, topic, page, title, category, description };
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const combined = getCombined(params.slug);

  if (!combined) {
    return {
      title: "Not found | Inner Meaning",
      description: "This topic could not be found on Inner Meaning.",
    };
  }

  return {
    title: `${combined.title} | Inner Meaning`,
    description: combined.description,
  };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const combined = getCombined(params.slug);

  if (!combined) {
    return (
      <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Topic not found
          </h1>
          <p className="text-sm text-muted-foreground">
            The topic you&apos;re looking for does not exist or has been
            removed.
          </p>
        </div>
      </main>
    );
  }

  const { topic, page, title, category } = combined;

  return (
    <main className="min-h-screen px-4 py-12 md:px-8 lg:px-16">
      <article className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2">
            {category && (
              <span className="category-pill border-cyan-500/40 bg-cyan-500/10 text-[11px] text-cyan-100">
                {category}
              </span>
            )}
            <span className="badge bg-slate-900/80 border border-slate-700/50 text-[10px] text-slate-300">
              Inner Meaning
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h1>
            {topic.focus && (
              <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
                {topic.focus}
              </p>
            )}
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-600/60 to-transparent" />
        </header>

        {/* İçerik içi üst reklam */}
        <AdsenseBlock slot="1234567892" className="w-full" />

        {page ? (
          <div className="space-y-8 text-sm leading-relaxed text-slate-200 md:text-base">
            {page.intro && (
              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-50">
                  Overview
                </h2>
                <p className="text-slate-300">{page.intro}</p>
              </section>
            )}

            {page.meaning && (
              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-50">
                  Core Meaning
                </h2>
                <p className="whitespace-pre-line text-slate-300">
                  {page.meaning}
                </p>
              </section>
            )}

            {/* Ortadaki reklam */}
            <AdsenseBlock slot="1234567893" className="w-full" />

            {page.spiritual && (
              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-50">
                  Spiritual Perspective
                </h2>
                <p className="whitespace-pre-line text-slate-300">
                  {page.spiritual}
                </p>
              </section>
            )}

            {page.psychological && (
              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-50">
                  Psychological Perspective
                </h2>
                <p className="whitespace-pre-line text-slate-300">
                  {page.psychological}
                </p>
              </section>
            )}

            {page.possibleCauses && page.possibleCauses.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-50">
                  Possible Causes
                </h2>
                <ul className="list-disc space-y-1 pl-5 text-slate-300">
                  {page.possibleCauses.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {page.advice && (
              <section className="space-y-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <h2 className="text-lg font-semibold text-emerald-100">
                  Gentle Guidance
                </h2>
                <p className="whitespace-pre-line text-emerald-50/90 text-sm md:text-[15px]">
                  {page.advice}
                </p>
              </section>
            )}

            {page.faq && page.faq.length > 0 && (
              <section className="space-y-4 border-t border-slate-800 pt-6">
                <h2 className="text-lg font-semibold text-slate-50">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {page.faq.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4"
                    >
                      <h3 className="text-sm font-medium text-slate-100">
                        {item.q}
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <section className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 text-sm leading-relaxed text-slate-300 md:text-base">
            <h2 className="text-sm font-semibold text-slate-100">
              This page is still being written.
            </h2>
            <p>
              A detailed explanation for this topic is being prepared. For now,
              this page only shows the title and short focus. You can bookmark
              it and check again later.
            </p>
          </section>
        )}
      </article>
    </main>
  );
}
