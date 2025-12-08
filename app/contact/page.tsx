export const revalidate = false;

export default function ContactPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-3">
          <p className="badge bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300">
            Contact
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Contact
          </h1>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-slate-300 md:text-base">
          <p>
            For questions, feedback or collaboration ideas related to Inner
            Meaning, you can reach out using the email address below.
          </p>
          <p className="text-slate-200">
            Email:{" "}
            <a
              href="mailto:hello@inner-meaning.com"
              className="text-cyan-300 hover:text-cyan-200"
            >
              hello@inner-meaning.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
