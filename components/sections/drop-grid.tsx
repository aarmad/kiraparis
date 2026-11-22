import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProduct } from "@/lib/commerce";
import { formatPrice } from "@/lib/site";
import { ProductMedia } from "@/components/product/product-media";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

/** Le drop Athletics en composition éditoriale asymétrique. */
export function DropGrid() {
  const burgundy = getProduct("ensemble-tracksuit-burgundy-cream")!;
  const blue = getProduct("ensemble-tracksuit-bleu-black")!;
  const jersey = getProduct("maillot-football-vert")!;

  return (
    <section aria-labelledby="drop-title" className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-32">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-7">
          <p className="label-mono text-terracotta">Le drop · Kira Athletics</p>
          <h2 id="drop-title" className="mt-4 font-display text-[3.6rem] md:text-[6.5rem]">
            Né pour le terrain.
            <br />
            <span className="font-serif text-[0.72em] font-normal normal-case italic tracking-[-0.02em] text-terracotta">
              Taillé pour la rue.
            </span>
          </h2>
        </Reveal>
        <Reveal className="md:col-span-4 md:col-start-9" delay={100}>
          <p className="text-[17px] leading-relaxed text-ink-soft">
            Deux ensembles oversize et un maillot en piqué. Logos Kira Athletics imprimés, ourlets élastiques,
            motifs de la maison du col aux flancs.
          </p>
          <ButtonLink href="/collections/athletics" variant="outline" className="mt-6">
            Voir le drop
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-x-4 gap-y-10 md:mt-16 md:grid-cols-12 md:gap-x-5">
        {/* Pièce maîtresse : photo portée grand format */}
        <Reveal className="md:col-span-7">
          <Link href={`/produits/${burgundy.handle}`} className="group/f relative block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <ProductMedia
                image={burgundy.images[2]}
                sizes="(min-width: 768px) 58vw, 100vw"
                className="absolute inset-0"
                imgClassName="object-[50%_30%] transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover/f:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5 pt-24 text-clay-50 md:p-7 md:pt-32">
                <p className="label-mono text-clay-50/70">01 · {burgundy.color.name}</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <p className="font-display text-[2.6rem] md:text-[3.6rem]">{burgundy.name}</p>
                  <p className="flex items-center gap-2 pb-1 text-lg font-medium tabular-nums">
                    {formatPrice(burgundy.price)}
                    <ArrowUpRight className="size-5 transition-transform group-hover/f:-translate-y-0.5 group-hover/f:translate-x-0.5" />
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>

        <div className="flex flex-col gap-10 md:col-span-5 md:gap-5">
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <Reveal delay={80}>
              <ProductCard product={blue} imageIndex={1} sizes="(min-width: 768px) 20vw, 50vw" />
            </Reveal>
            <Reveal delay={160}>
              <ProductCard product={jersey} imageIndex={3} sizes="(min-width: 768px) 20vw, 50vw" />
            </Reveal>
          </div>
          <Reveal delay={220} className="flex-1">
            <Link
              href={`/produits/${jersey.handle}`}
              className="group/l relative block aspect-[5/4] h-full overflow-hidden md:aspect-auto md:min-h-[320px]"
            >
              <ProductMedia
                image={jersey.images[4]}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="absolute inset-0"
                imgClassName="object-[50%_35%] transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover/l:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/65 to-transparent p-5 pt-20 text-clay-50">
                <p className="font-serif text-[1.6rem] italic leading-tight">Le maillot, avec le jean Terre Craquelée.</p>
                <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
