import type { Metadata } from "next";
import Image from "next/image";
import { Emblem } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Notre histoire — De Kirané à Paris",
  description:
    "KIRA vient de Kirané, un village du Mali. Une marque streetwear qui porte la culture soninké dans le présent, dans la rue, sur toi.",
  alternates: { canonical: "/notre-histoire" },
};

/** Texte issu de la page « À propos » d'origine, resserré et mis en chapitres. */
const chapters = [
  {
    n: "01",
    title: "Une origine réelle",
    body: [
      "KIRA vient de Kirané. Un village au Mali. Un point sur la carte, mais une empreinte immense.",
      "C'est là que tout commence. Les valeurs. La vision. L'identité. KIRA, c'est porter ses racines sans jamais les diluer.",
    ],
    image: { src: "/images/products/maillot-football-vert/07.jpg", alt: "Dos du maillot KIRA vert, flocage KIRA 10" },
  },
  {
    n: "02",
    title: "L'héritage comme moteur",
    body: [
      "La culture soninké est riche, élégante, intemporelle. Mais elle est trop peu représentée.",
      "KIRA Paris la fait vivre autrement. Dans le présent. Dans la rue. Sur toi.",
    ],
    image: { src: "/images/products/jean-terre-craquelee-noir/04.jpg", alt: "Étiquette tissée Kira Paris sur le jean terre craquelée" },
  },
  {
    n: "03",
    title: "Entre deux mondes",
    body: [
      "KIRA Paris est une passerelle. Entre tradition et modernité. Entre héritage et streetwear.",
      "Chaque pièce est pensée pour ceux qui savent d'où ils viennent — et où ils vont.",
    ],
    image: { src: "/images/products/ensemble-tracksuit-bleu-black/05.jpg", alt: "Deux modèles en ensembles Kira Athletics bleu et burgundy" },
  },
];

export default function StoryPage() {
  return (
    <>
      {/* Ouverture */}
      <section className="grain relative overflow-hidden bg-terracotta text-clay-50">
        <div className="cracked-earth pointer-events-none absolute inset-0" aria-hidden />
        <Emblem className="pointer-events-none absolute -bottom-[10%] -right-[15%] size-[90vw] text-chestnut/25 md:-right-[5%] md:size-[55vw]" />
        <div className="relative z-[2] mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-end px-4 pb-14 pt-32 md:px-8 md:pb-20">
          <p className="label-mono text-clay-50/75">Notre histoire</p>
          <h1 className="mt-5 font-display text-[44px] md:text-[88px]">
            <span className="line-mask"><span>De Kirané</span></span>
            <span className="line-mask"><span style={{ animationDelay: "120ms" }}>à Paris</span></span>
          </h1>
          <p className="mt-8 max-w-2xl text-[20px] leading-snug md:text-[26px]">
            Plus qu&apos;une marque. Une origine. Certaines cultures ne demandent pas à être vues&nbsp;: elles imposent leur présence.
          </p>
        </div>
      </section>

      {/* Chapitres */}
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        {chapters.map((c, i) => (
          <section key={c.n} aria-labelledby={`ch-${c.n}`} className="grid items-center gap-10 border-b border-ink/10 py-20 md:grid-cols-12 md:py-28">
            <Reveal className={i % 2 ? "md:order-2 md:col-span-5 md:col-start-8" : "md:col-span-5"}>
              <p className="font-display text-[40px] text-terracotta md:text-[56px]">{c.n}</p>
              <h2 id={`ch-${c.n}`} className="mt-2 font-display text-[24px] md:text-[30px]">
                {c.title}
              </h2>
              {c.body.map((p) => (
                <p key={p.slice(0, 16)} className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal className={i % 2 ? "md:order-1 md:col-span-6" : "md:col-span-6 md:col-start-7"} delay={120}>
              <div className="relative aspect-[4/5] overflow-hidden bg-clay-100">
                <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </section>
        ))}
      </div>

      {/* Pour qui */}
      <section aria-labelledby="pour-qui" className="bg-ink text-clay-50">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <Reveal className="md:col-span-5">
            <p className="label-mono text-sand">Une identité claire</p>
            <h2 id="pour-qui" className="mt-4 font-display text-[32px] md:text-[48px]">
              KIRA, ce n&apos;est pas pour tout le monde.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
            <p className="label-mono text-clay-50/55">C&apos;est pour ceux qui</p>
            <ul className="mt-4 divide-y divide-clay-50/15 border-y border-clay-50/15">
              {["assument leur histoire", "avancent sans suivre", "portent du sens, pas juste des vêtements"].map((t) => (
                <li key={t} className="flex items-center gap-4 py-5 text-[20px] font-semibold uppercase tracking-[0.04em] md:text-[26px]">
                  <Emblem className="size-5 shrink-0 text-sand" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Mouvement */}
      <section className="relative overflow-hidden">
        <div className="relative h-[80svh] min-h-[520px]">
          <Image
            src="/images/banners/collection-hunter.jpg"
            alt="Deux modèles en hoodie Hunter noir sur fond terracotta"
            fill
            sizes="100vw"
            className="object-cover object-[50%_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chestnut-deep/85 via-chestnut-deep/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-4 pb-12 text-clay-50 md:px-8 md:pb-16">
            <p className="label-mono text-sand">Le début d&apos;un mouvement</p>
            <p className="mt-4 max-w-3xl font-display text-[26px] leading-[1.15] md:text-[40px]">
              Ce que tu portes parle pour toi. Avec KIRA, tu portes une origine, une fierté, une direction.{" "}
              <span className="text-sand">Et ce n&apos;est que le début.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/collections/athletics" variant="clay">
                Découvrir le dernier drop
              </ButtonLink>
              <ButtonLink href="/collections" variant="outline-light" arrow={false}>
                Tout le vestiaire
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
