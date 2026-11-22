"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { CATEGORY_LABELS } from "@/lib/commerce";
import type { Category, Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/product/product-card";

type Sort = "pertinence" | "nouveautes" | "prix-asc" | "prix-desc";
const SORTS: { value: Sort; label: string }[] = [
  { value: "pertinence", label: "Sélection KIRA" },
  { value: "nouveautes", label: "Nouveautés" },
  { value: "prix-asc", label: "Prix croissant" },
  { value: "prix-desc", label: "Prix décroissant" },
];

/** Grille filtrable (catégorie, taille disponible) et triable. L'état vit dans l'URL. */
export function ProductGrid({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get("categorie") as Category | null;
  const size = params.get("taille");
  const sort = (params.get("tri") as Sort) ?? "pertinence";
  const [dense, setDense] = useState(false);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))] as Category[],
    [products],
  );
  const sizes = useMemo(() => {
    const order = ["S", "M", "L", "XL", "XXL"];
    return [...new Set(products.flatMap((p) => p.variants.map((v) => v.size)))].sort(
      (a, b) => order.indexOf(a) - order.indexOf(b),
    );
  }, [products]);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const visible = useMemo(() => {
    let list = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!size || p.variants.some((v) => v.size === size && v.available)),
    );
    if (sort === "nouveautes") list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "prix-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "prix-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, category, size, sort]);

  const chip = (active: boolean) =>
    cn(
      "h-9 shrink-0 border px-3.5 text-[13px] font-medium transition-colors",
      active ? "border-ink bg-ink text-clay-50" : "border-ink/20 hover:border-ink",
    );

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 border-y border-ink/10 bg-clay-50/92 px-4 py-3 backdrop-blur-xl md:top-[72px] md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {categories.length > 1 && (
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="group" aria-label="Filtrer par catégorie">
              <button type="button" className={chip(!category)} onClick={() => setParam("categorie", null)} aria-pressed={!category}>
                Tout
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={chip(category === c)}
                  aria-pressed={category === c}
                  onClick={() => setParam("categorie", category === c ? null : c)}
                >
                  {CATEGORY_LABELS[c]}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2" role="group" aria-label="Filtrer par taille disponible">
            <span className="label-mono mr-1 text-muted">Taille</span>
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setParam("taille", size === s ? null : s)}
                className={cn(chip(size === s), "w-10 px-0")}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-4">
            <label className="flex items-center gap-2 text-[13px]">
              <span className="label-mono text-muted">Trier</span>
              <select
                value={sort}
                onChange={(e) => setParam("tri", e.target.value === "pertinence" ? null : e.target.value)}
                className="h-9 border border-ink/20 bg-transparent px-2 text-[13px] font-medium focus:border-ink"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setDense((d) => !d)}
              className="hidden text-[13px] font-medium underline underline-offset-4 lg:block"
            >
              {dense ? "Vue large" : "Vue compacte"}
            </button>
          </div>
        </div>
      </div>

      <p className="label-mono mt-6 text-muted" aria-live="polite">
        {visible.length} pièce{visible.length > 1 ? "s" : ""}
      </p>

      {visible.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-3xl italic">Rien dans cette taille pour l&apos;instant.</p>
          <button
            type="button"
            className="mt-4 text-sm font-semibold underline underline-offset-4"
            onClick={() => router.replace(pathname, { scroll: false })}
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <ul
          className={cn(
            "mt-5 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 md:gap-y-14",
            dense ? "lg:grid-cols-4 xl:grid-cols-5" : "lg:grid-cols-3 xl:grid-cols-4",
          )}
        >
          {visible.map((p, i) => (
            <li key={p.handle}>
              <ProductCard product={p} priority={i < 4} sizes={dense ? "(min-width:1024px) 20vw, 50vw" : "(min-width:1280px) 25vw, (min-width:1024px) 33vw, 50vw"} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
