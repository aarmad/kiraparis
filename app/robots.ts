import type { MetadataRoute } from "next";
import { indexingAllowed, site } from "@/lib/site";

/** Indexation bloquée tant que ALLOW_INDEXING n'est pas activé en production (cf. lib/site.ts). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexingAllowed ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
