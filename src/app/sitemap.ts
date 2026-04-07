import { MetadataRoute } from "next";
import { coursesData } from "@/data/courses"; // Dynamic course names

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://visionitinstitute.vercel.app";
  const lastModified = new Date();

  const mainRoutes = [
    "",
    "/about",
    "/admission",
    "/courses",
    "/contact",
    "/gallery",
    "/blog",
    "/privacy",
    "/terms",
    "/track",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [
    ...mainRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...Object.keys(coursesData).map((slug) => ({
      url: `${baseUrl}/courses/${slug}`,
      lastModified: lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return sitemapEntries;
}
