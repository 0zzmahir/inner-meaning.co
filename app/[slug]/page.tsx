// Örnek: app/[slug]/page.tsx
import topics from '@/data/topics.json';

// Dinamik davranışı kapat:
export const dynamic = 'error';
export const revalidate = false;

// Next'e hangi slug'lar için sayfa üreteceğini söyle:
export function generateStaticParams() {
  return (topics as any[]).map((t) => ({ slug: t.slug }));
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = (topics as any[]).find((t) => t.slug === params.slug);

  if (!topic) {
    return <div>Not found</div>;
  }

  return (
    <main>
      <h1>{topic.title}</h1>
      <article>
        {/* İçeriği nasıl tutuyorsan ona göre doldur */}
        <p>{topic.content}</p>
      </article>
    </main>
  );
}

// SEO için:
export function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = (topics as any[]).find((t) => t.slug === params.slug);

  if (!topic) return { title: 'Not found' };

  return {
    title: topic.title + ' | Inner Meaning',
    description: topic.metaDescription || topic.content?.slice(0, 150),
  };
}
