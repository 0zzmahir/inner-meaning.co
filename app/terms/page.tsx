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
            Welcome to Inner Meaning. By accessing or using inner-meaning.com, you agree to comply with the following Terms of Service.

1. Purpose of the Website

Inner Meaning provides informational content about dreams, signs, emotional patterns, symbolic meanings and life interpretations. The content is not medical, legal, or psychological advice.

2. Use of the Website

Users agree to:

Access the website for lawful purposes only

Avoid attempts to disrupt or overload the site

Not copy, republish, or sell any content without permission

3. Intellectual Property

All texts, images, data structures, designs and digital assets on Inner Meaning are protected by copyright. Unauthorized use is prohibited.
          </p>
          <p>
           4. Disclaimer of Warranties

Inner Meaning is provided “as is,” without guarantees regarding accuracy, completeness, or outcomes derived from interpretations.

5. Limitation of Liability

Inner Meaning shall not be liable for:

Errors or inaccuracies within content

User decisions made based on website information

Technical issues, downtime or external system failures

6. Third-Party Links

We may link to external websites. We are not responsible for their content or policies.

7. Modifications

We may modify these Terms of Service at any time. Continued use of the site constitutes acceptance.
          </p>
        </section>
      </div>
    </main>
  );
}
