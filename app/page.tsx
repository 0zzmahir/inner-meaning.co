import Link from "next/link";
import topicsRaw from "@/data/topics.json";

type Topic = {
  slug: string;
  title: string;
  category?: string;
  focus?: string;
};

const topics = (topicsRaw as Topic[]) || [];

const CATEGORIES = [
  {
    key: "Spiritual Signs",
    label: "Spiritual Signs",
    description: "Repeating numbers, symbols, synchronicities, subtle nudges.",
    accent: "from-cyan-400/80 via-sky-500/70 to-emerald-400/80",
  },
  {
    key: "Dream Meanings",
    label: "Dream Meanings",
    description: "Recurring dreams, vivid symbols, strange characters at night.",
    accent: "from-fuchsia-400/80 via-pink-500/70 to-rose-400/80",
  },
  {
    key: "Strange Events",
    label: "Strange Events",
    description: "Déjà vu, glitches in reality, uncanny coincidences.",
    accent: "from-indigo-400/80 via-violet-500/70 to-sky-400/80",
  },
  {
    key: "Emotional Signals",
    label: "Emotional Signals",
    description: "Sudden sadness, emptiness, heavy moods without clear reasons.",
    accent: "from-amber-400/80 via-orange-500/70 to-rose-400/80",
  },
  {
    key: "Mind Patterns",
    label: "Mind Patterns",
    description: "Overthinking loops, repeating relationship patterns, mental noise.",
    accent: "from-lime-400/80 via-emerald-500/70 to-cyan-400/80",
  },
];

const featuredTopics: Topic[] = topics.slice(0, 8);

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 pb-20 pt-16 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:gap-16">
        {/* HERO */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-6">
            <p className="badge bg-slate-900/70 border border-cyan-400/30 text-cyan-200/90">
              Inner Meaning • Night-thoughts, signs & mind patterns
            </p>

            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Decode the{" "}
                <span className="gradient-text font-extrabold">strange patterns</span>{" "}
                in your life.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
                Wake-ups at 3AM, repeating numbers, heavy feelings for no clear
                reason… Inner Meaning is a calm place to explore the signals
                your dreams, emotions and mind keep sending you.
              </p>
            </div>

            {/* ÇALIŞAN ARAMA FORMU */}
            <form
              action="/search"
              method="GET"
              className="glass-card glow-hover relative flex items-center gap-3 px-4 py-3.5"
            >
              <div className="flex h-9 flex-1 items-center gap-2 rounded-2xl bg-slate-900/80 px-3">
                <input
                  type="text"
                  name="q"
                  placeholder='Try: "why do i wake up at 3am"'
                  className="h-full w-full bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-8 items-center rounded-full bg-cyan-500/15 px-3 text-[11px] font-medium uppercase tracking-[0.14em] text-cyan-200 border border-cyan-400/40"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-2 text-xs text-slate-300/80">
              <span className="category-pill border-cyan-500/30 bg-cyan-500/10">
                11:11 & repeating numbers
              </span>
              <span className="category-pill border-pink-500/30 bg-pink-500/10">
                Waking up at 3AM
              </span>
              <span className="category-pill border-violet-500/30 bg-violet-500/10">
                Déjà vu & strange loops
              </span>
            </div>
          </div>

          {/* Yan panel */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/15 via-fuchsia-500/10 to-indigo-500/10 blur-2xl" />
            <div className="glass-card glow-hover relative h-full w-full space-y-6 p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Tonight&apos;s themes
                  </p>
                  <p className="text-sm text-slate-100/90">
                    Dreams, repeating signs, emotional loops.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-200 border border-emerald-400/40">
                  Calm reading mode
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300/90">
                <p>
                  Pick a category and start with one topic. Each page walks you
                  through the meaning, spiritual angle, psychological view and
                  gentle advice.
                </p>
                <p className="text-slate-400">
                  No loud visuals, no dopamine traps — just quiet explanations
                  while your brain winds down.
                </p>
              </div>

              <Link
                href="/library"
                className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-5 text-xs font-semibold tracking-wide text-slate-950 shadow-lg shadow-cyan-500/40 transition hover:brightness-110"
              >
                Browse the Library
              </Link>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Categories
            </h2>
            <p className="text-xs text-slate-400">
              Start with the pattern that bothers you the most.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.key}
                href="/library"
                className="gradient-border glow-hover group block rounded-3xl bg-slate-950/70 p-[1px]"
              >
                <div className="glass-card h-full space-y-3 rounded-[1.45rem] p-4">
                  <div
                    className={`inline-flex rounded-full bg-gradient-to-r ${cat.accent} px-[1px] py-[1px]`}
                  >
                    <span className="flex items-center rounded-full bg-slate-950/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-200/90">
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300 group-hover:text-slate-100">
                    {cat.description}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 group-hover:text-cyan-300">
                    Open library →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED TOPICS */}
        {featuredTopics.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Featured topics
              </h2>
              <Link
                href="/library"
                className="text-xs font-medium text-cyan-300 hover:text-cyan-200"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredTopics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className="glass-card glow-hover group block h-full rounded-3xl p-4"
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
          </section>
        )}
      </div>
    </main>
  );
}
