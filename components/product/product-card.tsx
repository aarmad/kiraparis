import Link from "next/link";
import { cn as clsx } from "@/lib/cn";
import type { Product } from "@/lib/commerce/types";
import { getColorSiblings, isSoldOut } from "@/lib/commerce";
import { formatPrice } from "@/lib/site";
import { ProductMedia } from "./product-media";
import { QuickAdd } from "./quick-add";
import { ProductBadges } from "./product-badges";

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

  return (
    <article className={clsx("group/card relative flex flex-col", className)}>
      <div className="relative">
        <Link href={href} aria-label={`${product.name} — ${product.color.name}`} className="block">
          <div className="relative aspect-[4/5]">
            <ProductMedia
              image={primary}
              sizes={sizes}
              priority={priority}
              className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover/card:scale-[1.015]"
            />
            {secondary && (
              <ProductMedia
                image={secondary}
                sizes={sizes}
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
              />
            )}
          </div>
        </Link>
        <ProductBadges product={product} className="absolute left-3 top-3" />
        {!soldOut && <QuickAdd product={product} />}
      </div>

      <div className="flex items-start justify-between gap-4 pt-3.5">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold leading-tight tracking-[-0.01em]">
            <Link href={href} className="after:absolute after:inset-0 after:content-[''] md:after:hidden">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-[13px] text-muted">{product.color.name}</p>
        </div>
        <p className="shrink-0 text-[15px] font-medium tabular-nums">{formatPrice(product.price)}</p>
      </div>

      {siblings.length > 1 && (
        <ul className="relative z-10 mt-2.5 flex gap-1.5" aria-label="Coloris disponibles">
          {siblings.map((s) => (
            <li key={s.handle}>
              <Link
                href={`/produits/${s.handle}`}
                title={s.color.name}
                aria-label={`Coloris ${s.color.name}`}
                className={clsx(
                  "block size-3.5 rounded-full ring-1 ring-offset-2 ring-offset-clay-50 transition",
                  s.handle === product.handle ? "ring-ink" : "ring-transparent hover:ring-ink/40",
                )}
                style={{ background: s.color.hex, boxShadow: "inset 0 0 0 1px rgb(0 0 0 / .12)" }}
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
