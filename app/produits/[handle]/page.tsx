import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCollection,
  getColorSiblings,
  getProduct,
  getProducts,
  getRelated,
} from "@/lib/commerce";
import { site } from "@/lib/site";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductCard } from "@/components/product/product-card";
import { Reassurance } from "@/components/sections/reassurance";

export function generateStaticParams() {
  return getProducts().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const p = getProduct(handle);
  if (!p) return {};
  return {
    title: p.seo.title,
    description: p.seo.description,
    alternates: { canonical: `/produits/${p.handle}` },
    openGraph: { images: [{ url: p.images[0].src, alt: p.images[0].alt }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();
  const collection = getCollection(product.collection)!;
  const siblings = getColorSiblings(product);
  const related = getRelated(product, 4);
  const pairing = related.find((p) => p.category !== product.category) ?? related[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${product.color.name}`,
    description: product.description.join(" "),
    image: product.images.map((i) => `${site.url}${i.src}`),
    brand: { "@type": "Brand", name: "KIRA Paris" },
    color: product.color.name,
    material: product.specs.find((s) => /coton|polyester|denim/i.test(s)),
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      sku: v.id,
      name: `Taille ${v.size}`,
      price: (product.price / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: v.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${site.url}/produits/${product.handle}`,
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
      { "@type": "ListItem", position: 2, name: collection.title, item: `${site.url}/collections/${collection.handle}` },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumb]) }} />

      <div className="md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-start">
        <ProductGallery product={product} />
        <div className="px-4 pb-10 pt-5 md:sticky md:top-[72px] md:px-10 md:pb-12 md:pt-8 lg:pl-10 lg:pr-14">
          <ProductInfo product={product} siblings={siblings} pairing={pairing} />
        </div>
      </div>

      <section aria-labelledby="look" className="pt-12 md:pt-16">
        <h2 id="look" className="mb-5 text-center font-display text-[16px] md:mb-6 md:text-[18px]">
          Ça pourrait te plaire
        </h2>
        <ul className="grid grid-cols-2 gap-x-[3px] gap-y-6 md:grid-cols-4">
          {related.map((p) => (
            <li key={p.handle}>
              <ProductCard product={p} sizes="(min-width: 768px) 25vw, 50vw" className="[&>h3]:px-3 [&>p]:px-3 [&>ul]:px-3" />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="avis" className="mx-auto mt-14 max-w-[1600px] border-t border-clay-200 px-4 py-12 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
          <h2 id="avis" className="font-display text-[16px] md:text-[18px]">Avis clients</h2>
          <p className="text-[14px] text-ink-soft">
            Aucun avis publié pour cette pièce pour l&apos;instant. Seuls des avis d&apos;acheteurs réels (Judge.me) s&apos;afficheront ici.
          </p>
        </div>
      </section>
      <Reassurance />
    </>
  );
}
