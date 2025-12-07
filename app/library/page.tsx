// app/library/page.tsx
// TAMAMEN STATİK BİR SAYFA – export moduna %100 uyumlu

export const revalidate = false; // ISR yok, full statik

export default function LibraryPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Inner Meaning Library
          </h1>
          <p className="text-muted-foreground">
            Explore thousands of topics about spiritual signs, dream meanings,
            strange events, emotional signals and mind patterns. New sections
            and advanced filters will be added here soon.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur">
          <h2 className="text-lg font-semibold">Coming soon</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Library page will soon include category filters, search,
            bookmarks and more. For now, you can browse all detailed topic
            pages directly from Google results or by visiting specific URLs.
          </p>
        </section>
      </div>
    </main>
  );
}
