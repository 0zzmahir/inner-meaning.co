// app/[slug]/page.tsx

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import ContentPageClient from "./content-client";
import pagesData from "@/data/pages.generated.json";

// JSON'u bir kere okuyup bellekte tutuyoruz
const pages = pagesData as any[];

// Artık STATIC param üretmiyoruz, tamamen dinamik
export default function ContentPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  // Geçersiz slug gelirse 404 ver
  const exists = pages.some((p) => p.slug === slug);
  if (!exists) {
    return notFound();
  }

  // Asıl içerik client component'te
  return <ContentPageClient slug={slug} />;
}
