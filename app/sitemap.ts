import type { MetadataRoute } from "next";
import { getCollections, getProducts } from "@/lib/commerce";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/collections", "/notre-histoire", "/faq", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
  }));
  const collections = getCollections().map((c) => ({ url: `${site.url}/collections/${c.handle}`, lastModified: now }));
  const products = getProducts().map((p) => ({
    url: `${site.url}/produits/${p.handle}`,
    lastModified: now,
    images: p.images.map((i) => `${site.url}${i.src}`),
  }));
  return [...staticPages, ...collections, ...products];
}
