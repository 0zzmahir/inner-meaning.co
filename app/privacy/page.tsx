export const revalidate = false;

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-3">
          <p className="badge bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300">
            Privacy
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
        </header>

        <section className="space-y-3 text-xs leading-relaxed text-slate-300 md:text-sm">
          <p>
            Inner Meaning uses basic analytics and advertising tools to
            understand traffic patterns and keep the project sustainable. These
            tools may use cookies or similar technologies.
          </p>
          <p>
            No sensitive personal data is intentionally collected. You can
            control cookies through your browser settings.
          </p>
        </section>
      </div>
    </main>
  );
}
