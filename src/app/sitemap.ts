import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://visionit.edu.in"; // Replace with your final domain
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/admission",
    "/courses",
    "/contact",
    "/gallery",
    "/blog",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModified,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
