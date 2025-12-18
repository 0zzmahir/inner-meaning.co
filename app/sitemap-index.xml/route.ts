// app/sitemap-index.xml/route.ts
import pages from "@/data/pages.generated.json";

const BASE_URL = "https://inner-meaning.com";
const CHUNK_SIZE = 5000;

export async function GET() {
  const all = (pages as any[]).filter((p) => p?.slug && typeof p.slug === "string");
  const count = Math.ceil(all.length / CHUNK_SIZE);
  const lastModified = new Date().toISOString();

  const sitemaps = Array.from({ length: count }, (_, id) => {
    return `
      <sitemap>
        <loc>${BASE_URL}/sitemap/${id}.xml</loc>
        <lastmod>${lastModified}</lastmod>
      </sitemap>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps}
  </sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // cache istersen:
      // "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
