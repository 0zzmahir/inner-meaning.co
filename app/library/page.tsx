import Link from "next/link";

export const revalidate = false;

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

export default function LibraryPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-3">
          <p className="badge bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300">
            Library
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Inner Meaning Library
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            A quiet index of all dream meanings, spiritual signals, strange
            events, emotional patterns and mind loops explored on Inner Meaning.
            This page will soon include full search, filters and bookmarks.
          </p>
        </header>

        <section className="glass-card space-y-3 rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-slate-50">
            Coming very soon
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            For now, most people discover topics directly from search engines or
            the search box on the homepage. You can also visit a topic directly
            by URL if you already know the slug.
          </p>
          <p className="text-xs text-slate-400">
            The interactive library will let you browse by category, mood,
            repeating pattern, time of day and more.
          </p>
          <Link
            href="/search"
            className="mt-3 inline-flex h-9 items-center rounded-full bg-slate-100/10 px-4 text-xs font-medium text-slate-100 hover:bg-slate-100/15"
          >
            Open search →
          </Link>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Categories
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {CATEGORY_BLURBS.map((cat) => (
              <div
                key={cat.key}
                className="glass-card rounded-3xl p-4 text-sm leading-relaxed text-slate-300"
              >
                <h3 className="mb-1 text-[13px] font-semibold text-slate-50">
                  {cat.title}
                </h3>
                <p className="text-[13px] text-slate-300">{cat.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
