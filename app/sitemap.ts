// app/sitemap.ts
import type { MetadataRoute } from "next";
import pages from "@/data/pages.generated.json";

const BASE_URL = "https://inner-meaning.com";
const MAX_URLS = 50000;

// içeriksiz / bozuk slug'ları ele
function isValidPage(p: any) {
  return p?.slug && typeof p.slug === "string";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const all = (pages as any[])
    .filter(isValidPage)
    .slice(0, MAX_URLS); // 🔒 50K HARD LIMIT

  const lastModified = new Date().toISOString();

  const urls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
    },
    ...all.map((p) => ({
      url: `${BASE_URL}/${p.slug}`,
      lastModified,
    })),
  ];

  return urls;
}
