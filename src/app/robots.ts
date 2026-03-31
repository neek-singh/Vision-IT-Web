import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://visionit.edu.in"; // Replace with your final domain
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/private"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
