import Link from "next/link";
import topicsRaw from "@/data/topics.json";

export const revalidate = false;

type Topic = {
  slug: string;
  title: string;
  category?: string;
  focus?: string;
};

const topics: Topic[] = (topicsRaw as Topic[]) || [];

const CATEGORY_BLURBS = [
  {
    key: "Spiritual Signs",
    title: "Spiritual Signs",
    text: "Repeating numbers, symbols, synchronicities and subtle nudges that keep showing up.",
  },
  {
    key: "Dream Meanings",
    title: "Dream Meanings",
    text: "Recurring dreams, vivid symbols and strange storylines that refuse to leave your mind.",
  },
  {
    key: "Strange Events",
    title: "Strange Events",
    text: "Déjà vu, glitches in reality and coincidences that feel too precise to ignore.",
  },
  {
    key: "Emotional Signals",
    title: "Emotional Signals",
    text: "Heavy moods, sudden emptiness and unnamed sadness that comes and goes like weather.",
  },
  {
    key: "Mind Patterns",
    title: "Mind Patterns",
    text: "Thought loops, repeating relationship patterns and behaviours you recognise but can't fully explain.",
  },
];

type LibraryPageProps = {
  searchParams?: {
    category?: string;
  };
};

export default function LibraryPage({ searchParams }: LibraryPageProps) {
  const activeCategory = searchParams?.category ?? "";

  const filteredTopics = activeCategory
    ? topics.filter((t) => t.category === activeCategory)
    : topics;

  // Çok uzun liste olmaması için ilk 60 gösteriyoruz (istersen artırırsın)
  const visibleTopics = filteredTopics.slice(0, 60);

  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* HEADER */}
        <header className="space-y-3">
          <p className="badge bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300">
            Library
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Inner Meaning Library
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Browse all dream meanings, spiritual signals, strange events,
            emotional patterns and mind loops currently available on Inner
            Meaning. Use categories or search to narrow things down.
          </p>
        </header>

        {/* SEARCH / INFO SECTION */}
        <section className="glass-card space-y-3 rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-slate-50">
            Find a specific meaning
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            You can filter by category below or use the main search for very
            specific dreams, numbers, signs or situations.
          </p>
          <p className="text-xs text-slate-400">
            {activeCategory
              ? `Showing topics in "${activeCategory}".`
              : "Showing a selection of all available topics."}
          </p>
          <Link
            href="/search"
            className="mt-3 inline-flex h-9 items-center rounded-full bg-slate-100/10 px-4 text-xs font-medium text-slate-100 hover:bg-slate-100/15"
          >
            Open search →
          </Link>
        </section>

        {/* CATEGORY FILTERS */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Categories
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {CATEGORY_BLURBS.map((cat) => {
              const isActive = cat.key === activeCategory;
              const href = isActive
                ? "/library"
                : `/library?category=${encodeURIComponent(cat.key)}`;

              return (
                <Link
                  key={cat.key}
                  href={href}
                  className={`glass-card rounded-3xl p-4 text-sm leading-relaxed text-slate-300 transition ${
                    isActive
                      ? "border border-cyan-400/50 bg-slate-900"
                      : "hover:bg-slate-900/70"
                  }`}
                >
                  <h3 className="mb-1 text-[13px] font-semibold text-slate-50">
                    {cat.title}
                    {isActive && (
                      <span className="ml-2 rounded-full bg-cyan-500/20 px-2 py-[2px] text-[10px] font-medium text-cyan-200">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-[13px] text-slate-300">{cat.text}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* TOPIC LIST */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              {activeCategory ? "Topics in this category" : "All topics"}
            </h2>
            <p className="text-[11px] text-slate-400">
              {filteredTopics.length} topic
              {filteredTopics.length !== 1 ? "s" : ""} found
              {filteredTopics.length > visibleTopics.length &&
                ` • showing first ${visibleTopics.length}`}
            </p>
          </div>

          {visibleTopics.length === 0 ? (
            <p className="text-sm text-slate-400">
              No topics found for this category yet. Try another category or use
              search.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {visibleTopics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className="glass-card glow-hover group block rounded-3xl p-4"
                >
                  <div className="space-y-2">
                    {t.category && (
                      <span className="category-pill text-[11px]">
                        {t.category}
                      </span>
                    )}
                    <h3 className="text-sm font-semibold leading-snug group-hover:text-slate-50">
                      {t.title}
                    </h3>
                    {t.focus && (
                      <p className="text-[11px] leading-relaxed text-slate-400 group-hover:text-slate-200/90">
                        {t.focus}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
