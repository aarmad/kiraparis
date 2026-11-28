"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Lock, Minus, Plus, RotateCcw, Truck, X } from "lucide-react";
import { useCart } from "./cart-context";
import { getProducts, getVariant } from "@/lib/commerce";
import { formatPrice, site } from "@/lib/site";
import { ProductMedia } from "@/components/product/product-media";
import { buttonClass } from "@/components/ui/button";
import { PaymentIcons } from "@/components/ui/payment-icons";
import { useBodyLock } from "@/lib/use-body-lock";

const suggestions = getProducts().filter((p) => p.badges.includes("nouveau")).slice(0, 2);

export function CartDrawer() {
  const { lines, isOpen, close, update, remove, subtotal, count } = useCart();
  useBodyLock(isOpen, close);

  const remaining = Math.max(site.freeShippingThreshold - subtotal, 0);
  const progress = Math.min(subtotal / site.freeShippingThreshold, 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Fermer le panier" onClick={close} className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]" />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-clay-50 shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <h2 className="font-display text-[18px]">
                Panier <span className="font-sans text-base font-medium normal-case tracking-normal text-muted">({count})</span>
              </h2>
              <button type="button" onClick={close} className="-mr-2 grid size-10 place-items-center" aria-label="Fermer le panier">
                <X className="size-5" strokeWidth={1.6} />
              </button>
            </header>

            {lines.length > 0 && (
              <div className="border-b border-ink/10 px-5 py-3.5">
                <p className="flex items-center gap-2 text-[13px]">
                  <Truck className="size-4 shrink-0" strokeWidth={1.6} />
                  {remaining > 0 ? (
                    <span>
                      Plus que <strong className="font-semibold">{formatPrice(remaining)}</strong> pour la livraison offerte en France.
                    </span>
                  ) : (
                    <span className="font-semibold">Livraison offerte en France métropolitaine.</span>
                  )}
                </p>
                <div className="mt-2.5 h-[3px] overflow-hidden bg-clay-200" aria-hidden>
                  <motion.div
                    className="h-full bg-terracotta"
                    initial={false}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                  />
                </div>
              </div>
            )}

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col overflow-y-auto px-5 py-8">
                <p className="text-[20px] font-semibold leading-tight">Ton panier attend sa première pièce.</p>
                <p className="mt-2 text-muted">Commence par le dernier drop :</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {suggestions.map((p) => (
                    <li key={p.handle}>
                      <Link href={`/produits/${p.handle}`} onClick={close} className="group/s block">
                        <div className="relative aspect-[4/5]">
                          <ProductMedia image={p.images[1] ?? p.images[0]} sizes="200px" className="absolute inset-0" />
                        </div>
                        <p className="mt-2 text-sm font-semibold group-hover/s:text-terracotta">{p.name}</p>
                        <p className="text-[13px] text-muted">{formatPrice(p.price)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/collections" onClick={close} className={buttonClass("outline", "mt-8 w-full")}>
                  Tout le vestiaire
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-5">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => {
                      const found = getVariant(line.variantId);
                      if (!found) return null;
                      const { product, variant } = found;
                      return (
                        <motion.li
                          key={line.variantId}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-4 py-4">
                            <Link href={`/produits/${product.handle}`} onClick={close} className="relative block aspect-[4/5] w-[92px] shrink-0">
                              <ProductMedia image={product.images[0]} sizes="92px" className="absolute inset-0" />
                            </Link>
                            <div className="flex min-w-0 flex-1 flex-col">
                              <div className="flex justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="font-semibold leading-tight">{product.name}</p>
                                  <p className="mt-1 text-[13px] text-muted">
                                    {product.color.name} · Taille {variant.size}
                                  </p>
                                </div>
                                <p className="shrink-0 font-medium tabular-nums">{formatPrice(product.price * line.quantity)}</p>
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-3">
                                <div className="flex items-center border border-ink/20">
                                  <button
                                    type="button"
                                    className="grid size-9 place-items-center hover:bg-clay-100"
                                    onClick={() => update(line.variantId, line.quantity - 1)}
                                    aria-label="Diminuer la quantité"
                                  >
                                    <Minus className="size-3.5" />
                                  </button>
                                  <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">{line.quantity}</span>
                                  <button
                                    type="button"
                                    className="grid size-9 place-items-center hover:bg-clay-100 disabled:opacity-40"
                                    onClick={() => update(line.variantId, line.quantity + 1)}
                                    disabled={line.quantity >= 10}
                                    aria-label="Augmenter la quantité"
                                  >
                                    <Plus className="size-3.5" />
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => remove(line.variantId)}
                                  className="text-[13px] text-muted underline underline-offset-4 hover:text-ink"
                                >
                                  Retirer
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <footer className="border-t border-ink/10 bg-clay-100/60 px-5 pb-5 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm">Sous-total</span>
                    <span className="text-xl font-semibold tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-muted">
                    TVA incluse. {remaining > 0 ? "Frais de livraison calculés au paiement." : "Livraison offerte en France métropolitaine."}
                  </p>

                  <button type="button" disabled className={buttonClass("ink", "mt-4 w-full")} aria-describedby="proto-checkout">
                    <Lock className="size-4" /> Commander
                  </button>
                  <p id="proto-checkout" className="mt-2.5 flex items-start gap-2 text-[12px] leading-snug text-muted">
                    <Info className="mt-px size-3.5 shrink-0" />
                    Prototype : le paiement sera assuré par le checkout sécurisé Shopify une fois la boutique connectée.
                  </p>
                  <PaymentIcons only="main" size="sm" className="mt-3" />
                  <ul className="mt-4 flex justify-between gap-2 border-t border-ink/10 pt-3 text-[12px] text-ink-soft">
                    <li className="flex items-center gap-1.5"><RotateCcw className="size-3.5" /> {site.returnDays} jours pour changer d&apos;avis</li>
                    <li className="flex items-center gap-1.5"><Truck className="size-3.5" /> Expédié sous {site.dispatchDays} j ouvrés</li>
                  </ul>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
