import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/commerce/types";

/** En-tête de collection « Vestiaire » : bandeau photo court + titre en capitales. */
export function CollectionHeader({ collection }: { collection: Collection }) {
  const packshot = collection.handle === "essentiels";
  return (
    <header>
      {!packshot && (
        <div className="relative mx-2 mt-2 h-[260px] overflow-hidden text-clay-50 md:mx-3 md:mt-3 md:h-[380px]">
          <Image
            src={collection.image.src}
            alt={collection.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: collection.image.position }}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden />
          <p className="label-mono absolute bottom-5 left-5 md:bottom-7 md:left-7">{collection.kicker}</p>
        </div>
      )}
      <div className="mx-auto max-w-[1600px] px-3 pb-2 pt-6 md:px-6 md:pt-8">
        <nav aria-label="Fil d'Ariane" className="label-mono text-muted">
          <Link href="/" className="hover:text-ink">Accueil</Link> /{" "}
          <Link href="/collections" className="hover:text-ink">Vêtements</Link> /{" "}
          <span className="text-ink">{collection.title}</span>
        </nav>
        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
          <h1 className="font-display text-[26px] md:text-[32px]">{collection.title}</h1>
          <p className="max-w-xl text-[14px] text-ink-soft md:text-right">{collection.intro}</p>
        </div>
      </div>
    </header>
  );
}
