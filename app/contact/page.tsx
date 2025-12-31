export const revalidate = false;

export default function ContactPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="badge bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300">
            Contact
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Contact Us
          </h1>
        </header>

        <section className="space-y-5 text-sm leading-relaxed text-slate-300 md:text-base">
          <p>
            We’re here to help you with questions about dreams, symbols, emotional
            signals, and mind patterns. Whether you’d like to request a new topic,
            report an issue, collaborate, or simply reach out — feel free to
            contact us using the form below.
          </p>

          <p className="text-slate-200">
            You can also email us directly at{" "}
            <a
              href="mailto:contact@inner-meaning.com"
              className="text-cyan-300 hover:text-cyan-200"
            >
              contact@inner-meaning.com
            </a>
            . We typically respond within 24–48 hours.
          </p>
        </section>

        {/* CONTACT FORM */}
        <form
          action="https://formspree.io/f/mqeakajz"
          method="POST"
          className="space-y-4 rounded-lg border border-slate-700/60 bg-slate-900/40 p-6"
        >
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Your email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded border border-slate-700 bg-slate-950 p-2 text-slate-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded border border-slate-700 bg-slate-950 p-2 text-slate-200"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="rounded bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
