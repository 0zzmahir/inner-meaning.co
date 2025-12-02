import { MetadataRoute } from "next";
import pages from "@/data/pages.generated.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const main = {
    url: "https://inner-meaning.com",
    lastModified: new Date().toISOString(),
  };

  const dynamicPages = (pages as any[]).map((p) => ({
    url: `https://inner-meaning.com/${p.slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [main, ...dynamicPages];
}
