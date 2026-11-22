import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { getCollectionProducts } from "@/lib/commerce";
import { formatPrice } from "@/lib/site";
import { ProductMedia } from "@/components/product/product-media";

export function Hero() {
  const drop = getCollectionProducts("athletics");
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative -mt-16 min-h-[100svh] overflow-hidden bg-ink text-clay-50 md:-mt-[72px] lg:min-h-[max(100svh,760px)]"
    >
      {/* Photo de campagne */}
      <div className="absolute inset-0 lg:left-auto lg:w-[54%]">
        <Image
          src="/images/lifestyle/campagne-athletics-hero.jpg"
          alt="Deux modèles portent les ensembles Kira Athletics bleu et burgundy, à côté d'un portant de maillots verts"
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover object-[50%_22%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20 lg:bg-gradient-to-r lg:from-ink lg:via-ink/10 lg:to-transparent" />
      </div>

      <div className="relative z-[2] mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-4 pb-8 pt-28 md:px-8 lg:min-h-[max(100svh,760px)] lg:justify-center lg:pb-16">
        <p className="label-mono flex items-center gap-3 text-sand">
          <span className="h-px w-8 bg-sand" aria-hidden />
          Drop 03 · Novembre 2026
        </p>

        <h1 id="hero-title" className="mt-5 font-display">
          <span className="line-mask text-[22vw] sm:text-[18vw] lg:text-[11.5vw] 2xl:text-[11rem]">
            <span>Kira</span>
          </span>
          <span className="line-mask text-[22vw] sm:text-[18vw] lg:text-[11.5vw] 2xl:text-[11rem]">
            <span style={{ animationDelay: "120ms" }}>Athletics</span>
          </span>
        </h1>

        <p className="mt-6 max-w-[30rem] font-serif text-[1.65rem] italic leading-[1.15] text-clay-50/92 md:text-[2rem]">
          Le vestiaire sportif de Kirané, taillé pour la rue.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/collections/athletics" variant="clay">
            Découvrir le drop
          </ButtonLink>
          <ButtonLink href="/collections" variant="outline-light" arrow={false}>
            Tout le vestiaire
          </ButtonLink>
        </div>

        {/* Les pièces du drop */}
        <div className="mt-12 hidden max-w-[34rem] lg:block">
          <p className="label-mono mb-3 text-clay-50/55">Dans ce drop · {drop.length} pièces</p>
          <ul className="grid grid-cols-3 gap-3">
            {drop.map((p) => (
              <li key={p.handle}>
                <Link href={`/produits/${p.handle}`} className="group/h flex items-center gap-3">
                  <div className="relative aspect-square w-14 shrink-0 overflow-hidden">
                    <ProductMedia image={p.images[0]} sizes="56px" className="absolute inset-0 bg-clay-50" />
                  </div>
                  <div className="min-w-0 text-[12px] leading-tight">
                    <p className="truncate font-semibold group-hover/h:text-sand">
                      {p.category === "maillots" ? "Maillot" : "Tracksuit"} {p.color.name.split(" /")[0]}
                    </p>
                    <p className="mt-0.5 text-clay-50/60">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
