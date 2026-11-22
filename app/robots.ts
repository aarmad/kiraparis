import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Prototype : indexation bloquée. À ouvrir (allow: "/") au passage en production. */
export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production" && process.env.ALLOW_INDEXING === "true";
  return {
    rules: isProd ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
