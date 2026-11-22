import { Reveal } from "@/components/ui/reveal";

/** Arguments matière — uniquement des données issues des fiches produits. */
const facts = [
  { value: "400", unit: "GSM", label: "Grammage des hoodies Hunter et KIRA. Le Hoodie KIRA Vert monte à 420 GSM." },
  { value: "100", unit: "%", label: "Coton sur toute la ligne hoodies et sur le jogging." },
  { value: "Brodé", unit: "", label: "Logo KIRA brodé à l'avant, motifs brodés ou sérigraphiés dans le dos." },
  { value: "12,5", unit: "oz", label: "Denim du jean Terre Craquelée, 100 % coton." },
];

export function Craft() {
  return (
    <section aria-labelledby="craft-title" className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
      <Reveal className="grid gap-6 md:grid-cols-12">
        <p className="label-mono text-terracotta md:col-span-3">Fait pour durer</p>
        <h2 id="craft-title" className="font-serif text-[2.4rem] leading-[1.05] tracking-[-0.02em] md:col-span-8 md:text-[3.6rem]">
          Pas de vêtement jetable. <em className="text-muted">Des pièces épaisses, brodées, que tu sens dès que tu les enfiles.</em>
        </h2>
      </Reveal>
      <ul className="mt-14 grid grid-cols-2 border-t border-ink/15 md:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal
            as="li"
            key={f.value}
            delay={i * 80}
            className="border-b border-ink/15 py-7 pr-5 odd:border-r md:border-b-0 md:border-r md:pl-6 md:first:pl-0 md:last:border-r-0 [&:nth-child(even)]:pl-5"
          >
            <p className="font-display text-[4rem] md:text-[5.5rem]">
              {f.value}
              {f.unit && <span className="ml-1 text-[0.45em] text-terracotta">{f.unit}</span>}
            </p>
            <p className="mt-3 max-w-[16rem] text-[14px] leading-relaxed text-ink-soft">{f.label}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
