import ContentPageClient from "./content-client";
import pagesData from "@/data/pages.generated.json";

export async function generateStaticParams() {
  if (!Array.isArray(pagesData)) return [];
  return (pagesData as any[]).map((p) => ({ slug: p.slug }));
}

export default function ContentPage({ params }: { params: { slug: string } }) {
  return <ContentPageClient slug={params.slug} />;
}
