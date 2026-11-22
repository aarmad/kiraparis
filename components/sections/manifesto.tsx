import Image from "next/image";
import { Emblem } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="grain relative overflow-hidden bg-terracotta text-clay-50">
      <div className="cracked-earth pointer-events-none absolute inset-0" aria-hidden />
      <Emblem className="pointer-events-none absolute -right-[12%] top-1/2 size-[70vw] -translate-y-1/2 text-chestnut/25 md:-right-[6%] md:size-[46vw]" />

      <div className="relative z-[2] mx-auto grid max-w-[1600px] gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-32">
        <Reveal className="md:col-span-8">
          <p className="label-mono flex items-center gap-3 text-clay-50/75">
            <Emblem className="size-4 text-sand" /> D&apos;où vient KIRA
          </p>
          <h2 id="manifesto-title" className="mt-6 font-serif text-[2.6rem] leading-[1.02] tracking-[-0.02em] md:text-[4.6rem]">
            <em>KIRA vient de Kirané.</em> Un village au Mali. Un point sur la carte, mais une empreinte immense.
          </h2>
        </Reveal>

        <Reveal className="flex flex-col justify-end md:col-span-4" delay={120}>
          <div className="relative mb-8 hidden aspect-square w-40 overflow-hidden md:block">
            <Image
              src="/images/brand/logo-script-terracotta.png"
              alt="Logo script KIRA Paris sur un mur ocre"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          <p className="text-[17px] leading-relaxed text-clay-50/88">
            La culture soninké est riche, élégante, intemporelle — et trop peu représentée. KIRA Paris la fait vivre
            autrement&nbsp;: dans le présent, dans la rue, sur toi.
          </p>
          <ButtonLink href="/notre-histoire" variant="clay" className="mt-8 self-start">
            Lire notre histoire
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
