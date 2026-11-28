import type { Metadata } from "next";
import Link from "next/link";
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

      <div className="mx-auto max-w-[1600px] md:px-8 md:pt-6">
        <nav aria-label="Fil d'Ariane" className="label-mono hidden text-muted md:block">
          <Link href="/" className="hover:text-ink">Accueil</Link> /{" "}
          <Link href={`/collections/${collection.handle}`} className="hover:text-ink">{collection.title}</Link> /{" "}
          <span className="text-ink">{product.name} {product.color.name}</span>
        </nav>

        <div className="grid md:mt-5 md:grid-cols-12 md:gap-8 lg:gap-14">
          <div className="md:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="px-4 pb-10 pt-6 md:col-span-5 md:px-0 md:pt-0">
            <div className="md:sticky md:top-[96px]">
              <Link href={`/collections/${collection.handle}`} className="label-mono text-terracotta hover:underline">
                {collection.kicker}
              </Link>
              <div className="mt-3">
                <ProductInfo product={product} siblings={siblings} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="avis" className="mx-auto mt-10 max-w-[1600px] border-t border-ink/10 px-4 py-14 md:mt-20 md:px-8">
        <div className="grid gap-4 md:grid-cols-12">
          <h2 id="avis" className="font-display text-[18px] md:col-span-4 md:text-[20px]">Avis clients</h2>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-[17px] font-semibold">Aucun avis publié pour cette pièce pour l&apos;instant.</p>
            <p className="mt-2 text-[14px] text-muted">
              Les avis vérifiés (Judge.me) s&apos;afficheront ici une fois la boutique connectée. Nous n&apos;affichons que des avis
              d&apos;acheteurs réels.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="look" className="bg-clay-100">
        <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-20">
          <h2 id="look" className="font-display text-[16px] md:text-[18px]">Complète le look</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
            {related.map((p) => (
              <li key={p.handle}>
                <ProductCard product={p} sizes="(min-width: 768px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Reassurance className="border-t-0" />
    </>
  );
}
