"use client";

import { cn as clsx } from "@/lib/cn";
import { useCart } from "@/components/cart/cart-context";
import type { Product } from "@/lib/commerce/types";

/** Ajout rapide par taille au survol (desktop uniquement). */
export function QuickAdd({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition duration-300 ease-[var(--ease-out-soft)] group-hover/card:pointer-events-auto group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:pointer-events-auto group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 md:block">
      <div className="bg-clay-50/92 p-2 backdrop-blur-md">
        <p className="label-mono px-1 pb-1.5 text-muted">Ajout rapide</p>
        <div className="flex gap-1">
          {product.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              disabled={!v.available}
              onClick={() => add(v.id, product.handle)}
              aria-label={`Ajouter ${product.name} ${product.color.name} taille ${v.size} au panier`}
              className={clsx(
                "h-9 flex-1 text-[12px] font-semibold transition-colors",
                v.available
                  ? "bg-clay-100 hover:bg-ink hover:text-clay-50"
                  : "text-muted/60 line-through decoration-1",
              )}
            >
              {v.size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
