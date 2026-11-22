import type { NextConfig } from "next";
import snapshot from "./lib/commerce/data/shopify-snapshot.json";

/** Redirections 301 des anciennes URLs Shopify vers la nouvelle arborescence (préserve le SEO). */
const productRedirects = Object.entries(snapshot).map(([handle, s]) => ({
  source: `/products/${s.legacyHandle}`,
  destination: `/produits/${handle}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Assets statiques versionnés par le contenu : cache long côté CDN Vercel
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [
      ...productRedirects,
      { source: "/collections/all", destination: "/collections", permanent: true },
      { source: "/collections/collection-hunter", destination: "/collections/hunter", permanent: true },
      { source: "/collections/frontpage", destination: "/collections", permanent: true },
      { source: "/collections/bonnet-noir", destination: "/collections", permanent: true },
      { source: "/pages/a-propos-de-nous", destination: "/notre-histoire", permanent: true },
      { source: "/pages/faq", destination: "/faq", permanent: true },
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/pages/suivre-ma-commande", destination: "/suivre-ma-commande", permanent: true },
      { source: "/pages/mentions-legales", destination: "/legal/mentions-legales", permanent: true },
      { source: "/pages/condition-generale-de-vente", destination: "/legal/cgv", permanent: true },
      { source: "/policies/shipping-policy", destination: "/legal/livraison", permanent: true },
      { source: "/policies/refund-policy", destination: "/legal/retours", permanent: true },
      { source: "/policies/privacy-policy", destination: "/legal/confidentialite", permanent: true },
      { source: "/policies/terms-of-sale", destination: "/legal/cgv", permanent: true },
      { source: "/policies/legal-notice", destination: "/legal/mentions-legales", permanent: true },
    ];
  },
};

export default nextConfig;
