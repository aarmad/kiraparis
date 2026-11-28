"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/commerce/types";
import { ProductMedia } from "./product-media";
import { useBodyLock } from "@/lib/use-body-lock";

/**
 * Desktop : grille éditoriale (1re image pleine largeur, puis 2 colonnes).
 * Mobile : carrousel swipe natif (scroll-snap) avec compteur.
 * Clic : visionneuse plein écran.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const track = useRef<HTMLUListElement>(null);
  useBodyLock(zoom !== null, () => setZoom(null));

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <>
      {/* Mobile */}
      <div className="relative md:hidden">
        <ul
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          aria-label="Photos du produit"
        >
          {product.images.map((img, i) => (
            <li key={img.src} className="w-full shrink-0 snap-center">
              <button type="button" className="relative block aspect-[3/4] w-full" onClick={() => setZoom(i)} aria-label={`Agrandir : ${img.alt}`}>
                <ProductMedia image={img} sizes="100vw" priority={i === 0} className="absolute inset-0" />
              </button>
            </li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-1.5" aria-hidden>
          {product.images.map((img, i) => (
            <span key={img.src} className={cn("h-[3px] rounded-full bg-ink/25 transition-all duration-300", i === index ? "w-6 bg-ink" : "w-3")} />
          ))}
        </div>
        <p className="label-mono absolute right-3 top-3 bg-clay-50/80 px-2 py-1 !text-[10px] backdrop-blur">
          {index + 1} / {product.images.length}
        </p>
      </div>

      {/* Desktop */}
      <ul className="hidden grid-cols-2 gap-[3px] md:grid">
        {product.images.map((img, i) => (
          <li
            key={img.src}
            className={cn(
              product.images.length % 2 === 1 && i === product.images.length - 1 && "col-span-2",
            )}
          >
            <button
              type="button"
              onClick={() => setZoom(i)}
              className={cn("group/g relative block w-full cursor-zoom-in", product.images.length % 2 === 1 && i === product.images.length - 1 ? "aspect-[3/2]" : "aspect-[3/4]")}
              aria-label={`Agrandir : ${img.alt}`}
            >
              <ProductMedia
                image={img}
                priority={i === 0}
                sizes="(min-width: 768px) 28vw, 50vw"
                className="absolute inset-0"
              />
              <span className="absolute bottom-3 right-3 grid size-9 place-items-center bg-clay-50/85 opacity-0 backdrop-blur transition group-hover/g:opacity-100">
                <ZoomIn className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {zoom !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse"
            className="fixed inset-0 z-[70] flex flex-col bg-clay-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-4 py-3 md:px-8">
              <p className="label-mono text-muted">
                {zoom + 1} / {product.images.length}
              </p>
              <button type="button" onClick={() => setZoom(null)} className="grid size-10 place-items-center" aria-label="Fermer">
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>
            <div className="relative flex-1">
              <Image
                src={product.images[zoom].src}
                alt={product.images[zoom].alt}
                fill
                sizes="100vw"
                className={cn("object-contain", product.images[zoom].kind === "packshot" && "mix-blend-multiply")}
              />
            </div>
            <ul className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 py-4">
              {product.images.map((img, i) => (
                <li key={img.src}>
                  <button
                    type="button"
                    onClick={() => setZoom(i)}
                    className={cn("relative block aspect-[4/5] w-14 ring-offset-2 ring-offset-clay-50", i === zoom ? "ring-1 ring-ink" : "opacity-60 hover:opacity-100")}
                    aria-label={`Image ${i + 1}`}
                  >
                    <ProductMedia image={img} sizes="56px" className="absolute inset-0" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
