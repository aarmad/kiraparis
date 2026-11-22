import Image from "next/image";
import { getProduct } from "@/lib/commerce";
import { formatPrice } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/** Composition en couches : photo portée + détail étiquette en surimpression. */
export function DenimFeature() {
  const jean = getProduct("jean-terre-craquelee-noir")!;
  return (
    <section aria-labelledby="denim-title" className="relative overflow-hidden bg-ink text-clay-50">
      <div className="cracked-earth pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto grid max-w-[1600px] items-center gap-14 px-4 py-20 md:grid-cols-12 md:px-8 md:py-32">
        <Reveal className="relative md:col-span-6 md:col-start-1">
          <div className="relative ml-auto aspect-[4/5] w-[84%] overflow-hidden">
            <Image
              src={jean.images[2].src}
              alt={jean.images[2].alt}
              fill
              sizes="(min-width: 768px) 42vw, 84vw"
              className="object-cover object-[50%_65%]"
            />
          </div>
          <div className="absolute -bottom-8 left-0 aspect-square w-[46%] overflow-hidden border-[6px] border-ink shadow-2xl md:-bottom-10">
            <Image src={jean.images[3].src} alt={jean.images[3].alt} fill sizes="(min-width: 768px) 22vw, 46vw" className="object-cover" />
          </div>
          <span className="label-mono absolute right-3 top-3 bg-terracotta px-2 py-1 !text-[10px]">Édition limitée</span>
        </Reveal>

        <Reveal className="md:col-span-5 md:col-start-8" delay={120}>
          <p className="label-mono text-sand">Drop 02 · Denim</p>
          <h2 id="denim-title" className="mt-4 font-display text-[3.8rem] md:text-[6rem]">
            Terre
            <br />
            craquelée
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-clay-50/80">
            Le sol de Kirané qui sèche au soleil, transposé sur un denim noir de 12,5&nbsp;oz. Coupe droite et large,
            étiquette tissée KIRA PARIS à la ceinture. Unisexe.
          </p>
          <dl className="mt-8 grid max-w-md grid-cols-3 border-y border-clay-50/15 py-4">
            {[
              ["Denim", "12,5 oz"],
              ["Coton", "100 %"],
              ["Poches", "5"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label-mono text-clay-50/50">{k}</dt>
                <dd className="mt-1 font-display text-[2rem]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-clay-50/60">{jean.fitNote}</p>
          <ButtonLink href={`/produits/${jean.handle}`} variant="clay" className="mt-8">
            Voir le jean — {formatPrice(jean.price)}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
