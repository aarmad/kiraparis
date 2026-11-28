import Image from "next/image";
import Link from "next/link";

const panels = [
  {
    href: "/collections/athletics",
    kicker: "Nouveauté",
    title: "Drop Athletics",
    src: "/images/lifestyle/campagne-athletics-hero.jpg",
    alt: "Deux modèles en ensembles Kira Athletics bleu et burgundy, maillots verts sur un portant",
    position: "50% 25%",
  },
  {
    href: "/collections/hunter",
    kicker: "La ligne fondatrice",
    title: "Hunter",
    src: "/images/banners/collection-hunter.jpg",
    alt: "Deux modèles en hoodie Hunter noir sur fond terracotta",
    position: "55% 40%",
  },
];

/** Double hero : deux photos éditoriales côte à côte, chacune menant à son drop. */
export function HeroSplit() {
  return (
    <section aria-label="À la une" className="grid gap-1.5 px-2 pt-2 md:grid-cols-2 md:gap-2 md:px-3 md:pt-3">
      {panels.map((p, i) => (
        <Link
          key={p.href}
          href={p.href}
          className="group/h relative block h-[68svh] min-h-[420px] overflow-hidden text-clay-50 md:h-[82svh] md:max-h-[820px]"
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover/h:scale-[1.03]"
            style={{ objectPosition: p.position }}
          />
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" aria-hidden />
          <span className="absolute bottom-6 left-5 flex flex-col gap-1.5 md:bottom-8 md:left-8">
            <span className="label-mono">{p.kicker}</span>
            {i === 0 ? (
              <h1 className="font-display text-[30px] leading-none md:text-[40px]">{p.title}</h1>
            ) : (
              <h2 className="font-display text-[30px] leading-none md:text-[40px]">{p.title}</h2>
            )}
            <span className="mt-2 self-start border-b border-current pb-0.5 text-[12px] font-bold uppercase tracking-[0.04em]">
              Découvrir
            </span>
          </span>
        </Link>
      ))}
    </section>
  );
}
