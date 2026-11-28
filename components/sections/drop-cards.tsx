import Image from "next/image";
import Link from "next/link";

const drops = [
  { href: "/collections/athletics", kicker: "Drop 03 · Novembre 2026", title: "Kira Athletics", src: "/images/products/maillot-football-vert/05.jpg", alt: "Deux modèles en maillot KIRA vert", pos: "50% 40%" },
  { href: "/collections/denim", kicker: "Drop 02 · Édition limitée", title: "Denim terre craquelée", src: "/images/products/jean-terre-craquelee-noir/03.jpg", alt: "Jean terre craquelée noir porté", pos: "50% 60%" },
  { href: "/collections/hunter", kicker: "Drop 01 · La ligne fondatrice", title: "Hunter", src: "/images/banners/collection-hunter.jpg", alt: "Hoodies Hunter portés sur fond terracotta", pos: "30% 40%" },
];

/** Les drops, façon lookbook : image, surtitre, titre, lien. */
export function DropCards() {
  return (
    <section aria-labelledby="drops-t" className="mx-auto max-w-[1600px] px-3 pt-16 md:px-6 md:pt-20">
      <div className="mb-5 flex items-baseline justify-between md:mb-6">
        <h2 id="drops-t" className="font-display text-[16px] md:text-[18px]">
          Les drops
        </h2>
        <Link href="/collections" className="text-[12px] font-bold uppercase tracking-[0.04em] hover:text-terracotta">
          Tout le vestiaire
        </Link>
      </div>
      <ul className="no-scrollbar -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
        {drops.map((d) => (
          <li key={d.href} className="w-[78vw] shrink-0 snap-start md:w-auto">
            <Link href={d.href} className="group/d flex flex-col gap-3">
              <span className="relative block aspect-[4/5] overflow-hidden bg-clay-100">
                <Image
                  src={d.src}
                  alt={d.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 78vw"
                  className="object-cover transition-transform duration-700 group-hover/d:scale-[1.03]"
                  style={{ objectPosition: d.pos }}
                />
              </span>
              <span className="label-mono text-muted">{d.kicker}</span>
              <span className="-mt-1.5 font-display text-[18px] md:text-[20px]">{d.title}</span>
              <span className="self-start border-b border-ink text-[12px] font-bold uppercase tracking-[0.04em] group-hover/d:border-terracotta group-hover/d:text-terracotta">
                En savoir plus →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
