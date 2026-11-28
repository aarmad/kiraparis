import Image from "next/image";
import Link from "next/link";

const tiles = [
  { label: "Ensembles", href: "/collections?categorie=ensembles", src: "/images/products/ensemble-tracksuit-burgundy-cream/03.jpg", pos: "50% 30%", zoom: 1.2 },
  { label: "Maillots", href: "/collections?categorie=maillots", src: "/images/products/maillot-football-vert/04.jpg", pos: "50% 25%" },
  { label: "Hoodies", href: "/collections?categorie=hoodies", src: "/images/banners/collection-hunter.jpg", pos: "78% 35%" },
  { label: "Pantalons & denim", href: "/collections?categorie=pantalons", src: "/images/products/jean-terre-craquelee-noir/03.jpg", pos: "50% 62%" },
];

export function CategoryTiles() {
  return (
    <section aria-label="Catégories" className="grid grid-cols-2 gap-1.5 px-2 pt-10 md:grid-cols-4 md:gap-2 md:px-3 md:pt-12">
      {tiles.map((t) => (
        <Link key={t.label} href={t.href} className="group/t relative block h-[200px] overflow-hidden text-clay-50 md:h-[300px]">
          <Image
            src={t.src}
            alt=""
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover/t:scale-105"
            style={{ objectPosition: t.pos, ...(t.zoom ? { scale: String(t.zoom) } : {}) }}
          />
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover/t:bg-black/35" aria-hidden />
          <span className="absolute bottom-3 left-3 text-[14px] font-bold uppercase tracking-[0.04em] md:bottom-5 md:left-5 md:text-[18px]">
            {t.label}
          </span>
        </Link>
      ))}
    </section>
  );
}
