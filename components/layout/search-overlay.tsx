"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { CATEGORY_LABELS, getProducts } from "@/lib/commerce";
import { formatPrice } from "@/lib/site";
import { ProductMedia } from "@/components/product/product-media";
import { useBodyLock } from "@/lib/use-body-lock";

const products = getProducts();
const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const SUGGESTIONS = ["Hoodie", "Ensemble", "Maillot", "Jean", "Hunter"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  useBodyLock(open, onClose);

  const results = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return products.filter((p) => {
      const hay = normalize(
        [p.name, p.color.name, p.collection, CATEGORY_LABELS[p.category], p.tagline, ...p.specs].join(" "),
      );
      return terms.every((t) => hay.includes(t));
    });
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button type="button" aria-label="Fermer la recherche" onClick={onClose} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Recherche"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="relative max-h-[90svh] overflow-y-auto bg-clay-50"
          >
            <div className="mx-auto max-w-[1600px] px-4 pb-8 pt-4 md:px-8 md:pb-12 md:pt-6">
              <div className="flex items-center gap-3 border-b border-ink pb-3">
                <Search className="size-6 shrink-0" strokeWidth={1.5} />
                <label htmlFor="site-search" className="sr-only">Rechercher un produit</label>
                <input
                  id="site-search"
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Hoodie, maillot, jean…"
                  className="min-w-0 flex-1 bg-transparent font-display text-[2.6rem] placeholder:text-ink/25 focus:outline-none md:text-[4.5rem]"
                  autoComplete="off"
                />
                <button type="button" onClick={onClose} className="grid size-10 shrink-0 place-items-center" aria-label="Fermer">
                  <X className="size-6" strokeWidth={1.5} />
                </button>
              </div>

              {!q && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="label-mono mr-2 text-muted">Suggestions</span>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQ(s)}
                      className="border border-ink/20 px-3.5 py-1.5 text-sm transition hover:border-ink hover:bg-ink hover:text-clay-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {q && (
                <div className="mt-6" aria-live="polite">
                  <p className="label-mono mb-4 text-muted">
                    {results.length} résultat{results.length > 1 ? "s" : ""}
                  </p>
                  {results.length === 0 ? (
                    <p className="max-w-md text-muted">
                      Rien ne correspond à « {q} ».{" "}
                      <Link href="/collections" onClick={onClose} className="font-medium text-ink underline underline-offset-4">
                        Voir tout le vestiaire
                      </Link>
                    </p>
                  ) : (
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
                      {results.map((p) => (
                        <li key={p.handle}>
                          <Link href={`/produits/${p.handle}`} onClick={onClose} className="group/r block">
                            <div className="relative aspect-[4/5]">
                              <ProductMedia image={p.images[0]} sizes="(min-width:1024px) 16vw, 45vw" className="absolute inset-0" />
                            </div>
                            <p className="mt-2 text-sm font-semibold group-hover/r:text-terracotta">{p.name}</p>
                            <p className="text-[13px] text-muted">
                              {p.color.name} · {formatPrice(p.price)}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {results.length > 0 && (
                    <Link
                      href="/collections"
                      onClick={onClose}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]"
                    >
                      Tout le vestiaire <ArrowRight className="size-4" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
