export const revalidate = false;

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-3">
          <p className="badge bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300">
            About
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            About Inner Meaning
          </h1>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-slate-300 md:text-base">
          <p>
            Inner Meaning is a quiet project focused on decoding the strange
            patterns that keep appearing in everyday life: recurring dreams,
            repeating numbers, emotional loops and mind patterns.
          </p>
          <p>
            The goal is not to push quick answers or dramatic claims, but to
            offer calm explanations that mix symbolism, psychology and lived
            experience so that you can reflect in your own pace.
          </p>
        </section>
      </div>
    </main>
  );
}
