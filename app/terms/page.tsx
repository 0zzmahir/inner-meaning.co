export const revalidate = false;

export default function TermsPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-3">
          <p className="badge bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300">
            Terms
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Terms of Use
          </h1>
        </header>

        <section className="space-y-3 text-xs leading-relaxed text-slate-300 md:text-sm">
          <p>
            Inner Meaning is provided for informational and reflective purposes
            only. It does not offer medical, psychological, legal or financial
            advice and should not be used as a substitute for professional
            support.
          </p>
          <p>
            By using this site, you agree that you are responsible for your own
            decisions and interpretations of the content presented here.
          </p>
        </section>
      </div>
    </main>
  );
}
