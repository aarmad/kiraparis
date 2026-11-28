"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, ChevronDown, Lock, Ruler, RotateCcw, Truck, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/commerce/types";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice, site } from "@/lib/site";
import { buttonClass } from "@/components/ui/button";
import { ProductBadges } from "./product-badges";
import { PaymentIcons } from "@/components/ui/payment-icons";
import { useBodyLock } from "@/lib/use-body-lock";

export function ProductInfo({ product, siblings }: { product: Product; siblings: Product[] }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const [guide, setGuide] = useState(false);
  const [notify, setNotify] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const variant = product.variants.find((v) => v.size === size);
  const allSoldOut = product.variants.every((v) => !v.available);
  const soldOutSizes = product.variants.filter((v) => !v.available).map((v) => v.size);

  // Barre d'achat collante (mobile) quand le bouton principal sort de l'écran.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleAdd = () => {
    if (!variant) {
      setError(true);
      document.getElementById("size-picker")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!variant.available) return;
    add(variant.id, product.handle);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const ctaLabel = allSoldOut
    ? "Épuisé"
    : added
      ? "Ajouté au panier"
      : variant && !variant.available
        ? "Taille épuisée"
        : `Ajouter au panier — ${formatPrice(product.price)}`;

  return (
    <div>
      <ProductBadges product={product} className="mb-4 flex-row" />
      <h1 className="font-display text-[22px] md:text-[24px]">{product.name}</h1>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <p className="text-[15px] text-ink-soft">{product.color.name}</p>
        <p className="text-[18px] font-medium tabular-nums">{formatPrice(product.price)}</p>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{product.tagline}</p>

      {/* Coloris */}
      {siblings.length > 1 && (
        <div className="mt-8">
          <p className="label-mono text-muted">
            Coloris · <span className="text-ink">{product.color.name}</span>
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={s.handle}>
                <Link
                  href={`/produits/${s.handle}`}
                  scroll={false}
                  aria-label={`Coloris ${s.color.name}`}
                  aria-current={s.handle === product.handle ? "true" : undefined}
                  className={cn(
                    "flex h-10 items-center gap-2 border px-3 text-[13px] transition",
                    s.handle === product.handle ? "border-ink" : "border-ink/15 hover:border-ink/60",
                  )}
                >
                  <span className="size-4 rounded-full" style={{ background: s.color.hex, boxShadow: "inset 0 0 0 1px rgb(0 0 0 / .15)" }} />
                  {s.color.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tailles */}
      <fieldset id="size-picker" className="mt-8">
        <div className="flex items-center justify-between">
          <legend className="label-mono text-muted">
            Taille {size && <span className="text-ink">· {size}</span>}
          </legend>
          <button type="button" onClick={() => setGuide(true)} className="flex items-center gap-1.5 text-[13px] font-medium underline underline-offset-4">
            <Ruler className="size-4" strokeWidth={1.6} /> Guide des tailles
          </button>
        </div>
        <div className={cn("mt-3 grid gap-2", product.variants.length > 4 ? "grid-cols-5" : "grid-cols-4")}>
          {product.variants.map((v) => (
            <label
              key={v.id}
              className={cn(
                "relative grid h-12 cursor-pointer place-items-center border text-[14px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-terracotta",
                size === v.size ? "border-ink bg-ink text-clay-50" : "border-ink/20 hover:border-ink",
                !v.available && "text-muted",
              )}
            >
              <input
                type="radio"
                name="size"
                value={v.size}
                className="sr-only"
                checked={size === v.size}
                onChange={() => {
                  setSize(v.size);
                  setError(false);
                }}
              />
              <span className={cn(!v.available && "line-through decoration-1")}>{v.size}</span>
              {!v.available && <span className="sr-only"> (épuisé)</span>}
            </label>
          ))}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-[13px] font-medium text-terracotta" role="alert">
              Choisis ta taille pour continuer.
            </motion.p>
          )}
        </AnimatePresence>
        {soldOutSizes.length > 0 && !allSoldOut && (
          <p className="mt-2 text-[13px] text-muted">
            Épuisé en {soldOutSizes.join(", ")}. Sélectionne la taille pour être prévenu(e) du retour en stock.
          </p>
        )}
        {product.fitNote && <p className="mt-3 text-[13px] text-ink-soft">{product.fitNote}</p>}
      </fieldset>

      {/* CTA */}
      <div className="mt-6">
        {variant && !variant.available ? (
          <button type="button" onClick={() => setNotify(variant.size)} className={buttonClass("outline", "w-full")}>
            <Bell className="size-4" /> Me prévenir du retour en {variant.size}
          </button>
        ) : (
          <button
            ref={ctaRef}
            type="button"
            onClick={handleAdd}
            disabled={allSoldOut}
            className={buttonClass(added ? "terracotta" : "ink", "h-14 w-full text-[14px]")}
          >
            {added && <Check className="size-4" />}
            {ctaLabel}
          </button>
        )}
        <div className="mt-4 flex flex-col items-center gap-2.5">
          <p className="flex items-center gap-2 text-[12px] text-muted">
            <Lock className="size-3.5" /> Paiement sécurisé
          </p>
          <PaymentIcons only="main" size="sm" className="justify-center" />
        </div>
      </div>

      <ul className="mt-6 grid gap-3 border-y border-ink/10 py-5 text-[14px]">
        <li className="flex gap-3">
          <Truck className="mt-0.5 size-4 shrink-0 text-terracotta" strokeWidth={1.7} />
          <span>
            Expédié sous {site.dispatchDays} jours ouvrés, livré en {site.deliveryFrance} en France.{" "}
            <span className="text-muted">Offerte dès {formatPrice(site.freeShippingThreshold).replace(",00", "")}.</span>
          </span>
        </li>
        <li className="flex gap-3">
          <RotateCcw className="mt-0.5 size-4 shrink-0 text-terracotta" strokeWidth={1.7} />
          <span>
            {site.returnDays} jours pour changer d&apos;avis. <span className="text-muted">Échange de taille possible.</span>
          </span>
        </li>
      </ul>

      {/* Détails */}
      <div className="mt-2 divide-y divide-ink/10">
        <Accordion title="Description" defaultOpen>
          {product.description.map((p) => (
            <p key={p.slice(0, 20)} className="mb-3 last:mb-0">
              {p}
            </p>
          ))}
        </Accordion>
        <Accordion title="Fiche technique">
          <ul className="space-y-0">
            {product.specs.map((s) => (
              <li key={s} className="flex gap-3 border-b border-dashed border-ink/15 py-2 font-mono text-[12.5px] uppercase tracking-wide last:border-0">
                <span className="text-terracotta">—</span> {s}
              </li>
            ))}
          </ul>
        </Accordion>
        {product.care && (
          <Accordion title="Entretien">
            <ul className="list-inside list-disc space-y-1">
              {product.care.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Accordion>
        )}
        <Accordion title="Livraison & retours">
          <p>
            Livraison en {site.deliveryFrance} en France métropolitaine, 5 à 7 jours en Europe. Pendant les deux semaines suivant un drop,
            l&apos;expédition peut prendre jusqu&apos;à 7 jours ouvrés.
          </p>
          <p className="mt-3">
            Tu disposes de {site.returnDays} jours après réception pour demander un retour.{" "}
            <Link href="/legal/retours" className="underline underline-offset-4">Voir la politique de retour</Link>
          </p>
        </Accordion>
      </div>

      {/* Barre collante mobile */}
      <AnimatePresence>
        {showSticky && !allSoldOut && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-ink/10 bg-clay-50/95 px-4 py-3 backdrop-blur-xl md:hidden"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold">{product.name}</p>
              <p className="text-[12px] text-muted">
                {size ? `Taille ${size}` : "Choisis ta taille"} · {formatPrice(product.price)}
              </p>
            </div>
            <button type="button" onClick={handleAdd} className={buttonClass(added ? "terracotta" : "ink", "h-11 px-5")}>
              {added ? <Check className="size-4" /> : "Ajouter"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SizeGuide open={guide} onClose={() => setGuide(false)} product={product} />
      <NotifyDialog size={notify} onClose={() => setNotify(null)} product={product} />
    </div>
  );
}

function Accordion({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-[13px] font-semibold uppercase tracking-[0.12em]"
      >
        {title}
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-[15px] leading-relaxed text-ink-soft">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useBodyLock(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Fermer" onClick={onClose} className="absolute inset-0 bg-ink/45" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-y-0 right-0 w-full max-w-[480px] overflow-y-auto bg-clay-50 p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[18px]">{title}</h2>
              <button type="button" onClick={onClose} className="-mr-2 grid size-10 place-items-center" aria-label="Fermer">
                <X className="size-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SizeGuide({ open, onClose, product }: { open: boolean; onClose: () => void; product: Product }) {
  const fit = product.specs.find((s) => /coupe/i.test(s));
  return (
    <Sheet open={open} onClose={onClose} title="Guide des tailles">
      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-soft">
        {fit && (
          <p>
            <span className="label-mono block text-muted">Coupe</span>
            <span className="text-ink">{fit}</span>
          </p>
        )}
        {product.fitNote && (
          <p>
            <span className="label-mono block text-muted">Repère</span>
            <span className="text-ink">{product.fitNote}</span>
          </p>
        )}
        <p>
          Nos pièces sont taillées de manière standard. Si tu hésites entre deux tailles, prends la taille au-dessus pour un rendu
          plus oversize, ou ta taille habituelle pour un fit plus ajusté.
        </p>
        <div className="border border-dashed border-terracotta/60 bg-terracotta/5 p-4 text-[13px]">
          <p className="font-semibold text-terracotta">Mesures détaillées à venir</p>
          <p className="mt-1">
            Prototype : le tableau des mesures (tour de poitrine, longueur, largeur en cm) sera ajouté dès que la marque aura
            communiqué les mesures réelles de chaque pièce.
          </p>
        </div>
        <p>
          Un doute ?{" "}
          <Link href="/contact" className="font-medium text-ink underline underline-offset-4">
            Écris-nous
          </Link>
          , on t&apos;aide à choisir.
        </p>
      </div>
    </Sheet>
  );
}

function NotifyDialog({ size, onClose, product }: { size: string | null; onClose: () => void; product: Product }) {
  const [done, setDone] = useState(false);
  return (
    <Sheet open={size !== null} onClose={() => { setDone(false); onClose(); }} title="Retour en stock">
      <p className="mt-6 text-[15px] text-ink-soft">
        {product.name} · {product.color.name} · Taille {size}
      </p>
      {done ? (
        <p className="mt-6 flex gap-2 text-[15px]" role="status">
          <Check className="mt-1 size-4 text-terracotta" /> C&apos;est noté. (Prototype : alerte non connectée pour l&apos;instant.)
        </p>
      ) : (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label htmlFor="notify-email" className="label-mono text-muted">Ton email</label>
          <input id="notify-email" type="email" required autoComplete="email" className="mt-2 h-12 w-full border border-ink/25 bg-transparent px-3 focus:border-ink focus:outline-none" />
          <button type="submit" className={buttonClass("ink", "mt-4 w-full")}>
            Me prévenir
          </button>
        </form>
      )}
    </Sheet>
  );
}
