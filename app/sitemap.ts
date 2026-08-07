import type { MetadataRoute } from "next";

// Required by `output: "export"` — metadata routes must be statically rendered.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nishit-shivdasani.github.io",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
