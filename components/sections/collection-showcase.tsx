import Image from "next/image";
import { getCollection, getCollectionProducts } from "@/lib/commerce";
import { ProductCard } from "@/components/product/product-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/** Bannière plein cadre + rail horizontal de produits. */
export function HunterShowcase() {
  const c = getCollection("hunter")!;
  const products = [...getCollectionProducts("hunter"), ...getCollectionProducts("essentiels")];

  return (
    <section aria-labelledby="hunter-title" className="bg-clay-100">
      <div className="relative h-[78svh] min-h-[520px] overflow-hidden md:h-[88svh]">
        <Image
          src={c.image.src}
          alt={c.image.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chestnut-deep/80 via-chestnut-deep/10 to-transparent md:bg-gradient-to-r md:from-chestnut-deep/75 md:via-chestnut-deep/15" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-10 text-clay-50 md:justify-center md:px-8 md:pb-0">
          <Reveal>
            <p className="label-mono text-sand">{c.kicker}</p>
            <h2 id="hunter-title" className="mt-3 font-display text-[28vw] md:text-[15vw] 2xl:text-[14rem]">
              {c.title}
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-clay-50/88">{c.intro}</p>
            <ButtonLink href={`/collections/${c.handle}`} variant="clay" className="mt-7">
              Explorer Hunter
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h3 className="font-display text-[2.4rem] md:text-[3.4rem]">Hoodies & essentiels</h3>
          <p className="label-mono hidden text-muted md:block">Faire défiler →</p>
        </div>
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:-mx-8 md:scroll-px-8 md:gap-5 md:px-8">
          {products.map((p) => (
            <li key={p.handle} className="w-[70vw] shrink-0 snap-start sm:w-[42vw] md:w-[29vw] lg:w-[23vw] 2xl:w-[340px]">
              <ProductCard product={p} sizes="(min-width: 1024px) 23vw, 70vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
