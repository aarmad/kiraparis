"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, Lock, Minus, Plus, Ruler, RotateCcw, ShoppingBag, Truck, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/commerce/types";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice, site } from "@/lib/site";
import { buttonClass } from "@/components/ui/button";
import { PaymentIcons } from "@/components/ui/payment-icons";
import { CATEGORY_LABELS } from "@/lib/commerce";
import { ProductMedia } from "./product-media";
import { useBodyLock } from "@/lib/use-body-lock";

export function ProductInfo({
  product,
  siblings,
  pairing,
}: {
  product: Product;
  siblings: Product[];
  pairing?: Product;
}) {
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
        : "Ajouter au panier";

  const lead = product.description[0];
  const isNew = product.badges.includes("nouveau");
  const limited = product.badges.includes("edition-limitee");

  return (
    <div>
      <Link href={`/collections?categorie=${product.category}`} className="label-mono text-muted hover:text-ink">
        {CATEGORY_LABELS[product.category]} →
      </Link>
      <h1 className="mt-3 text-[16px] font-bold uppercase leading-snug tracking-[0.04em] md:text-[17px]">
        {product.name} - {product.color.name}
      </h1>
      <p className="mt-1.5 text-[15px] font-semibold tabular-nums">{formatPrice(product.price)}</p>
      {(isNew || limited) && (
        <p className="mt-2.5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.04em]">
          <span className="size-1.5 bg-terracotta" aria-hidden />
          {limited ? "Édition limitée" : "Nouveau"}
        </p>
      )}

      {/* Autres coloris : vignettes photo */}
      {siblings.length > 1 && (
        <div className="mt-6">
          <p className="text-[13px]">
            Autre coloris · <span className="text-ink-soft">{product.color.name}</span>
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {siblings.map((s) => (
              <li key={s.handle}>
                <Link
                  href={`/produits/${s.handle}`}
                  scroll={false}
                  title={s.color.name}
                  aria-label={`Coloris ${s.color.name}`}
                  aria-current={s.handle === product.handle ? "true" : undefined}
                  className={cn(
                    "relative block h-[66px] w-[54px] border transition-colors",
                    s.handle === product.handle ? "border-ink" : "border-clay-200 hover:border-ink",
                  )}
                >
                  <ProductMedia image={s.images[0]} sizes="54px" className="absolute inset-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tailles */}
      <fieldset id="size-picker" className="mt-6">
        <legend className="sr-only">Taille</legend>
        <button
          type="button"
          onClick={() => setGuide(true)}
          className="flex items-center gap-2 text-[13px] font-bold underline underline-offset-[3px]"
        >
          <Ruler className="size-4" strokeWidth={1.7} /> Guide des tailles
        </button>
        <p className="mt-3 text-[13px]" aria-hidden>
          Choisir ma taille : <strong>{size ?? "—"}</strong>
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.variants.map((v) => (
            <label
              key={v.id}
              className={cn(
                "relative grid h-11 min-w-12 cursor-pointer place-items-center border px-3 text-[13px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-terracotta",
                size === v.size ? "border-ink bg-ink text-clay-50" : "border-clay-300 hover:border-ink",
                !v.available && size !== v.size && "text-muted",
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
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-[13px] font-medium text-terracotta"
              role="alert"
            >
              Choisis ta taille pour continuer.
            </motion.p>
          )}
        </AnimatePresence>
        {soldOutSizes.length > 0 && !allSoldOut && (
          <p className="mt-2 text-[12px] text-muted">
            Épuisé en {soldOutSizes.join(", ")} — sélectionne la taille pour être prévenu(e) du retour.
          </p>
        )}
      </fieldset>

      {/* À porter avec */}
      {pairing && (
        <Link
          href={`/produits/${pairing.handle}`}
          className="group/pair mt-5 flex items-center gap-3.5 border border-ink p-3 transition-colors hover:bg-clay-100"
        >
          <span className="relative block h-[70px] w-14 shrink-0">
            <ProductMedia image={pairing.images[0]} sizes="56px" className="absolute inset-0" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="label-mono block text-muted">À porter avec</span>
            <span className="mt-1 block truncate text-[12.5px] font-semibold uppercase tracking-[0.04em]">
              {pairing.name} - {pairing.color.name}
            </span>
            <span className="text-[13px] tabular-nums">{formatPrice(pairing.price)}</span>
          </span>
          <span className="shrink-0 border border-ink px-3 py-2 text-[11px] font-bold uppercase tracking-[0.04em] group-hover/pair:bg-ink group-hover/pair:text-clay-50">
            Voir
          </span>
        </Link>
      )}

      {/* CTA */}
      <div className="mt-4">
        {variant && !variant.available ? (
          <button type="button" onClick={() => setNotify(variant.size)} className={buttonClass("outline", "h-[52px] w-full")}>
            <Bell className="size-4" /> Me prévenir du retour en {variant.size}
          </button>
        ) : (
          <button
            ref={ctaRef}
            type="button"
            onClick={handleAdd}
            disabled={allSoldOut}
            className={cn(
              "flex h-[52px] w-full items-center justify-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.04em] text-clay-50 transition-colors disabled:opacity-50",
              added ? "bg-terracotta" : "bg-ink hover:bg-terracotta",
            )}
          >
            {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" strokeWidth={2} />}
            {ctaLabel}
          </button>
        )}
      </div>

      {product.fitNote && <p className="mt-3 text-center text-[12px] text-ink-soft">{product.fitNote}</p>}

      {/* Livraison */}
      <p className="mt-4 bg-clay-100 px-4 py-3.5 text-[13px] leading-relaxed">
        Expédié sous <strong>{site.dispatchDays} jours ouvrés</strong>, livré en {site.deliveryFrance} en France. Livraison{" "}
        <strong>offerte dès {formatPrice(site.freeShippingThreshold).replace(",00", "")}</strong> d&apos;achat.{" "}
        <Link href="/legal/livraison" className="underline underline-offset-2">
          Livraison & délais
        </Link>
      </p>

      <ul className="mt-4 grid grid-cols-3 border-y border-clay-200 py-3.5 text-center text-[11.5px]">
        <li className="flex flex-col items-center gap-1.5">
          <Truck className="size-5" strokeWidth={1.5} /> Expédié sous {site.dispatchDays} j
        </li>
        <li className="flex flex-col items-center gap-1.5">
          <RotateCcw className="size-5" strokeWidth={1.5} /> Retours sous {site.returnDays} jours
        </li>
        <li className="flex flex-col items-center gap-1.5">
          <Lock className="size-5" strokeWidth={1.5} /> Paiement sécurisé
        </li>
      </ul>
      <PaymentIcons only="main" size="sm" className="mt-3 justify-center" />

      {/* Description : phrase d'accroche + puces */}
      <div className="mt-6 text-[14px] leading-relaxed">
        <p className="font-bold">{lead}</p>
        {product.description.slice(1).map((p) => (
          <p key={p.slice(0, 20)} className="mt-2 text-ink-soft">
            {p}
          </p>
        ))}
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {product.specs.map((sp) => (
            <li key={sp}>{sp}.</li>
          ))}
        </ul>
      </div>

      {/* Accordéons */}
      <div className="mt-6">
        <Accordion title="Questions fréquentes">
          <p>
            Nos pièces sont taillées de manière standard : prends la taille au-dessus pour un rendu plus oversize, ta taille habituelle
            pour un fit plus ajusté.
          </p>
          <p className="mt-2">
            <Link href="/faq" className="underline underline-offset-2">
              Toutes les questions
            </Link>
          </p>
        </Accordion>
        <Accordion title="Livraison & retours">
          <p>
            Livraison en {site.deliveryFrance} en France métropolitaine, 5 à 7 jours en Europe. Pendant les deux semaines suivant un drop,
            l&apos;expédition peut prendre jusqu&apos;à 7 jours ouvrés.
          </p>
          <p className="mt-2">
            Tu disposes de {site.returnDays} jours après réception pour demander un retour.{" "}
            <Link href="/legal/retours" className="underline underline-offset-2">
              Politique de retour
            </Link>
          </p>
        </Accordion>
        <Accordion title="Conseil d'entretien">
          {product.care ? (
            <ul className="list-disc space-y-1 pl-5">
              {product.care.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : (
            <p>Lavage à 30 °C, à l&apos;envers, pour préserver les couleurs et la matière.</p>
          )}
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
              <p className="truncate text-[12px] font-bold uppercase tracking-[0.04em]">{product.name} - {product.color.name}</p>
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
        className="flex w-full items-center justify-between border-b border-clay-200 py-3.5 text-left text-[12px] font-bold uppercase tracking-[0.04em]"
      >
        {title}
        {open ? <Minus className="size-4" strokeWidth={1.5} /> : <Plus className="size-4" strokeWidth={1.5} />}
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
            <div className="border-b border-clay-200 py-4 text-[13.5px] leading-relaxed text-ink-soft">{children}</div>
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
