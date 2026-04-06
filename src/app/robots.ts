import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://visionitinstitute.vercel.app";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/neekadmin", "/auth/callback", "/login", "/register", "/profile"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
