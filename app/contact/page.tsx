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
            We’re here to help you navigate your questions about dreams, symbols, emotional signals and mind patterns.
Whether you want to request a new topic, report an issue, collaborate, or simply reach out — we’d love to hear from you.

Email Support

For all inquiries, please contact:
contact@inner-meaning.com

We aim to respond within 24–48 hours.

Why Contact Us?
Request New Topics

If you are searching for the meaning of a dream, sign or event that is not yet on our site, send it to us — we may include it in our next update.

Collaborations & Partnerships

We welcome partnerships related to symbolism, psychology, spirituality, wellness platforms and content-driven projects.

Technical Issues

Spotted a broken page, loading error, missing topic or typo? Let us know so we can fix it quickly.

Have a Meaning You Want Explained?

Tell us what you experienced — a dream, a number, a sign, a strange emotional moment —
and we may publish a full explanation on Inner Meaning.

Send your request now → contact@inner-meaning.com
          </p>
          <p className="text-slate-200">
            Email:{" "}
            <a
              href="mailto:hello@inner-meaning.com"
              className="text-cyan-300 hover:text-cyan-200"
            >
              msbyrgn02@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
