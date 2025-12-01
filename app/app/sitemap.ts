import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://inner-meaning.com",
      lastModified: new Date(),
    },
  ];
}
