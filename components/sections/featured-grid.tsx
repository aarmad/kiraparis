import Link from "next/link";
import { getProducts } from "@/lib/commerce";
import { ProductCard } from "@/components/product/product-card";

/** Grille catalogue dense : les nouveautés d'abord. */
export function FeaturedGrid() {
  const all = getProducts();
  const products = [...all].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);
  return (
    <section aria-labelledby="vestiaire-t" className="mx-auto max-w-[1600px] px-3 pb-6 pt-12 md:px-6 md:pt-14">
      <div className="mb-5 flex items-baseline justify-between md:mb-6">
        <h2 id="vestiaire-t" className="font-display text-[16px] md:text-[18px]">
          Le vestiaire
        </h2>
        <Link href="/collections" className="text-[12px] font-bold uppercase tracking-[0.04em] hover:text-terracotta">
          Tout voir ({all.length})
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-4 md:gap-x-3 md:gap-y-10">
        {products.map((p, i) => (
          <li key={p.handle}>
            <ProductCard product={p} priority={i < 4} sizes="(min-width: 768px) 25vw, 50vw" />
          </li>
        ))}
      </ul>
      <div className="mt-10 flex justify-center">
        <Link
          href="/collections"
          className="flex h-12 w-full items-center justify-center bg-ink px-10 text-[13px] font-bold uppercase tracking-[0.04em] text-clay-50 transition-colors hover:bg-terracotta sm:w-auto"
        >
          Voir tous les produits
        </Link>
      </div>
    </section>
  );
}
