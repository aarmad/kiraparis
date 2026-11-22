import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCollection, getCollectionProducts, getCollections } from "@/lib/commerce";
import { CollectionHeader } from "@/components/collection/collection-header";
import { ProductGrid } from "@/components/collection/product-grid";
import { Reassurance } from "@/components/sections/reassurance";

export function generateStaticParams() {
  return getCollections().map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const c = getCollection(handle);
  if (!c) return {};
  return {
    title: `${c.title} — ${c.kicker}`,
    description: c.intro,
    alternates: { canonical: `/collections/${c.handle}` },
    openGraph: { images: [{ url: c.image.src, alt: c.image.alt }] },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();
  const products = getCollectionProducts(handle);
  const others = getCollections().filter((c) => c.handle !== handle);

  return (
    <>
      <CollectionHeader collection={collection} count={products.length} />
      <section className="mx-auto max-w-[1600px] px-4 pb-24 md:px-8">
        <Suspense>
          <ProductGrid products={products} />
        </Suspense>
      </section>

      <section aria-labelledby="autres" className="border-t border-ink/10 bg-clay-100">
        <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-20">
          <h2 id="autres" className="font-display text-[2.6rem] md:text-[3.4rem]">Continuer l&apos;exploration</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((c) => (
              <li key={c.handle}>
                <Link href={`/collections/${c.handle}`} className="group/c relative block aspect-[16/10] overflow-hidden" style={{ background: c.accent }}>
                  <Image
                    src={c.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className={c.handle === "essentiels" ? "scale-110 object-contain opacity-80" : "object-cover opacity-80 transition duration-700 group-hover/c:scale-105 group-hover/c:opacity-100"}
                    style={{ objectPosition: c.image.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 text-clay-50">
                    <p className="label-mono text-clay-50/70">{c.kicker}</p>
                    <p className="font-display text-[2.4rem]">{c.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Reassurance className="border-t-0" />
    </>
  );
}
