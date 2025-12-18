// app/sitemap.ts
import type { MetadataRoute } from "next";
import pages from "@/data/pages.generated.json";

const BASE_URL = "https://inner-meaning.com";
const CHUNK_SIZE = 5000;

// (Opsiyonel) içeriksiz slug'ları sitemap'e sokma
function isValidPage(p: any) {
  return p?.slug && typeof p.slug === "string";
}

export function generateSitemaps() {
  const all = (pages as any[]).filter(isValidPage);
  const count = Math.ceil(all.length / CHUNK_SIZE);

  // Next: /sitemap/[id].xml üretir
  return Array.from({ length: count }, (_, id) => ({ id }));
}

export default function sitemap({
  id,
}: {
  id: number;
}): MetadataRoute.Sitemap {
  const all = (pages as any[]).filter(isValidPage);

  const start = id * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  const slice = all.slice(start, end);

  const lastModified = new Date().toISOString();

  // İstersen ana sayfayı sadece ilk sitemap'e ekle
  const main =
    id === 0
      ? [
          {
            url: BASE_URL,
            lastModified,
          },
        ]
      : [];

  const dynamicPages = slice.map((p) => ({
    url: `${BASE_URL}/${p.slug}`,
    lastModified,
  }));

  return [...main, ...dynamicPages];
}
