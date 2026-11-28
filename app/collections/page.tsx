import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getCollections, getProducts } from "@/lib/commerce";
import { ProductGrid } from "@/components/collection/product-grid";
import { Reassurance } from "@/components/sections/reassurance";

export const metadata: Metadata = {
  title: "Le vestiaire — Hoodies, ensembles, maillot et denim",
  description:
    "Tout le vestiaire KIRA Paris : hoodies 400 GSM brodés, ensembles Kira Athletics, maillot de football, jean terre craquelée et jogging.",
  alternates: { canonical: "/collections" },
};

export default function AllProductsPage() {
  const products = getProducts();
  return (
    <>
      <header className="mx-auto max-w-[1600px] px-3 pb-6 pt-8 md:px-6 md:pt-10">
        <nav aria-label="Fil d'Ariane" className="label-mono text-muted">
          <Link href="/" className="hover:text-ink">Accueil</Link> / <span className="text-ink">Vêtements</span>
        </nav>
        <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
          <h1 className="font-display text-[26px] md:col-span-7 md:text-[32px]">Tous les vêtements</h1>
          <div className="md:col-span-5">
            <p className="max-w-md text-[14px] leading-relaxed text-ink-soft">
              {products.length} pièces, trois drops. Des hoodies épais aux ensembles Athletics, tout ce que KIRA a mis au monde.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {getCollections().map((c) => (
                <li key={c.handle}>
                  <Link href={`/collections/${c.handle}`} className="inline-flex h-9 items-center border border-ink/20 px-3.5 text-[13px] font-medium transition hover:border-ink hover:bg-ink hover:text-clay-50">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-[1600px] px-3 pb-24 md:px-6">
        <Suspense>
          <ProductGrid products={products} />
        </Suspense>
      </section>
      <Reassurance />
    </>
  );
}
