import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/commerce/types";
import { getColorSiblings, isSoldOut } from "@/lib/commerce";
import { formatPrice } from "@/lib/site";
import { ProductMedia } from "./product-media";
import { QuickAdd } from "./quick-add";
import { ProductBadges } from "./product-badges";

/** Carte produit « Vestiaire » : visuel 3:4 sur gris, nom en capitales « MODÈLE - COLORIS », prix dessous. */
export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
  imageIndex = 0,
  className,
}: {
  product: Product;
  sizes?: string;
  priority?: boolean;
  imageIndex?: number;
  className?: string;
}) {
  const primary = product.images[imageIndex] ?? product.images[0];
  const secondary = product.images.find((i, idx) => idx !== imageIndex && i !== primary);
  const siblings = getColorSiblings(product);
  const soldOut = isSoldOut(product);
  const href = `/produits/${product.handle}`;
  const label = `${product.name} - ${product.color.name}`;

  return (
    <article className={cn("group/card relative flex flex-col", className)}>
      <div className="relative">
        <Link href={href} aria-label={label} className="block">
          <div className="relative aspect-[3/4]">
            <ProductMedia image={primary} sizes={sizes} priority={priority} className="absolute inset-0" />
            {secondary && (
              <ProductMedia
                image={secondary}
                sizes={sizes}
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
              />
            )}
          </div>
        </Link>
        <ProductBadges product={product} className="absolute left-2.5 top-2.5" />
        {!soldOut && <QuickAdd product={product} />}
      </div>

      <h3 className="pt-3 text-[12.5px] font-medium uppercase leading-snug tracking-[0.04em] md:text-[13px]">
        <Link href={href} className="hover:text-terracotta">
          {label}
        </Link>
      </h3>
      <p className="mt-1 text-[13px] tabular-nums">{formatPrice(product.price)}</p>

      {siblings.length > 1 && (
        <ul className="mt-2 flex gap-1.5" aria-label="Coloris disponibles">
          {siblings.map((s) => (
            <li key={s.handle}>
              <Link
                href={`/produits/${s.handle}`}
                title={s.color.name}
                aria-label={`Coloris ${s.color.name}`}
                className={cn(
                  "block size-3 border transition",
                  s.handle === product.handle ? "border-ink" : "border-clay-300 hover:border-ink",
                )}
                style={{ background: s.color.hex }}
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
