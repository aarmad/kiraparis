import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Collection } from "@/lib/commerce/types";

export function CollectionHeader({ collection, count }: { collection: Collection; count: number }) {
  const packshot = collection.handle === "essentiels";
  return (
    <header className="grain relative -mt-16 overflow-hidden text-clay-50 md:-mt-[72px]" style={{ background: collection.accent }}>
      <div className="cracked-earth pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative z-[2] mx-auto grid max-w-[1600px] items-end gap-8 px-4 pb-10 pt-28 md:grid-cols-12 md:px-8 md:pb-14 md:pt-36">
        <div className="md:col-span-7">
          <nav aria-label="Fil d'Ariane" className="label-mono text-clay-50/60">
            <Link href="/" className="hover:text-clay-50">Accueil</Link> /{" "}
            <Link href="/collections" className="hover:text-clay-50">Boutique</Link> /{" "}
            <span className="text-clay-50">{collection.title}</span>
          </nav>
          <p className="label-mono mt-8 text-sand">{collection.kicker}</p>
          <h1 className="mt-3 font-display text-[19vw] md:text-[10vw] 2xl:text-[10rem]">{collection.title}</h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-clay-50/85">{collection.intro}</p>
          <p className="label-mono mt-6 text-clay-50/55">{count} pièce{count > 1 ? "s" : ""}</p>
        </div>
        <div className="relative hidden aspect-[4/5] overflow-hidden md:col-span-4 md:col-start-9 md:block">
          <Image
            src={collection.image.src}
            alt={collection.image.alt}
            fill
            priority
            sizes="33vw"
            className={cn(packshot ? "scale-125 object-contain" : "object-cover")}
            style={{ objectPosition: collection.image.position }}
          />
        </div>
      </div>
    </header>
  );
}
